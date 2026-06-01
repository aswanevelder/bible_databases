# PROJECT_PLAN.md — Afrikaans Bible Translation Project (Solo Edition)

> **Pacing commitment**: 2 chapters per day, 6 days per week (12 chapters/week)
> **Team structure**: Solo translator + AI-assisted review + occasional human consultation on critical passages
> **Target completion**: Publication-ready full Bible
> **Methodology**: See `CLAUDE.md`, `TRANSLATION_POLICY.md`, `GLOSSARY.md`, `PROPER_NAMES.md`
>
> **⚠️ Status of this document.** This is a **roadmap, not policy.** Where it disagrees with
> `CLAUDE.md`, `TRANSLATION_POLICY.md`, `GLOSSARY.md`, or `PROPER_NAMES.md`, **those files win** —
> they are the committed source of truth. This plan has been reconciled to the work already
> completed (see §0 below); it is updated to follow the committed decisions, never to override them.

---

## 0. Current status (as of 2026-06-01)

This plan was first drafted at a standing start. The project has since moved past Phase 0 and into
Phase 1. Actual state:

- **Promoted (in `completed/` and in the AOV database): Genesis 1–7 + John 1–2 = 260 verses.**
  Genesis 1 was **re-translated from the WLC** through the full workflow (the imported reference text
  was superseded). John 1 and 2 done from StatResGNT.
- **Drafted, awaiting review:** Genesis 8–9.
- **Phase 0 is essentially complete.** All foundational 🔴 policy decisions are resolved and
  committed (`TRANSLATION_POLICY.md §2`); the methodology has been proven over 9 chapters; the
  glossary, proper-names registry, and review log are live.
- **Infrastructure built since the original plan:** a database bridge (`tools/build_aov_source.py`
  → `tools/generate_aov.py`) that extracts the editorial markdown into the repo's source-JSON schema
  and regenerates all `formats/*/AOV.*`, plus an additive `AOV_footnotes` table carrying both
  reader and translator notes into the database. `PROPER_NAMES.md` governs name forms. This means
  **promotion now includes a build step** (see §4 Step 7 and §12).

Everything below is the forward roadmap from this point. Chapter counts and phase boundaries assume
the work above is already done.

---

## 1. About this revised plan

The original plan assumed a translator + review team working in parallel at 4 chapters/day. This revised plan assumes a **solo translator** working at **2 chapters/day** with the following adaptations:

- **You serve as both translator and human reviewer**, with workflow discipline distinguishing the two roles
- **Claude provides drafting, self-review, and consistency checking** but is not relied on as sole reviewer
- **Occasional outside consultation** is recommended for theologically critical passages
- **Pace reduction from 4 to 2 chapters/day** creates time for serious human review of every chapter

### Why this structure can work

Solo work at 2 chapters/day is realistic because:

1. The pace reduction (50% slower) creates the time needed for serious human review
2. Treating "translator" and "reviewer" as distinct roles — even when you wear both hats — preserves the critical distance needed for honest review
3. AI-assisted consistency and drift detection scales well to solo work
4. Claude can flag uncertainty, check lexicons, surface parallel passages, and identify glossary violations

### Where this structure has weaknesses

You should know what you're trading away:

1. **No independent second eye on your final output.** Claude's self-review has known limitations (self-consistency bias). Your own review is the strongest defense, but no one is checking *your* work.
2. **Theological blindspots may go undetected.** Every translator has them. Solo work means yours go uncorrected.
3. **Afrikaans naturalness drift is harder to catch alone.** A native-speaker editor catches awkward phrasing you've become blind to.
4. **Project credibility takes a hit.** "Solo with AI assistance" is harder to defend in scholarly conversation than "reviewed by [respected names]."

### The recommended mitigation

Without a full review team, you can substantially close these gaps by:

