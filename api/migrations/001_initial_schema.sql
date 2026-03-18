-- Bible API: Normalized Schema
-- Run once against a fresh PostgreSQL database

CREATE TABLE IF NOT EXISTS translations (
    id   SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    title TEXT,
    license TEXT
);

CREATE TABLE IF NOT EXISTS books (
    id             SERIAL PRIMARY KEY,
    translation_id INTEGER NOT NULL REFERENCES translations(id) ON DELETE CASCADE,
    book_number    INTEGER NOT NULL,
    name           VARCHAR(255) NOT NULL,
    UNIQUE (translation_id, book_number)
);

CREATE INDEX IF NOT EXISTS idx_books_translation ON books(translation_id);

CREATE TABLE IF NOT EXISTS verses (
    id      SERIAL PRIMARY KEY,
    book_id INTEGER NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    chapter INTEGER NOT NULL,
    verse   INTEGER NOT NULL,
    text    TEXT NOT NULL,
    UNIQUE (book_id, chapter, verse)
);

CREATE INDEX IF NOT EXISTS idx_verses_book_chapter ON verses(book_id, chapter);

-- Generated full-text search column (PostgreSQL 12+)
ALTER TABLE verses
    ADD COLUMN IF NOT EXISTS search_vector tsvector
    GENERATED ALWAYS AS (to_tsvector('simple', text)) STORED;

CREATE INDEX IF NOT EXISTS idx_verses_fts ON verses USING GIN(search_vector);

CREATE TABLE IF NOT EXISTS cross_references (
    id             SERIAL PRIMARY KEY,
    from_book      VARCHAR(255) NOT NULL,
    from_chapter   INTEGER NOT NULL,
    from_verse     INTEGER NOT NULL,
    to_book        VARCHAR(255) NOT NULL,
    to_chapter     INTEGER NOT NULL,
    to_verse_start INTEGER NOT NULL,
    to_verse_end   INTEGER NOT NULL,
    votes          INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_xref_from ON cross_references(from_book, from_chapter, from_verse);
CREATE INDEX IF NOT EXISTS idx_xref_to   ON cross_references(to_book, to_chapter, to_verse_start);
