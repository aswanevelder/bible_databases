/**
 * Convert a VPL (Verse Per Line) text file to the JSON format used by import-data.js.
 *
 * VPL format:  ABBREV CHAPTER:VERSE text
 *   e.g.       GEN 1:1 In the beginning, God created the heavens and the earth.
 *
 * Usage:
 *   node scripts/convert-vpl.js <input.txt> <translation-code> [output-dir]
 *
 * Example:
 *   node scripts/convert-vpl.js \
 *     ../../bible-org/engwebpb_vpl/engwebpb_vpl.txt \
 *     WEBBE
 *
 * Output is written to ../../formats/json/<translation-code>.json
 */

const fs   = require('fs');
const path = require('path');
const readline = require('readline');

// --------------------------------------------------------------------------
// Book abbreviation → canonical name + order
// --------------------------------------------------------------------------
const BOOK_MAP = {
  GEN: { name: 'Genesis',           order: 1  },
  EXO: { name: 'Exodus',            order: 2  },
  LEV: { name: 'Leviticus',         order: 3  },
  NUM: { name: 'Numbers',           order: 4  },
  DEU: { name: 'Deuteronomy',       order: 5  },
  JOS: { name: 'Joshua',            order: 6  },
  JDG: { name: 'Judges',            order: 7  },
  RUT: { name: 'Ruth',              order: 8  },
  '1SA': { name: 'I Samuel',        order: 9  },
  '2SA': { name: 'II Samuel',       order: 10 },
  '1KI': { name: 'I Kings',         order: 11 },
  '2KI': { name: 'II Kings',        order: 12 },
  '1CH': { name: 'I Chronicles',    order: 13 },
  '2CH': { name: 'II Chronicles',   order: 14 },
  EZR: { name: 'Ezra',             order: 15 },
  NEH: { name: 'Nehemiah',          order: 16 },
  EST: { name: 'Esther',            order: 17 },
  JOB: { name: 'Job',               order: 18 },
  PSA: { name: 'Psalms',            order: 19 },
  PRO: { name: 'Proverbs',          order: 20 },
  ECC: { name: 'Ecclesiastes',      order: 21 },
  SOL: { name: 'Song of Solomon',   order: 22 },
  ISA: { name: 'Isaiah',            order: 23 },
  JER: { name: 'Jeremiah',          order: 24 },
  LAM: { name: 'Lamentations',      order: 25 },
  EZE: { name: 'Ezekiel',           order: 26 },
  DAN: { name: 'Daniel',            order: 27 },
  HOS: { name: 'Hosea',             order: 28 },
  JOE: { name: 'Joel',              order: 29 },
  AMO: { name: 'Amos',              order: 30 },
  OBA: { name: 'Obadiah',           order: 31 },
  JON: { name: 'Jonah',             order: 32 },
  MIC: { name: 'Micah',             order: 33 },
  NAH: { name: 'Nahum',             order: 34 },
  HAB: { name: 'Habakkuk',          order: 35 },
  ZEP: { name: 'Zephaniah',         order: 36 },
  HAG: { name: 'Haggai',            order: 37 },
  ZEC: { name: 'Zechariah',         order: 38 },
  MAL: { name: 'Malachi',           order: 39 },
  MAT: { name: 'Matthew',           order: 40 },
  MAR: { name: 'Mark',              order: 41 },
  LUK: { name: 'Luke',              order: 42 },
  JOH: { name: 'John',              order: 43 },
  ACT: { name: 'Acts',              order: 44 },
  ROM: { name: 'Romans',            order: 45 },
  '1CO': { name: 'I Corinthians',   order: 46 },
  '2CO': { name: 'II Corinthians',  order: 47 },
  GAL: { name: 'Galatians',         order: 48 },
  EPH: { name: 'Ephesians',         order: 49 },
  PHI: { name: 'Philippians',       order: 50 },
  COL: { name: 'Colossians',        order: 51 },
  '1TH': { name: 'I Thessalonians', order: 52 },
  '2TH': { name: 'II Thessalonians',order: 53 },
  '1TI': { name: 'I Timothy',       order: 54 },
  '2TI': { name: 'II Timothy',      order: 55 },
  TIT: { name: 'Titus',             order: 56 },
  PHM: { name: 'Philemon',          order: 57 },
  HEB: { name: 'Hebrews',           order: 58 },
  JAM: { name: 'James',             order: 59 },
  '1PE': { name: 'I Peter',         order: 60 },
  '2PE': { name: 'II Peter',        order: 61 },
  '1JO': { name: 'I John',          order: 62 },
  '2JO': { name: 'II John',         order: 63 },
  '3JO': { name: 'III John',        order: 64 },
  JUD: { name: 'Jude',              order: 65 },
  REV: { name: 'Revelation',        order: 66 },
};