1. **Identify 50-100 "critical passages"** before starting — the theologically and textually highest-stakes texts (see Section 8 below)
2. **Arrange for occasional outside consultation** on these specifically — even one or two trusted colleagues who'll read 2-4 chapters per month
3. **Build in self-review discipline** — never review a chapter the same day you draft it; let it cool
4. **Use Claude's self-review aggressively** but treat its outputs as suggestions, not validations

If you cannot arrange any outside consultation at all, the project can still proceed — but document this clearly in the published translation's introduction. Readers deserve to know.

---

## 2. The math at this pace

### Raw translation throughput

- **2 chapters/day × 6 days/week = 12 chapters/week**
- **1,189 total chapters ÷ 12 = ~100 working weeks**
- **Pure translation time: ~23 months** (if every week were a translation week)

### Realistic calendar adjustments

| Factor | Impact |
|---|---|
| Holiday/leave (4 weeks/year) | +2 months over project |
| Policy decisions and meetings (smaller team = faster) | +1-2 weeks |
| Glossary curation time | continuous, ~3-4 hours/week |
| Hard chapters needing >1 day (Job, Romans, Ezekiel, Revelation) | +1-2 months cumulative |
| Self-review backlog (chapters drafted but not yet self-reviewed) | continuous |
| Occasional consultation turnaround | minor delays, +2-3 weeks total |
| Final quality audit phase | +4-6 months |

**Realistic total: 30-36 months for translation + initial review.**
**Add 4-6 months for final quality audit and publication preparation.**

### Honest projection

**Target completion: 36-42 months (3-3.5 years) from project start to publication-ready.**

This is still **dramatically faster than historical Bible translation projects** (AFR53 took ~25 years; AFR83 took ~10 years; modern committee translations average 7-15 years). The 3-3.5 year solo target is ambitious but achievable.

### Comparison to the team-based plan

| Metric | Team plan (4 ch/day) | Solo plan (2 ch/day) |
|---|---|---|
| Daily throughput | 4 chapters | 2 chapters |
| Weekly throughput | 24 chapters | 12 chapters |
| Pure translation time | ~12 months | ~23 months |
| Total to publication | 24-30 months | 36-42 months |
| Required team | 3-4 reviewers | Solo + occasional consults |
| Daily working hours | ~7 hours | ~4-5 hours |
| Risk of burnout | High | Moderate |
| Risk of undetected errors | Low | Moderate |

The solo plan trades 12-18 months of additional calendar time for elimination of the team dependency. That's an honest trade.

---

## 3. The non-negotiable prerequisite — policy resolution ✅ DONE

**This prerequisite is complete.** All foundational decisions were resolved and committed on
2026-05-30 in `TRANSLATION_POLICY.md §2` — that file is the source of truth; the rulings below are
restated here only so the roadmap is self-contained. **Do not re-open these without a `REVIEW_LOG.md`
entry and a re-pass of completed chapters.** (The original plan listed tentative *recommendations*
here, three of which were the opposite of what the project actually committed; they have been
replaced with the committed rulings.)

