
# Homepage repositioning — fighting the 3 misconceptions

Goal: keep the cinematic look (it's a differentiator), but answer the three things that are losing you work — "they only do video," "they're too expensive," "we never heard of them." All edits live on `src/routes/index.tsx` plus light SEO metadata.

---

## 1. Reframe the hero subline

Right now the hero just cycles words. Add a one-line subhead under "YOUR / [WORD] / AGENCY" so a first-time visitor instantly knows scope + locality:

> Full-service creative studio in Columbus, Ohio. Video, social, design, and the strategy behind it.

Small, muted, single line. Doesn't fight the cinematic typography.

## 2. Replace "we are not a video production company" with a sharper version

Current copy says it well but buries the punchline. Tighten to a two-beat:

- Big line: **"People hire us for video. They stay for everything else."**
- Sub: a short paragraph naming the actual deliverables (social calendars, brand identity, motion graphics, paid ads, photography) so it's concrete, not abstract.

This directly hits misconception #1 and #3.

## 3. New section: "Built for any budget"

A dedicated band between "Who we are" and "Capabilities." Pattern:

```
                BUILT FOR ANY BUDGET.

  Local restaurant launch    Mid-size brand campaign   National-scale film
  ──────────────────────    ──────────────────────    ──────────────────────
  Westerville City-sized      Multi-deliverable          Full crew, multi-day
  social + spot package       quarterly retainer         shoots, paid rollout
```

Three tiered example "shapes" (no prices — per your pick), with a closing line: *"If it has a story, we can scope it. Tell us what you're working with."* Links to contact.

This kills the "we're out of their budget" assumption without putting a number on it.

## 4. Rework the Capabilities grid to lead with non-video

Reorder the 6 tiles so Video sits in the middle, not first. New order:

1. Brand Strategy
2. Social & Content Management ← rename + expand (this is your underused service)
3. **Video & Film**
4. Design & Identity
5. Animation & Motion ← new tile, replacing or splitting off from Video
6. Photography & Paid

Add one concrete line per tile naming a deliverable type ("monthly content calendars + community management," "logo systems + packaging + web," etc.) so it reads as a real service menu, not a vibe.

## 5. New "Recent work, real budgets" strip

Below capabilities: a horizontal row of 3–4 project cards labeled with **client type + scope**, not just thumbnail. Example labels:

- *Westerville City — civic social campaign*
- *[Local brand] — quarterly content + brand refresh*
- *[Bigger client] — national brand film*

Same purpose as section 3 but visual. Pulls from real work.

## 6. Local SEO + AI-discoverability pass

Update `head()` in `src/routes/index.tsx`:

- Title: `ROY Agency — Video, Social & Creative Studio in Columbus, OH`
- Description: rewrite to name Columbus, Ohio + the four pillars (video, social, design, strategy) in 155 chars.
- Add JSON-LD `LocalBusiness` schema with Columbus address + service area, so Google Maps / AI overviews can surface you for "Columbus video production," "Columbus social media agency," etc.
- og:title / og:description matched to the new positioning.

This is the single biggest lever for "people finding us naturally." Follow-up work (separate task, not in this plan): a `/columbus` or service-x-location page, a real blog post or two targeted at local search.

## 7. Keep, with minor edits

- Sticky scaling reel — stays, it's your strongest moment.
- Process, Stats, Marquee, Testimonial, CTA, Footer — keep structure, light copy nudges only so language matches the new positioning ("creative studio" not "production company").

---

## Files touched

- `src/routes/index.tsx` — all section work + head() metadata + JSON-LD script tag.

No new routes, no menu changes, no backend.

## What I still need from you (can fill in after build)

- 3 real client/project names for the "Recent work, real budgets" strip (Westerville City is one).
- A real testimonial quote + name (current one is a placeholder).
- Your Columbus street address (or "Columbus, OH" only) for the LocalBusiness schema.

I'll ship the structure with sensible placeholders so you can drop these in without a rebuild.
