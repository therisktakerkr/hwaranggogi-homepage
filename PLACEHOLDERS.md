# Placeholder Replacement List

Everything below is a known gap, intentionally left as a placeholder or omitted
rather than guessed. Nothing in this list was invented — each item traces back to
an open question in the fact-verification work.

---

## SEO optimization pass — 2026-07-15 (v28 → optimized)

Applied to the "cinematic" v28 build without touching its design or section
structure, per explicit instruction. Summary:

- **Video compressed 31MB → 4.6MB** (hero 16.4MB→1.5MB, signature 4.5MB→0.8MB,
  visit 10.2MB→2.4MB) via ffmpeg: scaled to 720p, H.264 CRF 28, audio track
  stripped from the visit video (it was always `muted`, so the AAC track was
  pure dead weight). Re-encoded files replace the originals under the same
  filenames — no HTML `src` changes needed. Visual quality checked by
  extracting sample frames; no visible artifacting at this bitrate for
  looping background footage.
- **Poster images compressed** (~600KB each → 165–225KB, resized to 1280×720).
- **`preload="auto"` → `preload="metadata"`** on the hero video (the other two
  already used `metadata`). With the file now at 1.5MB this matters less than
  it did, but it's still the correct default for autoplay background video.
- **FAQPage JSON-LD restored**, matching the 5 currently-visible questions
  exactly (not the old 12 — those belonged to an earlier version of the page
  and would no longer match visible content).
- **`hasMenu` restored** on the Restaurant schema.
- **VideoObject JSON-LD added** for all 3 videos (name/description/
  thumbnailUrl/contentUrl/duration). `uploadDate` was deliberately left out —
  it's technically expected for full Google video rich-result eligibility,
  but no real upload date is known and one was not invented. Add it once the
  owner confirms when the footage was shot.
- **H1 no longer drops the brand name.** EN was "PREMIUM KOREAN PORK BBQ"
  (no brand name, and "PREMIUM" is an unsubstantiated superlative); now
  "HWARANG GOGI / CHARCOAL KOREAN / PORK BBQ". KO matched (프리미엄 → 화랑고기).
- **"BEST" badge → "SIGNATURE"** on the featured set card, both languages —
  "BEST" is an unsubstantiated superlative with no ranking/award/data behind
  it; "SIGNATURE" describes the same thing (their named flagship set)
  without the claim.
- **Instagram embed now lazy-loads.** `embed.js` no longer loads unconditionally
  on every page view — `main.js` now loads it only once the `#instagram`
  section actually scrolls into view (`IntersectionObserver`, 200px margin).
- **Real favicon.** `favicon.svg` (generic placeholder circle) removed.
  `favicon-32.png` and `apple-touch-icon.png` are cropped directly from the
  real logo's red seal mark (`assets/img/hwarang-logo.png`) — not invented,
  not a new design element, just an existing part of the real logo isolated
  into icon form.
- **3 superseded image versions deleted** (`hero-v13-poster.jpg`,
  `location-exterior-v8.jpg`, `location-exterior-v9.jpg`) — confirmed via
  grep that nothing in either HTML file referenced them.
- **KO meta description lengthened** from 56 to a fuller ~110 characters
  (added station/walking-distance keywords) — was well under the ~155
  character budget before.

None of this changed the page's visible layout, section order, video
content, or copy tone beyond the two specific superlative removals above.

---

## 1. Domain — `https://hwarang-hongdae.example/`

**Where:** every `<link rel="canonical">`, every `<link rel="alternate" hreflang="...">`,
every `og:url` / `og:image` / `twitter:image`, `robots.txt`, `sitemap.xml`.

`.example` is an IANA-reserved TLD used specifically as a non-resolvable placeholder —
it will never accidentally point at a real site. Find-and-replace
`hwarang-hongdae.example` with the real domain across:

- `index.html`, `ko/index.html`
- `robots.txt`, `sitemap.xml`

## 2. Kakao Channel URL — currently *absent*, not a dead link

**Where a button needs to be added back, once a channel exists**, in **both**
`index.html` and `ko/index.html`:

1. Header mobile nav / desktop nav — optional, not currently planned
2. `#contact` section — inside `.contact-actions`, replace the HTML comment with:
   ```html
   <a class="btn btn-secondary" data-event="kakao_click" href="https://pf.kakao.com/_REAL_CHANNEL_ID">Kakao Channel</a>
   ```
3. Footer — inside `.footer-kakao`, replace the HTML comment with a channel link.
4. Sticky mobile CTA bar — inside `<nav class="sticky-cta">`, add a fourth `<a>`
   following the same pattern as Directions/Menu/Call, with `data-event="kakao_click"`.
   `main.css`'s `.sticky-cta a` is already flex-based, so a 4th item reflows
   automatically — no CSS change needed.

