## Goal

Remove the "pulled in too early" feeling by making the scroll hand off cleanly. Native scroll everywhere, then wheel-snap kicks in only once you're actually parked on the first project panel.

## Behavior

```text
[ hero sticky scale ]      native scroll (with sticky scrub)
[ logos / manifesto  ]     native scroll
[ Pickups Plus       ]  ←  handoff: once panel top ≈ viewport top
[ Big Bus            ]     wheel-snap between panels (900ms eased)
[ Craftsman          ]     wheel-snap between panels
                        ←  handoff back: last panel bottom leaves top
[ stats / CTA        ]     native scroll
```

No more pull-in from above or below. If you're scrolling down through the manifesto, nothing hijacks your wheel until Pickups Plus is fully seated at the top. Same going the other way — Craftsman has to be fully at the top before scrolling up hijacks.

## Implementation notes (technical)

In `src/components/ProjectShowcase.tsx`:

- Delete the "approaching from above/below" branch (the `idx === -1` block that tweens toward `firstTop` / `lastTop`).
- The wheel handler only intercepts when `currentIndex()` returns a real index (0, 1, or 2) — i.e. the viewport midline is inside one of the three panels.
- Tighten the "am I on this panel" check with a small tolerance (e.g. ±8px of the panel top) so the handoff fires exactly when the panel is seated, not while it's still sliding in from native scroll.
- Keep the existing 900ms eased tween between adjacent panels.
- Keep the edge release (scrolling down on Craftsman or up on Pickups Plus does nothing — native scroll continues).

No changes to hero, manifesto, or CTA. No CSS scroll-snap (already removed).

## Tradeoff to be aware of

With this change, the transition from manifesto → Pickups Plus is 100% native scroll. That means on a fast trackpad flick, you may briefly land partway into Pickups Plus and then a subsequent wheel tick snaps you to Big Bus. That's the price of not grabbing early. If it still feels off after trying it, the fallback is to add a very light "settle" — after native scroll stops with a panel > 25% visible, gently tween it to seated. I'd try without that first.
