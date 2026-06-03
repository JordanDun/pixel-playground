## Goal
Add a yandl.com/work-style showcase grid to the homepage — asymmetric/masonry, mixing autoplay video tiles with labeled empty photo slots — placed close to the top, with a link to `/work`.

## Placement
Insert the new `<section id="recent-work">` **between the hero (`#top`) and the existing `#reel` "Selected work / shot like cinema" section**. The existing reel intro stays, but I'll shrink its scale so it reads as a secondary caption under the showcase rather than a competing headline:
- Heading: `text-5xl md:text-7xl` → `text-3xl md:text-5xl`
- Paragraph stays
- Reduce vertical padding (`py-24` → `py-16`)

This puts work "closer to the top" while preserving the copy you want to keep iterating on.

## New section: Recent work
- Eyebrow: `Recent work.`
- No long headline — let the grid do the talking
- Subtle right-aligned link: `See all work →` linking to `/work`
- Below: asymmetric grid (described next)
- Closing link below grid: `View the full reel →` to `/work`

## Grid layout (asymmetric masonry, yandl-style)
12-column CSS grid on desktop, single column on mobile. Tiles span varying column counts and row heights so sizes feel mixed, not uniform.

Tile mix (8 tiles total):
1. Large video — 7 cols × 2 rows — Pickups Plus brand film (vimeo 912330431)
2. Tall photo placeholder — 5 cols × 2 rows
3. Small video — 4 cols — Ohio Steel loop (vimeo 1103295539)
4. Wide photo placeholder — 8 cols
5. Square video — 6 cols — BrewDog (vimeo 932863528)
6. Square photo placeholder — 6 cols
7. Wide video — 8 cols — Status Solutions Network animated (vimeo 912389278)
8. Small photo placeholder — 4 cols

Videos: same background autoplay/muted/loop iframe pattern already used on the Work page. Click anywhere on a tile → navigates to `/work` (we're not duplicating the lightbox player here — homepage stays a teaser).

Photo placeholders: dashed `border-border` outline, `bg-muted/30`, centered label "PHOTO — ADD IMAGE" in muted small caps so you can spot and swap them later. Each placeholder gets a comment marker in code for easy find-and-replace.

Gap: `gap-3 md:gap-4` for a tight editorial feel.

## Copy alternatives for the existing reel intro (you can pick later)
Leaving the current copy in place at smaller scale, but here are options to consider when you want to swap:
- "Work that moves the needle."
- "Brands we've helped build."
- "Made in Columbus. Built to perform."
- "The work, lately."

I'll add these as commented-out alternatives above the headline so you can swap in a single edit.

## Technical notes
- All edits in `src/routes/index.tsx` — no new files, no new dependencies
- Videos reuse existing Vimeo background-player pattern (already proven in `src/routes/work.tsx`)
- Lazy-mount the new iframes using the same `videosReady` gate already on the page so initial paint isn't blocked
- Each tile is a `<Link to="/work">` from `@tanstack/react-router` (already imported) so the whole card is clickable
- Photo placeholders: plain `<div>` slots with a clear data attribute (`data-photo-slot="1"`) for quick swap to `<img>` later
- Fully responsive: 12-col grid collapses to single column under `md`; tile order preserved
