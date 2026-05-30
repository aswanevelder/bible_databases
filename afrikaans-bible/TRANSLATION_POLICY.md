# TRANSLATION_POLICY.md — Textual base and committed policy decisions

> Companion to `CLAUDE.md` and `GLOSSARY.md`. This file records the **foundational
> decisions** that affect many verses and must not be changed silently. Changing
> anything here requires a full re-pass of completed chapters and an entry in
> `REVIEW_LOG.md`.

---

## 1. Source texts (COMMITTED)

We translate **only** from original-language editions held in this repository. We do
not translate from, or consult for wording, any copyrighted Afrikaans or English Bible
(see `CLAUDE.md` anti-patterns).

| Testament | Edition | Path | License | Status |
|---|---|---|---|---|
| Old Testament | **WLC** — Westminster Leningrad Codex (vowel-pointed Masoretic Text) | `sources/hbo/WLC/WLC.json` | Public Domain | ✅ Committed |
| New Testament | **StatResGNT** — Statistical Restoration Greek New Testament (critical text) | `sources/grc/StatResGNT/StatResGNT.json` | CC BY 4.0 | ✅ Committed |

**Why these two.** WLC is the standard public-domain Masoretic text and matches the OT
base mandated in `CLAUDE.md`. For the NT, the project's first completed chapter
(`completed/john/john-01.md`) was already translated from a **critical text** (it follows
NA28 at John 1:18 — "die Enigste — self God" — rather than the Textus Receptus
"eniggebore Seun"). StatResGNT is the openly-licensed, in-repo continuation of that same
critical-text basis, so John 1 needs no re-pass.

**Legal note.** The underlying ancient Hebrew/Greek text is in the public domain. A fresh
Afrikaans translation produced by *reading* these editions is the team's own original,
copyrightable derivative work. We nonetheless deliberately chose public-domain (WLC) and
CC BY (StatResGNT) editions to keep the provenance of our source unambiguous.

### Where MT and other witnesses differ
Follow the MT (WLC) in the body; footnote significant Dead Sea Scrolls / LXX variants in
the Translator's notes. For the NT, follow StatResGNT in the body; note significant TR /
Byzantine variants where they affect meaning or match AFR-market reader expectations.

### Source extraction notes (for every chapter)
- Match the book by its **exact** `name` field (e.g. `"John"`, not `"1 John"`).
- Extract with `jq`, e.g.:
  `jq -r '.books[] | select(.name=="Genesis") | .chapters[] | select(.chapter==2) | .verses[] | "\(.verse)\t\(.text)"' sources/hbo/WLC/WLC.json`
- **StatResGNT** text contains editorial markers to strip before translating:
  - `¶` — paragraph marker
  - `˚` — nomina sacra marker (precedes sacred names, e.g. `˚Ἰησοῦ`)

---

## 2. Resolved decisions (COMMITTED)

These were the open 🔴/🟡 items blocking work. Each agrees with what `genesis-01.md` and
`john-01.md` already did, so **no completed chapter requires rework.**

| # | Decision | Ruling | Rationale |
|---|---|---|---|
| 1 | **NT textual base** | Critical text → **StatResGNT** | Continues john-01's critical-text choices (1:18, 1:34); open + in-repo; the direction modern Afrikaans translations (e.g. 2020 Direkte Vertaling) have taken. |
| 2 | **nephesh / nephesh chayyah** | **Context rules**: `lewende wese` for creatures (incl. Gen 2:7), `lewe` where it means life, `siel` reserved for clearly inner/emotional contexts | Matches `lewende wese(ns)` already used in Genesis 1; "siel" reads oddly for animals, which are also *nephesh*. Document the choice at each occurrence until the pattern is settled. |
| 3 | **psuchē** (NT) | Match nephesh: `siel` / `lewe` by context | Keep OT and NT anthropology consistent. |
| 4 | **monogenēs** | **`enigste` / `Enigste`** (cap for Christ) | john-01 already uses "die Enigste"; modern scholarship favours "unique/one-of-a-kind" over "only-begotten". Applies to John 1:14, 1:18, 3:16, 1 John 4:9, Heb 11:17. |
| 5 | **amēn amēn** | **`Voorwaar, voorwaar`** | john-01 already uses it (1:51); dignified and well understood by Afrikaans readers. |
| 6 | **chesed** | **`troue liefde`** | Captures covenant-loyalty + love; avoids the archaic "goedertierenheid". |
| 7 | **yeshu'ah / sōtēria** | **`verlossing`** (default) | Single committed default rendering across OT and NT. |
| 8 | **OT quoted in the NT** | **Render to match our own OT translation** | An internally coherent Bible: a reader who recognises an OT quotation should hear our OT wording. Operational rule in § 2a below. |

