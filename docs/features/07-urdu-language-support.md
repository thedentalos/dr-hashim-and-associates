# 07 — Urdu language support

**Effort:** L · **Impact:** Medium · **Blocked on:** translation, and a decision about scope

---

## What it is

The site carries one Urdu element today: the hero tagline *آپ کی مسکراہٹ، ہماری
ذمہ داری* ("your smile, our responsibility"), set in Nastaliq and self-hosted
via `next/font` so it renders correctly without the reader having the font
installed.

This item is about whether that should grow into a genuine second language —
either a full Urdu version of the site, or a curated subset.

---

## How it helps

**It matches how a meaningful share of the local audience actually reads.**
G-9 Markaz serves a population where Urdu is the first language for many
patients, and where medical vocabulary in English is not universally
comfortable. A clinic explaining a root canal in Urdu reaches people it
currently doesn't.

**It's a genuine differentiator locally.** Almost no dental practice website in
Islamabad is properly bilingual — most are English-only, or have a machine-
translated page. Doing it properly is distinctive in a way that "modern dental
care" copy is not.

**It may help local search for Urdu queries.** People do search in Urdu script
and in Romanised Urdu ("dant ka daktar", "dant nikalna"). There is currently
nothing on the site that could rank for any of it.

---

## Fit with the goals

- **Goal 1 (bookings)** — positive for the audience segment that reads Urdu
  comfortably. This is a reach question, not a conversion one.
- **Goal 2 (local search)** — moderate, and hard to predict. The Urdu-language
  search market in Islamabad is real but its search volume is not well
  documented.
- **Goal 3 (trust)** — positive. Meeting people in their own language is a trust
  signal, and does more for it than any amount of English polish.
- **Goal 4 (real practice)** — mild.

---

## Pros

- Reaches an audience the English site cannot.
- Distinctive locally, where bilingual execution is rare.
- The typographic groundwork is already done — the Nastaliq font is
  self-hosted and the reveal animation respects reduced motion.
- Government and health guidance in Pakistan increasingly expects Urdu
  accessibility for public-facing services.

## Cons and risks

- **It is a large, ongoing commitment, not a translation task.** Every future
  content change has to happen twice, forever. That is the real cost, and it is
  the reason most small sites abandon a second language.
- **Bad Urdu is worse than none.** Machine translation of clinical content would
  be both wrong and visibly careless to a native reader. This needs a competent
  human translator, and clinical terms need a dentist's agreement on wording.
- **Right-to-left layout is not just text.** The whole design is left-aligned
  with left-to-right reading rhythm. A proper Urdu version needs mirrored
  layout, which means auditing every component — this is why it's an `L`, not an
  `M`.
- **Duplication risk if done badly.** Two languages done as two parallel sites
  can create duplicate-content problems. The correct approach is `hreflang`
  annotations and a clear language switch, not two disconnected copies.
- **It competes for engineering time** with `01`, which has a clearer return.

---

## What it would take

**Decide the scope first.** Three very different projects:

| Scope | What it means | Effort |
|---|---|---|
| **Urdu landing page** | One page explaining the clinic and how to book | S |
| **Curated subset** | Homepage, services overview, contact, booking | M |
| **Full bilingual site** | Every page, every article, forever | L |

A middle path worth considering: no full translation, but **an Urdu-language
"how to book and what to expect" page** — aimed precisely at the patient who is
put off by an English-only booking form, which is where the language barrier
does the most damage.

**If it proceeds:**
- `app/[locale]/...` routing, or a distinct `/ur` segment
- `hreflang` pairs on every page, plus `x-default` pointing at English
- `dir="rtl"` on the Urdu tree, with a layout audit of every component
- Urdu strings kept in a translation file, not inlined — so a translator can
  work without touching components
- Nastaliq line-height is already known to need more room than Latin; the
  existing tagline carries a comment about it

---

## How we'd measure it

- Search Console, filtered to the Urdu URLs: impressions and query text.
  **This is the honest test** — if Urdu queries don't appear at all, the demand
  may not be where assumed.
- Bounce and booking rate on Urdu pages versus English, which needs event
  tracking (see `10`).

## Verdict

**Defer, but don't dismiss.** The argument is good and the differentiation is
real, but it's an `L` with a permanent maintenance cost, competing against `01`
for the same time. The cheap version — a single Urdu page covering booking and
what to expect — captures most of the benefit for a fraction of the commitment,
and is worth doing before committing to the full build.
