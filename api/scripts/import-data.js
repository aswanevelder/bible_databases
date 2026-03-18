/**
 * Import all Bible translations and cross-references into the normalized schema.
 *
 * Usage:
 *   node scripts/import-data.js [--translations-only] [--xref-only] [--translation KJV]
 *
 * Environment variables:
 *   BIBLE_JSON_DIR   Path to formats/json directory
 *                    (default: ../../formats/json relative to this script)
 *   BIBLE_XREF_DIR   Path to formats/psql/extras directory
 *                    (default: ../../formats/psql/extras)
 *
 * The script is idempotent — re-running it skips already-imported translations
 * and skips cross-references if the table is already populated.
 */
require('dotenv').config();

const fs   = require('fs');
const path = require('path');
const db   = require('../src/config/database');

const JSON_DIR = process.env.BIBLE_JSON_DIR
  || path.join(__dirname, '../../formats/json');

const XREF_DIR = process.env.BIBLE_XREF_DIR
  || path.join(__dirname, '../../formats/psql/extras');

const BATCH_SIZE = 500; // verses per INSERT batch

// --------------------------------------------------------------------------
// Argument parsing
// --------------------------------------------------------------------------
const args = process.argv.slice(2);
const onlyTranslations = args.includes('--translations-only');
const onlyXref         = args.includes('--xref-only');
const singleCode       = (() => {
  const idx = args.indexOf('--translation');
  return idx !== -1 ? args[idx + 1] : null;
})();

// --------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------
function extractCodeFromFilename(file) {
  return path.basename(file, '.json');
}

/**
 * Batch-insert verses using unnest for efficiency.
 * Each batch is a flat list of [book_id, chapter, verse, text] tuples.
 */
async function insertVersesBatch(client, rows) {
  if (!rows.length) return;

  const bookIds   = rows.map(r => r[0]);
  const chapters  = rows.map(r => r[1]);
  const verseNums = rows.map(r => r[2]);
  const texts     = rows.map(r => r[3]);

  await client.query(
    `INSERT INTO verses (book_id, chapter, verse, text)
     SELECT * FROM UNNEST($1::int[], $2::int[], $3::int[], $4::text[])
     ON CONFLICT (book_id, chapter, verse) DO NOTHING`,
    [bookIds, chapters, verseNums, texts]
  );
}

// --------------------------------------------------------------------------
// Import a single translation JSON file
// --------------------------------------------------------------------------
async function importTranslation(filePath) {
  const code = extractCodeFromFilename(filePath);
  const raw  = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // translation title is the first line of the "translation" string
  const title   = raw.translation || code;
  const license = raw.license || null;

  const client = await db.connect();
  try {
    await client.query('BEGIN');

    // Upsert translation record
    const tResult = await client.query(
      `INSERT INTO translations (code, title, license)
       VALUES ($1, $2, $3)
       ON CONFLICT (code) DO UPDATE
         SET title = EXCLUDED.title, license = EXCLUDED.license
       RETURNING id`,
      [code, title, license]
    );
    const translationId = tResult.rows[0].id;

    // Check if already imported (has books)
    const existing = await client.query(
      'SELECT COUNT(*) AS cnt FROM books WHERE translation_id = $1',
      [translationId]
    );
    if (parseInt(existing.rows[0].cnt, 10) > 0) {
      console.log(`  [skip] ${code} already imported`);
      await client.query('ROLLBACK');
      return;
    }

    const books = raw.books || [];
    let verseBatch = [];
    let totalVerses = 0;

    for (let bookIdx = 0; bookIdx < books.length; bookIdx++) {
      const bookData   = books[bookIdx];
      const bookNumber = bookIdx + 1;

      const bResult = await client.query(
        `INSERT INTO books (translation_id, book_number, name)
         VALUES ($1, $2, $3)
         RETURNING id`,
        [translationId, bookNumber, bookData.name]
      );
      const bookId = bResult.rows[0].id;

      for (const chapterData of (bookData.chapters || [])) {
        for (const verseData of (chapterData.verses || [])) {
          verseBatch.push([bookId, chapterData.chapter, verseData.verse, verseData.text]);
          if (verseBatch.length >= BATCH_SIZE) {
            await insertVersesBatch(client, verseBatch);
            totalVerses += verseBatch.length;
            verseBatch = [];
          }
        }
      }
    }

    if (verseBatch.length) {
      await insertVersesBatch(client, verseBatch);
      totalVerses += verseBatch.length;
    }

    await client.query('COMMIT');
    console.log(`  [ok]   ${code} — ${books.length} books, ${totalVerses} verses`);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(`  [err]  ${code}:`, err.message);
  } finally {
    client.release();
  }
}

