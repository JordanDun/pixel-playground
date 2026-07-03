## Plan: Land the scroll-scale into a real reel section

Right now the FG video expands to fullscreen during the sticky scroll, then the page just… moves on to the logo marquee. The reel never gets a moment. This plan turns that expansion into a *transition into* a proper reel section, placed right after the logo marquee.

### 1. Hero stays as-is (`src/routes/index.tsx`)

- Keep the sticky scroll-scale mechanic exactly as it is — "YOUR ___ AGENCY" typography and the FG video expanding to fullscreen.
- No changes to hero height, timing, or feel.

### 2. New section: `<ReelSection />` — directly after `<LogoMarquee />`

A dedicated, full-bleed reel moment that visually continues from where the hero's fullscreen video left off.

- **Full-viewport-width 16:9 stage**, dark background, edge-to-edge (no side padding on desktop; small inset on mobile).
- **Overlay UI on top of the video:**
  - Top-left: `2024 REEL` label in the display font, small caps, tracked out.
  - Top-right: runtime (e.g. `1:32`) + `SOUND ON` / `SOUND OFF` toggle.
  - Center: large circular outlined play button (~120px), subtle pulse. Clicking it swaps the muted background embed for the full-sound, controls-on version and enters fullscreen.
- **Below the video** (same section, generous padding):
  - Left: short line — "A look at what came out of the studio this year."
  - Right: text link → "See all work" routing to `/work`.

### 3. Visual continuity with the hero

- Reel stage opens at the same visual weight the hero ended on (full width, 16:9).
- Rounded-corner treatment matches (0px mobile, subtle 6px inset desktop).
- Logo marquee sits between them as a "breath" — thin band of client proof before the reel plays.

### 4. Interaction

- Default: muted, autoplaying, looping background embed (same treatment as hero FG).
- On play-button click: replace the iframe `src` with the un-backgrounded Vimeo URL (`autoplay=1`, controls visible, sound on), and request fullscreen on the iframe container. No modal, no video-player library.

### 5. Not changing

- Hero typography, cycling word, scroll-scale.
- Manifesto, stats, CTA, Instagram, footer.
- Logo marquee.
- No new dependencies.

### Technical notes

- New component: `src/components/ReelSection.tsx`. Client-side (`useState` for play state, `useRef` for fullscreen API). Same lazy-mount pattern as the hero iframes (`requestIdleCallback`) so we don't add a third eager Vimeo player to first paint.

### Open question before build

Is the current FG video (Vimeo `1103295539`) the actual 2024 reel we want people to play, or is there a different, longer cut we should point at? If different, I'll need the Vimeo ID and runtime. If you're not sure, I'll default to `1103295539` and you can swap the ID later.
