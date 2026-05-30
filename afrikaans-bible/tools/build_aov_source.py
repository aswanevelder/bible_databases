#!/usr/bin/env python3
"""Bridge: build the repo source-JSON (and a footnotes sidecar) for the AOV translation
from the editorial markdown in afrikaans-bible/completed/.

The editorial markdown is the source of truth. This script extracts:
  - clean verse data  -> sources/af/AOV/AOV.json        (repo's standard source schema)
  - footnotes         -> sources/af/AOV/AOV.footnotes.json (AOV-specific sidecar)

Verse data feeds the repo's existing generators unchanged. Footnotes are carried into the
database additively (see footnotes_generator.py) without touching the shared verse schema.

Idempotent: rebuilds both outputs from scratch on every run. Pure standard library.
"""

import json
import os
import re
import sys

# --- paths -------------------------------------------------------------------
TOOLS_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(TOOLS_DIR)                       # afrikaans-bible/
REPO_DIR = os.path.dirname(PROJECT_DIR)                        # repo root
COMPLETED_DIR = os.path.join(PROJECT_DIR, "completed")
OUT_DIR = os.path.join(REPO_DIR, "sources", "af", "AOV")
OUT_JSON = os.path.join(OUT_DIR, "AOV.json")
OUT_FOOTNOTES = os.path.join(OUT_DIR, "AOV.footnotes.json")

# --- canonical book order (folder slug -> (English name, 1-based order)) ------
# English names match the repo convention used across all languages (e.g. "I John").
_CANON = [
    "genesis Genesis", "exodus Exodus", "leviticus Leviticus", "numbers Numbers",
    "deuteronomy Deuteronomy", "joshua Joshua", "judges Judges", "ruth Ruth",
    "1-samuel I Samuel", "2-samuel II Samuel", "1-kings I Kings", "2-kings II Kings",
    "1-chronicles I Chronicles", "2-chronicles II Chronicles", "ezra Ezra",
    "nehemiah Nehemiah", "esther Esther", "job Job", "psalms Psalms", "proverbs Proverbs",
    "ecclesiastes Ecclesiastes", "song-of-solomon Song of Solomon", "isaiah Isaiah",
    "jeremiah Jeremiah", "lamentations Lamentations", "ezekiel Ezekiel", "daniel Daniel",
    "hosea Hosea", "joel Joel", "amos Amos", "obadiah Obadiah", "jonah Jonah",
    "micah Micah", "nahum Nahum", "habakkuk Habakkuk", "zephaniah Zephaniah",
    "haggai Haggai", "zechariah Zechariah", "malachi Malachi",
    "matthew Matthew", "mark Mark", "luke Luke", "john John", "acts Acts",
    "romans Romans", "1-corinthians I Corinthians", "2-corinthians II Corinthians",
    "galatians Galatians", "ephesians Ephesians", "philippians Philippians",
    "colossians Colossians", "1-thessalonians I Thessalonians",
    "2-thessalonians II Thessalonians", "1-timothy I Timothy", "2-timothy II Timothy",
    "titus Titus", "philemon Philemon", "hebrews Hebrews", "james James",
    "1-peter I Peter", "2-peter II Peter", "1-john I John", "2-john II John",
    "3-john III John", "jude Jude", "revelation Revelation",
]
BOOKS = {}  # slug -> {"name": str, "order": int}
for _i, _entry in enumerate(_CANON, start=1):
    _slug, _name = _entry.split(" ", 1)
    BOOKS[_slug] = {"name": _name, "order": _i}

# --- markdown markers --------------------------------------------------------
VERSE_RE = re.compile(r"^\*\*(\d+)\*\*\s+(.+)$")
# apparatus section headers: verse extraction stops once one of these is reached
APPARATUS_HEADERS = ("translator's notes", "footnotes", "glossary", "self-review")
READER_FN_RE = re.compile(r"^[-*]?\s*(\d+):(\d+)(?:[-–](\d+))?\s*\|\s*(.+)$")
# a translator note begins with a bold lead, e.g. "**Verse 7 — ...**"
NOTE_LEAD_RE = re.compile(r"^\*\*(.+?)\*\*")
# pull verse refs out of a lead like "Verse 7", "Verses 11–14", "Verses 18, 20"
NOTE_VERSEREF_RE = re.compile(r"(?i)verses?\s+([\d,\s–-]+)")


