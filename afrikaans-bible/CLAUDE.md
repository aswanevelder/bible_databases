# Afrikaans Bible Translation Project — CLAUDE.md

> This file is automatically loaded by Claude Code at the start of every session
> in this repo. It contains the methodology, policy decisions, and workflow for
> producing a commercially-licensable Afrikaans Bible translation from the
> original biblical languages.

---

## Project context

**Goal.** Produce a complete Afrikaans Bible translation that can be used in a commercial API without licensing fees to the Bybelgenootskap van Suid-Afrika or any other rights holder. The output must be the project owners' original derivative work.

**Why this project exists.** All existing Afrikaans Bible translations (1933/53, 1983, 2020 Direkte Vertaling, Nuwe Lewende Vertaling, Die Boodskap, Bybel vir Almal) are copyrighted and not licensed for free commercial use. The Bible Society of South Africa actively enforces these copyrights, including on the 1933/1953 text. There is no usable open-licensed Afrikaans Bible.

**Approach.** Translate directly from the Hebrew Masoretic Text (OT) and Greek critical text (NT) into Afrikaans, with Claude as a translation assistant and human theologians/Afrikaans speakers as reviewers. Every verse must be reviewed by a qualified human before commercial release.

**Critical legal note.** This project produces a derivative work from public-domain source texts. The team owns the copyright on the resulting Afrikaans text. Do NOT translate from a copyrighted Afrikaans translation — translate from the source languages, period. Even consulting AFR53 for style risks contamination; consult sparingly and never copy phrasing.

---

## What has been done so far

- **Genesis 1** — first translation completed, with extensive translator's notes documenting decisions and ambiguities. See `completed/genesis/genesis-01.md`.
- **John 1** — second translation completed, with notes on Greek-specific issues (textual variants, *logos*, *monogenēs*, etc.). See `completed/john/john-01.md`.

Both files demonstrate the expected output format: numbered verses, section headings where appropriate, and a "Translator's notes" section documenting every non-trivial decision.

---

## Repository structure (recommended)

```
afrikaans-bible/
├── CLAUDE.md                  ← this file
├── GLOSSARY.md                ← terminology decisions (grows as you work)
├── TRANSLATION_POLICY.md      ← textual base, divine name, etc.
├── REVIEW_LOG.md              ← who reviewed what, when
├── completed/
│   ├── genesis/
│   │   ├── genesis-01.md
│   │   └── genesis-02.md
│   ├── john/
│   │   └── john-01.md
│   └── ...
├── drafts/                    ← awaiting review
├── flagged/                   ← needs theologian attention
└── sources/
    ├── hebrew-masoretic/      ← public domain BHS-style text
    └── greek-critical/        ← NA28/UBS5 or SBLGNT (open)
```

---

## Translation policy (decisions already made)

These decisions are binding. Changing them mid-project requires a full re-pass of completed chapters.

### Source texts

- **Old Testament**: Hebrew Masoretic Text (Leningrad Codex / BHS tradition). Where the Dead Sea Scrolls or LXX differ significantly, footnote the variant but follow the MT in the body.
- **New Testament**: **DECISION REQUIRED.** See `TRANSLATION_POLICY.md`. The choice between NA28/UBS5 (critical text) and Textus Receptus is foundational and affects hundreds of verses. Do not begin large-scale NT work until this is committed.

### Style register

- **Formal equivalence**, leaning toward the AFR53 register (which is the cultural touchstone) but in original wording. Not as wooden as ASV, not as loose as Die Boodskap.
- Use modern Afrikaans orthography. Archaic forms (e.g. *gy*, *u* as second person) only in liturgical/elevated contexts and only if the team agrees.
- Direct speech uses curly quotes: "..." not "..."
- Em-dashes for parenthetical clauses where Greek/Hebrew syntax allows.

### Divine names

- **YHWH** (Tetragrammaton) → **HERE** (small caps in print, all-caps in markdown: `HERE`). This matches AFR53 reader expectations.
- **Adonai** / **Kurios** (when referring to God) → **Here**
- **Adonai YHWH** → **Here HERE**
- **Elohim** / **El** / **Theos** → **God**
- **Kurios** (when referring to Jesus or as title) → **Here**

