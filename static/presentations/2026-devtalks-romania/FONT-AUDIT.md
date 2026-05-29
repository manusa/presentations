# Font Readability Audit — DevTalks Romania 2026 Deck

> Talk: *"Turning Your Java Project Into an AI-Ready Codebase"* — DevTalks Romania, Java Stage, 03 Jun 2026.
> Audit scope: every `<section>` in `index.html` + all 24 `styles/s-*.css` files.
> Question: will the text be readable when projected on a conference screen?

---

## How this was measured

The deck renders on a **fixed 1920×1080 canvas** that `deck-stage` scales uniformly to whatever
screen it is projected on (`../../deck-kit/deck-stage.js:10-11, 69-70`). Every `px` value is therefore
locked to a **1080px-tall slide**, and the property that actually governs legibility is **letter height
as a fraction of slide height** — that fraction is invariant regardless of the physical screen size.

That lets us compare directly against published presentation guidance, which is stated in points.
A 16:9 slide in PowerPoint / Keynote / Google Slides is **7.5 in = 540 pt tall**. This canvas is 1080px
tall, so:

```
pt-equivalent  =  px ÷ 2
% of height    =  px ÷ 1080
```

Only **3** font-size declarations in the entire deck use relative units (`em`); everything else is
hard-coded `px`. So these numbers are deterministic — a live render produces no different values.

### Research thresholds, translated into this deck's px

| Guideline | In points | In deck px | % of height |
|---|---|---|---|
| Ideal body ("30pt rule") | 30 pt | **60 px** | 5.6% |
| Comfortable body | 28 pt | **56 px** | 5.2% |
| Widely-cited **minimum** body | 24 pt | **48 px** | 4.4% |
| Small-room / seminar floor | 20 pt | **40 px** | 3.7% |
| **Hard floor — "difficult to read in any room"** | 18 pt | **36 px** | 3.3% |
| Titles | 36–44 pt | 72–88 px | — |

Cross-checked against two **distance-based** rules that do not rely on slide conventions:

- **Extron videowall rule** — ≥1 inch of letter height per 15 ft of viewing distance. A 50 ft back row
  needs ~3 in letters (≈40px+ here).
- **DIN 1450 visual-angle method** — at 1 m viewing distance, x-height ≥ 3 mm (≈ 16pt Arial); multiply
  by distance in metres.

All three methods agree: **anything in the teens of px is far below legible** for a conference room, and
~24px is already marginal. The exact floor depends on the Java-stage room (screen size + back-row
distance), which is unknown — but the verdict below holds across all three methods.

**Typeface choice is fine.** Inter (sans) + JetBrains Mono on a dark background is exactly what the
research recommends for projection. The problem is purely **size**.

---

## Bottom line

**The deck's entire type scale is pitched ~1.5–2× too small for projection.** It was authored as an HTML
page read on a monitor at arm's length, so its tokens are web-sized:

```
--type-body:    32px  = 16pt
--type-small:   24px  = 12pt
--type-mono:    24px  = 12pt
--type-eyebrow: 24px  = 12pt
```

The content-dense slides then override *even smaller* — down to **11–16px (5.5–8pt)** — to cram panels
in. **No body content anywhere in the deck reaches the 24pt (48px) minimum**; the body tier runs
**18–32px (9–16pt)**.

The heading / display hierarchy, by contrast, is genuinely good. So this is not a few stray small labels
— it is a **structural mismatch**, worst on the slides carrying the most content.

### Size distribution (font-size declaration counts, all CSS)

```
 5.5–8pt  (11–16px)   ████████████████████████████  97 declarations
 8.5–10pt (17–20px)   ██████████████████████████     102
 10.5–12pt(21–24px)   ████████████████               70
 13–16pt  (26–32px)   ███████████                    48
 17pt+    (34px+)      ██████                          43
```

Over **half** of all text declarations sit at **≤10pt-equivalent**. The single most common sizes are
20px (46×), 18px (40×), 16px (32×), 22px (32×) — i.e. the body/content layer clusters at 8–11pt.

---

## 🔴 Critical — will not read past the front rows

