# 08 — Breadcrumbs

**Effort:** S · **Impact:** Low–Medium · **Blocked on:** nothing

---

## What it is

`/team/dr-baryal-khan` already renders a visible breadcrumb — `Our Team / Dr.
Baryal Khan` — using a `.breadcrumb` class that exists in `globals.css`.

Two gaps remain:

1. **No `BreadcrumbList` structured data** behind that trail, so Google can't
   use it.
2. **No breadcrumb on any other subpage.** `/services`, `/cases`, `/about`,
   `/contact` and `/reviews` are all one level deep with no trail.

A related gap: five pages — `/about`, `/cases`, `/reviews`, `/team`, `/contact`
— carry **no structured data at all**.

---

## How it helps

**Only marginally for rankings, but visibly in results.** Google can replace the
URL line under a search result with a breadcrumb trail, which is generally more
legible than a raw URL and tells a searcher where the page sits. It doesn't lift
position; it improves the click-through rate at a given position.

**It fills the structured-data gap.** Five pages currently have no markup. A
`BreadcrumbList` is the cheapest meaningful thing to put on all of them, and
unlike `AggregateRating` or `Review` markup it carries no policy risk for a
business marking up its own site.

**It's a small internal-linking win.** A trail gives every subpage one more link
back toward the homepage and its section, which spreads crawl equity and helps
a crawler understand the hierarchy.

**It helps a reader.** On a deep page, particularly a clinician profile that
someone reached from a search result, a trail is a way back into the site.

---

## Fit with the goals

- **Goal 2 (search)** — mild. Better SERP presentation and clearer hierarchy;
  not a ranking factor.
- **Goals 1, 3, 4** — negligible.

This is honestly a small item. It is on the list because it's cheap, not because
it's important.

---

## Pros

- Genuinely small: one shared component plus a small JSON-LD block.
- Reuses the `.breadcrumb` styling that already exists, so nothing new is
  designed.
- Closes the "five pages with no structured data" observation.
- No policy, content or consent dependencies.

## Cons and risks

- **Adding a visible breadcrumb to seven pages is a design change**, however
  small. It alters the top of every subpage. The alternative — emitting
  `BreadcrumbList` markup with no visible trail — is worse practice, since the
  markup wouldn't correspond to anything a visitor can see.
- **On a site this shallow it adds little.** Every page is one click from the
  homepage. Breadcrumbs earn their place on deep hierarchies; this site has two
  levels.
- **Risk of looking like filler.** The design is deliberately restrained, and a
  trail on a page like `/about`, which has nothing above it but the homepage,
  adds a line of chrome for very little.

---

## What it would take

1. A shared `Breadcrumbs` component rendering the trail and its `BreadcrumbList`
   JSON-LD from a list of `{ name, href }`.
2. Use it on `/team/[slug]` (replacing the inline markup already there) and on
   the other subpages. Once `01` lands, the service pages need it too — a
   two-level trail is where it starts being genuinely useful:
   `Home / Services / Root Canal Treatment`.
3. Nothing else — no sitemap change, no schema elsewhere to update.

**A pragmatic middle:** build the component, apply it now to `/team/[slug]` and
the other clinician-style deep pages, and apply it to service pages as part of
`01`, where the hierarchy actually benefits. Skip it on `/about` and `/reviews`,
where it adds chrome without information.

---

## How we'd measure it

Search Console → **Enhancements** should report valid breadcrumb items once
crawled. Beyond that, CTR changes at a stable average position are the signal,
and they're noisy at this traffic level.

## Verdict

**Do it as part of `01` rather than on its own.** The effort is small, but the
benefit on a two-level site is close to nil, and it becomes genuinely useful
only once the service pages introduce a third level. Building it now for
`/team/[slug]` and the service pages later is the sensible split — not a
site-wide sweep today.
