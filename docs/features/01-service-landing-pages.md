# 01 — Service landing pages

**Effort:** L · **Impact:** High · **Blocked on:** clinical review (`02`)

---

## What it is

Today all eight treatments live on a single page, `/services`, behind
expandable accordions, with anchors like `/services#endodontics`.

This replaces that with a hub and eight spokes:

```
/services                        → the hub (stays, restructured)
/services/endodontics            → one page per treatment
/services/orthodontics
/services/cosmetic
... 8 in total
```

The content already exists. `app/service-details.ts` holds a full write-up for
each service — overview, when it's recommended, what to expect, aftercare,
FAQs, and typical visit counts. It is currently rendered inside the accordions.
Nothing would need inventing; the work is structural.

---

## How it helps

**One page can only rank for one thing.** `/services` is competing for "dental
services Islamabad" — a broad, low-intent phrase. It cannot also be the best
result for "does a root canal hurt" or "teeth whitening G-9", because a page
covering eight treatments can't be the most focused answer to any of them.

Eight pages can each be the most focused answer to their own question. That is
the entire mechanism, and it's why this is worth doing.

Concretely, this is the difference between:

| Query type | Today | With spokes |
|---|---|---|
| "dental services Islamabad" | `/services` can rank | `/services` still ranks |
| "root canal treatment Islamabad" | Nothing focused to rank | `/services/endodontics` |
| "does a root canal hurt" | Buried in an accordion | Own page, own FAQ markup |
| "children's dentist G-9" | Nothing focused to rank | `/services/pediatric` |

It also fixes a structural weakness. Right now the eight services are *siblings
with no children* — the site has no page depth. The spokes give Google eight
specific, keyword-targeted landing pages to index and eight new internal links
pointing down from the hub.

**And it compounds with the FAQ content.** `service-details.ts` already carries
29 patient questions. On the hub they share one `FAQPage` block; split across
eight pages, each one belongs to a page that is specifically about that answer.

---

## Fit with the goals

- **Goal 1 (fill the appointment book)** — directly. Each spoke ends on a
  booking CTA aimed at someone who arrived with a specific problem.
- **Goal 2 (win local search)** — directly, for organic search. Not for the map
  pack, which is item `04`.
- **Goal 3 (trust, no overclaiming)** — neutral. The copy is the clinic's own,
  and the spokes make no new claims.
- **Goal 4 (show the real practice)** — helps. It surfaces the depth that
  already exists but is currently hidden behind accordions.

---

## Pros

- Eight pages targeting eight specific, high-intent queries.
- Better internal linking: hub → spokes → booking, and spoke → sibling spokes.
- Each page gets its own title, description and structured data instead of
  sharing one.
- `MedicalProcedure` and `FAQPage` markup lands on the page that's actually
  about that procedure, rather than pooled on `/services`.
- The sitemap grows from 13 to 21 URLs. `app/sitemap.ts` currently hardcodes
  `/services` as a single entry while mapping over `doctors`, so this needs a
  `.map()` over `services` added — mirroring the existing doctors pattern, a few
  lines rather than none.

## Cons and risks

- **It duplicates content unless `/services` is restructured.** If the hub keeps
  its full accordions, every spoke repeats text that already exists on the hub,
  and Google will pick one and ignore the other. The detail has to *move*, which
  means the hub changes character — see the decision below.
- **It republishes unreviewed clinical copy on eight more indexable URLs.**
  This is the reason `02` comes first. Building it before the review means
  editing all eight pages again afterwards, and publishing clinical claims that
  no dentist has confirmed.
- **The accordion interaction is lost.** It was a deliberate design choice
  ("native disclosure — no JavaScript, and the closed content stays in the DOM
  for search engines"). Removing it trades a nice piece of craft for structure.
- **More surface to maintain.** Eight pages to update when a treatment changes,
  instead of one.

---

## The decision this needs

The detail has to leave the hub, and there are two ways:

**Option A — hub becomes a directory.** Rows keep label, title and a one-line
summary, and link through. Nothing duplicated, strongest internal linking, and
each spoke is unambiguously the best page for its query. Cost: `/services`
stops being a self-contained resource.

**Option B — hub keeps the accordions, previewing only the overview
paragraph**, with a link through. Preserves the interaction, at the cost of one
duplicated paragraph per service.

**Recommendation: A.** It is the standard hub-and-spoke pattern, and the
duplication in B is exactly the thing that stops spokes ranking.

---

## What it would take

1. Add a search-friendly `slug` to each entry in `services` (`data.ts`) — the
   existing `key`s are clinical jargon nobody searches:
   `endodontics` → `root-canal-treatment`, `pediatric` → `childrens-dentistry`,
   `cosmetic` → `cosmetic-dentistry`, and so on.
2. New route `app/services/[slug]/page.tsx`, modelled on `app/team/[slug]`:
   `generateStaticParams`, `dynamicParams = false` so bad slugs 404, per-service
   `generateMetadata`.
3. Per-spoke JSON-LD: `MedicalProcedure` + `FAQPage` from that service's own
   questions + `BreadcrumbList`.
4. Restructure `/services` per Option A or B. **Keep `id={key}` on each row** —
   the homepage smile-journey links to `/services#endodontics` and those anchors
   must not break.
5. Move the pooled `FAQPage` block off `/services` and onto the spokes, or it
   duplicates.
6. Update `smile-journey.tsx` to link straight to the spokes.
7. Sitemap: add a `.map()` over `services`, mirroring how `doctors` is already
   handled there. The eight URLs don't need writing out by hand.

---

## How we'd measure it

- Search Console → **Pages**: 8 new URLs indexed.
- Search Console → **Performance**: impressions for treatment-specific queries
  (`root canal`, `braces`, `teeth whitening`) that currently have none, because
  there is no page to rank.
- Which spokes earn impressions first tells you which treatments patients
  actually search for — useful beyond SEO.

Realistically 4–8 weeks after indexing before there's enough data to judge.

## Verdict

**Worth doing, but not first.** It's the largest structural SEO win available,
and the copy is already written — but it multiplies the unreviewed-clinical-copy
problem by eight. Do `02` first, then this.