Slides that put **content the audience must read to follow the argument** at **9pt-equivalent or below**.
Listed worst-first.

| # | Slide | Offending content | px | ≈pt | Note |
|---|---|---|---|---|---|
| 24 | **Act 5 — Feedback ladder** | tier units, module heads, tooling glosses, badges | **14–16** | **7–8** | Log body 21px is borderline; the meaningful labels around it are 7–8pt. |
| 23 | **Act 5 — Project story** | PR-metadata: `.sp-row-note/-val/-key`, tags, foot | **17–20** | **8.5–10** | Dense PR storytelling; the detail the speaker points at is 8.5–9pt. (PR title 28px is fine.) |
| 22 | **Act 5 — Black-box tests** | code panel `.panel-body.code` | **18** | **9** | Code the speaker walks through, at 9pt. Takeaway quote 30px is fine. |
| 16 | **Act 4 — Boundaries** | scope badges 15, panel / role annotations 16 | **15–16** | **7.5–8** | Annotations carry the point ("public API · compiler-checked") at 7.5–8pt. |
| 17 | **Act 4 — Leverage** | issue labels 14, cost label 16, inline code 18 | **14–18** | **7–9** | |

**Common thread:** every critical slide is **over-stuffed**. The fonts are small *because the content
does not fit otherwise*. Enlarging tokens alone will overflow these — so the order of operations is
**reclaim width first** (cut the slide padding / widen the inner container — see "Recommended path" step 2),
**then triage** only what still doesn't fit (fewer rows, split into two slides, wrap long lines, or
summarize the GitHub/IDE-UI mockups instead of reproducing them pixel-for-pixel).

> Against the project's own standing rule (console/terminal text ≥ 20px): much of the code/console here
> (13–18px) already **violates that floor** — and the 20px floor itself sits at 10pt, *below* the research
> minimum. Meeting the guidelines means going past the current rule, not just up to it.

---

## 🟡 Might pass — below ideal, plausibly legible in a medium room

Primary content in the **20–32px (10–16pt)** band. Short, high-contrast, or genuinely secondary text that
a front-to-middle audience in a modest room can likely read — but back rows will strain. Bump where cheap.

| # | Slide | Primary content | px | ≈pt |
|---|---|---|---|---|
| 12 | Act 3 — Legacy framing | signal list `.signals li` | **32** | **16** *(closest to acceptable of any content slide)* |
| 3 | About | project names 30, role line 26 | 26–30 | 13–15 |
| 10 / 11 | Act 3 — Amplifier (bad / good) | cards `.card .txt` | 26 | 13 |
| 9 | Act 3 — Show of hands | terminal lines 26–28, command 24 | 24–28 | 12–14 |
| 26 | Act 5 — XP reframe | practices list | ~28–32 | 14–16 |
| 29 | Act 6 — Q&A close | contact list | 26 | 13 |
| 20 / 21 | Act 5 — Specs / Failure-spec | code panels `.panel-body.code` | 22 | 11 |
| 13 | Act 3 — Flywheel | node titles 21 (callout 28) | 21 | 10.5 |
| 28 | Act 6 — Recap | pillar action labels | 24 | 12 |

The **persistent chrome rails** (top/bottom, 24px = 12pt) and **eyebrows / pills** (20–24px) are fine to
leave small *as long as they are decorative* — but watch for "pills" that actually carry information the
audience needs (issue numbers, status, `Open`/`Merged`), which graduates them into the critical tier.

---

## 🟢 Fine — meets or exceeds guidance

- **Slide titles** `.h-title` 72px (36pt); boot title 88px (44pt) ✓
- **Section divider numerals / hero stats** 104–200px (52–100pt) ✓
- **Recap pillar number** 168px ✓
- **h2** 56px (28pt); **subtitle** 44px (22pt — just under the 24pt body minimum, but acceptable for a subtitle) ✓

The heading / display hierarchy is well-judged. The fix is entirely in the body and content tiers.

---

## Recommended path

1. **Set a hard floor:** nothing the audience must read below **~28px (14pt)**; ideally lift body content
   toward **36–48px (18–24pt)** where it fits. Truly decorative chrome can stay at 20–24px.
