# Wu Chinese Bible — experimental parallel project

> **Status: experiment, not a production translation.** This folder applies the
> `afrikaans-bible/` methodology (translate from the original languages, formal
> equivalence, divine-name policy, glossary discipline, fidelity-over-smoothness,
> two-tier footnotes + translator's notes) to a completely different target:
> **Wu Chinese (上海话 / Shanghainese vernacular).** It exists to test whether the
> framework generalises across language families — not to ship a Wu Bible.

## What's here

- `completed/genesis/genesis-01.md` — Genesis 1, translated from the WLC Hebrew,
  in the same file format as `afrikaans-bible/completed/genesis/genesis-01.md`.

## How this differs from afrikaans-bible (do not ignore)

Two of the parent project's load-bearing requirements **cannot** be met here, so
nothing in this folder may be "promoted" in the afrikaans-bible sense:

1. **No native-speaker reviewer.** Wu naturalness is exactly what AI self-review is
   weakest at. Every chapter here is an unaudited draft.
2. **No settled orthography.** Wu is primarily spoken; several grammatical morphemes
   (㑚, 搿, 侪, 仔, 哉…) have only conventional/variant characters with no national
   standard. A character-standard would have to be committed before any database build.

## What transferred well

The policy scaffolding moved across almost intact — including a clean local analogue
of the divine-name decision: the Chinese **「神 vs 上帝」 "Term Question"** is structurally
the same once-and-binding choice as YHWH→`HERE`. See the translator's notes in
`completed/genesis/genesis-01.md` for the full per-decision mapping.

## Source

Same as the parent project: Westminster Leningrad Codex,
`../afrikaans-bible/sources/hbo/WLC/WLC.json` (public domain).