def _is_apparatus_header(line):
    s = line.strip().lower()
    if not s.startswith("##"):
        return False
    title = s.lstrip("#").strip()
    return any(title.startswith(h) for h in APPARATUS_HEADERS)


def _split_sections(lines):
    """Return dict mapping lowercase apparatus-section name -> list of its lines."""
    sections, current = {}, None
    for line in lines:
        if line.strip().lower().startswith("##"):
            title = line.strip().lstrip("#").strip().lower()
            match = next((h for h in APPARATUS_HEADERS if title.startswith(h)), None)
            current = match  # None for ordinary translation section headings
            if current and current not in sections:
                sections[current] = []
            continue
        if current:
            sections[current].append(line)
    return sections


def parse_verses(lines, chapter, ref):
    """Extract (verse_number -> text) from the translation body, stopping at apparatus."""
    verses = {}
    for line in lines:
        if _is_apparatus_header(line):
            break
        m = VERSE_RE.match(line.rstrip("\n"))
        if m:
            num = int(m.group(1))
            if num in verses:
                sys.exit(f"ERROR [{ref}]: duplicate verse {num}")
            verses[num] = m.group(2).strip()
    if not verses:
        sys.exit(f"ERROR [{ref}]: no verses found")
    expected = list(range(1, max(verses) + 1))
    missing = [n for n in expected if n not in verses]
    if missing:
        sys.exit(f"ERROR [{ref}]: missing verse(s) {missing}")
    return verses


def _expand_verseref(numbers_str):
    """'11-14' -> [(11,14)]; '18, 20' -> [(18,None),(20,None)]; '7' -> [(7,None)]."""
    refs = []
    for part in numbers_str.split(","):
        part = part.strip()
        if not part:
            continue
        rng = re.match(r"^(\d+)[-–](\d+)$", part)
        if rng:
            refs.append((int(rng.group(1)), int(rng.group(2))))
        elif part.isdigit():
            refs.append((int(part), None))
    return refs


def _paragraphs(lines):
    """Group consecutive non-blank lines into paragraphs."""
    paras, buf = [], []
    for line in lines:
        if line.strip():
            buf.append(line.strip())
        elif buf:
            paras.append(" ".join(buf))
            buf = []
    if buf:
        paras.append(" ".join(buf))
    return paras


def parse_footnotes(sections, chapter, valid_verses, ref):
    """Build footnote records from the Footnotes (reader) and Translator's notes sections."""
    records = []
    errors = []

    # reader footnotes -- structured "C:V | text" lines
    reader_marker_counter = {}
    for line in sections.get("footnotes", []):
        m = READER_FN_RE.match(line.strip())
        if not m:
            continue
        fn_chapter, verse = int(m.group(1)), int(m.group(2))
        verse_end = int(m.group(3)) if m.group(3) else None
        text = m.group(4).strip()
        if fn_chapter != chapter:
            errors.append(f"{ref}: reader footnote chapter {fn_chapter} != {chapter}")
        if verse not in valid_verses:
            errors.append(f"{ref}: reader footnote points to missing verse {verse}")
        marker = chr(ord("a") + reader_marker_counter.get(verse, 0))
        reader_marker_counter[verse] = reader_marker_counter.get(verse, 0) + 1
        records.append({"chapter": chapter, "verse": verse, "verse_end": verse_end,
                        "type": "reader", "marker": marker, "text": text})

    # translator footnotes -- bold-led paragraphs from the prose notes
    for para in _paragraphs(sections.get("translator's notes", [])):
        lead_m = NOTE_LEAD_RE.match(para)
        if not lead_m:
            continue  # non-bold intro prose is not a note
        lead = lead_m.group(1)
        vref_m = NOTE_VERSEREF_RE.search(lead)
        targets = _expand_verseref(vref_m.group(1)) if vref_m else [(None, None)]
        for verse, verse_end in targets:
            if verse is not None and verse not in valid_verses:
                errors.append(f"{ref}: translator note references missing verse {verse}")
            records.append({"chapter": chapter, "verse": verse, "verse_end": verse_end,
                            "type": "translator", "marker": None, "text": para})
    return records, errors