2. **Reclaim width *first* — before shrinking fonts or cutting content.** The dense slides are short on
   *horizontal* room, and the cheapest space is the slide's own padding. The default `--pad-x: 120px`
   gutter on each side is generous for projection; pulling the content area wider lets type grow with no
   copy loss. **This is the first lever to reach for on any dense slide** — only triage (step 3) what still
   doesn't fit after the width is reclaimed.
   - **Keep the slide's left and right gutters EQUAL — always.** This is the non-negotiable rule:
     reducing the padding on *one* side only (e.g. trimming the right gutter while the title stays at
     `--pad-x` on the left) makes the whole slide read as lopsided/broken. *(Learned the hard way on
     slide 4: a first cut of `padding: 70px 56px 70px var(--pad-x)` — 120px left, 56px right — looked
     wrong immediately.)* Two safe shapes, both symmetric:
   - **Symmetric padding** — reduce `padding` equally on both sides (`70px 80px`, not `70px 56px 70px
     var(--pad-x)`) and rebalance the columns toward the dense side. The title/prose shift inward with
     the gutter, but the slide stays centered. This is what slide 4 ended on (120→80px each side,
     columns 55/45 → 50/50). Use when the title may move (a standalone slide).
   - **Symmetric negative margin** — if a header/title/tagline must stay aligned with sibling slides
     (e.g. the shared Act 4 header), leave the prose at `--pad-x` and widen **only the inner content
     container** with a negative horizontal margin applied to *both* sides (`margin: 0 -60px`). Slide 18's
     conveyor `.stage` did this to un-wrap the SKILL.md steps while the header/takeaway stayed put.
   - Caveat: a wider element that shares a grid row with auto-sized siblings can steal their track and
     reflow them (a 24px subtitle in the shared Act 4 header widened its `auto` column and re-wrapped the
     longer titles on slides 15–17). Re-check the whole slide with `snapshot:diff`, not just the element
     you touched.
3. **Triage what *still* doesn't fit** — slides are small *because* they are dense, and width alone won't
   always save them. The CI, field-notes, feedback-ladder and project-story slides reproduce GitHub/IDE UI
   at full fidelity; summarize instead of mirroring, or let long lines wrap (hanging indent) rather than
   truncate, so larger type fits.
4. **Lift the root tokens** (`--type-body` 32→48px, `--type-small`/`mono` 24→28–32px) *after* the dense
   slides are thinned, then sweep the per-slide px overrides.
