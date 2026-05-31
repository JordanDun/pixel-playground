## Goal

Add a new project card on `/work` for **Status Solutions — Brand History**, using the video stored in the connected Google Drive folder.

## Source

Drive folder `Status Solutions Brand History` contains two videos:
- `SS_With_Captions.mp4` (id `1eI1yBCa5xoEBpYhdcGavnPWg3kIryHBa`, 292 MB) — use this one (captioned, MP4 plays everywhere)
- `SS_V2.mov` (360 MB) — ignored

The MP4 is far too large to bundle into the repo, so the card will stream it from Drive via Google's preview iframe (`https://drive.google.com/file/d/<id>/preview`) — the same lightbox UX the existing Vimeo projects use.

## Changes

### 1. `src/routes/work.tsx`

a. Extend the `PROJECTS` type to support a Drive-hosted entry:
```ts
{ client, title, category, year, vimeoId?, driveFileId?, poster? }
```

b. Add the new project as the first entry in `PROJECTS`:
```ts
{
  client: "STATUS SOLUTIONS",
  title: "Status Solutions — Brand History",
  category: "Brand Film",
  year: "2025",
  driveFileId: "1eI1yBCa5xoEBpYhdcGavnPWg3kIryHBa",
  poster: statusSolutionsPoster, // imported asset
}
```

c. Card rendering updates (minimal):
- Treat `driveFileId` like `vimeoId` for "has video" logic (`const hasVideo = Boolean(project.vimeoId || project.driveFileId)`).
- For Drive cards, the inline 16:9 thumbnail shows the static `poster` `<img>` (no autoplay loop — Drive doesn't support a background autoplay embed like Vimeo does). Hover state and "▶ Play" pill stay identical.
- Clicking opens the existing lightbox; state changes from `activeVimeo: string | null` to `activeVideo: { kind: 'vimeo' | 'drive'; id: string } | null`.
- Lightbox iframe `src`:
  - vimeo → unchanged
  - drive → `https://drive.google.com/file/d/<id>/preview`

### 2. Poster image

Download a single still from the Drive thumbnail (`thumbnailLink`, upscaled to ~1280w via the `=s1280` param) and save it to `src/assets/status-solutions-poster.jpg`, then import it in `work.tsx`. This keeps the card visually consistent with the Vimeo cards (which show a moving frame) without bundling 300 MB of video.

### 3. Drive sharing requirement (user action)

The Drive preview iframe only loads if the file is shared "Anyone with the link → Viewer". I'll note this in the response; if it's not shared that way, the lightbox will show a Google sign-in prompt for visitors.

## Out of scope

- No re-encoding / re-hosting of the MP4 (would need Vimeo or a CDN).
- No changes to other routes.
- No new dependencies.
