# Pre-Deployment QA Checklist

Run this after every content or markup change, before pushing live.

## Structural
- [ ] HTML validates (W3C validator) on both files (`/`, `/ko/`)
- [ ] Exactly one `<h1>` per page
- [ ] Heading order never skips a level (h1→h2→h3)
- [ ] Every internal anchor href (`#menu`, `#visit-timing`, etc.) has a matching `id`
      in the same page
- [ ] Every `<img>` has `width`, `height`, and a non-empty `alt` (or `alt=""` if
      purely decorative)

## CTAs — must all actually work
- [ ] Get Directions opens Google Maps to the correct address (test on mobile + desktop)
- [ ] View Menu scrolls to `#menu`
- [ ] Call opens the dialer with `+82263973530` (test on an actual phone, not just desktop)
- [ ] Kakao Channel: either present and working, or absent entirely — no dead/placeholder link
- [ ] `data-event` attributes present on all CTA types. With no GA4 ID configured,
      confirm clicking a CTA does **nothing observable** (no console output, no
      network request) — that silence is correct, not a bug

## Keyboard & accessibility
- [ ] On page load, focus starts on the document body / skip link — NOT on the
      mobile menu toggle button
- [ ] Tab through the entire page — every interactive element reachable, visible
      focus ring on each
- [ ] Mobile menu: Tab to toggle button → Enter/Space opens it → focus moves into
      menu
- [ ] Mobile menu: while closed, Tab through the page and confirm focus never
      lands on a menu link hidden off-screen (the `inert` attribute should make
      this impossible — verify in an actual browser, not just by reading the code)
- [ ] Mobile menu: Escape closes it and focus returns to the toggle button
- [ ] Mobile menu: clicking a nav link inside closes the menu (focus follows
      the in-page navigation, does not need to return to the toggle)
- [ ] Mobile menu: when open, background page does not scroll
- [ ] Mobile menu: open the menu on a narrow viewport, then resize the browser
      past the desktop breakpoint (768px) — menu should auto-close, `nav-open`
      class and `aria-expanded` should reset. Resize back down — menu should
      NOT reappear already open
- [ ] `aria-expanded` on the toggle button flips `false`↔`true` correctly, and
      `inert`/`aria-hidden` flip oppositely (inspect in DevTools, don't just
      eyeball the visual state)
- [ ] FAQ `<details>` items open/close via mouse and keyboard (Enter/Space on
      `<summary>`)
- [ ] Screen reader spot-check (VoiceOver/NVDA): nav landmarks, skip link, and
      FAQ items announce sensibly

## Content parity (KO ⇄ EN)
- [ ] Every fact stated in one language is stated in the other — no silent
      additions or omissions
- [ ] Price figures identical (₩20,800 / ₩21,800)
- [ ] FAQ question count identical (12) and in the same order
- [ ] Native-speaker review completed for both languages (not yet done — see
      architecture doc §QA item 9)

## Structured data
- [ ] Paste each `<script type="application/ld+json">` block into Google's Rich
      Results Test — no syntax errors
- [ ] `acceptsReservations` is boolean `false`, not the string `"False"`
- [ ] FAQPage JSON-LD text matches the visible `<summary>`/`<p>` text exactly,
      question-for-question, in both languages
- [ ] No question exists in JSON-LD that isn't visible on the page

## SEO
- [ ] `<title>` and meta description are unique per page and under ~155 characters
- [ ] `canonical` on `/` and `/ko/` each point to themselves (no cross-pointing,
      no `/en/` — that path no longer exists)
- [ ] hreflang set (`en`→`/`, `ko`→`/ko/`, `x-default`→`/`) present and
      identical across both pages
- [ ] `sitemap.xml` lists `/` and `/ko/`
- [ ] `robots.txt` references the correct sitemap URL
- [ ] Open Graph + Twitter Card tags present, `og:image` resolves to a real image

## Compliance — the rules that matter most
- [ ] Every place a price appears (Hero excluded on purpose — see architecture
      doc), the "Weekend evenings: 100-minute time limit" line appears in the
      same `.price-panel` block, at body-text size or larger (currently 1rem/16px,
      bold, bordered) — not a small footnote
- [ ] Full-text search the rendered HTML for: `reserv`, `book`, `Book Now`,
      `popular`, `best`, `most`, `usually`, `average`, `always`, `most guests`,
      `for the current situation` — confirm zero matches outside this checklist
      itself
- [ ] Confirm the Waiting section does not imply staff can locate/recall a
      guest who has stepped away — current copy asks guests to check with
      staff *before* leaving the immediate area, not "explore nearby" unprompted

## Performance (after real deploy — cannot be fully tested from static files alone)
- [ ] Run Lighthouse (mobile, throttled) on `/` and `/ko/`
- [ ] LCP, CLS, INP against targets in architecture doc §6 — record actual
      numbers, adjust images/CSS if targets are missed
- [ ] Confirm total transferred bytes on first paint (images were recompressed
      2026-07-15, ~104–150KB each — no AVIF/WebP variants yet, see PLACEHOLDERS.md #5)

## Before going live
- [ ] All items in `PLACEHOLDERS.md` resolved or explicitly deferred with owner sign-off
- [ ] Domain replaced everywhere (`PLACEHOLDERS.md` #1)
- [ ] Image usage rights confirmed for all 4 `assets/img/` files (`PLACEHOLDERS.md` #9)
- [ ] Deployment package excludes `photos/` (source material, not a site asset)