**Do not** ship `#`, an empty `href`, a disabled-looking button, or a `_xxxxx`
placeholder ID in the public site — per the explicit instruction, absence of the
feature should mean absence of the button, not a broken one.

## 3. Get Directions link — upgrade path

**Current implementation:** Google Maps address-search link (priority tier 2):
```
https://www.google.com/maps/search/?api=1&query=Hwarang+Gogi+Hongdae+40+Wausan-ro+23-gil+Mapo-gu+Seoul
```
This works today and requires no further action. If the actual Google Maps
Place ID or a shared listing URL is later confirmed directly from the Google
Business Profile dashboard (tier 1, more precise — shows the real pin +
reviews), replace the `href` in 6 places: hero CTA, Location section CTA, and
sticky bar, × 2 languages.

## 4. Favicon — RESOLVED 2026-07-15

Now `favicon-32.png` + `apple-touch-icon.png`, cropped from the real red seal
mark inside `assets/img/hwarang-logo.png`. If a cleaner/higher-res export of
just the seal (independent of the full wordmark lockup) ever becomes
available, re-crop from that instead for better edge quality at small sizes —
but the current version is the real mark, not a placeholder.

## 5. Images — general notes

`assets/img/` holds 4 files: `hero-grill.jpg`, `menu-flatlay.jpg`,
`table-setting.jpg`, `location-exterior.jpg`. None are stock or AI-generated.
All 4 were resized/recompressed on 2026-07-15 (from 212KB–1MB originals down
to 104–150KB each). No AVIF/WebP *output* variants exist yet — only JPEG; a
real image pipeline should generate next-gen formats before final performance
measurement.

`location-chandelier.jpg` (an interior shot, superseded by `location-exterior.jpg`)
is no longer referenced by any page but remains in the folder in case a future
gallery section wants it.

**Owner-provided source photos not yet used:** `photos/marketing/` (3
promotional flat-lays with Korean text overlays), `photos/food/` (7
close-ups), `photos/table-settings/` (5 styled full-table overhead shots —
arguably better than the current `menu-flatlay.jpg`/`table-setting.jpg`, worth
a look), `photos/toasting/` (2 shots), and 3 more `photos/interior/` shots.
`photos/` is source material, not a deployment asset — see README.md.

**Consent flag:** `photos/toasting/*`, `photos/interior/interior-dining-room-wide-*`,
and the sidewalk passerby in `photos/exterior/exterior.webp` show real people
(hands, backs of heads, a pedestrian mid-stride — no clear faces, but still
identifiable in principle). Confirm consent/right-to-publish before using any
of these beyond what's already live. See #9 below — this is a separate
question from copyright/usage-rights.

## 6. "Gabri" menu item

The customer-facing pages now show plain **"Gabri"** in the Special plan's
ingredient list — the earlier version had an asterisk footnote reading
*"English name for this cut is still being finalized,"* which exposed
internal process language to guests and was removed. The underlying question
is still open: confirm the correct customer-facing English name (or confirm
that "Gabri" as transliterated is fine to use permanently) before this needs
revisiting. Do not guess an anatomical translation (e.g. "pork cheek") without
the owner confirming it.

## 7. Analytics measurement ID

No `GA_MEASUREMENT_ID` constant exists in `main.js` anymore — the event
listener for `data-event` clicks is only attached `if (typeof window.gtag ===
"function")`, so with no analytics script loaded, clicking a CTA does
nothing at all (no console output, no stub). Once a real GA4 ID exists:

1. Add the standard `gtag.js` loader `<script>` tags to the `<head>` of both
   pages (not included yet — no script loads today).
2. No changes to `main.js` are needed — the existing `gtag` check will start
   firing automatically once `window.gtag` exists.

## 8. Japanese / Chinese pages

Not built in Phase 1 — see README.md "Language scope." When ready, duplicate
the root `index.html` structurally, translate all visible text using the same
fact-only discipline as the KO/EN copy, and add the new locale to every
hreflang block + `sitemap.xml`.

## 9. Image usage rights — confirm before public deployment

`hero-grill.jpg`, `menu-flatlay.jpg`, and `table-setting.jpg` were sourced
from the restaurant's public Google Maps listing during the fact-verification
phase. **A photo appearing on a business's Google Maps listing does not mean
the business owns or has publishing rights to it** — Google Maps photos are
frequently uploaded by customers or reviewers, not the business itself, and
using them on the restaurant's own website without a confirmed right to do so
is a real legal exposure, however small.

`location-exterior.jpg` is different and lower-risk: it was supplied directly
by the owner as "the main entrance," which is reasonable (though still not
explicit) evidence of an ownership/right-to-use claim.

**Before deploying publicly:** confirm for each of the 3 Google-Maps-sourced
images that one of the following is true:
- The owner or staff took the photo themselves, or
- The photographer granted the restaurant a license to use it, or
- The restaurant otherwise holds the rights to the original.

If none of these can be confirmed, replace the image rather than publish it
on that assumption.
