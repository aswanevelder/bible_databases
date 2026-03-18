const { Router } = require('express');
const db = require('../config/database');

const router = Router();

// GET /api/v1/cross-references/:book/:chapter/:verse
// :book can be a book name (URL-encoded)
router.get('/:book/:chapter/:verse', async (req, res, next) => {
  try {
    const bookName = decodeURIComponent(req.params.book);
    const chapter  = parseInt(req.params.chapter, 10);
    const verse    = parseInt(req.params.verse, 10);

    if (isNaN(chapter) || isNaN(verse)) {
      return res.status(400).json({ error: 'Invalid chapter or verse number' });
    }

    const { rows } = await db.query(
      `SELECT to_book, to_chapter, to_verse_start, to_verse_end, votes
       FROM cross_references
       WHERE LOWER(from_book) = LOWER($1)
         AND from_chapter = $2
         AND from_verse = $3
       ORDER BY votes DESC`,
      [bookName, chapter, verse]
    );

    res.json({
      book: bookName,
      chapter,
      verse,
      count: rows.length,
      cross_references: rows,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
