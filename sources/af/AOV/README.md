# Afrikaanse Oorspronklike Vertaling (AOV)

**License:** Proprietary (© project owners; original derivative work, freely usable in the project's own commercial API)

**Language:** Afrikaans (`af`)

**Source texts:** Translated directly from the original biblical languages — Hebrew Masoretic
Text (Westminster Leningrad Codex) for the Old Testament and the Greek critical text
(StatResGNT) for the New Testament. See `afrikaans-bible/TRANSLATION_POLICY.md`.

> **Status: in progress / partial.** This is an actively-growing translation, **not** a complete
> Bible. Only chapters that have passed review in `afrikaans-bible/completed/` are included. The
> data here is generated from those editorial markdown files by
> `afrikaans-bible/tools/build_aov_source.py` — do not edit `AOV.json` by hand.

## Generated files in this folder
- `AOV.json` — verse data in the repo's standard source schema (the input to all `formats/`).
- `AOV.footnotes.json` — reader and translator footnotes, keyed by book/chapter/verse
  (an AOV-specific sidecar; carried into the database as an additive `AOV_footnotes` table).

## Currently included
- Genesis 1–2
- John 1–2