### 2a. OT-in-NT quotations — operational rule

When the NT quotes the OT, the body text **matches our own Afrikaans OT translation** of the
quoted passage, not an independent rendering of the Greek citation. This keeps the two Testaments
in one voice.

Two practical consequences must be handled at every NT quotation:

1. **If our OT translation of the quoted passage does not yet exist** (the usual case early in the
   project — e.g. John 2:17 cites Ps 69:9, and the Psalms are untranslated), render the quotation
   **provisionally from the Greek**, mark it in the chapter's Translator's notes, and add the
   verse to a back-harmonisation list so it is conformed once the OT passage is translated. Until
   then the chapter may be promoted, but the quotation row stays flagged.
2. **Where the Greek (usually following the LXX) differs materially from the MT / our OT** — in
   wording the NT author's argument depends on — keep our OT wording in the body but **footnote
   the divergence** ("die Griekse aanhaling volg die Septuagint, wat hier van die Hebreeus
   verskil…"). Do not silently erase a difference the NT writer is exploiting.

A running **back-harmonisation list** of NT quotations awaiting their OT source lives in
`REVIEW_LOG.md`.

---

## 3. Divine names (COMMITTED — restated from CLAUDE.md for visibility)

| Source | Rendering |
|---|---|
| YHWH (Tetragrammaton) | **HERE** (all-caps in markdown; small caps in print) |
| YHWH Elohim (compound, frequent in Genesis 2–3) | **HERE God** |
| Adonai / Kurios (of God or Jesus) | **Here** |
| Adonai YHWH | **Here HERE** |
| Elohim / El / Theos | **God** |

Genesis 2 is the **first translated chapter to use YHWH** (Genesis 1 has only Elohim), so
it establishes the `HERE` / `HERE God` rendering in practice.

---

## 4. Style register (COMMITTED — restated from CLAUDE.md)

- Formal equivalence, AFR53-register feel but independently worded.
- **Fidelity over smoothness (committed 2026-05-30).** When faithfulness to the source and
  natural Afrikaans pull against each other, favour the source — even at the cost of some
  awkwardness. In particular, **preserve a single source word's identity**: where the Hebrew/Greek
  deliberately repeats one word, render it with one Afrikaans word rather than varying for style.
  Note the awkwardness and the alternative in the translator's notes; add a reader footnote where
  it helps. *Precedent:* Genesis 3:15 keeps "vermorsel" for both clauses (the one verb *shuf*),
  rather than softening the heel to "byt" as many translations do.
- Modern Afrikaans orthography; archaic forms (*gy*, *u*) only in elevated/liturgical
  contexts with team agreement.
- Curly quotes for direct speech: "…" not "…". Em-dashes for parenthetical clauses.

---

## 5. Measurements and numbers (RECOMMENDED — pending team confirmation)

**Preserve source units and footnote** (e.g. *amah* → "el", *shekel* → "sikkel"), rather
than modernising to metric, for faithfulness. Provisional renderings live in `GLOSSARY.md`
§ "Numbers and measurements".

---

## 6. Still-open decisions — DO NOT silently resolve

These are not yet needed for the chapters in progress, but must be committed before the
relevant material is translated. Flag any chapter that hits them and route to `flagged/`.

| Decision | Status | Needed before |
|---|---|---|
| **bara vs asah** distinction | ✅ Resolved in `GLOSSARY.md` (bara→`skep`, asah→`maak`); preserve the distinction | — (already in force) |
| **El Shaddai / El Elyon / YHWH Tsevaot** compound divine titles | 🟡 Provisional in `GLOSSARY.md` | First chapter using them (Genesis 17 etc.) |
| **ish/ishshah wordplay** (Gen 2:23) — footnote the Hebrew pun or naturalise? | 🟡 | Resolved provisionally in genesis-02 draft notes; confirm at review |

---

## 7. Change control

- Any change to this file → log it in `REVIEW_LOG.md` and flag every affected completed
  chapter for re-review.
- New committed terminology → `GLOSSARY.md` (source of truth for word-level renderings);
  this file governs textual base, divine names, register, and cross-cutting policy.
