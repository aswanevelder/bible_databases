#!/usr/bin/env python3
"""Additive footnote generator for AOV.

Reads sources/af/AOV/AOV.footnotes.json and:
  1. Adds an `AOV_footnotes` table (+ rows) to formats/sqlite/AOV.db. This is ADDITIVE:
     it never touches AOV_books / AOV_verses, so AOV stays schema-compatible with every
     other translation in the repo.
  2. Writes formats/json/AOV.footnotes.json and formats/csv/AOV_footnotes.csv sidecars.

Must run AFTER the standard SQLite generator has (re)built formats/sqlite/AOV.db in the
same run, so AOV_books exists and is free of duplicate rows.
"""

import csv
import json
import os
import sqlite3

TOOLS_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_DIR = os.path.dirname(os.path.dirname(TOOLS_DIR))
FOOTNOTES_SRC = os.path.join(REPO_DIR, "sources", "af", "AOV", "AOV.footnotes.json")
SQLITE_DB = os.path.join(REPO_DIR, "formats", "sqlite", "AOV.db")
JSON_OUT = os.path.join(REPO_DIR, "formats", "json", "AOV.footnotes.json")
CSV_OUT = os.path.join(REPO_DIR, "formats", "csv", "AOV_footnotes.csv")

COLUMNS = ["book", "chapter", "verse", "verse_end", "type", "marker", "text"]


def _load():
    with open(FOOTNOTES_SRC, encoding="utf-8") as fh:
        return json.load(fh)["footnotes"]


def generate():
    footnotes = _load()

    # 1. additive sqlite table
    if not os.path.exists(SQLITE_DB):
        raise FileNotFoundError(
            f"{SQLITE_DB} not found — run the SQLite verse generator first.")
    conn = sqlite3.connect(SQLITE_DB)
    cur = conn.cursor()
    book_id = {name: bid for bid, name in cur.execute("SELECT id, name FROM AOV_books")}

    cur.execute("DROP TABLE IF EXISTS AOV_footnotes;")
    cur.execute("""
    CREATE TABLE AOV_footnotes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        book_id INTEGER,
        chapter INTEGER,
        verse INTEGER,
        verse_end INTEGER,
        type TEXT,
        marker TEXT,
        text TEXT,
        FOREIGN KEY (book_id) REFERENCES AOV_books(id)
    );
    """)
    for fn in footnotes:
        cur.execute(
            "INSERT INTO AOV_footnotes (book_id, chapter, verse, verse_end, type, marker, text)"
            " VALUES (?, ?, ?, ?, ?, ?, ?);",
            (book_id.get(fn["book"]), fn["chapter"], fn["verse"], fn["verse_end"],
             fn["type"], fn["marker"], fn["text"]))
    conn.commit()
    conn.close()

    # 2. json + csv sidecars
    os.makedirs(os.path.dirname(JSON_OUT), exist_ok=True)
    with open(JSON_OUT, "w", encoding="utf-8") as fh:
        json.dump({"translation": "AOV", "footnotes": footnotes},
                  fh, ensure_ascii=False, indent=4)

    os.makedirs(os.path.dirname(CSV_OUT), exist_ok=True)
    with open(CSV_OUT, "w", encoding="utf-8", newline="") as fh:
        writer = csv.DictWriter(fh, fieldnames=COLUMNS)
        writer.writeheader()
        for fn in footnotes:
            writer.writerow({k: fn.get(k) for k in COLUMNS})

    n_reader = sum(1 for f in footnotes if f["type"] == "reader")
    n_trans = sum(1 for f in footnotes if f["type"] == "translator")
    print(f"AOV_footnotes table + sidecars written: {n_reader} reader + {n_trans} translator")


if __name__ == "__main__":
    generate()
