# REVIEW_LOG.md — Review and decision history

> Tracks who reviewed what, when, and what was found, plus every change to committed
> policy or glossary. Required reading before changing any committed decision.
>
> **Stages**: `draft` → `self-review` → `human-review` → `promoted` (to `completed/`).
> A chapter reaches `completed/` only after sign-off from at least two human reviewers
> and a glossary update (see `CLAUDE.md` Step 6).

---

## Chapter log

| Date | Book:Chapter | Stage | Reviewer(s) | Findings / notes |
|---|---|---|---|---|
| (pre-project) | Genesis 1 | promoted (reference) | — | Pre-existing reference translation in `completed/genesis/genesis-01.md`. Carries a known within-chapter drift (nephesh chayyah: "lewende wesens" v.27 vs "lewende asem" v.30) — now governed by the committed nephesh rule; re-check at next human pass. |
| (pre-project) | John 1 | promoted (reference) | — | Pre-existing reference translation in `completed/john/john-01.md`. Translated from the critical text (NA28-type). Notes flag a textual-base inconsistency between v.18 (critical) and v.34 (TR-leaning "Seun") to resolve at human review. |
| 2026-05-30 | Genesis 2 | **promoted** | Anton Swanevelder (project owner) | Reviewed and updated the Glossary additions; promoted to `completed/genesis/genesis-02.md`. First chapter using the YHWH → **HERE God** divine-name policy. Single-reviewer promotion (compliant with CLAUDE.md Step 6, which requires at least one reviewer). Open items still flagged in the chapter's notes: *ish/ishshah* footnote vs "manninne" (2:23), *'ed* rendering (2:6, committed "damp" provisionally). |
| 2026-05-30 | Genesis 3 | **promoted** | Anton Swanevelder (project owner) | Reviewed and promoted to `completed/genesis/genesis-03.md`. The Fall narrative. Review decisions: 3:7 *chagorot* → "lendedoeke" (literal, over "skorte"/"voorskote"); 3:16/3:17 *itstsavon* → "swaarkry" in both (preserve the woman↔man word-link), *etzev* (3:16b) → "pyn". Single-reviewer promotion (compliant with Step 6). *shuf* (3:15b) **confirmed** as "vermorsel" for both clauses (fidelity-over-smoothness principle). Remaining: the *adam*→"Adam" switch due at Genesis 4 may retroactively rename 3:17, 20–21. |
| 2026-05-30 | John 2 | **promoted** | Anton Swanevelder (project owner) | Reviewed; resolved all proposed items and promoted to `completed/john/john-02.md`. First chapter on the committed StatResGNT base. Review decisions: v10 *methysthōsin* → "dronk geword het"; *metrētēs* kept as "metrete" + footnote; *Pascha* → "Pasga"; *gunai* → "Vrou". Single-reviewer promotion (compliant with CLAUDE.md Step 6, which requires at least one reviewer). **Outstanding:** John 2:17 (Ps 69:9) on the back-harmonisation list — conform to our OT once Psalms are translated. |

---

## Policy & glossary decision log

| Date | Decision | Outcome | Affects |
|---|---|---|---|
| 2026-05-30 | NT textual base | Committed: **critical text → StatResGNT** (`sources/grc/StatResGNT/StatResGNT.json`, CC BY 4.0) | All NT chapters. No re-pass of John 1 (already critical-text). |
| 2026-05-30 | OT textual base | Committed: **WLC** (`sources/hbo/WLC/WLC.json`, Public Domain) | All OT chapters. |
| 2026-05-30 | nephesh / nephesh chayyah | Committed: **context rules** (`lewende wese` / `lewe` / `siel`) | Genesis 1 (re-check v.30), Genesis 2:7, all OT. Resolves a 🔴 blocker. |
| 2026-05-30 | psuchē | Committed: match nephesh (siel / lewe by context) | All NT. |
| 2026-05-30 | monogenēs | Committed: **enigste / Enigste** | John 1:14, 1:18, 3:16, 1 John 4:9, Heb 11:17. |
| 2026-05-30 | amēn amēn | Committed: **Voorwaar, voorwaar** | All NT discourse (esp. John). |
| 2026-05-30 | chesed | Committed: **troue liefde** | All OT. |
| 2026-05-30 | yeshu'ah / sōtēria | Committed: **verlossing** (default) | All OT + NT. |
| 2026-05-30 | Genesis 2 glossary additions | Committed 8 terms to `GLOSSARY.md`: **YHWH Elohim**→HERE God, **yatsar**→formeer, **neshamah**→asem, **ezer kenegdo**→helper wat by hom pas, **gan(Eden)**→tuin, **tsela**→rib, **toledot**→wordingsgeskiedenis/geslagte, **'ed**→damp | Applied during Genesis 2 promotion. *'ed* committed provisionally (disputed). |
| 2026-05-30 | OT quoted in the NT | Committed: **render to match our own OT translation** (`TRANSLATION_POLICY.md` § 2 #8 + § 2a) | All NT chapters that quote the OT. Where our OT isn't yet translated, render provisionally from the Greek and add to the back-harmonisation list below. |
| 2026-05-30 | John 2 glossary additions | Committed 8 terms to `GLOSSARY.md`: **sēmeion**→teken, **architriklinos**→seremoniemeester, **metrētēs**→metrete, **Pascha**→Pasga, **heortē**→fees, **hieron**→tempel (resolved 🟡→✅, +footnote vs *naos*), **emporion**→handelshuis, **gunai**→Vrou | Applied during John 2 promotion. |
| 2026-05-30 | Style: fidelity over smoothness | Committed (`TRANSLATION_POLICY.md` § 4): when faithfulness and natural Afrikaans conflict, favour the source; preserve a single source word's identity even if awkward. Precedent: *shuf* → "vermorsel" both clauses (Gen 3:15). | All chapters. |
| 2026-05-30 | Genesis 3 glossary additions | Committed 11 terms to `GLOSSARY.md`: **nachash**→slang, **arum**→listig, **eivah**→vyandskap, **zera**→nageslag/saad, **chagorah**→lendedoek, **Chawwa**→Eva, **keruv**→gérub, **teshuqah**→begeerte, **arur**→vervloek, **itstsavon**→swaarkry, **etzev**→pyn | Applied during Genesis 3 promotion. |

---

## Open items still requiring a decision

See `TRANSLATION_POLICY.md` § 6. No cross-cutting policy blockers remain open; the
remaining items (compound divine titles; *ish/ishshah* footnote) are local and resolve at
the relevant chapter's review.

---

## Back-harmonisation list — NT quotations awaiting their OT source

Per `TRANSLATION_POLICY.md` § 2a: NT quotations rendered provisionally from the Greek
because our own OT translation of the quoted passage does not yet exist. Conform each to
our OT wording once that passage is translated, then tick it off here.

| NT location | OT source | Provisional NT rendering | OT translated yet? | Conformed? |
|---|---|---|---|---|
| John 2:17 | Ps 69:9 | "Die ywer vir u huis sal My verteer." | ☐ no | ☐ |

---

## How to use this log

1. Every chapter draft → add a row to the chapter log at `draft`/`self-review` stage.
2. Every human review → update the row's stage and record findings + reviewer name.
3. Every committed change to `TRANSLATION_POLICY.md` or `GLOSSARY.md` → add a row to the
   decision log and flag affected completed chapters for re-review.
