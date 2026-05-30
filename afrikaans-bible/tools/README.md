# AOV build tools

Bridge between the editorial markdown (`afrikaans-bible/completed/`) and this repo's data
pipeline (`sources/` → `formats/`). The markdown is the **source of truth**; these scripts derive
everything else. Do not hand-edit `sources/af/AOV/AOV.json` or anything under `formats/`.

## Two-step build

```bash
# 1. Extract verses + footnotes from completed/*.md into the repo source schema
python3 afrikaans-bible/tools/build_aov_source.py
#    -> sources/af/AOV/AOV.json            (verses, standard repo schema)
#    -> sources/af/AOV/AOV.footnotes.json  (reader + translator footnotes sidecar)

# 2. Fan out into every format (reuses the repo's own generators), AOV only
python3 afrikaans-bible/tools/generate_aov.py
#    -> formats/{sql,sqlite,csv,txt,json,yaml,md}/AOV.*   (verse formats, standard schema)
#    -> formats/sqlite/AOV.db :: additive AOV_footnotes table
#    -> formats/json/AOV.footnotes.json, formats/csv/AOV_footnotes.csv
```

## How it works

- **`build_aov_source.py`** walks `completed/<book>/<book>-NN.md`, maps the folder to the English
  canonical book name + order, extracts `**N** text` verse lines (stopping before the apparatus
  sections), and parses two footnote types:
  - **reader** — from a per-chapter `## Footnotes` block (`C:V | text`, or `C:V-V | text`).
  - **translator** — from the prose `## Translator's notes` (each `**…**`-led paragraph; verse
    reference parsed from the lead, chapter-level when none).
  It fails loudly on missing/duplicate verses or footnotes pointing at non-existent verses.
- **`generate_aov.py`** reuses the repo generators in `generators/` unchanged for the verse
  formats, then runs **`footnotes_generator.py`**, which adds an **additive** `AOV_footnotes`
  table to `formats/sqlite/AOV.db` (never touching `AOV_books`/`AOV_verses`) plus JSON/CSV sidecars.
  So AOV's verse data stays schema-identical to every other translation in the repo.

## When to run

After a chapter is promoted to `completed/`, run both steps, then commit the refreshed
`sources/af/AOV/` and `formats/*/AOV.*`. Optionally run `python3 scripts/assemble_readme.py` to
list AOV in the top-level repo index.

## Authoring footnotes (per chapter)

Add a `## Footnotes` section (anywhere after the verses) with reader-facing notes:

```markdown
## Footnotes

- 2:7 | Woordspel: die *mens* (*adam*) uit die *grond* (*adamah*).
- 2:19-21 | "tempel": hier *naos*, teenoor *hieron* in vers 14.
```

Translator notes need no special markup — the existing `## Translator's notes` prose is captured
automatically as `type=translator`.
