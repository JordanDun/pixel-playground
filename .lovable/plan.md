## Goal
Remove the entire "Built for any budget" pricing section from `src/routes/index.tsx`.

## What we remove
The full `<section id="budget">` block (lines 309–375), which includes:
- The "Scope to fit" heading and intro copy referencing "same studio, scoped to the room you're working with"
- The three pricing-tier cards (Westerville-sized, Quarterly partner, Full-scale campaign)
- The closing CTA line and email link

## What stays untouched
Everything else on the homepage remains exactly as-is.

## Single change
Edit `src/routes/index.tsx` to delete the `<section id="budget">` block and its contents.