## Production domain

- https://hwaranggogihd.com
- Korean: https://hwaranggogihd.com/ko/

# Hwarang Gogi Hongdae — V10 Deployable Static Site

## Included
- English root page: `/index.html`
- Korean page: `/ko/index.html`
- Responsive HTML/CSS/JavaScript
- Full-screen hero video placeholder
- Restaurant and FAQ content
- Face-free location photo crop focused on the storefront

## Preview locally
You can double-click `index.html`. For deployment-like testing, run:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080/`.

## Before public deployment
1. Replace every `hwarang-hongdae.example` occurrence with the final domain.
2. Replace `assets/video/hero-placeholder.mp4` with the final Higgsfield MP4, keeping the same filename.
3. Confirm all menu prices, operating hours, and service details.
4. Confirm image usage rights. The V10 location image is a crop of the photo supplied in the conversation and excludes visible pedestrian faces.
5. Add a real Kakao Channel URL only after the channel exists.

## Hosting
The project can be uploaded directly to GitHub Pages, Cloudflare Pages, Netlify, or any static web host. No build step is required.


## V10 update
- English brand headline changed to two fixed lines: `Quality begins` / `before the grill.`
- Korean headline remains: `고기의 시작부터` / `다릅니다.`
- Existing responsive, SEO, accessibility, video replacement, and bilingual structure retained.


## V13 hero video
The uploaded Higgsfield video is already installed as `assets/video/hwarang-hero-v13.mp4`. It is a 1920×1080 H.264, muted, fast-start web version. The original 4K HEVC master is not included to keep the deployment package lightweight and browser-compatible.

## V14 Hero
Uses `assets/video/hwarang-hero-v14-1440p.mp4` (2560×1440 H.264). Hero copy fades after 4.6 seconds and returns on pointer, touch, or keyboard focus.

## V16 Hero timing
The Hero copy automatically begins its cinematic fade 2.6 seconds after display. Interaction restores it temporarily. Users who prefer reduced motion are not subject to automatic hiding.


## V16 Hero layout
Desktop Hero copy is left-aligned so the video remains visually open on the right. The copy still clears after 2.6 seconds.


## V28
- Added a bilingual Instagram social-proof section below Signature Sets.
- Embedded the supplied Instagram Reel with an official Instagram embed and direct fallback link.
- Added 950K+ view messaging, mobile phone-style framing, and responsive styling.


## V28 update
- On desktop, the signature table video now remains sticky while scrolling through both Hwarang Special and Hwarang Basic.
- The sticky movement ends naturally at the bottom of the Hwarang Basic card.
- Tablet and mobile layouts keep the normal stacked scroll behavior.


## V28 변경사항
- 한국어 Instagram 섹션 헤드라인을 `95만명이 / 시청한 / 화랑고기` 3줄 구성으로 변경했습니다.