// --------------------------------------------------------------------------
// Import cross-references from PSQL extras SQL files
// --------------------------------------------------------------------------
async function importCrossReferences() {
  const { rows } = await db.query('SELECT COUNT(*) AS cnt FROM cross_references');
  if (parseInt(rows[0].cnt, 10) > 0) {
    console.log('Cross-references already imported, skipping.');
    return;
  }

  const files = fs.readdirSync(XREF_DIR)
    .filter(f => f.startsWith('cross_references') && f.endsWith('.sql'))
    .sort()
    .map(f => path.join(XREF_DIR, f));

  if (!files.length) {
    console.warn('No cross-reference SQL files found in', XREF_DIR);
    return;
  }

  console.log(`Importing cross-references from ${files.length} files...`);

  for (const filePath of files) {
    const sql = fs.readFileSync(filePath, 'utf8');

    // Extract INSERT statements only (skip CREATE TABLE / CREATE INDEX lines
    // that are already handled by the migration)
    const insertLines = sql
      .split('\n')
      .filter(l => l.trim().toUpperCase().startsWith('INSERT INTO CROSS_REFERENCES'));

    const client = await db.connect();
    try {
      await client.query('BEGIN');

      const fromBooks   = [];
      const fromChaps   = [];
      const fromVerses  = [];
      const toBooks     = [];
      const toChaps     = [];
      const toVStarts   = [];
      const toVEnds     = [];
      const votesArr    = [];

      for (const line of insertLines) {
        // Parse: INSERT INTO cross_references (...) VALUES ('Genesis', 1, 1, 'Proverbs', 8, 22, 22, 59);
        const m = line.match(
          /VALUES\s*\(\s*'([^']+)',\s*(\d+),\s*(\d+),\s*'([^']+)',\s*(\d+),\s*(\d+),\s*(\d+),\s*(\d+)\s*\)/i
        );
        if (!m) continue;
        fromBooks.push(m[1]);
        fromChaps.push(parseInt(m[2], 10));
        fromVerses.push(parseInt(m[3], 10));
        toBooks.push(m[4]);
        toChaps.push(parseInt(m[5], 10));
        toVStarts.push(parseInt(m[6], 10));
        toVEnds.push(parseInt(m[7], 10));
        votesArr.push(parseInt(m[8], 10));
      }

      if (fromBooks.length) {
        await client.query(
          `INSERT INTO cross_references
             (from_book, from_chapter, from_verse, to_book, to_chapter, to_verse_start, to_verse_end, votes)
           SELECT * FROM UNNEST(
             $1::text[], $2::int[], $3::int[],
             $4::text[], $5::int[], $6::int[], $7::int[], $8::int[]
           )`,
          [fromBooks, fromChaps, fromVerses, toBooks, toChaps, toVStarts, toVEnds, votesArr]
        );
      }

      await client.query('COMMIT');
      console.log(`  [ok] ${path.basename(filePath)} — ${fromBooks.length} rows`);
    } catch (err) {
      await client.query('ROLLBACK');
      console.error(`  [err] ${path.basename(filePath)}:`, err.message);
    } finally {
      client.release();
    }
  }
}

// --------------------------------------------------------------------------
// Main
// --------------------------------------------------------------------------
async function main() {
  console.log('Bible API data import');
  console.log('=====================');

  if (!onlyXref) {
    let files = fs.readdirSync(JSON_DIR)
      .filter(f => f.endsWith('.json'))
      .sort()
      .map(f => path.join(JSON_DIR, f));

    if (singleCode) {
      files = files.filter(f => path.basename(f, '.json').toUpperCase() === singleCode.toUpperCase());
      if (!files.length) {
        console.error(`Translation "${singleCode}" not found in ${JSON_DIR}`);
        process.exit(1);
      }
    }

    console.log(`Importing ${files.length} translation(s) from ${JSON_DIR}`);
    for (const file of files) {
      await importTranslation(file);
    }
  }

  if (!onlyTranslations) {
    console.log('\nImporting cross-references...');
    await importCrossReferences();
  }

  console.log('\nImport complete.');
  await db.end();
}

main().catch((err) => {
  console.error('Import failed:', err);
  process.exit(1);
});
