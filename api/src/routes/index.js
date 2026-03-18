const { Router } = require('express');
const translations  = require('./translations');
const books         = require('./books');
const verses        = require('./verses');
const search        = require('./search');
const crossRefs     = require('./crossReferences');

const router = Router();

router.use('/translations', translations);
router.use('/translations/:code/books', books);
router.use('/translations/:code/books/:bookRef/chapters/:chapter/verses', verses);
router.use('/search', search);
router.use('/cross-references', crossRefs);

// Health check
router.get('/health', (req, res) => res.json({ status: 'ok' }));

module.exports = router;