def main():
    if not os.path.isdir(COMPLETED_DIR):
        sys.exit(f"ERROR: {COMPLETED_DIR} not found")

    books_acc = {}       # slug -> {chapter:int -> {verse:int -> text}}
    footnotes_acc = []   # flat list of footnote records (with book name added)
    all_errors = []

    for slug in sorted(os.listdir(COMPLETED_DIR)):
        book_dir = os.path.join(COMPLETED_DIR, slug)
        if not os.path.isdir(book_dir):
            continue
        if slug not in BOOKS:
            sys.exit(f"ERROR: unknown book folder '{slug}' (not in canon map)")
        for fname in sorted(os.listdir(book_dir)):
            fm = re.match(rf"^{re.escape(slug)}-(\d+)\.md$", fname)
            if not fm:
                continue
            chapter = int(fm.group(1))
            ref = f"{slug}-{chapter:02d}"
            with open(os.path.join(book_dir, fname), encoding="utf-8") as fh:
                lines = fh.readlines()

            verses = parse_verses(lines, chapter, ref)
            sections = _split_sections(lines)
            fns, errs = parse_footnotes(sections, chapter, set(verses), ref)
            all_errors.extend(errs)

            books_acc.setdefault(slug, {})[chapter] = verses
            for rec in fns:
                rec = {"book": BOOKS[slug]["name"], **rec}
                footnotes_acc.append(rec)

    if all_errors:
        sys.exit("ERROR: footnote validation failed:\n  " + "\n  ".join(all_errors))

    # assemble AOV.json in canon order
    books_json = []
    for slug in sorted(books_acc, key=lambda s: BOOKS[s]["order"]):
        name = BOOKS[slug]["name"]
        chapters_json = []
        for ch in sorted(books_acc[slug]):
            verses = books_acc[slug][ch]
            chapters_json.append({
                "chapter": ch,
                "name": f"{name} {ch}",
                "verses": [{"verse": v, "chapter": ch, "name": f"{name} {ch}:{v}",
                            "text": verses[v]} for v in sorted(verses)],
            })
        books_json.append({"name": name, "chapters": chapters_json})

    os.makedirs(OUT_DIR, exist_ok=True)
    with open(OUT_JSON, "w", encoding="utf-8") as fh:
        json.dump({"books": books_json}, fh, ensure_ascii=False, indent=4)

    footnotes_acc.sort(key=lambda r: (BOOKS[
        next(s for s in BOOKS if BOOKS[s]["name"] == r["book"])]["order"],
        r["chapter"], r["verse"] if r["verse"] is not None else 0,
        0 if r["type"] == "reader" else 1))
    with open(OUT_FOOTNOTES, "w", encoding="utf-8") as fh:
        json.dump({"translation": "AOV", "footnotes": footnotes_acc},
                  fh, ensure_ascii=False, indent=4)

    n_books = len(books_json)
    n_ch = sum(len(b["chapters"]) for b in books_json)
    n_v = sum(len(c["verses"]) for b in books_json for c in b["chapters"])
    n_reader = sum(1 for r in footnotes_acc if r["type"] == "reader")
    n_trans = sum(1 for r in footnotes_acc if r["type"] == "translator")
    print(f"Wrote {OUT_JSON}: {n_books} book(s), {n_ch} chapter(s), {n_v} verse(s)")
    print(f"Wrote {OUT_FOOTNOTES}: {n_reader} reader + {n_trans} translator footnote(s)")


if __name__ == "__main__":
    main()
