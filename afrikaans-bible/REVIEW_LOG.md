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
| (pre-project) | Genesis 1 | superseded | — | Original imported reference translation. **Superseded 2026-05-31** by our own fresh translation from the WLC (the drift it carried is fixed in the new version). |
| (pre-project) | John 1 | promoted (reference) | — | Pre-existing reference translation in `completed/john/john-01.md`. Translated from the critical text (NA28-type). Notes flag a textual-base inconsistency between v.18 (critical) and v.34 (TR-leaning "Seun") to resolve at human review. |
| 2026-05-30 | Genesis 2 | **promoted** | Anton Swanevelder (project owner) | Reviewed and updated the Glossary additions; promoted to `completed/genesis/genesis-02.md`. First chapter using the YHWH → **HERE God** divine-name policy. Single-reviewer promotion (compliant with CLAUDE.md Step 6, which requires at least one reviewer). Open items still flagged in the chapter's notes: *ish/ishshah* footnote vs "manninne" (2:23), *'ed* rendering (2:6, committed "damp" provisionally). |
| 2026-05-31 | Genesis 6 | **promoted** | Anton Swanevelder (project owner) | Nefilim + humanity's corruption + the ark command, promoted to `completed/genesis/genesis-06.md`. First *chen*→"genade" (6:8) and first *berit*→"verbond" (6:18); "met God gewandel" (6:9) matches Henog (5:22, 24); *Noach*/*nacham* + *atsev*/*itstsavon* wordplays footnoted; numerals + cubit→el. Review decisions: *bnei ha-Elohim*→"seuns van God" (standing convention, incl. Job); *yadon*→"bly" (6:3); *tsohar*→"opening" (6:16); "Nefilim" transliterated. Names registered in `PROPER_NAMES.md`. |
| 2026-05-31 | Genesis 1 (re-translation) | **promoted** | Anton Swanevelder (project owner) | Fresh translation from WLC, **replacing the imported reference text** (Gen 1 is now our own work via the workflow). Applies committed glossary; **fixed the old *nephesh chayyah* drift** (v.20/v.30); preserved the botanical categories. Review confirmed: "dag een" (cardinal, + anarthrous ordinals days 2–5) and "onderwerp" (*kavash*, v.28). Committed Gen 1 vocabulary (me'orot, mo'adim, tanninim, kavash, radah, deshe/esev/etz peri). |
| 2026-05-31 | Genesis 5 | **promoted** | Anton Swanevelder (project owner) | Adam→Noag genealogy, promoted to `completed/genesis/genesis-05.md`. Review decisions: *holid* → **"die vader geword van"** (was "verwek"; aligns with Gen 4:18), "geleef"/"gesterf"/"seuns en dogters gehad", **numerals** for the ages (preserving the *yemei*/*vaychi* distinction at v.4 vs v.7+). *adam* generic "mens" (5:1–2) / name "Adam" (5:3+); 5:3 image-echo of 1:26; 5:29 *itstsavon* + cursed *adamah* echo 3:17. Names registered in `PROPER_NAMES.md`. |
| 2026-05-31 | Genesis 4 | **promoted** | Anton Swanevelder (project owner) | Reviewed and promoted to `completed/genesis/genesis-04.md`. Cain & Abel + Cainite line + Seth. Review decisions: 4:4–5 *sha'ah* → "ag geslaan op" (was "aangesien"); *yada* → "geken" (was "beken", more faithful cognate); 4:14 *adamah* kept "grond" + clarifying footnote. Committed the *adam* article-rule and **back-applied** "Adam" to 2:20, 3:17, 3:21 (re-rendered + rebuilt). Minor open: *avon* "straf" vs "skuld" (4:13). |
| 2026-05-31 | Genesis 2 & 3 (adam back-edit) | re-rendered | Anton Swanevelder (project owner) | Per the committed *adam* rule: 2:20, 3:17, 3:21 changed from "die mens" → "Adam" (anarthrous *l'adam*). Verse text + notes updated; formats rebuilt. |
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
| 2026-05-31 | Genesis 6 glossary additions | Committed to `GLOSSARY.md`: **gibborim**→helde, **tsaddiq**→regverdig, **tamim**→opreg, **chamas**→geweld, **shachat**→verderf, **yetzer**→versinsel, **tevah**→ark, **gofer**→goferhout, **kofer**→pik, **mabbul**→watervloed. **Nefilim** registered in `PROPER_NAMES.md`. (*chen*, *berit*, *bnei ha-Elohim* already committed.) | Applied during Genesis 6 promotion. |
| 2026-05-31 | *bnei ha-Elohim* | Committed standing **Bible-wide** convention: → **"seuns van God"** (literal; interpretation left open in a footnote). Chosen because only the literal rendering is consistent across Gen 6:2, 4 **and** Job 1:6, 2:1, 38:7 (heavenly beings there). | Genesis 6 (+ Job, when reached). |
| 2026-05-31 | Genesis 5 additions | Committed: *yalad/holid* → **"die vader word van"** / **"baar"** (was "verwek"); *toledot* note extended for the genealogy sense ("geslagsregister", Gen 5:1). Flipped Mahalálel & Jered to ✅ in `PROPER_NAMES.md`. Genesis 6:10 also updated to "die vader geword van". | Genesis 5; all genealogies. |
| 2026-05-31 | Proper-name policy + `PROPER_NAMES.md` | Created `PROPER_NAMES.md` as the names registry. Policy: render from the source, not the tradition; **identical source name → identical Afrikaans, different-but-similar → distinct**; preserve deliberate genealogy parallelism (footnotes disambiguate, not spelling). Verified all Gen 4 & 5 genealogy names against the WLC — existing renderings already compliant (Henog/Lameg identical; Kain≠Kenan, Metúsael≠Metúsalag, Mehújael≠Mahalálel, Irad≠Jered distinct). | All chapters; names now registered in `PROPER_NAMES.md`. |
| 2026-05-31 | *adam* article rule | Committed (`GLOSSARY.md`): arthrous *ha-adam* → "die mens"; anarthrous *adam* (individual) → "Adam". Debuts Gen 4:25; back-applied to 2:20, 3:17, 3:21. Resolves the deferred Genesis-4 decision point. | Genesis 2–4 (and all later *adam* occurrences). |
| 2026-05-31 | Genesis 4 glossary additions | Committed to `GLOSSARY.md`: ***adam*** article rule (above), **minchah**→offergawe. Personal names (Kain, Abel, Set, Enos) follow the proper-names policy (established/transliterated forms). | Applied during Genesis 4 promotion. |
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
