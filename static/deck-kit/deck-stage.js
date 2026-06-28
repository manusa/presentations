/**
 * <deck-stage> — reusable web component for HTML decks.
 *
 * Handles:
 *  (a) speaker notes — reads <script type="application/json" id="speaker-notes-tag">
 *      and posts {slideIndexChanged: N} to the parent window on nav.
 *  (b) keyboard navigation — ←/→, PgUp/PgDn, Space, Home/End, number keys.
 *  (c) press R to reset to slide 0 (with a tasteful keyboard hint).
 *  (d) bottom-center overlay showing slide count + hints, fades out on idle.
 *  (e) auto-scaling — inner canvas is a fixed design size (default 1920×1080)
 *      scaled with `transform: scale()` to fit the viewport, letterboxed.
 *      Set the `noscale` attribute to render at authored size (1:1) — the
 *      PPTX exporter sets this so its DOM capture sees unscaled geometry.
 *  (f) print — `@media print` lays every slide out as its own page at the
 *      design size, so the browser's Print → Save as PDF produces a clean
 *      one-page-per-slide PDF with no extra setup. `data-deck-present-skip`
 *      slides print normally — they're dropped from live nav, not the deck.
 *  (g) thumbnail rail — resizable left-hand column of per-slide thumbnails
 *      (static clones). Click to navigate; ↑/↓ with a thumbnail focused to
 *      step between slides; drag to reorder; right-click for
 *      Move up / Move down / Delete (opens a Cancel/Delete confirm
 *      dialog). Drag the rail's right edge to resize; width persists to
 *      localStorage. The rail is suppressed in presenting mode, in the
 *      host's Preview mode (ViewerMode='none'), on `noscale`, and via the
 *      `no-rail` attribute. Rail mutations dispatch a `deckchange`
 *      CustomEvent on the element: detail = {action, from, to, slide}.
 *
 * Present-skip — a section authored with `data-deck-present-skip` is hopped
 * over by prev/next navigation *only while presenting* (standalone
 * fullscreen, or a host posting __omelette_presenting). Off-stage it stays a
 * normal, navigable slide carrying a "Skipped" watermark, and it prints to
 * PDF like any other slide. Use it to drop a slide from one delivery (e.g. a
 * shorter conference slot) without removing it from the deck or the handout.
 *
 * Slides are HIDDEN, not unmounted. Non-active slides stay in the DOM with
 * `visibility: hidden` + `opacity: 0`, so their state (videos, iframes,
 * form inputs, React trees) is preserved across navigation.
 *
 * Lifecycle event — the component dispatches a `slidechange` CustomEvent on
 * itself whenever the active slide changes (including the initial mount).
 * The event bubbles and composes out of shadow DOM, so you can listen on
 * the <deck-stage> element or on document:
 *
 *   document.querySelector('deck-stage').addEventListener('slidechange', (e) => {
 *     e.detail.index         // new 0-based index
 *     e.detail.previousIndex // previous index, or -1 on init
 *     e.detail.total         // total slide count
 *     e.detail.slide         // the new active slide element
 *     e.detail.previousSlide // the prior slide element, or null on init
 *     e.detail.reason        // 'init' | 'keyboard' | 'click' | 'tap' | 'api'
 *   });
 *
 * Persistence: none at the deck level. The host app keeps the current slide
 * in its own URL (?slide=) and re-delivers it via location.hash on load, so a
 * bare load with no hash always starts at slide 1.
 *
 * Usage:
 *   <style>deck-stage:not(:defined){visibility:hidden}</style>
 *   <deck-stage width="1920" height="1080">
 *     <section data-label="Title">...</section>
 *     <section data-label="Agenda">...</section>
 *   </deck-stage>
 *   <script src="../../deck-kit/deck-stage.js" defer><\/script>
 *
 * The :not(:defined) rule prevents a flash of the first slide at its
 * authored styles before this script runs and attaches the shadow root.
 *
 * Slides are the direct element children of <deck-stage>. Each slide is
 * automatically tagged with:
 *   - data-screen-label="NN Label"   (1-indexed, for comment flow)
 *   - data-om-validate="no_overflowing_text,no_overlapping_text,slide_sized_text"
 */