| # | Decision | **Committed ruling** (POLICY §2) |
|---|---|---|
| 1 | NT textual base | **Critical text → StatResGNT** (continues john-01's choices at 1:18, 1:34) |
| 2 | *nephesh* | **Context rules** — `lewende wese` (creatures), `lewe` (life), `siel` (inner/emotional only) — *not* a flat single rendering |
| 3 | *monogenēs* | **`enigste` / `Enigste`** (unique/one-of-a-kind) — *not* "eniggebore" |
| 4 | *amēn amēn* | **`Voorwaar, voorwaar`** |
| 5 | *chesed* | **`troue liefde`** |
| 6 | OT-quoted-in-NT | **Render to match our own OT translation** (with provisional-from-Greek + back-harmonisation list where the OT isn't translated yet) — *not* "match the NT source". See POLICY §2a. |

Still genuinely open (per `TRANSLATION_POLICY.md §6`) and to be locked **before the material that needs
them**, not before bulk work generally: the compound divine titles (*El Shaddai* etc., before Genesis
17) and confirmation of the *ish/ishshah* footnote approach. These do not block the current Genesis run.

---

## 4. Solo workflow per chapter

The workflow becomes more critical when working alone. Discipline replaces team structure.

### Step 1: Source preparation (~10 minutes)
- Open Hebrew/Greek source in `sources/`
- Read the chapter in source language before drafting
- Note any obvious textual issues, hapax legomena, or unusual constructions
- Check parallel passages if any (e.g. Samuel/Chronicles parallels)

### Step 2: Initial drafting with Claude (~30-45 minutes)
- Prompt Claude with the source text and project files (CLAUDE.md, GLOSSARY.md, TRANSLATION_POLICY.md)
- Use the standard prompt template from CLAUDE.md
- Request translation + translator's notes + glossary additions
- Save to `drafts/[book]/[book-chapter].md`

### Step 3: Claude self-review (~15 minutes)
- New Claude Code session (fresh context preferred — reduces self-consistency bias)
- Prompt Claude to review the draft for: drift, glossary violations, awkward Afrikaans, missing notes
- The self-review report is written **into the chapter file itself** (a `## Self-review report`
  section), alongside the `## Footnotes` and `## Translator's notes` blocks — per the "nothing
  hidden" policy (`TRANSLATION_POLICY.md §4a`), the reasoning ships with the text rather than living
  in a separate throwaway file

### Step 4: YOUR human review (~45-75 minutes) ⭐ CRITICAL STEP
**This is where you are the human reviewer, not the translator.**

- **Wait at least 4 hours** between draft and review when possible (overnight is better)
- Read the chapter in source language first
- Read the Afrikaans draft against the source, verse by verse
- For each verse, ask:
  - Does the Afrikaans say what the Hebrew/Greek says?
  - Are there interpretive choices that should be noted but aren't?
  - Does it match committed glossary?
  - Does it sound natural in Afrikaans?
  - Are there textual variants that should be footnoted?
- Mark every change you make — these become part of the chapter's history

### Step 5: Glossary, names, and notes updates (~10-15 minutes)
- Commit any new terms to `GLOSSARY.md`
- Register any new proper names in `PROPER_NAMES.md` (check the source spelling; apply the
  identical-vs-distinct rule)
- Update any provisional 🟡 terms that have been refined
- Log the promotion and any policy questions in `REVIEW_LOG.md`

### Step 6: Flag for consultation if needed (~5 minutes)
- If the chapter touched a critical passage (see Section 8) OR raised a theological/textual question you can't confidently resolve, flag it
- Move to `flagged/` rather than `completed/`
- Add to consultation queue

### Step 7: Promote and build the database (~5 minutes)
Once reviewed and signed off (and not held in `flagged/`):
- `git mv` the chapter from `drafts/` to `completed/`
- Run the bridge: `python3 afrikaans-bible/tools/build_aov_source.py` then
  `python3 afrikaans-bible/tools/generate_aov.py` — this regenerates `sources/af/AOV/AOV.json`,
  the footnotes sidecar, and all `formats/*/AOV.*` (including the additive `AOV_footnotes` table)
- Commit the chapter + refreshed `GLOSSARY.md` / `PROPER_NAMES.md` / `REVIEW_LOG.md` +
  generated `sources/af/AOV/` and `formats/*/AOV.*`, then push
- The editorial markdown stays the source of truth; everything under `sources/af/AOV/` and
  `formats/` is generated — never hand-edit it (see `CLAUDE.md` Step 7, `tools/README.md`)

### Total time per chapter
- Normal chapter: **~2-2.5 hours**
- Hard chapter (Job, Romans, prophetic poetry): **3-4 hours**
- 2 chapters/day = **4.5-5 working hours/day**

This is sustainable. This is the right pace for solo work.

---

## 5. Phased project plan

The plan follows the **OT-first with strategic mixing** approach.

### Phase 0: Setup and policy resolution ✅ ESSENTIALLY COMPLETE

**Status**: done except for arranging outside consultants (ongoing).
**Chapters**: Genesis 1 re-translated from the WLC; John 1–2 done. (Genesis 2–7 done too — already
into Phase 1.)

**Completed activities**:
- ✅ Repository structure set up (per CLAUDE.md), plus the AOV database bridge (`tools/`) and
  `PROPER_NAMES.md` registry
- ✅ All foundational 🔴 policy decisions resolved and committed (`TRANSLATION_POLICY.md §2`)
- ✅ Methodology proven over 9 chapters (Genesis 1–7, John 1–2), workflow + self-review + footnote
  tiers + database build all exercised
- ✅ Genesis 1 re-translated from source through the full workflow (imported reference superseded)
- ⬜ **Still to do:** identify and contact 1–2 occasional consultants for critical passages; the
  "critical passages" list (Section 8) is drafted but no outside review arranged yet

**Deliverable**: Project foundations stable, methodology rehearsed. **Consultation arrangement is the
one open Phase 0 item** — it can run in parallel with Phase 1 but should not slip indefinitely.

---

### Phase 1: Methodology stress-test ◐ IN PROGRESS

**Duration**: ~6 weeks
**Target chapters**: ~70
**Cumulative**: ~70 (6% of Bible)
**Progress**: Genesis 1–7 promoted; Genesis 8–9 drafted. ~43 Genesis chapters + Mark + Ruth remain.

**Books**:
- **Genesis** (chapters 8-50 remaining; 1-7 done) — 43 chapters left of 50
- **Mark** — 16 chapters (shortest Gospel; narrative; OT quotations to test cross-reference workflow)
- **Ruth** — 4 chapters (short, beautiful Hebrew narrative)

**Why this mix**: Tests OT narrative, NT narrative, and short OT book. Catches methodology problems before scale.

**Gate to next phase**:
- All 70 chapters drafted, self-reviewed, and human-reviewed by you
- Glossary additions committed
- At least one consultant has reviewed at least 2-3 sample chapters
- Workflow discipline established

---

### Phase 2: Pentateuch completion + foundational Psalms

**Duration**: ~16-18 weeks
**Target chapters**: ~190
**Cumulative**: ~260 (22% of Bible)

**Books**:
- **Exodus** — 40 chapters
- **Leviticus** — 27 chapters (cultic vocabulary; slow going)
- **Numbers** — 36 chapters (repetitive but tedious not difficult)
- **Deuteronomy** — 34 chapters
- **Key Psalms heavily quoted in NT** — Psalms 2, 8, 16, 22, 40, 69, 110, 118, plus selected Davidic psalms — ~50 psalms

**Risks**:
- Leviticus is genuinely slow — may run 15-20% over plan
- Numbers 7 (offerings list) is 89 verses of repetition; one-day chapter possible

**Critical consultation candidates**: Exodus 3 (divine name revelation), Exodus 20 (Decalogue), Deuteronomy 6 (Shema), Psalm 22 (Christological), Psalm 110 (Christological)

---

### Phase 3: OT historical books

**Duration**: ~20 weeks
**Target chapters**: ~245
**Cumulative**: ~505 (42% of Bible)

**Books**: Joshua, Judges, 1-2 Samuel, 1-2 Kings, 1-2 Chronicles, Ezra, Nehemiah, Esther

**Risks**:
- Samuel has significant MT/LXX/DSS divergence — footnote work
- Chronicles repeats Samuel/Kings — risk of drift if not done close in time
- Genealogies and lists require `PROPER_NAMES.md` discipline

**Critical consultation candidates**: 2 Samuel 7 (Davidic covenant), 1 Kings 8 (temple dedication)

---

### Phase 4: OT poetry and wisdom

**Duration**: ~16-18 weeks
**Target chapters**: ~195
**Cumulative**: ~700 (59% of Bible)

**Books**:
- **Job** — 42 chapters (warning: difficult Hebrew, especially chapters 38-41)
- **Psalms (remaining)** — ~100 chapters
- **Proverbs** — 31 chapters
- **Ecclesiastes** — 12 chapters
- **Song of Songs** — 8 chapters

**Special consideration**: This phase will likely run **20-30% over schedule**. Build buffer.

**Pace adjustment**: Realistically expect 1-1.5 chapters/day during Job 38-41 and Psalms with rare vocabulary.

**Critical consultation candidates**: Job 19 (Redeemer passage), Psalm 51, Psalm 139, Proverbs 8 (Wisdom personified), Ecclesiastes 12

---

### Phase 5: OT prophets

**Duration**: ~22 weeks
**Target chapters**: ~250
**Cumulative**: ~950 (80% of Bible)

**Major prophets**: Isaiah (66), Jeremiah (52), Lamentations (5), Ezekiel (48), Daniel (12)
**Minor prophets**: Hosea, Joel, Amos, Obadiah, Jonah, Micah, Nahum, Habakkuk, Zephaniah, Haggai, Zechariah, Malachi (~67 chapters)

**Risks**:
- Daniel's Aramaic sections (2:4b-7:28) need different competence
- Ezekiel's visions are interpretively contested
- Isaiah's MT/LXX/DSS variations are significant
- Jeremiah has major MT/LXX divergence

**Critical consultation candidates**: Isaiah 7 (almah/parthenos), Isaiah 9, Isaiah 11, **Isaiah 53 (highest-priority consultation passage in the entire OT)**, Daniel 7, Daniel 9 (70 weeks), Zechariah 9, Zechariah 12, Malachi 3-4

**Gate to next phase**: **OT IS COMPLETE.** Major milestone. Take a meaningful break before starting NT.

---

### Phase 6: New Testament

**Duration**: ~22 weeks
**Target chapters**: ~245 (Mark already done in Phase 1)
**Cumulative**: ~1,189 (100% of Bible)

**Order**:
- **Matthew** — 28 chapters
- **Luke** — 24 chapters
- **John** (chapters 3-21 remaining; 1-2 done in early work) — 19 chapters
- **Acts** — 28 chapters
- **Pauline epistles** — 87 chapters
- **General epistles** — 34 chapters
- **Revelation** — 22 chapters (last; most OT-dependent)

**Risks**:
- Romans is theologically dense. Chapters 5, 8, 9, 11 each may take a full day.
- Hebrews has dense OT-quotation rate
- Revelation has the densest OT allusions per verse

**Critical consultation candidates**: Matthew 1-2 (genealogy and birth narrative), John 1, John 6, John 17, **Romans 3:21-26**, **Romans 9-11**, 1 Corinthians 13, 1 Corinthians 15, Galatians 3-4, Ephesians 1-2, Philippians 2 (Christ hymn), Colossians 1 (Christ hymn), Hebrews 1-2, James 2 (faith and works), 1 John 4-5, Revelation 5, Revelation 19-22

---

### Phase 7: Final quality audit

**Duration**: ~4-6 months
**Activities**:

1. **Full read-through consistency audit** — every committed glossary term checked across all occurrences
2. **Cross-reference verification** — every NT-quotes-OT pair checked against policy
3. **Critical passage consultation review** — every critical passage gets at least one outside review
4. **Native-speaker Afrikaans audit** — ideally a professional editor reviews entire translation for naturalness
5. **Proper-names audit** — every name standardized
6. **Footnote audit** — consistent style and scope
7. **Typesetting and publication preparation**
8. **Legal review** — confirmation that no copyrighted material was inadvertently incorporated

**Solo-specific note**: For solo work, the audit phase is *more* important, not less. Plan it as 5-6 months rather than 4. Stretch it if needed.

---

## 6. Milestone summary

| Milestone | Target month | Cumulative chapters | % of Bible |
|---|---|---|---|
| Phase 0 complete | Month 1 | 0 (refinement only) | 0% |
| **Genesis + Mark + Ruth done** | Month 2.5 | 70 | 6% |
| **Pentateuch done** | Month 7 | 207 | 17% |
| Foundational Psalms done | Month 8 | 260 | 22% |
| Samuel-Kings done | Month 12 | 400 | 34% |
| **OT historical books done** | Month 13 | 505 | 42% |
| Job + remaining Psalms done | Month 16 | 650 | 55% |
| **OT poetry/wisdom done** | Month 17 | 700 | 59% |
| Major prophets done | Month 21 | 880 | 74% |
| **ALL OT DONE** | Month 23 | 950 | 80% |
| Gospels + Acts done | Month 26 | 1,050 | 88% |
| Pauline corpus done | Month 28 | 1,135 | 95% |
| **FULL NT DONE** | Month 30 | 1,189 | 100% |
| Audits complete, publication-ready | Month 36-42 | 1,189 | 100% |

> **Note:** the per-milestone months sit at the **optimistic floor** of §2's "30–36 months for
> translation + initial review". Treat them as a best case; §2's risk-adjusted 36–42-month total to
> publication is the realistic figure. Track actual variance in `BURNDOWN.md` (§11) and recalibrate.
> Month numbers count from the *original* project start, not from this reconciliation.

---

## 7. Daily and weekly rhythm

### Daily structure (suggested)

| Time | Activity | Duration |
|---|---|---|
| Morning block | Draft chapter 1 with Claude + self-review | 1 hour |
| Mid-morning | Human review of yesterday's chapter 2 | 1-1.25 hours |
| Lunch break | — | — |
| Afternoon block | Draft chapter 2 with Claude + self-review | 1 hour |
| Mid-afternoon | Human review of today's chapter 1 | 1-1.25 hours |
| End of day | Glossary updates, notes, flag chapters | 0.25 hours |
| **Total** | | **~4.5-5 hours** |

**The key discipline**: never human-review a chapter the same hour you drafted it. Build cooling time into the schedule. The afternoon human-review of the morning's draft is the minimum acceptable cooling time; overnight cooling is even better.

**Alternative rhythm**: draft both chapters in the morning, human-review both in the afternoon. Or draft today's, review yesterday's. Pick what works for your concentration patterns.

### Weekly structure

- **Mon-Sat**: 2 chapters/day = 12 chapters
- **Sunday**: Rest. Review week's glossary additions. Plan next week.

### Monthly rhythm

- **Week 1-3**: Translation and review
- **Week 4**: Translation + monthly consistency audit + send any flagged chapters to consultants

### Quarterly rhythm

- **Quarter-end**: Full glossary audit, drift check, policy review. Consider a long weekend break to refresh.

---

## 8. Critical passages — where outside consultation matters most

These are the highest-stakes passages where solo work carries the greatest risk. Prioritize getting outside eyes on these specifically, even if a full review team is not feasible.

### OT critical passages
- **Genesis 1-3** — creation, fall, protoevangelium (✅ promoted; flag for outside consultation)
- **Genesis 15, 17, 22** — Abrahamic covenant
- **Exodus 3** — divine name revelation
- **Exodus 20, Deuteronomy 5** — Decalogue
- **Exodus 12** — Passover
- **Leviticus 16** — Day of Atonement
- **Numbers 6** — Aaronic blessing
- **Deuteronomy 6** — Shema
- **Deuteronomy 28-30** — covenant blessings and curses
- **2 Samuel 7** — Davidic covenant
- **Psalm 2, 8, 22, 40, 51, 69, 110, 118, 139** — most NT-quoted Psalms
- **Proverbs 8** — Wisdom personified
- **Isaiah 6** — Isaiah's call vision
- **Isaiah 7:14** — almah/parthenos
- **Isaiah 9, 11** — messianic prophecies
- **Isaiah 40-55** — Servant Songs, especially **Isaiah 53**
- **Jeremiah 31** — new covenant
- **Ezekiel 36-37** — restoration prophecies
- **Daniel 7, 9** — Son of Man, 70 weeks
- **Joel 2** — Spirit poured out
- **Zechariah 9, 12, 14** — messianic prophecies

### NT critical passages
- **Matthew 1-2** — genealogy, birth narratives
- **Matthew 5-7** — Sermon on the Mount
- **Matthew 24-25** — Olivet Discourse
- **Mark 13** — apocalyptic discourse
- **Luke 1-2** — birth narratives
- **John 1-2** — ✅ promoted (from StatResGNT); flag for outside consultation
- **John 3, 6, 14-17** — major Johannine discourses
- **Acts 2** — Pentecost
- **Romans 1, 3, 5, 8, 9-11** — Pauline theology core
- **1 Corinthians 11, 13, 15** — Lord's Supper, love, resurrection
- **Galatians 2-3** — justification
- **Ephesians 1-2** — election and grace
- **Philippians 2** — Christ hymn
- **Colossians 1** — Christ hymn
- **Hebrews 1, 7-10** — Christ as high priest
- **James 2** — faith and works
- **1 John 4-5** — God is love, witnesses
- **Revelation 1, 5, 19-22** — apocalyptic core

**Total: ~80-100 critical passages.** Even getting outside review on just these would substantially mitigate solo-work risk.

---

## 9. Resource requirements

### Tools
- **Westminster Leningrad Codex** (free, open) — Hebrew source
- **NA28 / SBLGNT** — Greek NT source
- **Rahlfs LXX** — Septuagint for textual variant work
- **BDB or HALOT** — Hebrew lexicons
- **BDAG** — Greek lexicon
- **Claude Code** — primary AI translator/reviewer
- **Repository hosting** (GitHub or similar)
- **Joüon-Muraoka** (Hebrew grammar) and **Wallace** (Greek grammar) for hard cases

### People (minimum viable solo setup)
- **You** — translator and human reviewer
- **At least 1 occasional consultant** — someone with Hebrew/Greek competence willing to read critical passages
- **Ideally a native-speaker Afrikaans editor** for the Phase 7 audit, even on contract basis

### Time
- ~5 hours/day, 6 days/week, ~36-42 months
- Plus Phase 7 audit work (~6 months, less intense)

---

## 10. Risk register (solo edition)

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Translator burnout | High | Critical | Strict 6-day week; full Sundays off; quarterly long weekends; pace discipline |
| Undetected systematic errors | High | High | Aggressive self-review discipline; cooling time before review; occasional consultants on critical passages |
| Theological blindspots | Certain | High | Read alongside trusted commentaries; flag uncertain passages; consultation on critical texts |
| Glossary drift | Certain | Medium | Weekly glossary review; quarterly full audits; rely on Claude for drift detection |
| Late policy change triggers rework | Medium | High | Resolve all 🔴 decisions in Phase 0; lock policies after Phase 1 |
| Hard chapters break pace | Certain | Medium | Build buffer; allow overflow in Job, Romans, Ezekiel, Revelation |
| Loss of motivation mid-project | Medium | Critical | Phase-based milestones; celebrate each book completion; visible progress tracking |
| Afrikaans naturalness drift | High | Medium | Hire native-speaker editor for Phase 7 if at all possible |
| Quality criticism after publication | Medium | High | Document methodology thoroughly; be transparent in publication intro about solo + AI approach |
| Copyright contamination | Low | Critical | Never consult AFR53/AFR20 phrasing; translate only from source; document workflow |

---

## 11. Burndown tracking

Maintain a simple `BURNDOWN.md`:

```markdown
# BURNDOWN

## Week of [date]
- Chapters target: 12
- Chapters drafted: [X]
- Chapters human-reviewed: [Y]
- Chapters in flagged/: [Z]
- Variance from plan: [+/- N]
- Glossary additions: [list]
- Open issues: [list]
- Consultation requests sent: [list]

## Cumulative
- Total chapters complete: [X / 1,189]
- Percent complete: [X%]
- Phase: [current phase]
- Status vs plan: [on track / behind / ahead]
```

Update weekly. Review monthly. Adjust plan if variance exceeds ±15% for two consecutive months.

**Solo-specific addition**: track **review backlog** separately from translation backlog. If draft-to-review gap grows beyond 1 week, slow drafting to catch up. Drafting faster than reviewing creates a false sense of progress.

---

## 12. What "complete" means (solo edition)

### Chapter complete
- Drafted from source by you + Claude
- Self-reviewed by Claude (fresh session preferred), report written into the chapter file
- **Human-reviewed by you with cooling time between draft and review**
- If critical passage: flagged for or returned from consultation
- Glossary updates incorporated; new proper names registered in `PROPER_NAMES.md`
- Promoted from `drafts/` to `completed/`
- **Database rebuilt** (`build_aov_source.py` → `generate_aov.py`); `sources/af/AOV/` and
  `formats/*/AOV.*` refreshed and committed
- Logged in `REVIEW_LOG.md`

### Book complete
- All chapters complete
- Book-level consistency audit done
- Introductory note written (date completed, notable decisions, consultations received)
- Cross-references to other books verified

### Project complete
- Both testaments complete
- Phase 7 audits complete
- Native-speaker review done (Phase 7)
- Critical passage consultations all completed
- Legal review complete
- Publication-ready files prepared
- Open license attached
- Documentation complete and preserved

---

## 13. Honest closing notes

### What this plan trades

The original 4-chapters/day plan with a review team gets you to publication in **24-30 months**. The solo 2-chapters/day plan gets you there in **36-42 months**. You're trading **12-18 months of additional time** for **eliminating team dependency**.

That's a real trade. Both directions are defensible. The solo path is harder but more autonomous.

### What success requires

For solo work to produce a credible translation:

1. **Workflow discipline.** Treating "draft" and "review" as separate roles even when you wear both hats. Cooling time between them.
2. **Honesty about uncertainty.** Flag what you don't know rather than guessing. Document interpretive choices.
3. **Occasional outside eyes.** Even minimal consultation on critical passages substantially improves the output.
4. **Aggressive AI consistency checking.** Claude is uniquely good at detecting drift across thousands of verses. Use this.
5. **Transparency in publication.** When the translation is released, the introduction should clearly state the methodology. Readers and reviewers should know what they're reading.

### What success looks like

At the end of this project, the Afrikaans-speaking world will have a **freely-licensable, scholarly, formal-equivalence Afrikaans Bible translated directly from Hebrew and Greek** — produced by a solo translator with AI assistance and occasional expert consultation. This will be a first in the history of Afrikaans biblical scholarship, and a meaningful first in the history of Bible translation generally.

If the methodology is documented well, this project becomes more than a Bible — it becomes a **proof of concept** for what AI-assisted scholarly translation can produce when guided by disciplined human judgment.

That is worth 3-3.5 years of focused work.

### When to revise this plan

- After Phase 1 (Month 2.5): adjust based on actual throughput and review depth
- After Phase 4 (Month 17): mid-project recalibration
- At any point where variance exceeds 15% for two consecutive months
- If the pace proves unsustainable: drop to 1.5 or even 1 chapter/day rather than abandoning the project. Slower completion is better than no completion.

---

## Amendment log

| Date | Change | Reason |
|---|---|---|
| [project start] | Initial plan committed (team-based, 4 ch/day) | Original baseline |
| [revision date] | Adapted to solo + AI workflow, 2 ch/day | Team unavailable; translator preferred direct work for source fidelity |
| 2026-06-01 | Reconciled to completed work: added §0 status; rewrote §3 to the committed rulings (was contradicting `TRANSLATION_POLICY.md §2` on *monogenēs*, *nephesh*, OT-in-NT); marked Phase 0 done / Phase 1 in progress (Genesis 1–7 + John 1–2 promoted); folded in the database bridge, Step 7, and `PROPER_NAMES.md`; flagged the plan as subordinate to the committed policy files | Plan had gone stale vs the actual project state and policy; the committed files are master |
