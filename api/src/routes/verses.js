const { Router } = require('express');
const db = require('../config/database');

const router = Router({ mergeParams: true });

// Helper: resolve book_id from translation code + bookRef
async function resolveBook(code, bookRef) {
  const isNumeric = /^\d+$/.test(bookRef);
  const { rows } = await db.query(
    `SELECT b.id, b.name, b.book_number
     FROM books b
     JOIN translations t ON t.id = b.translation_id
     WHERE LOWER(t.code) = LOWER($1)
       AND (${isNumeric ? 'b.book_number = $2' : 'LOWER(b.name) = LOWER($2)'})`,
    [code, isNumeric ? parseInt(bookRef, 10) : decodeURIComponent(bookRef)]
  );
  return rows[0] || null;
}

// GET /api/v1/translations/:code/books/:bookRef/chapters/:chapter
router.get('/', async (req, res, next) => {
  try {
    const { code, bookRef, chapter } = req.params;
    const chapterNum = parseInt(chapter, 10);
    if (isNaN(chapterNum)) return res.status(400).json({ error: 'Invalid chapter number' });

    const book = await resolveBook(code, bookRef);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    const { rows } = await db.query(
      `SELECT verse, text FROM verses
       WHERE book_id = $1 AND chapter = $2
       ORDER BY verse`,
      [book.id, chapterNum]
    );

    if (!rows.length) return res.status(404).json({ error: 'Chapter not found' });

    res.json({
      translation: code.toUpperCase(),
      book: book.name,
      chapter: chapterNum,
      verse_count: rows.length,
      verses: rows,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/translations/:code/books/:bookRef/chapters/:chapter/verses/:verse
// Optional ?to=N returns a range from :verse to N (inclusive)
router.get('/:verse', async (req, res, next) => {
  try {
    const { code, bookRef, chapter, verse } = req.params;
    const chapterNum = parseInt(chapter, 10);
    const verseFrom = parseInt(verse, 10);
    const verseTo   = req.query.to ? parseInt(req.query.to, 10) : null;

    if (isNaN(chapterNum) || isNaN(verseFrom)) {
      return res.status(400).json({ error: 'Invalid chapter or verse number' });
    }
    if (verseTo !== null && (isNaN(verseTo) || verseTo < verseFrom)) {
      return res.status(400).json({ error: '"to" must be a number >= the starting verse' });
    }

    const book = await resolveBook(code, bookRef);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    const isRange = verseTo !== null;
    const { rows } = await db.query(
      isRange
        ? `SELECT verse, text FROM verses
           WHERE book_id = $1 AND chapter = $2 AND verse BETWEEN $3 AND $4
           ORDER BY verse`
        : `SELECT verse, text FROM verses
           WHERE book_id = $1 AND chapter = $2 AND verse = $3`,
      isRange
        ? [book.id, chapterNum, verseFrom, verseTo]
        : [book.id, chapterNum, verseFrom]
    );

    if (!rows.length) return res.status(404).json({ error: 'Verse not found' });

    if (isRange) {
      return res.json({
        translation: code.toUpperCase(),
        book: book.name,
        book_number: book.book_number,
        chapter: chapterNum,
        verses: rows,
      });
    }

    res.json({
      translation: code.toUpperCase(),
      book: book.name,
      book_number: book.book_number,
      chapter: chapterNum,
      verse: verseFrom,
      text: rows[0].text,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
