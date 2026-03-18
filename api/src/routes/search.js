const { Router } = require('express');
const db = require('../config/database');

const router = Router();

// GET /api/v1/search?q=&translation=&book=&chapter=&page=&limit=
router.get('/', async (req, res, next) => {
  try {
    const { q, translation, book, chapter } = req.query;
    const page  = Math.max(1, parseInt(req.query.page  || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit || '20', 10)));
    const offset = (page - 1) * limit;

    if (!q || q.trim().length < 2) {
      return res.status(400).json({ error: 'Query parameter "q" must be at least 2 characters' });
    }

    const params = [];
    const conditions = [];

    // Full-text search using the generated tsvector column
    params.push(q.trim());
    conditions.push(`v.search_vector @@ plainto_tsquery('simple', $${params.length})`);

    if (translation) {
      params.push(translation);
      conditions.push(`LOWER(t.code) = LOWER($${params.length})`);
    }

    if (book) {
      const isNumeric = /^\d+$/.test(book);
      params.push(isNumeric ? parseInt(book, 10) : decodeURIComponent(book));
      conditions.push(
        isNumeric
          ? `b.book_number = $${params.length}`
          : `LOWER(b.name) = LOWER($${params.length})`
      );
    }

    if (chapter) {
      const chNum = parseInt(chapter, 10);
      if (!isNaN(chNum)) {
        params.push(chNum);
        conditions.push(`v.chapter = $${params.length}`);
      }
    }

    const where = conditions.join(' AND ');

    const countResult = await db.query(
      `SELECT COUNT(*) AS total
       FROM verses v
       JOIN books b ON b.id = v.book_id
       JOIN translations t ON t.id = b.translation_id
       WHERE ${where}`,
      params
    );

    const total = parseInt(countResult.rows[0].total, 10);

    params.push(limit, offset);
    const { rows } = await db.query(
      `SELECT t.code AS translation, b.name AS book, b.book_number,
              v.chapter, v.verse, v.text,
              ts_headline('simple', v.text, plainto_tsquery('simple', $1),
                          'MaxWords=20, MinWords=5, ShortWord=3') AS snippet
       FROM verses v
       JOIN books b ON b.id = v.book_id
       JOIN translations t ON t.id = b.translation_id
       WHERE ${where}
       ORDER BY t.code, b.book_number, v.chapter, v.verse
       LIMIT $${params.length - 1} OFFSET $${params.length}`,
      params
    );

    res.json({
      query: q,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
      results: rows,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