(() => {
  const DESIGN_W_DEFAULT = 1920;
  const DESIGN_H_DEFAULT = 1080;
  const OVERLAY_HIDE_MS = 1800;
  const VALIDATE_ATTR = 'no_overflowing_text,no_overlapping_text,slide_sized_text';

  const pad2 = (n) => String(n).padStart(2, '0');

  // Declarative step reveals. Three opt-in attributes on any <section>
  // descendant declare reveal behavior inline; deck-stage auto-derives the
  // section's data-step-max from them and toggles the boolean [data-revealed]
  // hook per the current 0-based data-step:
  //   data-reveal="k"        shown when step >= k   (Gatsby's "from")
  //   data-reveal-only="k"   shown when step === k  (Gatsby's "in")
  //   data-reveal-until="k"  shown when step <= k   (Gatsby's "until")
  // Listed in precedence order — an element should carry at most one; if it
  // carries several, the first present here wins.
  const REVEAL_ATTRS = ['data-reveal', 'data-reveal-only', 'data-reveal-until'];

  // A reveal index is a non-negative integer (0 is valid; "always visible" is
  // expressed by omitting the attribute, not by data-reveal="0"). Anything
  // else (non-integer, negative, empty) → null so the caller ignores the
  // attribute and warns.
  const parseRevealK = (raw) => {
    const s = (raw == null ? '' : String(raw)).trim();
    if (!/^\d+$/.test(s)) return null;
    return parseInt(s, 10);
  };

  // Label precedence: data-label → data-screen-label (number stripped) → first heading → "Slide".
  const getSlideLabel = (el) => {
    const explicit = el.getAttribute('data-label');
    if (explicit) return explicit;

    const existing = el.getAttribute('data-screen-label');
    if (existing) return existing.replace(/^\s*\d+\s*/, '').trim() || existing;

    const h = el.querySelector('h1, h2, h3, [data-title]');
    const t = h && (h.textContent || '').trim().slice(0, 40);
    if (t) return t;

    return 'Slide';
  };

  const stylesheet = `
    :host {
      position: fixed;
      inset: 0;
      display: block;
      background: #000;
      color: #fff;
      font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
      overflow: hidden;
    }
    /* connectedCallback holds this until document.fonts.ready (capped 2s) so
     * the first visible paint has the deck's real typography + final rail
     * layout. opacity (not visibility) so the active slide can't un-hide
     * itself via the ::slotted([data-deck-active]) visibility:visible rule.
     * Only the stage/rail hide — the black :host background stays, so the
     * iframe doesn't flash the page's default white. */
    :host([data-fonts-pending]) .stage,
    :host([data-fonts-pending]) .rail { opacity: 0; pointer-events: none; }

    .stage {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .canvas {
      position: relative;
      transform-origin: center center;
      flex-shrink: 0;
      background: #fff;
      will-change: transform;
    }

    /* Slides live in light DOM (via <slot>) so authored CSS still applies.
       We absolutely position each slotted child to stack them. */
    ::slotted(*) {
      position: absolute !important;
      inset: 0 !important;
      width: 100% !important;
      height: 100% !important;
      box-sizing: border-box !important;
      overflow: hidden;
      opacity: 0;
      pointer-events: none;
      visibility: hidden;
    }
    ::slotted([data-deck-active]) {
      opacity: 1;
      pointer-events: auto;
      visibility: visible;
    }

    /* Tap zones for mobile — back/forward thirds like Stories.
       Transparent, no visible UI, don't block the overlay. */
    .tapzones {
      position: fixed;
      inset: 0;
      display: flex;
      z-index: 2147482000;
      pointer-events: none;
    }
    .tapzone {
      flex: 1;
      pointer-events: auto;
      -webkit-tap-highlight-color: transparent;
    }
    /* Only activate tap zones on coarse pointers (touch devices). */
    @media (hover: hover) and (pointer: fine) {
      .tapzones { display: none; }
    }

    .overlay {
      position: fixed;
      left: 50%;
      bottom: 22px;
      transform: translate(-50%, 6px) scale(0.92);
      filter: blur(6px);
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px;
      background: #000;
      color: #fff;
      border-radius: 999px;
      font-size: 12px;
      font-feature-settings: "tnum" 1;
      letter-spacing: 0.01em;
      opacity: 0;
      pointer-events: none;
      transition: opacity 260ms ease, transform 260ms cubic-bezier(.2,.8,.2,1), filter 260ms ease;
      transform-origin: center bottom;
      z-index: 2147483000;
      user-select: none;
    }
    .overlay[data-visible] {
      opacity: 1;
      pointer-events: auto;
      transform: translate(-50%, 0) scale(1);
      filter: blur(0);
    }

    /* Present-skip watermark — drawn over the stage region (left offset set
       by _fit to clear the rail) when the active slide is data-deck-present-
       skip and we're NOT presenting. Hidden in presenting (the slide is
       hopped over so it can't be active) and in print (@media print below),
       so the PDF handout stays clean. */
    .skipwm {
      position: fixed;
      inset: 0;
      display: none;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      user-select: none;
      z-index: 2147482000;
    }
    :host([data-deck-present-skip-active]) .skipwm { display: flex; }
    .skipwm span {
      font: 800 150px/1 ui-sans-serif, system-ui, -apple-system, sans-serif;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: rgba(217, 119, 87, 0.22);
      border: 8px solid rgba(217, 119, 87, 0.32);
      border-radius: 22px;
      padding: 0.12em 0.34em;
      transform: rotate(-16deg);
    }

    .btn {
      appearance: none;
      -webkit-appearance: none;
      background: transparent;
      border: 0;
      margin: 0;
      padding: 0;
      color: inherit;
      font: inherit;
      cursor: default;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 28px;
      min-width: 28px;
      border-radius: 999px;
      color: rgba(255,255,255,0.72);
      transition: background 140ms ease, color 140ms ease;
      -webkit-tap-highlight-color: transparent;
    }
    .btn:hover { background: rgba(255,255,255,0.12); color: #fff; }
    .btn:active { background: rgba(255,255,255,0.18); }
    .btn:focus { outline: none; }
    .btn:focus-visible { outline: none; }
    .btn::-moz-focus-inner { border: 0; }
    .btn svg { width: 14px; height: 14px; display: block; }
    .btn.reset {
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.02em;
      padding: 0 10px 0 12px;
      gap: 6px;
      color: rgba(255,255,255,0.72);
    }
    .btn.reset .kbd {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 16px;
      height: 16px;
      padding: 0 4px;
      font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
      font-size: 10px;
      line-height: 1;
      color: rgba(255,255,255,0.88);
      background: rgba(255,255,255,0.12);
      border-radius: 4px;
    }

    .count {
      font-variant-numeric: tabular-nums;
      color: #fff;
      font-weight: 500;
      padding: 0 8px;
      min-width: 42px;
      text-align: center;
      font-size: 12px;
    }
    .count .sep { color: rgba(255,255,255,0.45); margin: 0 3px; font-weight: 400; }
    .count .total { color: rgba(255,255,255,0.55); }

    .divider {
      width: 1px;
      height: 14px;
      background: rgba(255,255,255,0.18);
      margin: 0 2px;
    }

    /* ── Thumbnail rail ──────────────────────────────────────────────────
       Fixed column on the left; each thumbnail is a static deep-clone of
       the light-DOM slide scaled into a 16:9 (or design-aspect) frame. The
       stage re-fits around it (see _fit); hidden during present / noscale
       / print so capture geometry and fullscreen output are unchanged. */
    .rail {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      width: var(--deck-rail-w, 188px);
      background: #141414;
      border-right: 1px solid rgba(255,255,255,0.08);
      overflow-y: auto;
      overflow-x: hidden;
      padding: 12px 10px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 12px;
      z-index: 2147482500;
      scrollbar-width: thin;
      scrollbar-color: rgba(255,255,255,0.18) transparent;
    }
    .rail::-webkit-scrollbar { width: 8px; }
    .rail::-webkit-scrollbar-track { background: transparent; margin: 2px; }
    .rail::-webkit-scrollbar-thumb {
      background: rgba(255,255,255,0.18);
      border-radius: 4px;
      border: 2px solid transparent;
      background-clip: content-box;
    }
    .rail::-webkit-scrollbar-thumb:hover {
      background: rgba(255,255,255,0.28);
      border: 2px solid transparent;
      background-clip: content-box;
    }
    :host([no-rail]) .rail,
    :host([noscale]) .rail { display: none; }
    .rail[data-presenting] { display: none; }
    /* User-driven show/hide (the TweaksPanel toggle) slides instead of
       popping. Transitions are gated on :host([data-rail-anim]) — set only
       for the 200ms around the toggle — so window-resize and rail-width
       drag (which also call _fit) don't lag behind the cursor. */
    .rail[data-user-hidden] { transform: translateX(-100%); }
    :host([data-rail-anim]) .rail { transition: transform 200ms cubic-bezier(.3,.7,.4,1); }
    :host([data-rail-anim]) .stage { transition: left 200ms cubic-bezier(.3,.7,.4,1); }
    :host([data-rail-anim]) .canvas { transition: transform 200ms cubic-bezier(.3,.7,.4,1); }
    /* transition shorthand replaces rather than merges — repeat the base
       .overlay opacity/transform/filter transitions so visibility changes
       during the 200ms toggle window still fade instead of popping. */
    :host([data-rail-anim]) .overlay {
      transition: margin-left 200ms cubic-bezier(.3,.7,.4,1),
                  opacity 260ms ease,
                  transform 260ms cubic-bezier(.2,.8,.2,1),
                  filter 260ms ease;
    }
    :host([data-rail-anim]) .tapzones { transition: left 200ms cubic-bezier(.3,.7,.4,1); }

    .thumb {
      position: relative;
      display: flex;
      align-items: flex-start;
      gap: 8px;
      cursor: pointer;
      user-select: none;
    }
    .thumb .num {
      width: 16px;
      flex-shrink: 0;
      font-size: 11px;
      font-weight: 500;
      text-align: right;
      color: rgba(255,255,255,0.55);
      padding-top: 2px;
      font-variant-numeric: tabular-nums;
    }
    .thumb .frame {
      position: relative;
      flex: 1;
      min-width: 0;
      aspect-ratio: var(--deck-aspect);
      background: #fff;
      border-radius: 4px;
      outline: 2px solid transparent;
      outline-offset: 0;
      overflow: hidden;
      transition: outline-color 120ms ease;
    }
    .thumb:hover .frame { outline-color: rgba(255,255,255,0.25); }
    .thumb { outline: none; }
    .thumb:focus-visible .frame { outline-color: rgba(255,255,255,0.5); }
    .thumb[data-current] .num { color: #fff; }
    .thumb[data-current] .frame { outline-color: #D97757; }
    .thumb[data-dragging] { opacity: 0.35; }
    .thumb::before {
      content: '';
      position: absolute;
      left: 24px;
      right: 0;
      height: 3px;
      border-radius: 2px;
      background: #D97757;
      opacity: 0;
      pointer-events: none;
    }
    .thumb[data-drop="before"]::before { top: -8px; opacity: 1; }
    .thumb[data-drop="after"]::before { bottom: -8px; opacity: 1; }
    .thumb[data-skip] .frame { opacity: 0.35; }
    .thumb[data-skip] .frame::after {
      content: 'Skipped';
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0,0,0,0.45);
      color: #fff;
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.04em;
    }

    .ctxmenu {
      position: fixed;
      min-width: 150px;
      padding: 4px;
      background: #242424;
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 7px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.45);
      z-index: 2147483100;
      display: none;
      font-size: 12px;
    }
    .ctxmenu[data-open] { display: block; }
    .ctxmenu button {
      display: block;
      width: 100%;
      appearance: none;
      border: 0;
      background: transparent;
      color: #e8e8e8;
      font: inherit;
      text-align: left;
      padding: 6px 10px;
      border-radius: 4px;
      cursor: pointer;
    }
    .ctxmenu button:hover:not(:disabled) { background: rgba(255,255,255,0.08); }
    .ctxmenu button:disabled { opacity: 0.35; cursor: default; }
    .ctxmenu hr {
      border: 0;
      border-top: 1px solid rgba(255,255,255,0.1);
      margin: 4px 2px;
    }

    .rail-resize {
      position: fixed;
      left: calc(var(--deck-rail-w, 188px) - 3px);
      top: 0;
      bottom: 0;
      width: 6px;
      cursor: col-resize;
      z-index: 2147482600;
      touch-action: none;
    }
    .rail-resize:hover,
    .rail-resize[data-dragging] { background: rgba(255,255,255,0.12); }
    :host([no-rail]) .rail-resize,
    :host([noscale]) .rail-resize,
    .rail[data-presenting] + .rail-resize,
    .rail[data-user-hidden] + .rail-resize { display: none; }

    /* Delete-confirm popup — matches the SPA's ConfirmDialog layout
       (title + message body, depressed footer with Cancel / Delete). */
    .confirm-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.45);
      z-index: 2147483200;
      display: none;
      align-items: center;
      justify-content: center;
    }
    .confirm-backdrop[data-open] { display: flex; }
    .confirm {
      width: 320px;
      max-width: calc(100vw - 32px);
      background: #2a2a2a;
      color: #e8e8e8;
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 12px;
      box-shadow: 0 12px 32px rgba(0,0,0,0.5);
      overflow: hidden;
      font-family: inherit;
      animation: deck-confirm-in 0.18s ease;
    }
    @keyframes deck-confirm-in {
      from { opacity: 0; transform: scale(0.96); }
      to { opacity: 1; transform: scale(1); }
    }
    .confirm .body { padding: 20px 20px 16px; }
    .confirm .title { font-size: 14px; font-weight: 600; margin-bottom: 4px; }
    .confirm .msg { font-size: 13px; line-height: 1.5; color: rgba(255,255,255,0.65); }
    .confirm .footer {
      padding: 14px 20px;
      background: #1f1f1f;
      border-top: 1px solid rgba(255,255,255,0.08);
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
    .confirm button {
      appearance: none;
      font: inherit;
      font-size: 13px;
      font-weight: 500;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
    }
    .confirm .cancel {
      background: transparent;
      border: 0;
      color: rgba(255,255,255,0.8);
    }
    .confirm .cancel:hover { background: rgba(255,255,255,0.08); }
    .confirm .danger {
      background: #c96442;
      border: 1px solid rgba(0,0,0,0.15);
      color: #fff;
      box-shadow: 0 1px 3px rgba(166,50,68,0.3), 0 2px 6px rgba(166,50,68,0.18);
    }
    .confirm .danger:hover { background: #b5563a; }

    /* ── Print: one page per slide, no chrome ────────────────────────────
       The screen layout stacks every slide at inset:0 inside a scaled
       canvas; for print we want them in document flow at the authored
       design size so the browser paginates one slide per sheet. The
       @page size is set from the width/height attributes via the inline
       <style id="deck-stage-print-page"> that connectedCallback injects
       into <head> (the @page at-rule has no effect inside shadow DOM). */
    @media print {
      :host {
        position: static;
        inset: auto;
        background: none;
        overflow: visible;
        color: inherit;
      }
      .stage { position: static; display: block; }
      .canvas {
        transform: none !important;
        width: auto !important;
        height: auto !important;
        background: none;
        will-change: auto;
      }
      ::slotted(*) {
        position: relative !important;
        inset: auto !important;
        width: var(--deck-design-w) !important;
        height: var(--deck-design-h) !important;
        box-sizing: border-box !important;
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: auto;
        break-after: page;
        page-break-after: always;
        break-inside: avoid;
        overflow: hidden;
      }
      /* Last slide drops its break-after so no trailing blank sheet prints.
         Every slide prints (present-skip included), so :last-child is the
         genuine final page — no skip-aware bookkeeping needed. */
      ::slotted(*:last-child) {
        break-after: auto;
        page-break-after: auto;
      }
      .overlay, .tapzones, .rail, .rail-resize, .ctxmenu, .confirm-backdrop, .skipwm { display: none !important; }
    }
  `;

  class DeckStage extends HTMLElement {
    static get observedAttributes() { return ['width', 'height', 'noscale', 'no-rail']; }

    constructor() {
      super();
      this._root = this.attachShadow({ mode: 'open' });
      this._index = 0;
      this._slides = [];
      this._notes = [];
      this._hideTimer = null;
      this._mouseIdleTimer = null;
      this._menuIndex = -1;
      // Two independent presenting sources OR-merged into _presenting by
      // _syncPresenting: an Omelette host posting __omelette_presenting,
      // and the user putting the deck host in standalone fullscreen. Track
      // them separately so neither one can clobber the other on toggle.
      this._omelettePresenting = false;
      this._fullscreenPresenting = false;
      this._presenting = false;
      // Sections whose data-step-max we auto-derived from reveal attributes
      // (so re-derivation may update them) and reveal elements we've already
      // warned about (so a malformed attribute warns once, not on every nav).
      this._autoStepSections = new WeakSet();
      this._revealWarned = new WeakSet();

      this._onKey = this._onKey.bind(this);
      this._onResize = this._onResize.bind(this);
      this._onSlotChange = this._onSlotChange.bind(this);
      this._onMouseMove = this._onMouseMove.bind(this);
      this._onTapBack = this._onTapBack.bind(this);
      this._onTapForward = this._onTapForward.bind(this);
      this._onMessage = this._onMessage.bind(this);
      this._onFullscreenChange = this._onFullscreenChange.bind(this);
      // Capture-phase close so a click anywhere dismisses the menu, but
      // ignore clicks that land inside the menu itself — otherwise the
      // capture handler runs before the menu's own (bubble) handler and
      // clears _menuIndex out from under it.
      this._onDocClick = (e) => {
        if (this._menu && e.composedPath && e.composedPath().includes(this._menu)) return;
        this._closeMenu();
      };
    }

    get designWidth() {
      return parseInt(this.getAttribute('width'), 10) || DESIGN_W_DEFAULT;
    }
    get designHeight() {
      return parseInt(this.getAttribute('height'), 10) || DESIGN_H_DEFAULT;
    }

    connectedCallback() {
      // Presenter-view popup loads deckUrl?_snthumb=...#N for its prev/cur/
      // next thumbnails — the rail has no business rendering inside those
      // (wrong scale, and it offsets the stage so the thumb shows a gutter).
      if (/[?&]_snthumb=/.test(location.search)) this.setAttribute('no-rail', '');
      this._render();
      this._loadNotes();
      this._syncPrintPageRule();
      this._injectRevealStyle();
      window.addEventListener('keydown', this._onKey);
      window.addEventListener('resize', this._onResize);
      window.addEventListener('mousemove', this._onMouseMove, { passive: true });
      window.addEventListener('message', this._onMessage);
      window.addEventListener('click', this._onDocClick, true);
      document.addEventListener('fullscreenchange', this._onFullscreenChange);
      document.addEventListener('webkitfullscreenchange', this._onFullscreenChange);
      // Initial collection + layout happens via slotchange, which fires on mount.
      this._enableRail();
      // Hold the stage hidden until webfonts are ready so the first visible
      // paint has the deck's real typography — the :not(:defined) guard in
      // the page HTML only covers custom-element upgrade, not font load.
      // Capped so a 404'd font URL can't blank the deck indefinitely.
      this.setAttribute('data-fonts-pending', '');
      const reveal = () => this.removeAttribute('data-fonts-pending');
      // rAF first: fonts.ready is a pre-resolved promise until layout has
      // resolved the slotted text's font-family and pushed a FontFace into
      // 'loading'. Reading it here in connectedCallback (parse-time) would
      // settle the race in a microtask before any font fetch starts.
      requestAnimationFrame(() => {
        Promise.race([
          document.fonts ? document.fonts.ready : Promise.resolve(),
          new Promise((r) => setTimeout(r, 2000)),
        ]).then(reveal, reveal);
      });
    }

    _enableRail() {
      // Idempotent — older host builds still post __omelette_rail_enabled.
      // no-rail guard keeps the observers/stylesheet walk off the cheap path
      // for presenter-popup thumbnail iframes (up to 9 per view).
      if (this._railEnabled || this.hasAttribute('no-rail')) return;
      this._railEnabled = true;
      // Per-viewer preference — restored alongside rail width. Default on;
      // only a stored '0' (from the TweaksPanel toggle) hides it.
      this._railVisible = true;
      try {
        if (localStorage.getItem('deck-stage.railVisible') === '0') this._railVisible = false;
      } catch (e) {}
      // Live thumbnail updates: watch the light-DOM slides for content
      // edits and re-clone just the affected thumb(s), debounced. Ignore
      // the data-deck-* / data-screen-label / data-om-validate attributes
      // this component itself writes so nav and skip don't trigger
      // spurious refreshes.
      const OWN_ATTRS = /^data-(deck-|screen-label$|om-validate$)/;
      this._liveDirty = new Set();
      this._liveObserver = new MutationObserver((records) => {
        for (const r of records) {
          if (r.type === 'attributes' && OWN_ATTRS.test(r.attributeName || '')) continue;
          let n = r.target;
          while (n && n.parentElement !== this) n = n.parentElement;
          if (n && this._slideSet && this._slideSet.has(n)) this._liveDirty.add(n);
        }
        if (this._liveDirty.size && !this._liveTimer) {
          this._liveTimer = setTimeout(() => {
            this._liveTimer = null;
            this._liveDirty.forEach((s) => this._refreshThumb(s));
            this._liveDirty.clear();
          }, 200);
        }
      });
      this._liveObserver.observe(this, {
        subtree: true, childList: true, characterData: true, attributes: true,
      });
      // Lazy thumbnail materialization — clone the slide only when its
      // frame scrolls into (or near) the rail viewport. rootMargin gives
      // ~4 thumbs of pre-load so fast scrolling doesn't flash blanks.
      this._railObserver = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.target.__deckThumb) {
            this._materialize(e.target.__deckThumb);
          }
        });
      }, { root: this._rail, rootMargin: '400px 0px' });
      // Tweaks typically change CSS vars / attrs OUTSIDE <deck-stage>
      // (on <html>, <body>, a wrapper div, or a <style> tag), which
      // _liveObserver can't see. Re-snapshot author CSS (constructable
      // sheet is shared by reference, so one replaceSync updates every
      // thumb shadow root) and re-sync each thumb host's attrs + custom
      // properties. In-slide DOM mutations are _liveObserver's job.
      // Debounced so slider drags don't thrash.
      this._onTweakChange = () => {
        clearTimeout(this._tweakTimer);
        this._tweakTimer = setTimeout(() => {
          this._snapshotAuthorCss();
          // One getComputedStyle for the whole batch — each
          // getPropertyValue read below reuses the same computed style
          // as long as nothing invalidates layout between thumbs.
          const cs = getComputedStyle(this);
          (this._thumbs || []).forEach((t) => {
            if (t.host) this._syncThumbHostAttrs(t.host, cs);
          });
        }, 120);
      };
      window.addEventListener('tweakchange', this._onTweakChange);
      this._snapshotAuthorCss();
      // Build the rail now that it's enabled — slotchange already fired,
      // so _renderRail's early-return skipped the initial build.
      this._syncRailHidden();
      this._renderRail();
      this._fit();
    }

    /** Snapshot document stylesheets into a constructable sheet that each
     *  thumbnail's nested shadow root adopts — so author CSS styles the
     *  cloned slide content without touching this component's chrome.
     *  Cross-origin sheets throw on .cssRules — skip them. Re-callable:
     *  the existing constructable sheet is reused via replaceSync so every
     *  already-adopted shadow root picks up the fresh CSS without re-adopt. */
    _snapshotAuthorCss() {
      // :root in an adopted sheet inside a shadow root matches nothing
      // (only the document root qualifies), so author rules like
      // `:root[data-voice="modern"] .serif` never reach the clones.
      // Rewrite :root → :host and mirror <html>'s data-*/class/lang onto
      // each thumb host (see _syncThumbHostAttrs) so the same selectors
      // match inside the thumbnail's shadow tree.
      const authorCss = Array.from(document.styleSheets).map((sh) => {
        let css;
        try {
          css = Array.from(sh.cssRules).map((r) => r.cssText).join('\n');
        } catch (e) { return ''; }
        // The constructed sheet every thumbnail adopts resolves relative
        // url() against the DOCUMENT, not the originating .css — so rebase
        // each sheet's relative url() to absolute against its own href
        // (inline <style> has href === null → document base, already
        // correct) before concatenating, or external-stylesheet
        // backgrounds 404 inside the thumbnails. (#62)
        return this._rewriteCssUrls(css, sh.href || document.baseURI);
      }).join('\n')
        // The shadow host is featureless outside the functional :host(...)
        // form, so any compound on :root — [attr], .class, #id, :pseudo —
        // must become :host(<compound>) not :host<compound>. Same for the
        // html type selector (Tailwind class-strategy dark mode emits
        // html.dark; Pico uses html[data-theme]), which has nothing to
        // match inside the thumb's shadow tree.
        .replace(/:root((?:\[[^\]]*\]|[.#][-\w]+|:[-\w]+(?:\([^)]*\))?)+)/g, ':host($1)')
        .replace(/:root\b/g, ':host')
        .replace(/(^|[\s,>~+(}])html((?:\[[^\]]*\]|[.#][-\w]+|:[-\w]+(?:\([^)]*\))?)+)(?![-\w])/g, '$1:host($2)')
        .replace(/(^|[\s,>~+(}])html(?![-\w])/g, '$1:host')
        // The cloned slide lives in a thumb shadow root, so it has no
        // <deck-stage> ancestor — author rules like `deck-stage section`
        // or `deck-stage section.light` (which scope slide background +
        // theme to slides inside the live deck) would never match, leaving
        // light slides transparent over the rewritten html→:host black.
        // Drop the deck-stage prefix when it's used as a CSS type selector
        // so the descendant rule reaches the cloned section.
        .replace(/(^|[\s,>~+(}])deck-stage(?![-\w])/g, '$1')
        // Same idea for <image-slot>: `_materialize` swaps each cloned
        // slot for a <div> (its <img> lives in shadow DOM, lost to
        // cloneNode), so author rules that pin `image-slot.scene-slot`
        // sizing or `image-slot[data-filled]` siblings need to reach the
        // replacement element. Drop the `image-slot` tag prefix so the
        // class/attribute compounds still match the <div>.
        .replace(/(^|[\s,>~+(}])image-slot(?![-\w])/g, '$1');
      // Every custom property the author references. _syncThumbHostAttrs
      // mirrors each one's *computed* value at <deck-stage> onto the
      // thumb host so the live value wins over the :host default above
      // regardless of which ancestor the tweak wrote to (<html>, <body>,
      // a wrapper div, or the deck-stage element itself all inherit
      // down to getComputedStyle(this)).
      this._authorVars = new Set(authorCss.match(/--[\w-]+/g) || []);
      try {
        if (!this._adoptedSheet) this._adoptedSheet = new CSSStyleSheet();
        this._adoptedSheet.replaceSync(authorCss);
      } catch (e) {
        this._adoptedSheet = null;
        this._authorCss = authorCss;
      }
    }

    /** Rebase relative url(...) refs in a stylesheet's serialized text to
     *  absolute against `base` (the sheet's own href, or the document for
     *  inline <style>). The rail adopts all author CSS via a single
     *  CONSTRUCTED CSSStyleSheet whose base URL is the document, not each
     *  originating .css — so a relative url('../assets/x.webp') in an external
     *  sheet would otherwise re-resolve against the document directory and 404
     *  inside the thumbnails. Same-document fragment refs (url(#filter) for
     *  SVG) and data: URIs are left untouched; already-absolute refs pass
     *  through new URL() unchanged. (#62) */
    _rewriteCssUrls(cssText, base) {
      if (!cssText || !base) return cssText || '';
      // Match url( "..." | '...' | unquoted ). The quoted branches are
      // escape-aware ((?:[^"\\]|\\.)*) so a data: URI whose serialized form
      // carries backslash-escaped inner quotes — Chromium emits inline-SVG
      // backgrounds as url("data:…\"…\"…") — is captured whole and skipped
      // below, not mangled. The unquoted branch excludes whitespace
      // ([^)\s]*) — CSSOM never emits an unquoted url() with interior
      // whitespace — which also keeps matching linear (a lazy [^)]*? would
      // backtrack ~cubically on a url( with a long whitespace run and no
      // closing paren).
      return cssText.replace(
        /url\(\s*(?:"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'|([^)\s]*))\s*\)/gi,
        (match, dq, sq, uq) => {
          const raw = (dq != null ? dq : sq != null ? sq : uq || '').trim();
          if (!raw || raw.startsWith('#') || /^data:/i.test(raw)) return match;
          try {
            return 'url("' + new URL(raw, base).href + '")';
          } catch (e) { return match; }
        },
      );
    }

    _syncThumbHostAttrs(host, cs) {
      const de = document.documentElement;
      // setAttribute overwrites but can't delete — an attr removed from
      // <html> (toggleAttribute off, classList emptied) would linger on
      // the host and :host([data-*]) / :host(.foo) rules would keep
      // matching. Remove stale mirrored attrs first; iterate backward
      // because removeAttribute mutates the live NamedNodeMap.
      for (let i = host.attributes.length - 1; i >= 0; i--) {
        const n = host.attributes[i].name;
        if ((n.startsWith('data-') || n === 'class' || n === 'lang')
            && !de.hasAttribute(n)) {
          host.removeAttribute(n);
        }
      }
      for (const a of de.attributes) {
        if (a.name.startsWith('data-') || a.name === 'class' || a.name === 'lang') {
          host.setAttribute(a.name, a.value);
        }
      }
      // The :root→:host rewrite in _snapshotAuthorCss pins each custom
      // property to its stylesheet default on the thumb host, shadowing
      // the live value that would otherwise inherit. Tweaks can write the
      // live value on any ancestor — <html>, <body>, a wrapper div, the
      // deck-stage element — so read it as the *computed* value at
      // <deck-stage> (which sees the whole inheritance chain) rather than
      // trying to guess which element the author wrote to. Inline on the
      // host beats the :host{} rule. remove-stale covers vars dropped
      // from the stylesheet between snapshots.
      const vars = this._authorVars || new Set();
      for (let i = host.style.length - 1; i >= 0; i--) {
        const p = host.style[i];
        if (p.startsWith('--') && !vars.has(p)) host.style.removeProperty(p);
      }
      const live = cs || getComputedStyle(this);
      vars.forEach((p) => {
        const v = live.getPropertyValue(p);
        if (v) host.style.setProperty(p, v.trim());
        else host.style.removeProperty(p);
      });
    }

    disconnectedCallback() {
      window.removeEventListener('keydown', this._onKey);
      window.removeEventListener('resize', this._onResize);
      window.removeEventListener('mousemove', this._onMouseMove);
      window.removeEventListener('message', this._onMessage);
      window.removeEventListener('click', this._onDocClick, true);
      document.removeEventListener('fullscreenchange', this._onFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', this._onFullscreenChange);
      if (this._hideTimer) clearTimeout(this._hideTimer);
      if (this._mouseIdleTimer) clearTimeout(this._mouseIdleTimer);
      if (this._liveTimer) clearTimeout(this._liveTimer);
      if (this._tweakTimer) clearTimeout(this._tweakTimer);
      if (this._railAnimTimer) clearTimeout(this._railAnimTimer);
      if (this._scaleRaf) cancelAnimationFrame(this._scaleRaf);
      if (this._liveObserver) this._liveObserver.disconnect();
      if (this._railObserver) this._railObserver.disconnect();
      if (this._onTweakChange) window.removeEventListener('tweakchange', this._onTweakChange);
    }

    attributeChangedCallback() {
      if (this._canvas) {
        this._canvas.style.width = this.designWidth + 'px';
        this._canvas.style.height = this.designHeight + 'px';
        this._canvas.style.setProperty('--deck-design-w', this.designWidth + 'px');
        this._canvas.style.setProperty('--deck-design-h', this.designHeight + 'px');
        if (this._rail) {
          this._rail.style.setProperty('--deck-aspect', this.designWidth + '/' + this.designHeight);
        }
        this._fit();
        this._scaleThumbs();
        this._syncPrintPageRule();
      }
    }

    _render() {
      const style = document.createElement('style');
      style.textContent = stylesheet;

      const stage = document.createElement('div');
      stage.className = 'stage';

      const canvas = document.createElement('div');
      canvas.className = 'canvas';
      canvas.style.width = this.designWidth + 'px';
      canvas.style.height = this.designHeight + 'px';
      canvas.style.setProperty('--deck-design-w', this.designWidth + 'px');
      canvas.style.setProperty('--deck-design-h', this.designHeight + 'px');

      const slot = document.createElement('slot');
      slot.addEventListener('slotchange', this._onSlotChange);
      canvas.appendChild(slot);
      stage.appendChild(canvas);

      // Tap zones (mobile): left third = back, right third = forward.
      const tapzones = document.createElement('div');
      tapzones.className = 'tapzones export-hidden';
      tapzones.setAttribute('aria-hidden', 'true');
      tapzones.setAttribute('data-omelette-chrome', '');
      const tzBack = document.createElement('div');
      tzBack.className = 'tapzone tapzone--back';
      const tzMid = document.createElement('div');
      tzMid.className = 'tapzone tapzone--mid';
      tzMid.style.pointerEvents = 'none';
      const tzFwd = document.createElement('div');
      tzFwd.className = 'tapzone tapzone--fwd';
      tzBack.addEventListener('click', this._onTapBack);
      tzFwd.addEventListener('click', this._onTapForward);
      tapzones.append(tzBack, tzMid, tzFwd);

      // Overlay: compact, solid black, with clickable controls.
      const overlay = document.createElement('div');
      overlay.className = 'overlay export-hidden';
      overlay.setAttribute('role', 'toolbar');
      overlay.setAttribute('aria-label', 'Deck controls');
      overlay.setAttribute('data-omelette-chrome', '');
      overlay.innerHTML = `
        <button class="btn prev" type="button" aria-label="Previous slide" title="Previous (←)">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 3L5 8l5 5"/></svg>
        </button>
        <span class="count" aria-live="polite"><span class="current">1</span><span class="sep">/</span><span class="total">1</span></span>
        <button class="btn next" type="button" aria-label="Next slide" title="Next (→)">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3l5 5-5 5"/></svg>
        </button>
        <span class="divider"></span>
        <button class="btn reset" type="button" aria-label="Reset to first slide" title="Reset (R)">Reset<span class="kbd">R</span></button>
      `;

      overlay.querySelector('.prev').addEventListener('click', () => this._advance(-1, 'click'));
      overlay.querySelector('.next').addEventListener('click', () => this._advance(1, 'click'));
      overlay.querySelector('.reset').addEventListener('click', () => this._go(0, 'click'));

      // Present-skip watermark (see .skipwm CSS). Toggled by _applyIndex /
      // _syncPresenting via the host's data-deck-present-skip-active attr.
      // NOT export-hidden: it's a live-review marker that should survive
      // screenshots; only the PDF strips it, via the @media print rule.
      const skipwm = document.createElement('div');
      skipwm.className = 'skipwm';
      skipwm.setAttribute('data-omelette-chrome', '');
      skipwm.setAttribute('aria-hidden', 'true');
      skipwm.innerHTML = '<span>Skipped</span>';

      // Thumbnail rail + context menu. Thumbnails are populated in
      // _renderRail() after _collectSlides().
      const rail = document.createElement('div');
      rail.className = 'rail export-hidden';
      rail.setAttribute('data-omelette-chrome', '');
      rail.style.setProperty('--deck-aspect', this.designWidth + '/' + this.designHeight);
      // Edge auto-scroll while dragging a thumb near the rail's top/bottom
      // so off-screen drop targets are reachable. Native dragover fires
      // continuously while the pointer is stationary, so a per-event nudge
      // (ramped by edge proximity) is enough — no rAF loop needed.
      rail.addEventListener('dragover', (e) => {
        if (this._dragFrom == null) return;
        const r = rail.getBoundingClientRect();
        const EDGE = 40;
        const dt = e.clientY - r.top;
        const db = r.bottom - e.clientY;
        if (dt < EDGE) rail.scrollTop -= Math.ceil((EDGE - dt) / 3);
        else if (db < EDGE) rail.scrollTop += Math.ceil((EDGE - db) / 3);
      });

      const menu = document.createElement('div');
      menu.className = 'ctxmenu export-hidden';
      menu.setAttribute('data-omelette-chrome', '');
      menu.innerHTML = `
        <button type="button" data-act="up">Move up</button>
        <button type="button" data-act="down">Move down</button>
        <hr>
        <button type="button" data-act="delete">Delete slide</button>
      `;
      menu.addEventListener('click', (e) => {
        const act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
        if (!act) return;
        const i = this._menuIndex;
        this._closeMenu();
        if (act === 'up') this._moveSlide(i, i - 1);
        else if (act === 'down') this._moveSlide(i, i + 1);
        else if (act === 'delete') this._openConfirm(i);
      });
      menu.addEventListener('contextmenu', (e) => e.preventDefault());

      // Rail resize handle — drag to set --deck-rail-w, persisted to
      // localStorage so the width survives reloads.
      const resize = document.createElement('div');
      resize.className = 'rail-resize export-hidden';
      resize.setAttribute('data-omelette-chrome', '');
      resize.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        resize.setPointerCapture(e.pointerId);
        resize.setAttribute('data-dragging', '');
        const move = (ev) => this._setRailWidth(ev.clientX);
        const up = () => {
          resize.removeEventListener('pointermove', move);
          resize.removeEventListener('pointerup', up);
          resize.removeEventListener('pointercancel', up);
          resize.removeAttribute('data-dragging');
          try { localStorage.setItem('deck-stage.railWidth', String(this._railPx)); } catch (err) {}
        };
        resize.addEventListener('pointermove', move);
        resize.addEventListener('pointerup', up);
        resize.addEventListener('pointercancel', up);
      });

      // Delete-confirm dialog — mirrors the SPA's ConfirmDialog layout.
      const confirm = document.createElement('div');
      confirm.className = 'confirm-backdrop export-hidden';
      confirm.setAttribute('data-omelette-chrome', '');
      confirm.innerHTML = `
        <div class="confirm" role="dialog" aria-modal="true">
          <div class="body">
            <div class="title">Delete slide?</div>
            <div class="msg">This slide will be removed from the deck.</div>
          </div>
          <div class="footer">
            <button type="button" class="cancel">Cancel</button>
            <button type="button" class="danger">Delete</button>
          </div>
        </div>
      `;
      confirm.addEventListener('click', (e) => {
        if (e.target === confirm) this._closeConfirm();
      });
      confirm.querySelector('.cancel').addEventListener('click', () => this._closeConfirm());
      confirm.querySelector('.danger').addEventListener('click', () => {
        const i = this._confirmIndex;
        this._closeConfirm();
        this._deleteSlide(i);
      });

      this._root.append(style, rail, resize, stage, tapzones, overlay, skipwm, menu, confirm);
      this._canvas = canvas;
      this._slot = slot;
      this._overlay = overlay;
      this._skipwm = skipwm;
      this._tapzones = tapzones;
      this._rail = rail;
      this._resize = resize;
      this._menu = menu;
      this._confirm = confirm;
      this._countEl = overlay.querySelector('.current');
      this._totalEl = overlay.querySelector('.total');

      // Restore persisted rail width.
      let rw = 188;
      try {
        const s = localStorage.getItem('deck-stage.railWidth');
        if (s) rw = parseInt(s, 10) || rw;
      } catch (err) {}
      this._setRailWidth(rw);
      this._syncRailHidden();
    }

    _setRailWidth(px) {
      const w = Math.max(120, Math.min(360, Math.round(px)));
      this._railPx = w;
      this.style.setProperty('--deck-rail-w', w + 'px');
      this._fit();
      // _scaleThumbs forces a sync layout (frame.offsetWidth) then writes
      // N transforms. During a resize drag this runs per-pointermove;
      // coalesce to one per frame.
      if (!this._scaleRaf) {
        this._scaleRaf = requestAnimationFrame(() => {
          this._scaleRaf = null;
          this._scaleThumbs();
        });
      }
    }

    /** @page must live in the document stylesheet — it's a no-op inside
     *  shadow DOM. Inject/update a single <head> style tag so the print
     *  sheet matches the design size and Save-as-PDF yields one slide per
     *  page with no margins. */
    _syncPrintPageRule() {
      const id = 'deck-stage-print-page';
      let tag = document.getElementById(id);
      if (!tag) {
        tag = document.createElement('style');
        tag.id = id;
        document.head.appendChild(tag);
      }
      tag.textContent =
        '@page { size: ' + this.designWidth + 'px ' + this.designHeight + 'px; margin: 0; } ' +
        '@media print { html, body { margin: 0 !important; padding: 0 !important; background: none !important; overflow: visible !important; height: auto !important; } ' +
        '* { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }';
    }

    /** Default-hide reveal elements that aren't currently revealed. Injected
     *  once into <head> like the @page rule: reveal elements are light-DOM
     *  descendants of a slotted <section>, beyond ::slotted's reach, so a
     *  shadow rule can't touch them. opacity (not display:none) keeps layout
     *  stable; decks animate the transition by styling the [data-revealed]
     *  hook (e.g. `.thing[data-revealed]{opacity:1;transform:none}`). */
    _injectRevealStyle() {
      const id = 'deck-stage-reveal';
      if (document.getElementById(id)) return;
      const tag = document.createElement('style');
      tag.id = id;
      tag.textContent =
        '[data-reveal]:not([data-revealed]),' +
        '[data-reveal-only]:not([data-revealed]),' +
        '[data-reveal-until]:not([data-revealed]){opacity:0;pointer-events:none;}';
      document.head.appendChild(tag);
    }

    /** Which reveal rule (if any) governs an element. null = no reveal
     *  attribute. { kind: 'always' } = the value was invalid, so the
     *  attribute is ignored and the element stays visible. Otherwise
     *  { kind: <attr>, k }. Warns once per element on a multiple-attribute
     *  or invalid-value mistake — at authoring time, not on every nav. */
    _resolveReveal(el) {
      let chosen = null;
      let count = 0;
      for (const attr of REVEAL_ATTRS) {
        if (el.hasAttribute(attr)) { count += 1; if (!chosen) chosen = attr; }
      }
      if (!chosen) return null;
      const raw = el.getAttribute(chosen);
      const k = parseRevealK(raw);
      if (!this._revealWarned.has(el) && (count > 1 || k === null)) {
        if (count > 1) {
          console.warn(`[deck-stage] element carries multiple reveal attributes; honoring "${chosen}". Use only one of ${REVEAL_ATTRS.join(', ')}.`, el);
        }
        if (k === null) {
          console.warn(`[deck-stage] invalid ${chosen}="${raw}" — expected a non-negative integer; treating element as always visible.`, el);
        }
        this._revealWarned.add(el);
      }
      if (k === null) return { kind: 'always', k: 0 };
      return { kind: chosen, k };
    }

    /** Whether a resolved reveal rule is shown at a given 0-based step. */
    _isRevealedAt(r, step) {
      switch (r.kind) {
        case 'data-reveal': return step >= r.k;
        case 'data-reveal-only': return step === r.k;
        case 'data-reveal-until': return step <= r.k;
        default: return true; // 'always' (invalid value, ignored)
      }
    }

    /** Toggle the data-revealed hook on every reveal descendant of a slide
     *  from its current data-step. No-op for slides with no reveal elements. */
    _applyReveals(slide) {
      if (!slide) return;
      const els = slide.querySelectorAll('[data-reveal],[data-reveal-only],[data-reveal-until]');
      if (!els.length) return;
      const step = parseInt(slide.getAttribute('data-step') || '0', 10) || 0;
      els.forEach((el) => {
        const r = this._resolveReveal(el);
        if (r) el.toggleAttribute('data-revealed', this._isRevealedAt(r, step));
      });
    }

    /** Auto-derive data-step-max from a section's reveal attributes so authors
     *  never count steps. An explicit author-set data-step-max wins and is
     *  never touched (rule 1); only sections we set are tracked in
     *  _autoStepSections and recomputed on re-derivation. A section with no
     *  valid reveal attrs and no explicit max stays non-stepped. */
    _deriveStepMax(slide) {
      const managed = this._autoStepSections.has(slide);
      if (slide.hasAttribute('data-step-max') && !managed) return;
      let max = -1;
      slide.querySelectorAll('[data-reveal],[data-reveal-only],[data-reveal-until]').forEach((el) => {
        const r = this._resolveReveal(el);
        if (r && r.kind !== 'always' && r.k > max) max = r.k;
      });
      if (max >= 0) {
        slide.setAttribute('data-step-max', String(max));
        this._autoStepSections.add(slide);
      } else if (managed) {
        // Reveal attrs were removed since we last derived — relinquish control.
        slide.removeAttribute('data-step-max');
        this._autoStepSections.delete(slide);
      }
    }

    _onSlotChange() {
      // Rail mutations (delete/move) already reconcile synchronously and
      // emit slidechange with reason 'api'; skip the async slotchange that
      // would otherwise re-broadcast with reason 'init'.
      if (this._squelchSlotChange) { this._squelchSlotChange = false; return; }
      this._collectSlides();
      this._restoreIndex();
      this._applyIndex({ showOverlay: false, broadcast: true, reason: 'init' });
      this._fit();
    }

    _collectSlides() {
      const assigned = this._slot.assignedElements({ flatten: true });
      this._slides = assigned.filter((el) => {
        // Skip template/style/script nodes even if someone slots them.
        const tag = el.tagName;
        return tag !== 'TEMPLATE' && tag !== 'SCRIPT' && tag !== 'STYLE';
      });
      this._slideSet = new Set(this._slides);

      this._slides.forEach((slide, i) => {
        const n = i + 1;
        slide.setAttribute('data-screen-label', `${pad2(n)} ${getSlideLabel(slide)}`);

        // Validation attribute for comment flow / auto-checks.
        if (!slide.hasAttribute('data-om-validate')) {
          slide.setAttribute('data-om-validate', VALIDATE_ATTR);
        }

        slide.setAttribute('data-deck-slide', String(i));

        // Declarative reveals: auto-derive data-step-max (unless author-set)
        // and reflect the base-state visibility, BEFORE the first _applyIndex
        // so its data-step-max reset logic sees the derived value and every
        // slide — active or not — starts in its correct step-0 reveal state.
        this._deriveStepMax(slide);
        this._applyReveals(slide);
      });

      if (this._totalEl) this._totalEl.textContent = String(this._slides.length || 1);
      if (this._index >= this._slides.length) this._index = Math.max(0, this._slides.length - 1);
      this._renderRail();
    }

    _loadNotes() {
      const tag = document.getElementById('speaker-notes');
      if (!tag) { this._notes = []; return; }
      try {
        const parsed = JSON.parse(tag.textContent || '[]');
        if (Array.isArray(parsed)) this._notes = parsed;
      } catch (e) {
        console.warn('[deck-stage] Failed to parse #speaker-notes JSON:', e);
        this._notes = [];
      }
    }

    _restoreIndex() {
      // The host's ?slide= param is delivered as a #<int> hash (1-indexed) on
      // the iframe src. No hash → slide 1; the deck itself keeps no position
      // state across loads.
      const h = (location.hash || '').match(/^#(\d+)$/);
      if (h) {
        const n = parseInt(h[1], 10) - 1;
        if (n >= 0 && n < this._slides.length) this._index = n;
      }
    }

    _applyIndex({ showOverlay = true, broadcast = true, reason = 'init' } = {}) {
      if (!this._slides.length) return;
      const prev = this._prevIndex == null ? -1 : this._prevIndex;
      const curr = this._index;
      // Keep the iframe's own hash in sync so an in-iframe location.reload()
      // (reload banner path in viewer-handle.ts) lands on the current slide,
      // not the stale deep-link hash from initial load.
      try { history.replaceState(null, '', '#' + (curr + 1)); } catch (e) {}
      this._slides.forEach((s, i) => {
        if (i === curr) s.setAttribute('data-deck-active', '');
        else s.removeAttribute('data-deck-active');
      });
      // Step-reveal reset: any stepped slide we either entered or just
      // left snaps data-step back to 0 so a future re-entry starts from
      // the first reveal state. (data-step-max itself is author-set and
      // never touched.)
      const prevSlide = prev >= 0 ? this._slides[prev] : null;
      const currSlide = this._slides[curr];
      if (prevSlide && prevSlide.hasAttribute('data-step-max')) prevSlide.setAttribute('data-step', '0');
      if (currSlide && currSlide.hasAttribute('data-step-max')) currSlide.setAttribute('data-step', '0');
      // Reflect the (reset) step into the [data-revealed] hooks so a freshly
      // entered stepped slide shows its base state with later reveals hidden,
      // and the slide we left is clean for its next entry.
      this._applyReveals(prevSlide);
      this._applyReveals(currSlide);
      // Present-skip watermark: on only when the active slide is a present-
      // skip slide and we're off-stage. While presenting it's hopped over so
      // it can never be active; the !presenting guard just covers the
      // enter-fullscreen-while-sitting-on-it transition (handled in
      // _syncPresenting before this runs).
      this.toggleAttribute('data-deck-present-skip-active',
        !this._presenting && !!currSlide && currSlide.hasAttribute('data-deck-present-skip'));
      if (this._countEl) this._countEl.textContent = String(curr + 1);
      // Follow-scroll on every navigation (init deep-link, keyboard, click,
      // tap, external goTo) — the only time we *don't* want the rail to
      // track current is after a rail-internal mutation, where _renderRail
      // has already restored the user's scroll position and yanking back to
      // current would undo it.
      this._syncRail(reason !== 'mutation');

      if (broadcast) {
        // (1) Legacy: host-window postMessage for speaker-notes renderers.
        try { window.postMessage({ slideIndexChanged: curr, deckTotal: this._slides.length, deckSkipped: this._skippedIndices() }, '*'); } catch (e) {}

        // (2) In-page CustomEvent on the <deck-stage> element itself.
        //     Bubbles and composes out of shadow DOM so slide code can listen:
        //       document.querySelector('deck-stage').addEventListener('slidechange', e => {
        //         e.detail.index, e.detail.previousIndex, e.detail.total, e.detail.slide, e.detail.reason
        //       });
        const detail = {
          index: curr,
          previousIndex: prev,
          total: this._slides.length,
          slide: this._slides[curr] || null,
          previousSlide: prev >= 0 ? (this._slides[prev] || null) : null,
          reason: reason, // 'init' | 'keyboard' | 'click' | 'tap' | 'api'
        };
        this.dispatchEvent(new CustomEvent('slidechange', {
          detail,
          bubbles: true,
          composed: true,
        }));
      }

      this._prevIndex = curr;
      if (showOverlay) this._flashOverlay();
    }

    _flashOverlay() {
      // Host posts __omelette_presenting while in fullscreen/tab presentation
      // mode — suppress the nav footer entirely (both hover and slide-change
      // flash) so the audience sees clean slides.
      if (!this._overlay || this._presenting) return;
      this._overlay.setAttribute('data-visible', '');
      if (this._hideTimer) clearTimeout(this._hideTimer);
      this._hideTimer = setTimeout(() => {
        this._overlay.removeAttribute('data-visible');
      }, OVERLAY_HIDE_MS);
    }

    _railWidth() {
      // State-based, no offsetWidth: the first _fit() can run before the
      // rail has had layout on some load paths, and a 0 there paints the
      // slide full-width for one frame before the post-slotchange _fit()
      // corrects it.
      if (!this._railEnabled || !this._railVisible || this.hasAttribute('no-rail')
          || this.hasAttribute('noscale') || this._presenting || this._previewMode) return 0;
      return this._railPx || 0;
    }

    _fit() {
      if (!this._canvas) return;
      const stage = this._canvas.parentElement;
      // PPTX export sets noscale so the DOM capture sees authored-size
      // geometry — the scaled canvas is in shadow DOM, so the exporter's
      // resetTransformSelector can't reach .canvas.style.transform directly.
      if (this.hasAttribute('noscale')) {
        this._canvas.style.transform = 'none';
        if (stage) stage.style.left = '0';
        if (this._overlay) this._overlay.style.marginLeft = '0';
        if (this._tapzones) this._tapzones.style.left = '0';
        if (this._skipwm) this._skipwm.style.left = '0';
        return;
      }
      const rw = this._railWidth();
      if (stage) stage.style.left = rw + 'px';
      // Overlay is centred on the viewport via left:50% + translate(-50%);
      // marginLeft shifts the centre by rw/2 so it lands in the middle of
      // the [rw, innerWidth] stage region. Tapzones just inset from rw, and
      // the present-skip watermark covers the same stage region.
      if (this._overlay) this._overlay.style.marginLeft = (rw / 2) + 'px';
      if (this._tapzones) this._tapzones.style.left = rw + 'px';
      if (this._skipwm) this._skipwm.style.left = rw + 'px';
      const vw = window.innerWidth - rw;
      const vh = window.innerHeight;
      const s = Math.min(vw / this.designWidth, vh / this.designHeight);
      this._canvas.style.transform = `scale(${s})`;
    }

    _onResize() { this._fit(); }

    _onMouseMove() {
      // Keep overlay visible while mouse moves; hide after idle.
      this._flashOverlay();
    }

    _onMessage(e) {
      const d = e.data;
      if (d && typeof d.__omelette_presenting === 'boolean') {
        this._omelettePresenting = d.__omelette_presenting;
        this._syncPresenting();
      }
      // Host's Preview segment (ViewerMode='none'): the rail's drag-reorder /
      // right-click skip-delete affordances are editing chrome, so hide it
      // while the user is just looking at the deck. Same hard-hide path as
      // presenting; independent of the user's _railVisible preference so
      // returning to Edit restores whatever they had.
      if (d && typeof d.__omelette_preview_mode === 'boolean') {
        if (d.__omelette_preview_mode === this._previewMode) return;
        this._previewMode = d.__omelette_preview_mode;
        this._syncRailHidden();
        this._closeMenu();
        this._closeConfirm();
        this._fit();
        this._scaleThumbs();
      }
      // Per-viewer show/hide, driven by the TweaksPanel's auto-injected
      // "Thumbnail rail" toggle (or any author script). Independent of
      // whether the Tweaks panel itself is open — closing the panel
      // doesn't change rail visibility. Persists alongside rail width.
      if (d && d.type === '__deck_rail_visible' && typeof d.on === 'boolean') {
        if (d.on === this._railVisible) return;
        this._railVisible = d.on;
        try { localStorage.setItem('deck-stage.railVisible', d.on ? '1' : '0'); } catch (e) {}
        // Arm the transition, commit it, then flip state — otherwise the
        // browser coalesces both writes and nothing animates on show.
        this.setAttribute('data-rail-anim', '');
        void (this._rail && this._rail.offsetHeight);
        this._syncRailHidden();
        this._fit();
        this._scaleThumbs();
        clearTimeout(this._railAnimTimer);
        this._railAnimTimer = setTimeout(() => this.removeAttribute('data-rail-anim'), 220);
      }
      if (d && d.type === '__omelette_rail_enabled') this._enableRail();
    }

    _onFullscreenChange() {
      // Scope is host-only so a fullscreen lightbox or video elsewhere
      // doesn't collapse the rail. webkitFullscreenElement covers Safari
      // builds older than 16.4; in modern Safari both reads return the
      // same node.
      const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
      this._fullscreenPresenting = fsEl === this;
      this._syncPresenting();
    }

    /** OR-merge the two presenting sources into _presenting, then apply
     *  the chrome-free view (hide rail, suppress overlay, refit canvas).
     *  Early-return on no-op so a same-state postMessage or duplicate
     *  fullscreenchange doesn't thrash _fit / _scaleThumbs. */
    _syncPresenting() {
      const presenting = this._omelettePresenting || this._fullscreenPresenting;
      if (presenting === this._presenting) return;
      this._presenting = presenting;
      if (presenting && this._overlay) {
        this._overlay.removeAttribute('data-visible');
        if (this._hideTimer) clearTimeout(this._hideTimer);
      }
      // Entering presenting while sitting on a present-skip slide: hop to the
      // nearest live slide (forward first, then back) so it never reaches the
      // audience. _go → _applyIndex also clears the watermark attr.
      if (presenting) {
        const cur = this._slides[this._index];
        if (cur && cur.hasAttribute('data-deck-present-skip')) {
          const live = (start, dir) => {
            let j = start;
            while (j >= 0 && j < this._slides.length &&
                   this._slides[j].hasAttribute('data-deck-present-skip')) j += dir;
            return (j >= 0 && j < this._slides.length) ? j : -1;
          };
          let j = live(this._index + 1, 1);
          if (j < 0) j = live(this._index - 1, -1);
          if (j >= 0) this._go(j, 'api');
        }
      }
      // Presenting flips watermark visibility for whatever slide is current.
      const cur2 = this._slides[this._index];
      this.toggleAttribute('data-deck-present-skip-active',
        !this._presenting && !!cur2 && cur2.hasAttribute('data-deck-present-skip'));
      this._syncRailHidden();
      this._closeMenu();
      this._closeConfirm();
      this._fit();
      this._scaleThumbs();
    }

    _syncRailHidden() {
      if (!this._rail) return;
      // data-presenting is the hard hide (display:none) for flag-off,
      // presentation mode, and the host's Preview segment — instant, no
      // transition. data-user-hidden is the soft hide (translateX(-100%))
      // for the viewer's rail toggle, so show/hide slides under
      // :host([data-rail-anim]).
      const hard = !this._railEnabled || this._presenting || this._previewMode;
      if (hard) this._rail.setAttribute('data-presenting', '');
      else this._rail.removeAttribute('data-presenting');
      if (!this._railVisible) this._rail.setAttribute('data-user-hidden', '');
      else this._rail.removeAttribute('data-user-hidden');
      // translateX hide leaves thumbs (tabIndex=0) in the tab order —
      // inert keeps them unfocusable while the rail is off-screen.
      this._rail.inert = hard || !this._railVisible;
    }

    _onTapBack(e) {
      e.preventDefault();
      this._advance(-1, 'tap');
    }

    _onTapForward(e) {
      e.preventDefault();
      this._advance(1, 'tap');
    }

    _onKey(e) {
      // Ignore when the user is interacting with a form field or focused
      // button. BUTTON matters because Enter (and Space) advance both via
      // the button's native click activation AND via this nav handler —
      // suppressing here lets the button keep its native semantics.
      // Shadow-DOM overlay buttons retarget to the deck-stage host on
      // window-level events, so the guard only kicks in for light-DOM
      // buttons authored inside slides.
      const t = e.target;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT|BUTTON)$/.test(t.tagName))) return;
      // Confirm dialog swallows nav keys while open; Escape cancels. Enter
      // is left to the focused button's native activation so Tab→Cancel
      // →Enter activates Cancel, not the window-level confirm path.
      if (this._confirm && this._confirm.hasAttribute('data-open')) {
        if (e.key === 'Escape') { this._closeConfirm(); e.preventDefault(); }
        return;
      }
      if (e.key === 'Escape' && this._menu && this._menu.hasAttribute('data-open')) {
        this._closeMenu();
        e.preventDefault();
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const key = e.key;
      let handled = true;

      // Step-reveal: a slide carrying data-step-max="N" expands into N+1
      // sub-states (0..N), navigable inline. Advance keys bump data-step
      // until step == max, then fall through to the next slide; retreat
      // mirrors. data-step itself is owned by deck-stage (reset in
      // _applyIndex) so re-entering a stepped slide replays cleanly.
      const isAdvance = (key === 'ArrowRight' || key === 'PageDown' || key === ' ' || key === 'Spacebar' || key === 'Enter');
      const isRetreat = (key === 'ArrowLeft'  || key === 'PageUp');
      if (isAdvance || isRetreat) {
        const slide = this._slides[this._index];
        const max = slide && parseInt(slide.getAttribute('data-step-max') || '0', 10);
        if (slide && max > 0) {
          const cur = parseInt(slide.getAttribute('data-step') || '0', 10);
          if (isAdvance && cur < max) {
            slide.setAttribute('data-step', String(cur + 1));
            this._applyReveals(slide);
            e.preventDefault();
            this._flashOverlay();
            return;
          }
          if (isRetreat && cur > 0) {
            slide.setAttribute('data-step', String(cur - 1));
            this._applyReveals(slide);
            e.preventDefault();
            this._flashOverlay();
            return;
          }
        }
      }

      if (isAdvance) {
        this._advance(1, 'keyboard');
      } else if (isRetreat) {
        this._advance(-1, 'keyboard');
      } else if (key === 'Home') {
        this._go(0, 'keyboard');
      } else if (key === 'End') {
        this._go(this._slides.length - 1, 'keyboard');
      } else if (key === 'r' || key === 'R') {
        // _go short-circuits when already on slide 0, which would otherwise
        // skip _applyIndex's step-reset and leave data-step stuck at its
        // current value for an opening stepped slide. Reset here before
        // dispatching so R always lands on "slide 1, step 0" per README.
        const cur = this._slides[this._index];
        if (cur && cur.hasAttribute('data-step-max')) {
          cur.setAttribute('data-step', '0');
          this._applyReveals(cur);
        }
        this._go(0, 'keyboard');
      } else if (key === 'f' || key === 'F') {
        // Plain 'f' as the single cross-platform toggle. Not F11: Chromium
        // intercepts F11 at the browser level (browser-chrome fullscreen, a
        // different surface from the Fullscreen API) before the page sees
        // it, and macOS doesn't wire F11 to fullscreen at all — binding it
        // here would be dead code with a misleading promise. Escape exits
        // via the browser default — no code needed.
        this._toggleFullscreen();
      } else if (/^[0-9]$/.test(key)) {
        // 1..9 jump to that slide; 0 jumps to 10.
        const n = key === '0' ? 9 : parseInt(key, 10) - 1;
        if (n < this._slides.length) this._go(n, 'keyboard');
      } else {
        handled = false;
      }

      if (handled) {
        e.preventDefault();
        this._flashOverlay();
      }
    }

    _go(i, reason = 'api') {
      if (!this._slides.length) return;
      const clamped = Math.max(0, Math.min(this._slides.length - 1, i));
      if (clamped === this._index) {
        this._flashOverlay();
        return;
      }
      this._index = clamped;
      this._applyIndex({ showOverlay: true, broadcast: true, reason });
    }

    _toggleFullscreen() {
      // Request on the host element (this), not documentElement: the host is
      // already position:fixed; inset:0, so the rail and overlay come along
      // for the ride. The === this check (not just truthy) keeps the toggle
      // host-scoped: if some other element (a future image lightbox, an
      // embedded video) is the fullscreen owner, 'f' won't yank it out — it
      // promotes the deck instead (the Fullscreen API supports transitioning
      // between elements without an explicit exit). catch() swallows the
      // user-gesture-required / not-allowed rejection paths so a denied call
      // doesn't surface as an unhandled promise rejection.
      // Promise.resolve wrapping handles old Safari's webkitRequestFullscreen,
      // which is sync (returns undefined) — modern unprefixed APIs return a
      // promise.
      const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
      if (fsEl === this) {
        const exit = document.exitFullscreen || document.webkitExitFullscreen;
        if (exit) Promise.resolve(exit.call(document)).catch(() => {});
      } else {
        const req = this.requestFullscreen || this.webkitRequestFullscreen;
        if (req) Promise.resolve(req.call(this, { navigationUI: 'hide' })).catch(() => {});
      }
    }

    /** Step forward/back, hopping data-deck-present-skip slides *only while
     *  presenting* — off-stage they're normal navigable slides. Falls back to
     *  _go's clamp-at-ends behaviour (flash overlay) when there's nothing
     *  further in that direction. */
    _advance(dir, reason) {
      if (!this._slides.length) return;
      let i = this._index + dir;
      while (i >= 0 && i < this._slides.length &&
             this._presenting && this._slides[i].hasAttribute('data-deck-present-skip')) {
        i += dir;
      }
      if (i < 0 || i >= this._slides.length) { this._flashOverlay(); return; }
      this._go(i, reason);
    }

    // ── Thumbnail rail ────────────────────────────────────────────────────
    //
    // Thumbs are keyed by slide element and reused across _renderRail()
    // calls, so a reorder/delete is an O(changed) DOM shuffle instead of an
    // O(N) teardown-and-re-clone. Each thumb starts as a lightweight shell
    // (num + empty frame); the clone is materialized lazily by an
    // IntersectionObserver when the frame scrolls into (or near) view, so
    // only visible-ish slides pay the clone + image-decode cost.

    _renderRail() {
      if (!this._rail || !this._railEnabled) { this._thumbs = []; return; }
      // FLIP: record each *materialized* thumb's top before the reconcile.
      // Off-screen (non-materialized) thumbs don't need the animation and
      // skipping their getBoundingClientRect saves a forced layout per
      // off-screen thumb on large decks.
      const prevTops = new Map();
      (this._thumbs || []).forEach(({ thumb, slide, host }) => {
        if (host) prevTops.set(slide, thumb.getBoundingClientRect().top);
      });
      const st = this._rail.scrollTop;

      // Reconcile: reuse thumbs that already exist for a slide, create
      // shells for new slides, drop thumbs for removed slides.
      const bySlide = new Map();
      (this._thumbs || []).forEach((t) => bySlide.set(t.slide, t));
      const next = [];
      this._slides.forEach((slide) => {
        let t = bySlide.get(slide);
        if (t) bySlide.delete(slide);
        else t = this._makeThumb(slide);
        next.push(t);
      });
      // Orphans — slides removed since last render.
      bySlide.forEach((t) => {
        if (this._railObserver) this._railObserver.unobserve(t.frame);
        t.thumb.remove();
      });
      // Put thumbs into document order to match _slides. insertBefore on
      // an already-correctly-placed node is a no-op, so this is cheap
      // when nothing moved.
      next.forEach((t, i) => {
        const want = t.thumb;
        const at = this._rail.children[i];
        if (at !== want) this._rail.insertBefore(want, at || null);
        t.i = i;
        t.num.textContent = String(i + 1);
        if (t.slide.hasAttribute('data-deck-present-skip')) t.thumb.setAttribute('data-skip', '');
        else t.thumb.removeAttribute('data-skip');
      });
      this._thumbs = next;

      this._rail.scrollTop = st;
      if (prevTops.size) {
        const moved = [];
        this._thumbs.forEach(({ thumb, slide }) => {
          const old = prevTops.get(slide);
          if (old == null) return;
          const dy = old - thumb.getBoundingClientRect().top;
          if (Math.abs(dy) < 1) return;
          thumb.style.transition = 'none';
          thumb.style.transform = `translateY(${dy}px)`;
          moved.push(thumb);
        });
        if (moved.length) {
          // Commit the inverted positions before flipping the transition
          // on — otherwise the browser coalesces both style writes and
          // nothing animates.
          void this._rail.offsetHeight;
          moved.forEach((t) => {
            t.style.transition = 'transform 180ms cubic-bezier(.2,.7,.3,1)';
            t.style.transform = '';
          });
          setTimeout(() => moved.forEach((t) => { t.style.transition = ''; }), 220);
        }
      }
      requestAnimationFrame(() => this._scaleThumbs());
      this._syncRail(false);
    }

    /** Create a lightweight thumb shell for one slide. The clone is
     *  materialized later by the IntersectionObserver. Event handlers
     *  look up the thumb's *current* index (via _thumbs.indexOf) so the
     *  same element can be reused across reorders. */
    _makeThumb(slide) {
      const thumb = document.createElement('div');
      thumb.className = 'thumb';
      thumb.tabIndex = 0;
      const num = document.createElement('div');
      num.className = 'num';
      const frame = document.createElement('div');
      frame.className = 'frame';
      thumb.append(num, frame);

      const entry = { thumb, num, frame, slide, clone: null, host: null, i: -1 };
      // entry.i is refreshed on every _renderRail reconcile pass, so
      // handlers read the thumb's current position without an O(N) scan.
      const idx = () => entry.i;

      thumb.addEventListener('click', () => this._go(idx(), 'click'));
      // ↑/↓ step through the rail when a thumb has focus. _go clamps at the
      // ends and _applyIndex→_syncRail scrolls the new current thumb into
      // view; we move focus to it (preventScroll — _syncRail already
      // scrolled) so a held key walks the whole list. stopPropagation keeps
      // this out of the window-level _onKey nav handler.
      thumb.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
        if (e.metaKey || e.ctrlKey || e.altKey) return;
        e.preventDefault();
        e.stopPropagation();
        this._go(idx() + (e.key === 'ArrowDown' ? 1 : -1), 'keyboard');
        const cur = this._thumbs && this._thumbs[this._index];
        if (cur) cur.thumb.focus({ preventScroll: true });
      });
      thumb.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        this._openMenu(idx(), e.clientX, e.clientY);
      });
      thumb.draggable = true;
      thumb.addEventListener('dragstart', (e) => {
        this._dragFrom = idx();
        thumb.setAttribute('data-dragging', '');
        e.dataTransfer.effectAllowed = 'move';
        try { e.dataTransfer.setData('text/plain', String(this._dragFrom)); } catch (err) {}
      });
      thumb.addEventListener('dragend', () => {
        thumb.removeAttribute('data-dragging');
        this._clearDrop();
        this._dragFrom = null;
      });
      thumb.addEventListener('dragover', (e) => {
        if (this._dragFrom == null) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        const r = thumb.getBoundingClientRect();
        this._setDrop(idx(), e.clientY < r.top + r.height / 2 ? 'before' : 'after');
      });
      thumb.addEventListener('drop', (e) => {
        if (this._dragFrom == null) return;
        e.preventDefault();
        const i = idx();
        const r = thumb.getBoundingClientRect();
        let to = e.clientY >= r.top + r.height / 2 ? i + 1 : i;
        if (this._dragFrom < to) to--;
        const from = this._dragFrom;
        this._clearDrop();
        this._dragFrom = null;
        if (to !== from) this._moveSlide(from, to);
      });

      if (this._railObserver) this._railObserver.observe(frame);
      frame.__deckThumb = entry;
      return entry;
    }

    /** Lazily build the clone for a thumb that has scrolled into view. */
    _materialize(entry) {
      if (entry.host) return;
      const dw = this.designWidth, dh = this.designHeight;
      let clone = entry.slide.cloneNode(true);
      clone.removeAttribute('id');
      clone.removeAttribute('data-deck-active');
      clone.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'));
      // Neuter heavy media; replace <video> with its poster so the box
      // keeps a visual. <iframe>/<audio> become empty placeholders.
      clone.querySelectorAll('iframe, audio, object, embed').forEach((el) => {
        el.removeAttribute('src');
        el.removeAttribute('srcdoc');
        el.removeAttribute('data');
        el.innerHTML = '';
      });
      clone.querySelectorAll('video').forEach((el) => {
        if (!el.poster) { el.removeAttribute('src'); el.innerHTML = ''; return; }
        const img = document.createElement('img');
        img.src = el.poster;
        img.alt = '';
        img.style.cssText = el.style.cssText + ';object-fit:cover;width:100%;height:100%;';
        img.className = el.className;
        el.replaceWith(img);
      });
      // <image-slot> renders its <img> inside its own shadow DOM; cloneNode
      // does not traverse shadow roots, so the cloned slot is empty and the
      // generic neuter pass below would otherwise discard it as a dashed
      // placeholder. Stand up a plain <div><img></div> in its place, copying
      // the slot's attributes (incl. class + data-filled) so the author
      // sizing rules — `.proj-card .picon { width:72px; height:72px }`,
      // `.s-about2 .photo-slot { aspect-ratio:4/5 }`, and the
      // `.scene-slot { width:100%; height:100% }` that the
      // image-slot → tag-strip rewrite in _snapshotAuthorCss makes reachable
      // — keep driving the layout. Sizing is therefore handed back to CSS;
      // the inner <img> just fills its parent with the slot's fit/position.
      clone.querySelectorAll('image-slot').forEach((el) => {
        const div = document.createElement('div');
        for (const a of el.attributes) {
          if (a.name === 'src') continue;
          div.setAttribute(a.name, a.value);
        }
        const inlineStyle = el.getAttribute('style');
        if (inlineStyle) div.setAttribute('style', inlineStyle);
        const src = el.getAttribute('src');
        if (src) {
          const img = document.createElement('img');
          img.src = src;
          img.alt = '';
          const fit = el.getAttribute('fit') || 'cover';
          const pos = el.getAttribute('position') || '50% 50%';
          img.style.cssText = 'display:block;width:100%;height:100%;object-fit:' +
            fit + ';object-position:' + pos + ';';
          div.appendChild(img);
        }
        el.replaceWith(div);
      });
      // Images: defer decode and let the browser pick the smallest
      // srcset candidate for the ~140px thumb. Same-URL clones reuse the
      // slide's decoded bitmap (URL-keyed cache), so the remaining cost
      // is paint/composite — lazy+async keeps that off the main thread.
      clone.querySelectorAll('img').forEach((el) => {
        el.loading = 'lazy';
        el.decoding = 'async';
        if (el.srcset) el.sizes = (this._railPx || 188) + 'px';
      });
      // Custom elements inside the slide would have their
      // connectedCallback fire when the clone is appended. Replace them
      // with inert boxes so a component-heavy deck doesn't run N copies
      // of each component's mount logic in the rail. Children are
      // preserved so layout-wrapper elements (<my-column><h2>…</h2>)
      // still show their authored content; the querySelectorAll NodeList
      // is static, so nested custom elements in the moved subtree are
      // still visited on later iterations.
      const neuter = (el) => {
        const box = document.createElement('div');
        box.style.cssText = (el.getAttribute('style') || '') +
          ';background:rgba(0,0,0,0.06);border:1px dashed rgba(0,0,0,0.15);';
        box.className = el.className;
        // Preserve theming/i18n hooks so [data-*] / :lang() / [dir]
        // descendant selectors still match the neutered root.
        for (const a of el.attributes) {
          const n = a.name;
          if (n.startsWith('data-') || n.startsWith('aria-') ||
              n === 'lang' || n === 'dir' || n === 'role' || n === 'title') {
            box.setAttribute(n, a.value);
          }
        }
        while (el.firstChild) box.appendChild(el.firstChild);
        return box;
      };
      // querySelectorAll('*') returns descendants only — a custom-element
      // slide root (<my-slide>…</my-slide>) would slip through and upgrade
      // on append. Swap the root first.
      if (clone.tagName.includes('-')) clone = neuter(clone);
      clone.querySelectorAll('*').forEach((el) => {
        if (el.tagName.includes('-')) el.replaceWith(neuter(el));
      });
      clone.style.cssText += ';position:absolute;top:0;left:0;transform-origin:0 0;' +
        'pointer-events:none;width:' + dw + 'px;height:' + dh + 'px;' +
        'box-sizing:border-box;overflow:hidden;visibility:visible;opacity:1;';
      const host = document.createElement('div');
      host.style.cssText = 'position:absolute;inset:0;';
      this._syncThumbHostAttrs(host);
      const sr = host.attachShadow({ mode: 'open' });
      if (this._adoptedSheet) sr.adoptedStyleSheets = [this._adoptedSheet];
      else {
        const st = document.createElement('style');
        st.textContent = this._authorCss || '';
        sr.appendChild(st);
      }
      sr.appendChild(clone);
      entry.frame.appendChild(host);
      entry.host = host;
      entry.clone = clone;
      if (this._thumbScale) clone.style.transform = 'scale(' + this._thumbScale + ')';
      // Once materialized the IO callback is a no-op early-return —
      // unobserve so scroll doesn't keep firing it.
      if (this._railObserver) this._railObserver.unobserve(entry.frame);
    }

    /** Re-clone a single thumb (live-update path). No-op if the thumb
     *  hasn't been materialized yet — it'll pick up current content when
     *  it scrolls into view. */
    _refreshThumb(slide) {
      const entry = (this._thumbs || []).find((t) => t.slide === slide);
      if (!entry || !entry.host) return;
      entry.host.remove();
      entry.host = entry.clone = null;
      this._materialize(entry);
    }

    _scaleThumbs() {
      if (!this._thumbs || !this._thumbs.length) return;
      // Every frame is the same width; if it reads 0 the rail is
      // display:none (noscale / no-rail / presenting / print) — leave the
      // clones as-is and re-run when the rail is revealed.
      const fw = this._thumbs[0].frame.offsetWidth;
      if (!fw) return;
      this._thumbScale = fw / this.designWidth;
      this._thumbs.forEach(({ clone }) => {
        if (clone) clone.style.transform = 'scale(' + this._thumbScale + ')';
      });
    }

    _setDrop(i, where) {
      // dragover fires at pointer-event rate; touch only the previous
      // and new target rather than sweeping all N thumbs.
      const t = this._thumbs && this._thumbs[i];
      if (this._dropOn && this._dropOn !== t) {
        this._dropOn.thumb.removeAttribute('data-drop');
      }
      if (t) t.thumb.setAttribute('data-drop', where);
      this._dropOn = t || null;
    }

    _clearDrop() {
      if (this._dropOn) this._dropOn.thumb.removeAttribute('data-drop');
      this._dropOn = null;
    }

    _syncRail(follow) {
      if (!this._thumbs) return;
      this._thumbs.forEach(({ thumb }, i) => {
        if (i === this._index) {
          thumb.setAttribute('data-current', '');
          if (follow && typeof thumb.scrollIntoView === 'function') {
            thumb.scrollIntoView({ block: 'nearest' });
          }
        } else {
          thumb.removeAttribute('data-current');
        }
      });
    }

    _openMenu(i, x, y) {
      if (!this._menu) return;
      this._menuIndex = i;
      this._menu.querySelector('[data-act="up"]').disabled = i <= 0;
      this._menu.querySelector('[data-act="down"]').disabled = i >= this._slides.length - 1;
      this._menu.querySelector('[data-act="delete"]').disabled = this._slides.length <= 1;
      // Place, then clamp to viewport after it's measurable.
      this._menu.style.left = x + 'px';
      this._menu.style.top = y + 'px';
      this._menu.setAttribute('data-open', '');
      const r = this._menu.getBoundingClientRect();
      const nx = Math.min(x, window.innerWidth - r.width - 4);
      const ny = Math.min(y, window.innerHeight - r.height - 4);
      this._menu.style.left = Math.max(4, nx) + 'px';
      this._menu.style.top = Math.max(4, ny) + 'px';
    }

    _closeMenu() {
      if (this._menu) this._menu.removeAttribute('data-open');
      this._menuIndex = -1;
    }

    _openConfirm(i) {
      if (!this._confirm) return;
      this._confirmIndex = i;
      this._confirm.querySelector('.title').textContent = 'Delete slide ' + (i + 1) + '?';
      this._confirm.setAttribute('data-open', '');
      const btn = this._confirm.querySelector('.danger');
      if (btn && btn.focus) btn.focus();
    }

    _closeConfirm() {
      if (this._confirm) this._confirm.removeAttribute('data-open');
      this._confirmIndex = -1;
    }

    _emitDeckChange(detail) {
      this.dispatchEvent(new CustomEvent('deckchange', {
        detail, bubbles: true, composed: true,
      }));
    }

    _deleteSlide(i) {
      const slide = this._slides[i];
      if (!slide || this._slides.length <= 1) return;
      const wasCurrent = i === this._index;
      if (i < this._index || (wasCurrent && i === this._slides.length - 1)) this._index--;
      this._squelchSlotChange = true;
      slide.remove();
      this._emitDeckChange({ action: 'delete', from: i, slide });
      this._collectSlides();
      this._applyIndex({ showOverlay: true, broadcast: true, reason: 'mutation' });
    }

    /** Indices of present-skip slides — the ones the live talk hops over.
     *  Broadcast as `deckSkipped` so a presenter popup can re-pick the
     *  nearest live slide for its prev/next thumbnails. */
    _skippedIndices() {
      const out = [];
      for (let i = 0; i < this._slides.length; i++) {
        if (this._slides[i].hasAttribute('data-deck-present-skip')) out.push(i);
      }
      return out;
    }

    _moveSlide(i, j) {
      if (j < 0 || j >= this._slides.length || j === i) return;
      const slide = this._slides[i];
      const ref = j < i ? this._slides[j] : this._slides[j].nextSibling;
      // Track the active slide across the reorder so the same content
      // stays on screen.
      const cur = this._index;
      if (cur === i) this._index = j;
      else if (i < cur && j >= cur) this._index = cur - 1;
      else if (i > cur && j <= cur) this._index = cur + 1;
      this._squelchSlotChange = true;
      this.insertBefore(slide, ref);
      this._emitDeckChange({ action: 'move', from: i, to: j, slide });
      this._collectSlides();
      this._applyIndex({ showOverlay: false, broadcast: true, reason: 'mutation' });
    }

    // Public API ------------------------------------------------------------

    /** Current slide index (0-based). */
    get index() { return this._index; }
    /** Total slide count. */
    get length() { return this._slides.length; }
    /** Programmatically navigate. */
    goTo(i) { this._go(i, 'api'); }
    next() { this._advance(1, 'api'); }
    prev() { this._advance(-1, 'api'); }
    reset() { this._go(0, 'api'); }
  }

  if (!customElements.get('deck-stage')) {
    customElements.define('deck-stage', DeckStage);
  }
})();

