## Goal

Simplify the homepage so it works with the small amount of content you actually have. Keep the side toolbar. Remove the asymmetric grid, the photo placeholders, and the auto-playing small video tiles. Replace all of that with **a small number of large, deliberate highlights** — so the page feels intentional instead of half-empty.

## What the new homepage looks like (top to bottom)

1. **Hero** — unchanged. Full-screen reel + cycling headline.

2. **Short intro** (kept, trimmed, new headline)
   - Eyebrow: "Selected work"
   - **New headline** — I'll drop in this one as the default, with two alternates left as comments so you can swap with a one-line edit:
     - Default: **"The work, lately."**
     - Alt 1: "Made in Columbus. Built to perform."
     - Alt 2: "A few things we're proud of."
   - One short paragraph below it (kept).

3. **Featured work — 3 large videos, stacked**
   - Three big tiles, **one per row, full content width**.
   - Each tile shows a **static Vimeo thumbnail by default** (no autoplay). A play icon overlays it.
   - On desktop hover / mobile tap, that single tile's background video starts playing. Only one plays at a time.
   - Below each tile: client name + one-line descriptor.
   - "View all work →" link below.
   - We'll try this — if it feels too repetitive once we see it live, easy next step is to drop it to 2 tiles or switch to a 2-up row.

4. **Instagram section** — unchanged (kept with placeholder tiles).

5. **Footer** — unchanged.

## What gets removed

- The asymmetric 12-col grid with mixed videos + "PHOTO — ADD IMAGE" placeholders.
- The small auto-playing tiles.
- The "Your campaign, shot like cinema." headline.

## Content decisions

- **3 featured videos**: I'll pick Pickups Plus (912330431), BrewDog (932863528), and Status Solutions Network (912389278). Pickups leads because it's already the hero reel and reads as the strongest brand film; BrewDog and SSN show range. Ohio Steel sits out (it's already used in the hero foreground).
- **Thumbnails**: pulled automatically from Vimeo via `https://vumbnail.com/{id}.jpg` — no upload needed.
- **Captions** (I'll draft, easy to edit):
  - Pickups Plus — Brand film
  - BrewDog — Campaign spot
  - Status Solutions Network — Animated explainer

## Technical notes

- All changes in `src/routes/index.tsx`. No new files, no new dependencies.
- Each tile is a small React component with `useState` for hovered/playing; Vimeo iframe only mounts when triggered (keeps initial paint cheap, only one iframe live at a time).
- Tile aspect: 16:9, full width of `max-w-7xl`, stacked with `gap-8`.
- Reuse the existing `videosReady` idle-gate pattern for any iframe mounting.
- Side toolbar untouched.