### Recurring terms with committed renderings

See `GLOSSARY.md` for the full and growing list. Key non-negotiables:

- *logos* → **Woord**
- *charis* / *chen* → **genade**
- *agape* / *ahavah* → **liefde** (chesed gets **troue liefde** or **goedertierenheid**)
- *pistis* / *emunah* → **geloof**
- *dikaiosunē* / *tsedaqah* → **geregtigheid**
- *hamartia* / *chatta't* → **sonde**
- *diathēkē* / *berit* → **verbond**
- *basileia* / *malkut* → **koninkryk**
- *pneuma* / *ruach* → **Gees** (capitalized when referring to God's Spirit)
- *sōtēria* / *yeshu'ah* → **verlossing** (default) or **redding** (context-dependent — pick per book, document choice)

### Decisions still open — DO NOT BEGIN BULK TRANSLATION UNTIL THESE ARE COMMITTED

See `TRANSLATION_POLICY.md` for the full list. Highlights:

1. **NT textual base** — NA28 or TR
2. ***monogenēs*** — *eniggebore* (traditional) or *enigste* (modern)
3. ***amēn amēn*** — *voorwaar, voorwaar* or *Ek verseker julle*
4. **OT: *nephesh chayyah*** — *lewende wese* or *lewende siel*
5. **OT: *bara* vs *asah*** — preserve the distinction or collapse it?
6. **Quotation of OT in NT** — match the OT translation we produce, or follow the Greek (which often follows LXX, not MT)?

---

## Per-chapter workflow

Use this workflow for every chapter. Do not skip steps.

### Step 1: Prepare the source

Place the Hebrew or Greek source text in `sources/`. Verify against at least one other public-domain source (e.g. eBible.org's Hebrew, SBLGNT). Note any textual issues before starting.

### Step 2: Initial translation

Prompt Claude with the source text, this `CLAUDE.md`, the `GLOSSARY.md`, and the relevant `TRANSLATION_POLICY.md` sections. Request:

1. Verse-by-verse Afrikaans translation
2. Translator's notes documenting every non-trivial decision
3. Any glossary additions or conflicts
4. Flags for human review (textual variants, theological ambiguity, syntactic difficulty)

**Prompt template** (copy this for each chapter):

```
I'm working on the Afrikaans Bible translation project. Read CLAUDE.md,
GLOSSARY.md, and TRANSLATION_POLICY.md before starting.

Translate [BOOK] [CHAPTER] from the [Hebrew/Greek] source at
sources/[path]. Follow all committed policies and the glossary.

Produce a markdown file at drafts/[book]/[book-chapter].md with:
1. The translation, numbered by verse
2. Section headings where appropriate (e.g. major narrative breaks)
3. A "Translator's notes" section at the bottom documenting:
   - Every textual variant choice
   - Every place where the Greek/Hebrew is ambiguous
   - Every term where the glossary did not yet have a ruling
   - Any place where you departed from policy and why
   - Drift you noticed within the chapter
4. A "Glossary additions" section listing any new terms that need to be
   added to GLOSSARY.md with proposed rendering

Match the format and rigor of completed/genesis/genesis-01.md and
completed/john/john-01.md.
```

### Step 3: Self-review pass

Before human review, run Claude through a self-review pass:

```
Review drafts/[book]/[book-chapter].md against CLAUDE.md and GLOSSARY.md.
Check specifically for:
1. Terminology drift (same source word rendered differently within chapter)
2. Glossary violations (committed renderings not followed)
3. Sentence-level consistency (parallel structures in source rendered
   inconsistently in target)
4. Awkward Afrikaans (would a native speaker find this stilted?)
5. Untranslated theological loading (e.g. eskēnōsen losing the tabernacle
   allusion)

Output a review report. Do not modify the translation file directly.
```

### Step 4: Human review

A qualified human reviewer (Afrikaans-fluent with biblical language competence) reviews the draft. Use `REVIEW_LOG.md` to track who reviewed what.

Reviewers should focus on:
- Theological accuracy
- Naturalness of Afrikaans
- Faithfulness to source
- Consistency with previously-translated chapters

### Step 5: Glossary update

Any new terms or refined renderings go into `GLOSSARY.md` immediately. If a decision overturns prior work, flag affected chapters in `REVIEW_LOG.md` for re-review.

### Step 6: Promotion

Move from `drafts/` to `completed/` only after sign-off from at least one reviewer and glossary update.

### Step 7: Build the database formats

After promotion, regenerate the AOV data formats so the new chapter reaches the database/API:

```bash
python3 afrikaans-bible/tools/build_aov_source.py   # completed/*.md -> sources/af/AOV/AOV.json (+ footnotes)
python3 afrikaans-bible/tools/generate_aov.py       # -> formats/*/AOV.*  (incl. additive AOV_footnotes table)
```

Then commit the refreshed `sources/af/AOV/` and `formats/*/AOV.*`. The editorial markdown stays the
source of truth; everything under `sources/af/AOV/` and `formats/` is generated — never hand-edit it.
See `afrikaans-bible/tools/README.md`.

---

## Quality control: catching drift

Drift is the #1 enemy of this project. Claude's output drifts within a chapter, across chapters, and across books. Build defenses:

### Within-chapter drift

Already caught by the self-review pass in Step 3. Example from John 1: *nephesh chayyah* / lewende wese drift between verses.

### Cross-chapter drift

Periodically (every 5 chapters of a book), run:

```
Read completed/[book]/*.md. For each glossary term, list every place it
appears with its rendering. Flag any inconsistencies.
```

### Cross-book drift

When starting a new book, run:

```
Read GLOSSARY.md and 3 random chapters from completed/. Confirm you can
restate the committed policies. List any open questions before I give
you the new chapter.
```

### Theological-term audit

Quarterly (or every 200 chapters), have a theologian review the glossary against the actual translation to catch drift that the consistency checks missed.

---

## Anti-patterns — do not do these

1. **Do not translate from English.** Even from a public-domain English Bible. Translate from Hebrew/Greek. English intermediates introduce English idioms and theology.
2. **Do not consult AFR53/AFR83/AFR20 for phrasing.** Consult only for cross-checking meaning, never for wording. Your output must be independently arrived at to be legally clean.
3. **Do not let Claude self-translate without notes.** If a chapter comes back without a translator's notes section, reject it and re-prompt.
4. **Do not skip the human review step.** Claude is a competent draft generator, not a final translator. Verses will go to print under your project's name; they need human eyes.
5. **Do not change policy decisions silently.** If a glossary entry changes, document it in `REVIEW_LOG.md` and flag affected chapters for re-review.
6. **Do not translate large batches in one session.** One chapter per session keeps quality high. Long sessions = more drift.
7. **Do not skip difficult passages.** Job 38–41, Ezekiel's visions, Revelation 4, the Pauline genitive-stacked sentences — these need MORE care, not avoidance.

---

## Budget and timeline reality check

- The Bible is ~31,000 verses, ~1,189 chapters.
- At one chapter per Claude Code session (translation + self-review), that's ~1,189 sessions.
- Human review at 30 minutes per chapter is ~600 hours of expert time.
- Realistic timeline: 12–24 months with a committed small team.
- Realistic cost: significant, mostly in human review time. Far less than licensing a commercial translation, but not free.

---

## When in doubt

- **Source-language question** → flag it, follow the more attested reading, document in notes
- **Theological loading** → flag for theologian review, give your best rendering with alternatives in notes
- **Afrikaans naturalness** → flag for native-speaker review, give your best rendering
- **Glossary conflict** → DO NOT silently resolve. Flag, document, escalate to the team for a policy decision.
- **Textual variant** → follow committed textual base; document the variant in notes

---

## Companion files

- `GLOSSARY.md` — committed terminology
- `PROPER_NAMES.md` — committed proper-name renderings (people & places); the names registry
- `TRANSLATION_POLICY.md` — open decisions and committed policy details
- `REVIEW_LOG.md` — who reviewed what, when, and findings
- `completed/genesis/genesis-01.md` — reference example (OT narrative)
- `completed/john/john-01.md` — reference example (NT theological prose)
