Local Columbus SEO is the highest-leverage next step for ROY. The technical and content work is straightforward, but the site also needs a local authority signal (Google Business Profile + citations) to outrank the handful of established production companies in Columbus.

## What the keyword research shows

| Keyword | Volume | CPC | KD | Notes |
|---|---|---|---|---|
| commercial video production Columbus Ohio | 50/mo | $0 | 3 | Very easy; best service-fit term |
| video production company Columbus | 110/mo | $5.51 | 20 | Easy; strong local intent |
| commercial video production near me | 170/mo | $6.75 | 22 | Local pack trigger |
| local video production companies | 320/mo | $6.89 | 18 | Broader, but reachable |
| video production columbus ohio | 170/mo | $5.51 | 29 | Slightly harder; worth targeting |
| event video production services | 480/mo | $11.80 | 7 | Service-specific, not location tied |

Takeaway: local terms are low-competition and high-intent. The site is not yet optimized to win them.

## Plan

### 1. Local SEO — highest priority
- Create/optimize a Google Business Profile for **ROY Agency** in Columbus, OH.
- Add consistent NAP (Name, Address, Phone) to the footer and `/contact` page.
- Add a local map/address block to `/contact` and the homepage.
- Encourage Google reviews; build a simple review-link request into the site/project close-out.
- List ROY in local citation directories (Yelp, Alignable, Columbus Chamber, Clutch, Bark, Thumbtack, production-specific directories like ProductionHub).
- Add a "Columbus, Ohio" subhead and local copy to the homepage, `/services`, and `/about`.

### 2. Technical SEO — quick wins
- Create `public/robots.txt` allowing all crawlers.
- Create a dynamic `src/routes/sitemap[.]xml.ts` covering all public routes and blog posts.
- Add self-referencing `canonical` links and `og:url` to every leaf route (home, work, services, about, contact, blog, blog posts).
- Add `og:image` to the home, work, services, and blog routes; use the existing project posters or a generated studio image.
- Fix the root `description` meta so it doesn't overwrite child pages unintentionally.
- Expand homepage JSON-LD to `VideoProductionCompany` + `LocalBusiness` with `makesOffer`, `priceRange`, and `areaServed: Columbus, OH`.
- Add `VideoObject` JSON-LD to `/work` project tiles and `Service` schema to `/services`.
- Add `BreadcrumbList` schema to interior pages.

### 3. On-page SEO
- Rewrite page titles/descriptions to lead with target keywords:
  - Home: "Commercial Video Production Columbus, Ohio | ROY Agency"
  - Services: "Video Production & Social Content Services | ROY Agency Columbus"
  - Work: "Video Production Portfolio | Columbus, OH | ROY Agency"
  - About: "About ROY Agency — Columbus Video Production Studio"
- Add descriptive alt text to work posters (currently just project title).
- Ensure each page has one clear H1 and supporting H2s.
- Improve internal linking: link from homepage to `/work`, `/services`, and latest blog posts; link project tiles to a case study or service page.

### 4. Content strategy — blog cadence
- Publish one keyword-focused post every 2–4 weeks.
- First 6 post ideas based on the keyword data:
  1. "How Much Does a Commercial Video Cost in Columbus, Ohio?" (targets cost-intent searches)
  2. "Choosing a Video Production Company in Columbus: 5 Questions to Ask"
  3. "Commercial vs Brand Film: Which One Does Your Business Need?"
  4. "5 Ways to Use Event Video After the Conference Ends"
  5. "Local Business Video Packages: What to Expect in Columbus"
  6. "Behind the Edit: How We Cut a :15 Social Spot from a Hero Film"
- Each post gets its own `head()` with unique title/description, canonical, and `Article` JSON-LD.

### 5. Authority & backlinks
- Pitch 3–5 guest posts/case studies to Columbus business blogs and industry publications.
- Get listed on "Best of Columbus" / local business roundups.
- Turn each project into a public case study page and pitch it to the client/partner to share.
- Add a press/awards section to `/about` if applicable.

### 6. Measurement
- Verify the site in Google Search Console after publishing (requires a live domain).
- Submit the sitemap to Search Console.
- Run the Lovable SEO review after the technical fixes land.
- Track local pack rankings for the 5 target keywords above.

## Notes
- The `/packages` page will stay `noindex` as requested.
- Some steps (Search Console, GBP, citations) require the site to be published and a custom domain in place.
- Google Business Profile optimization and local citations are the highest-impact items; the rest of the technical work makes those signals convert into rankings.
