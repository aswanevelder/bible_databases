const { Router } = require('express');
const db = require('../config/database');

const router = Router();

// GET /api/v1/translations
router.get('/', async (req, res, next) => {
  try {
    const { rows } = await db.query(
      'SELECT code, title, license FROM translations ORDER BY code'
    );
    res.json({ count: rows.length, translations: rows });
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/translations/:code
router.get('/:code', async (req, res, next) => {
  try {
    const { rows } = await db.query(
      'SELECT code, title, license FROM translations WHERE LOWER(code) = LOWER($1)',
      [req.params.code]
    );
    if (!rows.length) return res.status(404).json({ error: 'Translation not found' });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
