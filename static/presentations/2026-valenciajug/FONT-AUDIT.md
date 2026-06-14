# Font Readability Audit — Valencia JUG 2026 Deck

> Talk: *"Turning Your Java Project Into an AI-Ready Codebase"* — Valencia JUG, Meetup @ Xplore Group, 18 Jun 2026.
> Audit scope: every `<section>` in `index.html` + all 24 `styles/s-*.css` files, plus a live
> `npm run audit:fit` walk of all (section, step) states.
> Question: will the text be readable when projected on a conference screen?
>
> **Inherited from `2026-devtalks-romania`.** This deck is a fork; the re-theme changed **colors only**, not
> font sizes or layout, so the Romania findings below carry over unchanged. Re-run `npm run audit:fit` after
> any further edits to confirm nothing regressed.
>
> **Status:** remediation complete (inherited). The deck clears its adopted **24px (12pt) must-read floor** —
> the 🔴 Critical list is empty and no must-read content is clipped. Every sub-24px run that remains is chrome
> or reference-mockup texture (see Bottom line + 🟡). Optional polish is in Next actions.

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

**The deck now clears its adopted legibility floor: every must-read tier sits at ≥ 24px (12pt), and
nothing the audience must read is clipped.** That is the outcome of a slide-by-slide remediation (logged
under **Resolved**). At the start of this audit the type scale was pitched ~1.5–2× too small for
projection — authored as an HTML page read at arm's length, with web-sized root tokens:

```
--type-body:    32px  = 16pt      ← root tokens, still web-sized (see Next actions #3)
--type-small:   24px  = 12pt
--type-mono:    24px  = 12pt
--type-eyebrow: 24px  = 12pt
```

…and the dense slides overrode those *smaller still* — down to **11–16px (5.5–8pt)** to cram panels in.
Every one of those slides has since been lifted: width reclaimed first, then type raised to the floor,
then long lines wrapped or mockups thinned where width alone didn't pay for it. The root tokens above were
**deliberately left web-sized** — lifting them globally would reflow every slide at once, so each slide
overrides to the floor locally instead. That is cosmetic debt, not a live problem: no slide renders at the
token default.

