const { Router } = require('express');
const db = require('../config/database');

const router = Router({ mergeParams: true });

// GET /api/v1/translations/:code/books
router.get('/', async (req, res, next) => {
  try {
    const code = req.params.code;
    const { rows } = await db.query(
      `SELECT b.id, b.book_number, b.name
       FROM books b
       JOIN translations t ON t.id = b.translation_id
       WHERE LOWER(t.code) = LOWER($1)
       ORDER BY b.book_number`,
      [code]
    );
    if (!rows.length) {
      const t = await db.query('SELECT 1 FROM translations WHERE LOWER(code) = LOWER($1)', [code]);
      if (!t.rows.length) return res.status(404).json({ error: 'Translation not found' });
    }
    res.json({ translation: code, count: rows.length, books: rows });
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/translations/:code/books/:bookRef
// bookRef can be a book_number (integer) or URL-encoded book name
router.get('/:bookRef', async (req, res, next) => {
  try {
    const code = req.params.code;
    const ref = req.params.bookRef;
    const isNumeric = /^\d+$/.test(ref);

    const { rows } = await db.query(
      `SELECT b.id, b.book_number, b.name
       FROM books b
       JOIN translations t ON t.id = b.translation_id
       WHERE LOWER(t.code) = LOWER($1)
         AND (${isNumeric ? 'b.book_number = $2' : 'LOWER(b.name) = LOWER($2)'})`,
      [code, isNumeric ? parseInt(ref, 10) : decodeURIComponent(ref)]
    );

    if (!rows.length) return res.status(404).json({ error: 'Book not found' });
    const book = rows[0];

    // Include chapter summary
    const chapters = await db.query(
      `SELECT chapter, COUNT(*) AS verse_count
       FROM verses WHERE book_id = $1
       GROUP BY chapter ORDER BY chapter`,
      [book.id]
    );

    res.json({ ...book, chapters: chapters.rows });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