// --------------------------------------------------------------------------
// Main
// --------------------------------------------------------------------------
async function convert(inputPath, code, outputDir) {
  // Map: abbrev → { name, order, chapters: { chNum → { verseNum → text } } }
  const books = {};
  let lineCount = 0;
  let skipped = 0;

  const rl = readline.createInterface({
    input: fs.createReadStream(inputPath, { encoding: 'utf8' }),
    crlfDelay: Infinity,
  });

  for await (const raw of rl) {
    const line = raw.trim();
    if (!line) continue;

    // Format: ABBREV CHAPTER:VERSE text...
    const spaceIdx = line.indexOf(' ');
    if (spaceIdx === -1) { skipped++; continue; }

    const abbrev  = line.slice(0, spaceIdx).toUpperCase();
    const rest    = line.slice(spaceIdx + 1);
    const colonIdx = rest.indexOf(':');
    const spaceIdx2 = rest.indexOf(' ');

    if (colonIdx === -1 || spaceIdx2 === -1) { skipped++; continue; }

    const ref     = rest.slice(0, spaceIdx2);   // e.g. "1:1"
    const text    = rest.slice(spaceIdx2 + 1).trim();
    const [chapStr, verseStr] = ref.split(':');
    const chapter = parseInt(chapStr, 10);
    const verse   = parseInt(verseStr, 10);

    if (isNaN(chapter) || isNaN(verse)) { skipped++; continue; }

    const bookInfo = BOOK_MAP[abbrev];
    if (!bookInfo) {
      if (!books[abbrev]) {
        console.warn(`  [warn] Unknown abbreviation: ${abbrev} — skipping`);
      }
      skipped++;
      continue;
    }

    if (!books[abbrev]) {
      books[abbrev] = { name: bookInfo.name, order: bookInfo.order, chapters: {} };
    }
    if (!books[abbrev].chapters[chapter]) {
      books[abbrev].chapters[chapter] = {};
    }
    books[abbrev].chapters[chapter][verse] = text;
    lineCount++;
  }

  // Build output structure sorted by canonical book order
  const sortedBooks = Object.values(books).sort((a, b) => a.order - b.order);

  const output = {
    translation: `${code}: World English Bible British Edition`,
    license: 'Public Domain',
    books: sortedBooks.map(b => ({
      name: b.name,
      chapters: Object.keys(b.chapters)
        .map(Number)
        .sort((a, c) => a - c)
        .map(chNum => ({
          chapter: chNum,
          verses: Object.keys(b.chapters[chNum])
            .map(Number)
            .sort((a, c) => a - c)
            .map(vNum => ({ verse: vNum, text: b.chapters[chNum][vNum] })),
        })),
    })),
  };

  const outFile = path.join(outputDir, `${code}.json`);
  fs.writeFileSync(outFile, JSON.stringify(output, null, 2), 'utf8');

  console.log(`Converted ${lineCount} verses across ${sortedBooks.length} books`);
  if (skipped) console.log(`Skipped ${skipped} unrecognised lines`);
  console.log(`Output: ${outFile}`);
}

// --------------------------------------------------------------------------
// CLI
// --------------------------------------------------------------------------
const [,, inputArg, codeArg, outputDirArg] = process.argv;

if (!inputArg || !codeArg) {
  console.error('Usage: node convert-vpl.js <input.txt> <translation-code> [output-dir]');
  process.exit(1);
}

const inputPath  = path.resolve(inputArg);
const outputDir  = path.resolve(outputDirArg || path.join(__dirname, '../../formats/json'));

if (!fs.existsSync(inputPath)) {
  console.error(`Input file not found: ${inputPath}`);
  process.exit(1);
}
if (!fs.existsSync(outputDir)) {
  console.error(`Output directory not found: ${outputDir}`);
  process.exit(1);
}

convert(inputPath, codeArg, outputDir).catch(err => {
  console.error('Conversion failed:', err);
  process.exit(1);
});