**The floor is 24px (12pt), not the 28–48px research ideal — a deliberate, documented choice.** This is a
content-dense technical deck: live Java, real GitHub/CI artifacts, time-proportional gantts. On the hardest
fits (slide 22's three Java columns, the CI / feedback mockups) clearing 28px would mean dropping the very
artifact that *is* the argument. 24px matches the deck's own subtitle size and is the pragmatic floor the
whole deck is now tuned to. The gap to the research ideal is real and tracked, not accidental.

### Current state — `npm run audit:fit --floor 24` walks all 49 (section, step) states

| Metric | Count | What it actually is |
|---|---|---|
| Overflow findings | 17 | **0 clip must-read content** — all benign (see Next actions #2) |
| Runs below 24px | 1116 | almost entirely chrome / mockup texture (below) |
| Smallest run | 12px / 6pt | slide 7's "Pull Quote" masthead — decoration |

Below-floor runs by size (rendered text runs, summed across all 49 states):

```
12–14px      6     decorative masthead · glyphs · snippet tags
15–16px    106     GitHub · CI · gantt mockup texture (paths, pills, sub-labels)
17–19px    136     panel chrome · status pills · mockup metadata
20–21px    237     eyebrows · panel-bar file paths · scope badges
22–23px    631     persistent chrome rails (nav + footer) · secondary code lines
```

The histogram looks alarming until you see **what** those runs are. The 631 at 22–23px is dominated by the
**persistent chrome rails** (top nav + bottom footer, 22px, counted once per state × 49 states); the 237 at
20–21px is **eyebrows + panel-bar file paths**. Strip those and what's left below 24px is **GitHub / CI /
IDE / gantt mockup texture** — file-path tabs, status / label pills, lane sub-labels — kept deliberately
modest so a reference mockup never outgrows its stage band (documented per-slide under Resolved). **No
genuine must-read content — a title, prose, code the speaker walks, data the audience reads — sits below
the floor.**

---

## 🔴 Critical — will not read past the front rows

**None remaining.** Slide 22 (Act 5 — Black-box tests) was the last entry; its three Java columns now sit
at the **24px (12pt)** floor (see Resolved). Every slide that landed here was **over-stuffed** — the fonts
were small *because the content did not fit otherwise* — so the order of operations was always **reclaim
width first** (cut the slide padding / widen or rebalance the inner container), **then triage** only what
still doesn't fit (narrow a column, wrap long lines, drop redundant chrome, or summarize a UI mockup
instead of reproducing it pixel-for-pixel). That playbook cleared the Critical list.

---

## 🟡 Residual sub-floor — chrome, mockup texture, and a few judgment calls

The old "might pass" table is retired: every content slide it listed (3, 9, 10/11, 12, 22, 26, 28, 29) now
renders its must-read tier at ≥ 24px. What's left below the floor is **not must-read prose or code** — it's
the decorative and reference-texture layer prior passes deliberately kept modest. Listed so the calls stay
explicit, not forgotten.

**Settled (intentionally below 24px, leave as-is):**

- **Persistent chrome rails** — top nav + bottom footer at 22px (≈ 11pt). Decorative wayfinding, identical
  on every slide; sizing them as content would crowd the stage.
- **Eyebrows** (`// act 0N · …`) at 20px and **panel-bar file paths** at 18–20px — orientation chrome.
- **GitHub / CI / IDE / gantt mockup texture** — status & label pills (`Open`, `Merged`, `✓ passing`,
  `flaky`), repo / ref lines, lane sub-labels, billing footnotes at 13–20px on slides 4, 9, 16–18, 23, 25.
  These read as a *faithful screenshot* of the real artifact; blown up to 24px each mockup card would
  outgrow its stage band and stop reading as a screenshot. Documented per-slide under Resolved.

**Judgment calls (content-adjacent — lift only if a venue rehearsal shows strain):**

| Slide | Run | px | Note |
|---|---|---|---|
| 24 | `.sw-task` line ("one button-label change. one feedback cycle") | 18 | borderline must-read; sits inside the legacy-panel texture |
| 24 | `☠ legacy` status pill | 16 | carries the framing, but reads as a status badge |
| 9 | `FAILED` badge in the agent.log card | 14 | the log's punchline; small but high-contrast on dark |
| 25 | `⚙ async` badge | 15 | labels the runner mode; mockup chrome |
| 3 | language pills (`Java`, `Go`, `JavaScript`) | 16 | repo-card texture on the About slide |

All five are short, high-contrast, and sit *inside* an artifact the speaker narrates aloud, so the room
hears them even if a back-row eye strains. Bumping any is cheap; none is worth a pre-emptive reflow.

---

## 🟢 Fine — meets or exceeds guidance

- **Slide titles** `.h-title` 72px (36pt); boot title 88px (44pt) ✓
- **Section divider numerals / hero stats** 104–200px (52–100pt) ✓
- **Recap pillar number** 168px ✓
- **h2** 56px (28pt); **subtitle** 44px (22pt — just under the 24pt body minimum, but acceptable for a subtitle) ✓

The heading / display hierarchy is well-judged. The fix was entirely in the body and content tiers — and
it is done.

---

## Next actions

The deck is **talk-ready** at the 24px floor. What remains is optional polish, in priority order:

1. **Nothing blocking.** Every must-read tier clears 24px; no must-read content is clipped. If the talk
   were tomorrow, the type is fine.
2. **The 17 `audit:fit` overflow findings are all benign — verified by DOM probe, not assumed.** They split
   into four kinds: *accepted ellipsis* (slide 1 boot-log source; slide 4's two longest repo-org sub-lines
   — the full repo name above carries identity); *deliberate animation window* (slide 15's `fname-cycle`
   rolls `AGENTS.md → CLAUDE.md → … → .cursorrules` through a 24px viewport — the 99px "overflow" is the
   stack of frames); *phantom trailing-margin* (slides 10 / 11 / 13 report the `<section>` ~29px over and
   slide 28 reports each recap pillar 22px over — probed leaf-by-leaf: **no visible text line is cut**, the
   excess is bottom padding / a pseudo-element below the last line); and *sub-10px cosmetic clips* (slide 7
   gantt "Spawn" 9px + "Regression + cleanup" 6px; slide 24-step1 legacy-panel 5px). If you want `audit:fit`
   to print a clean zero, trim the trailing padding on the recap pillars (28) and the Act-3 sections
   (10 / 11 / 13) — purely to silence the checker, since nothing is visibly clipped.
3. **Optionally lift the root tokens** (`--type-body` 32→48, `--type-small` / `mono` / `eyebrow` 24→28) so
   *new* slides inherit a projection-safe default instead of relying on a per-slide override. This is
   debt-paydown, not a fix: every existing slide already overrides above the tokens, so it changes nothing
   on screen today. Do it **after** the talk — a pre-talk token bump would reflow all 29 slides at once.
4. **Re-run the gate after any content edit:**
   `npm run audit:fit -- http://localhost:$(cat .live-server.port)/presentations/2026-devtalks-romania/ deck --floor 24`
   The deck passes today (0 must-read content below the floor). Treat a new sub-24px *content* run — not
   chrome, not mockup texture — as a regression to fix before commit.

---

## The playbook (the path that was walked)

This is the order of operations the Resolved passes followed. Kept as a record — and as the recipe for any
future dense slide.

1. **The floor is 24px (12pt)** — the deck's own subtitle size, and the size every must-read tier is now
   tuned to. **28px (14pt) stays the research ideal:** reach for it where width permits, but it is not the
   bar the deck is held to (the dense artifact slides can't clear it without dropping the artifact itself).
   Truly decorative chrome stays at 20–22px.
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
   slides are thinned, then sweep the per-slide px overrides. **Deferred** — the per-slide overrides did the
   work instead, so the tokens stay web-sized while no slide renders at the default. Tracked as optional
   debt-paydown in Next actions #3; do it post-talk to avoid a full-deck reflow.
5. Use the existing **`snapshot:baseline` → edit → `snapshot:diff`** loop (AGENTS.md workflow #2) to keep
   each pass honest. Note: a fresh worktree needs `npm install` before the screenshot/serve scripts run.

---

## Resolved

- **Slide 22 — Act 5 "Black-box tests: the unit is behavior" (3 steps).** The
  deck's last 🔴 Critical slide, and its signature opinion: three side-by-side
  dark terminals — white-box test (mocks + verify chain) · SUT (production
  method) · black-box test (RestAssured + outcome assert) — choreographed
  cause→effect→contrast. The code the speaker walks through line-by-line sat at
  **18px (9pt)**, the smallest must-read content in the deck, with the panel-bar
  tabs / status pills / micro-gloss / card-foot all at 18px too. Three columns of
  real Java is the hardest fit in the deck, so the lift combined every lever:
  **(1) reclaimed width** — pulled the `.stage` symmetrically wider than the body
  gutter (`margin: 0 -40px`, the slide-18 pattern) while the header + tagline stay
  aligned with the chrome; **(2) rebalanced the columns** — the CENTER (SUT) card
  carries only a short method, so it was narrowed (`minmax 1.5fr / 1fr / 1.5fr`)
  and the freed width handed to the two test cards that hold the long lines;
  **(3) lifted the type to the 24px floor** — code body **18→24** (lh 1.42→1.35),
  micro-gloss / card-foot / foot-glyph 18→24, panel-bar paths + status pills
  18→24, tagline chips 18→24; **(4) wrapped the two stubborn lines** rather than
  truncate — the CENTER generic signature (`void delete(Class<T> type, String
  name)`) splits its params, and the RIGHT `assertThat(...)` fluent chain wraps
  after `k8s.pods()`; **(5) reclaimed vertical room** — removed the redundant
  eyebrow (`// act 05 · the unit shifts`, duplicated by the chrome-top act label),
  dropped the cosmetic traffic-light window dots from all three bars (the width
  went to the badges), and collapsed inter-statement blank lines to compact gaps;
  **(6) fixed the step-2 footer crowding at the root** — the body's stage row was
  a plain `1fr`, whose minimum resolves to the tallest card's content, so when the
  white-box card grows at step 2 (its diff adds the removed/added lines) the row
  claimed the height and starved the tagline's `auto` row down to its min-height,
  spilling the chips toward the chrome bar. Changed it to `minmax(0, 1fr)` so the
  stage row yields height back to the tagline — the cards are imperceptibly
  shorter, no code clips (verified all 3 steps), and the removed `-` lines stay at
  the full 24px rather than being shrunk; **(7) un-clipped the CENTER badge** — the
  narrow SUT card could not fit its long `△ refactor applied` pill beside the file
  path, so the pill is lifted out of the bar and stamped over the free space above
  the code (the bar keeps just the path).
  Folded in three code-correctness fixes spotted along the way: the black-box
  `@DisplayName` now states the action (`"DELETE removes the pod"`); the white-box
  test gained an `@ExtendWith(MockitoExtension.class)` + `class PodServiceTest {
  … }` wrapper so it reads as a sibling of the black-box `class PodBehaviorIT { …
  }` (and its `@Mock`/`@InjectMocks` are actually wired); the two test cards are
  now structurally parallel. Verified with `audit:fit`: **0 overflow / 0 below the
  24px floor across all 3 steps** (was 18px/9pt, smallest in the deck). Whole-deck
  `snapshot:diff` shows only slide 22 changed (all 3 steps). Change isolated to
  `s-blackbox.css` + the slide-22 section of `index.html`. **One caveat, stated
  plainly:** 24px is **12pt** — the deck's adopted *pragmatic* floor, not the 28px
  (14pt) must-read ideal. Three columns of real Java is the deck's hardest fit, and
  clearing 28px would mean dropping a column or the side-by-side contrast that is the
  whole argument — which is exactly why 24px became the floor the whole deck is tuned
  to (see Bottom line). **This was the last 🔴 Critical slide — the list is now clear.**

- **Slides 20 / 21 — Act 5 "Specs vs Tests" + "Failure-spec" (2 steps each).**
  The two sibling code-panel slides: a spec.md excerpt beside its enforcing
  JUnit `@Test` with an inline BUILD FAILED console (20), then a
  `@Nested`/`@DisplayName` test beside the Surefire failure tree it produces
  (21). The code the speaker walks through line-by-line sat at 22–23px (11pt),
  with panel-bar file-paths and the advisory/enforced pills at 18 and the
  console/caption sub-lines at 20. Lifted the must-read tiers and tightened the
  (loose) code line-height to pay for the growth — no width reclaim or content
  cut needed. **Slide 20:** spec body 22→24 (lh 1.5→1.4), spec inline code
  22→24, spec comments 21→22, test code 23→**25** (lh 1.5→1.4), BUILD FAILED
  console 22→24 (lh 1.5→1.4) with its failing-test sub-line and "what the agent
  sees" foot 20→22; advisory/enforced pills 18→20, panel-bar paths 18→20,
  takeaway label 18→20 and sub-line 20→22. **Slide 21:** left test-file code
  20→22, failure-tree body 22→24, the AssertJ `.as(...)` description and
  expected/actual rows 22→24, the "running…" stub 22→24, surefire sub /
  tree-foot 20→22; nested/broken pills 18→20, panel-bar paths 18→20, takeaway
  label 18→20 and sub-line 20→22. Left the already-fine display tier untouched
  (titles, the bright failure leaf 30, scenario rows 24, the Inter spec prose
  26, takeaway quotes 30/32) plus the decorative "vs" divider (18). Smallest
  remaining text is the 18px "vs" badge (pure decoration) and 20px genuine
  chrome — file-path tabs, the advisory/enforced + nested/broken pills, the
  eyebrow and takeaway labels (the same call made for the other dense Act-5
  mockups). Verified deterministically with the new `audit-fit` checker
  (overflow + font-floor walker, no networkidle): **0 overflow / 0
  out-of-bounds on both slides at both steps**, smallest must-read code now
  22–25px. Change isolated to `s-specs-vs-tests.css` + `s-failure-spec.css`.

- **Slide 17 — Act 4 "Leverage" (shape the work upstream, 2 steps).** The
  economics-of-delegation slide: a principle column (spend the expensive model
  once → cheap execution that runs N times) beside a real, detailed GitHub issue
  (helm-java #351) as the proof artifact. Content sat at 7–9pt — issue labels and
  the "Open" status pill 14, cost labels and the GitHub bar 16, inline code / ref
  line 18, the flow-arrow connector 19. Width was already reclaimed in the Act-4
  header pass (64px chrome-bar gutter), so this was a straight lift into existing
  room, no triage needed. **Principle column** (the must-read argument): cost
  amount 23→26 (expensive 25→28), cost label 16→20, band heading 23→24, work
  description 20→22, implementer rows 21→22 (icon 19→20), flow-arrow 19→22 (glyph
  24→26), spec-hint 18→22. **GitHub-issue artifact** (illustrative texture, kept
  deliberately modest so the card doesn't outgrow the stage band): panel-bar 16→18
  (icon 18→20), "Open" pill 14→18, labels 14→18, issue body 20→22, inline code
  18→20, ref line 18→20 (ref code 16→18); issue title left at 24 (already fine).
  **Takeaway label** 16→20. Smallest remaining text is 18px (9pt) and only on the
  GitHub-mockup chrome — the status/label pills and the ref-impl inline code —
  which read as faithful GitHub texture rather than must-read prose (the same call
  made for slide 25's issues panel). Change is isolated to `s-leverage.css`
  (git-confirmed single file). Both steps share the identical issue-card layout
  (step 1 only lights the cheap band via opacity), and the type geometry leaves
  each stage column (~500px) comfortably inside the stage band (~680px) — no
  overflow. (A pixel capture via `screenshot`/`snapshot:diff` was blocked this
  session by a Playwright `networkidle` timeout against the dev server; worth a
  quick eyeball when the tool is healthy.)

- **Header vertical alignment — Act 4 + Act 5 (slides 15–18, 20–25).** The
  title/subtitle header is a 2-col grid (`title 1fr | sub auto`). It was
  `align-items: end`, which bottom-aligns the 1-line subtitle to the title's
  descender — so on a 2-line title + 1-line sub (e.g. slide 21, slide 24-step1)
  the sub sagged to the bottom line and read as off-axis. Earlier passes patched
  this per-slide with a `position: relative; top` baseline nudge (12px Act 4, 10px
  Act 5). **Replaced that whole approach with `align-items: center`** and removed
  every nudge + sub margin: the subtitle now centers on the title's vertical
  midline regardless of how many lines either has. Verified with a geometry probe —
  subtitle midpoint == title midpoint (Δ=0) on all ten slides, 1- and 2-line
  titles, every step. `snapshot:diff`: only 15–18 + 20–25 changed. Most are
  0.1–0.2% (pure subtitle shift), but slides 15–18 and 25 run 2–4.5% because
  dropping the sub's bottom margin also shrank the header's first grid row (sub
  shares it with the eyebrow), pulling the whole stage up a few px — the diff grows
  with step count on the conveyor (18) and CI (25). Confirmed no overflow on the
  densest stepped states (18-step3 conveyor + SKILL.md hanging indents intact;
  25-step3 GitHub-issues panel + takeaway clear of the chrome). Dividers (14/19)
  untouched. (This is also why slide 24's step-1 title now sits where it does — it
  still wraps to two balanced lines at the uniform 24px sub, see below, but the
  whole header now centers as one unit.)

- **Act 5 subtitle uniformity (slides 20–25).** The Act-5 content slides shared a
  similar header but their subtitles had drifted: prefixed with a code-comment
  `// ` (21/22/23/24/25 — slide 20 was already clean), scattered sizes (20→26px,
  21→24, 22→22, 23→24, 24→20, 25→22), and the same title-baseline float Act 4 had
  (the title's tight `~1.06` line-height lets glyphs overflow the line box, so the
  grid-bottom-aligned sub floats high). Fixes: **removed the `// ` prefix** from
  every header subtitle (eyebrows keep their `// ` — that's the deck-wide eyebrow
  style, Act 4 too); **unified subtitle size to 24px** (kept Act-5's existing
  `line-height: 1.3`). The vertical alignment was first done as a per-slide
  baseline nudge (`position: relative; top`), then **superseded deck-wide by
  `align-items: center`** — see the "Header vertical alignment" entry below, which
  also removed those nudges. Gutters/titles/stages left as-is (the slides already
  read as a set). Slide 26 ("Did I just advertise XP?") has no eyebrow/subtitle —
  left alone.
  **One consequence the wider sub caused:** on slide 24 (feedback ladder), the
  step-1 title ("An agent is only as fast as the *feedback loop*.") is the longest
  in Act 5, and beside a uniform 24px subtitle it genuinely no longer fits one line
  (~155px over the available title column). The deficit is too large to claw back
  by tightening the header gap, so this title now **wraps to two lines** — which is
  fine and in-family (the deck already has 2-line titles: slide 21, and slide 24's
  own step-0 title). Gave it `text-wrap: balance` so it splits evenly ("An agent is
  only as fast" / "as the feedback loop.") with the accent phrase intact instead of
  orphaning a trailing "loop." on its own line. The 2-line header sits taller and
  shifts the 5-rung ladder down — all rungs still render with no overflow. (Chosen
  over the alternatives of shrinking only this title below its siblings or exempting
  it from the uniform 24px.) (Slides 22/25 still carry separate *content* offenders
  on the Critical list — code panel, etc. — own passes.)

- **Act 4 header uniformity (slides 15 / 16 / 17 / 18).** The four content slides
  share a `title (1fr) | sub (auto)` header but had drifted: subtitle 20px on 17
  vs 24px on 15/16/18, top padding 34 vs 36, gutters 64 (16) vs 120 (15/17/18),
  and slide 18 reclaimed width with a `.stage { margin: 0 -60px }` hack while its
  header stayed at 120. Unified all four to: **64px gutter** (chrome-bar width —
  also widens each stage and aligns the title to the chrome), **36px top**,
  **subtitle 24px / line-height 1.45**. Slide 18's negative-margin hack was
  dropped (the 64px body gutter now gives the conveyor the same width the −60px
  used to; cards + SKILL.md hanging-indents unchanged). Also fixed the **title↔
  subtitle vertical alignment**: the title's tight `1.06` line-height floats the
  grid-bottom-aligned subtitle ~12px above the title baseline, so the sub gets
  `position: relative; top: 12px` (visual only — stays out of grid track sizing,
  so titles and stages don't move) to drop its last line onto the title baseline.
  Uniform across all four. The **Act-4 section divider (14)** was deliberately
  left at the 120px gutter — it belongs to the cross-act divider family (3/4/5/6),
  so trimming only Act 4's would break *that* consistency. Bottom paddings left
  per-slide (tagline breathing room, content-driven). `snapshot:diff`: only
  15–18 changed. (Slide 17's *content* offenders — issue labels, cost label,
  inline code — are a separate pass; it stays on the Critical list until then.)

- **Slide 16 — Act 4 "Boundaries" (Maven modules as boundaries, 2 steps).**
  A lighter touch than the dense Act-5 slides: the content tier was already
  ≥20px (trees 22, role notes 20, panel bodies/captions 20, PR title 21), so
  the audit's "annotations 16px" figure was **stale** — the genuine sub-floor
  offenders were the per-step *scope badge* (15px — and it carries the slide's
  punchline, "no module boundaries" → "the change has a home", so it's content,
  not chrome) plus the panel/GitHub-bar chrome (14–16). First pass (no width
  reclaim): scope badge 15→20, tree-panel path 16→20, role notes 20→22,
  problem-panel econ key 16→18, GitHub bar 16→20 (icon 18→20), merged pill 14→18,
  PR title 21→22, diff inline code 18→20, takeaway label 16→18. Left the avatar
  glyph (icon, not text) and the already-fine display tier.
  **Second pass — header subtitle 20→24** (matching the #46-refactored slide 15,
  which sets the Act-4 target; 16 and 17 were the 20px laggards). The header grid
  is `title (1fr) | sub (auto)`, so the wider 24px subtitle stole title width and
  wrapped "Make Java boundaries / obvious." onto two lines — the exact caveat
  noted in step 2 of the playbook. Fix: reclaimed width by trimming the
  body gutter 120→64px (chrome-bar width, gutters equal), which un-wraps the title
  and aligns it to the chrome. This *does* shift slide 16's title left of slide 15
  (still at 120px, short sub) — consistent instead with the deck's dominant
  reclaimed-gutter slides (4, 13, 18, 23–25); slide 17 gets the same treatment so
  the 16/17 pair stays aligned. Whole-deck `snapshot:diff` shows only this slide
  changed.

- **Slide 24 — Act 5 "Feedback ladder" (fast feedback loops, 2 steps).** The
  deck's worst offender — the tier scale labels, tooling glosses, cadence cues,
  badge units and the collapsed-bar mini-stats sat at 7–8pt. This slide still
  carried the **full 120px default gutter**, so the biggest lever was width:
  trimmed the body gutter 120→64px (matching the chrome bar, gutters equal),
  reclaiming ~112px for the dense step-1 ladder. With that room, lifted the
  content tier — **ladder rungs:** tier label 21→24, scale line 15→18, arrow
  18→20, gloss 16→20, cadence 16→20, badge unit 15→18 (anno already fine at 26,
  badge num at 34, left as-is); **collapsed legacy bar:** panel-bar path 15→18,
  status pill 13→16, mini-stat 14→18, badge-time 15→18; **step-0 hero:** WebLogic
  log 21→23, stopwatch unit 18→20, stopwatch task 14→18, anchor line 22→24;
  **tagline chips** 15→18. Widening the type pushed the longer scale labels
  ("your app · booted · in-process") onto a second line, so widened the rung's
  tier track (`minmax(140px, 0.85fr)` → `minmax(160px, 1.1fr)`, giving back from
  the roomy annotation column) to keep every scale on one line; all glosses /
  annos / cadences stay single-line with no ellipsis. Both steps fit with no
  overflow. Whole-deck `snapshot:diff` shows only this slide changed (step-1
  reflowed substantially — width reclaim + wider tier track + larger type).

- **Slide 23 — Act 5 "Project story" (YAKD PR #172, 2 steps).** The PR-storytelling
  detail the speaker points at — the grunt-work upgrade rows (`.sp-row-key/-val/-note`),
  the panel tags/heads/foots, the PR metadata, and the contract panel's chips/connector
  — sat at 8.5–10pt. Unlike the truly dense Act-5 slides this one had **abundant slack**
  in both axes (both story panels were half-empty below their content), so the fix was to
  **grow into it** rather than triage. Trimmed the body gutter 72→64px (matching the chrome
  bar, gutters kept equal) for a little extra width and title alignment, then lifted the
  content tier: grunt-work rows — key 20→26, value 19→26, note 17→22; panel heads — label
  20→24, tag 17→22, glyph/mono base 19→24; panel foots 18→22; PR card — bar 19→24, merged
  pill 16→19, meta line (issue refs/date) 18→22; header sub 22→24; contract panel —
  headline 24→26, chip-name 20→26, chip-intent 18→22, connector 17→22, sigma-soft 18→22.
  Left untouched the already-fine display tier (title 60, PR title 28, sigma label 30,
  takeaway quote 30). The grunt-work foot's parallel "compiler steered the renames · tests
  steered the behavior" line was split across two stacked `.foot-line`s (dropping the now-
  redundant "·") so it reads as a clean parallel pair using the vertical slack, instead of
  wrapping a dangling "behavior" at the wider type. All rows still fit one line; no overflow
  in either panel at either step. Whole-deck `snapshot:diff` shows only this slide changed.

- **Slide 13 — Act 3 "AI-readiness flywheel" (the diagram).** Not Critical (it
  was in the yellow tier), but the diagram text was needlessly small given how
  much empty space the slide has — the opposite problem from the dense slides.
  The four node cards carried their labels at 21px and their mono sub-lines at
  **14px (7pt)**. Rather than shrink, **grew into the slack** — and reclaimed
  width the same way the dense slides do: cut the slide gutter symmetrically
  120→64px (matching the chrome bar) so the wheel column widened, then let the
  wheel fill it (`width: 100%`, was a fixed 940px) so the side cards spread out
  and clear the center "Compounding AI leverage" label with room to spare. With
  that room, widened the node cards (340→460px) and lifted the type — node titles
  21→26, node subs **14→20**, leader-strip numbers 22→26, center label 28→32,
  eyebrow 22→24, Java hint chips 17→20. Subs still sit on one line (verified
  node-by-node); no card overlaps the ring center. Also retitled node 3 "Agents
  become safer" → "…safer & faster" (still one line at 460px). `snapshot:diff`
  shows only this slide changed.

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
  **Update (five cards):** added **YAKD** (`manusa/yakd`) as a fifth card pinned on top in the
  centre of the page — same construction (and therefore the same height) as the four grid cards,
  just narrower (312px). Its four corners peek over the inner corners of the 2×2 grid, dipping only
  into each card's blank padding so no text is covered. To make room, trimmed the body padding
  (70→44px) to give the notebook more height, and widened the grid cards 360→392px so repo names
  could come up **21→24px** (12pt) while the longest name still fits on one line. The two rows are
  spaced so the central gap is a touch under one card-height, which lets a single card-height YAKD
  reach both rows for the corner overlaps. Then **distributed the seven groups evenly down the
  page** (title → annotation → cards → annotation → post-it/console → annotation) — the cluster had
  been squashed to the top with the handwritten notes jammed against the cards (a-top↔cards was
  7px, a-mid↔console 1px). Translated the card block down as a unit (preserving the overlaps) and
  re-spaced the bottom so each column reads in an even ~40–45px rhythm, and bumped the Caveat
  annotations 32/34/36 → **36/38/40px** for more presence. Verified heights are consistent, the
  per-column gaps are even, and overlaps land off every name/meta box (DOM measurement);
  `snapshot:diff` shows only this slide changed.

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