5. Use the existing **`snapshot:baseline` → edit → `snapshot:diff`** loop (AGENTS.md workflow #2) to keep
   each pass honest. Note: a fresh worktree needs `npm install` before the screenshot/serve scripts run.

---

## Resolved

- **Slide 15 — Act 4 "AGENTS.md" (the Map pillar).** Resolved *upstream* by the
  Map·Roads·Guardrails refactor (#46), not by this audit pass — confirmed after
  rebasing the font-audit branch onto it. The old wall of 6–8pt callout
  descriptions and 6pt "quick-build tags" is gone: the slide was rebuilt as a
  three-gem map legend (golden path / known trap / local checkpoint). Smallest
  content is now 24px — callout labels and descriptions 24, AGENTS.md panel body
  22→24, takeaway 32 — with only genuine chrome (eyebrow, panel path, gem index
  numbers, "TAKEAWAY" label) left at 20px. Verified via full-res crops.

- **Slide 25 — Act 5 "Fabric8 CI" (case-study, 4 steps).** The substance of the
  case study — the runner-cost rows, the GitHub issue causes/dates, the badges —
  sat at 6.5–8.5pt, the most sub-8pt text in the deck. **Reclaimed width first:**
  cut the body gutter symmetrically 120→64px (matching the chrome bar's
  `--chrome-pad-x`, so the title now aligns with it and settles onto one line).
  With the room, lifted each card off the floor — **speed** (dark terminal):
  stability tags 14→18, run byline 17→20, module head 15→18, module rows 22→24,
  delivery footnote 14→17; **cost** (GitHub billing): sub 16→20, hero caption
  14→18, multiplier 16→20, and the demoted runner-SKU footer rows 13–14→17–18
  (mono `$/min` still fits one line); **bugs** (GitHub issues): issue titles
  22→25, the bug-cause prose 16→20, the closed/date/author column 13→18, labels
  12→16, the "31 closed" count 16→19, the "5+ were real production bugs" takeaway
  16/20→20/25. Tightened the speed-card body gap and issue-row padding to absorb
  the taller rows. Step 0 (intro) was already large; left it. Whole-deck
  `snapshot:diff` shows only this slide changed.

- **Slide 4 — Field notes (maintainer-desk collage).** The "these are real projects" proof
  was a wall of 6–9pt cards. Applied the playbook: **reclaimed width first** — cut the slide
  padding symmetrically (120→80px each side, gutters stay equal) and rebalanced the columns
  55/45 → 50/50, widening the notebook collage ~720→852px; then widened the repo cards
  (254→360px) and the sticky/console notes to match. With the extra room the fonts came up —
  repo names 18→21, repo-org/meta 13→16, console 16→19, CI label/pills 12–13→15–16, collage
  heading 20→22 — and the longest repo name ("kubernetes-mcp-server") now fits without
  truncating. Replaced the single-letter repo glyphs with the **real owner logos**
  (eclipse-jkube, containers, fabric8io, helm) via `<image-slot fit=contain>`, and gave the
  two cards that were missing a star count their real numbers (mcp-server ★1.6k, helm-java
  ★67) so all four read consistently. (Org sub-lines on the two longest paths still ellipsize —
  acceptable, the full repo name above carries identity. The `containers.png` mark has a baked-in
  wordmark that reads slightly busy at 38px; swap for a glyph-only asset if it bothers.)

- **Slide 18 — Act 4 "From prompt to skill" (SKILL.md conveyor).** Lifted the
  card content off the 6.5–10pt floor: RAMP prompt runs 24→30px; FAIL-card PR
  title 22→26, failing-CI checks 16→22, "0 humans" zeros 18→24; SKILL.md body
  20→24 with inline code 18→22; GREEN-card diff rows 15→20 and the 13px inline
  code (the deck's smallest) →18; shared panel-bar paths/pills 12–15→16–18. The
  SKILL.md card is the structural tight spot — a dense real file at half the
  conveyor width — so at 24px its long steps now **wrap onto a hanging-indented
  second line** (annotations preserved) instead of truncating. Reclaimed the
  width that costs by pulling the conveyor `.stage` wider than the prose column
  (`margin: 0 -60px`), keeping the header/tagline aligned with the rest of Act 4.
  Verified all four steps via crops; whole-deck `snapshot:diff` shows only this
  slide changed.

- **Slides 6 / 7 — Act 2 Old / New World (Gantt).** Block labels lifted from 14px (7pt) to 20–22px
  (10–11pt) — the readable ceiling for a time-proportional gantt at this scale. Reclaimed width by
  trimming margins (90→64px) and the dead lane gutter (200→150px symmetric, which also re-centered the
  track). Slide 6: widened the cramped chore blocks (Standup, Review PRs) by borrowing from the oversized
  "Implement feature #42". Slide 7: merged the 16-block "You" lane into 9 readable phases aligned to the
  agent timeline + spawn arrows, and moved the narrow agent follow-up tasks to outside-the-bar labels
  (the gap-filling gantt pattern) so they read at full size. Vertical overflow on slide 7 fixed.

---

## Sources

- [Beautiful.ai — what font size is best for presentations](https://www.beautiful.ai/blog/what-font-size-is-best-for-presentations)
- [Autoppt — PowerPoint minimum font size, best practices](https://autoppt.com/blog/powerpoint-minimum-font-size-best-practices/)
- [MagicSlides — guide to font size in presentations](https://www.magicslides.app/blog/guide-font-size-presentations-balance)
- [Slidor — minimum font size for PowerPoint](https://www.slidor.agency/blog/quelle-taille-de-police-minimum-pour-powerpoint)
- [Extron — font size and legibility for videowall content](https://www.extron.com/article/videowallfontsize)
- [legibility.info — font size calculator (DIN 1450 visual-angle method)](https://legibility.info/font-size-calculator)
