# Feature backlog

Proposed work for `drhashimandassociates.com`, written up so each item can be
judged on its own merits before anyone builds it.

Every file follows the same shape: what it is, how it helps, what it costs, what
could go wrong, and whether it actually serves the clinic's goals.

---

## How to read these

- **Effort** — `S` is a sitting, `M` is a few days, `L` is a project.
- **Impact** — judged against the clinic's goals below, not against how
  interesting the work is.
- **Blocked** — cannot start until something outside engineering happens: a
  dentist signs off, a photographer shoots, an account gets configured.

A feature that doesn't serve one of the goals belongs in *Not now* rather than
in the backlog. That is the point of writing them down.

---

## The clinic's goals

Everything here is assessed against these four.

1. **Fill the appointment book.** The site exists to turn a search into a booked
   patient — through the booking form, WhatsApp, or a phone call. Traffic that
   doesn't convert is decoration.
2. **Win local search.** Patients search *"dentist near me"* and *"dentist G-9
   Markaz"*. For those queries the Google Business Profile and the map pack
   matter more than the website's organic listing.
3. **Build trust without overclaiming.** DESIGN.md §16 forbids invented
   credentials, outcomes, equipment and facilities. Calm and credible beats
   persuasive, and this is a medical practice rather than a shop.
4. **Show the real practice.** Five named clinicians, eight services, six real
   before/after cases, real Google reviews. Every one of those is an asset the
   clinic already owns and the site can surface better.

---

## The constraint that gates much of this

`app/service-details.ts` records, in its own file header, that its clinical copy
has **never been medically reviewed**. The clinic's source document asked for a
dentist to confirm clinical details, timeframes, aftercare, and any cost or
sedation statements before publication. It is live and indexable today.

Any feature that publishes *more* clinical content inherits that problem. That
is why the review is item `02` and why it sits upstream of several others — most
directly the service landing pages, which would republish the same copy eight
more times.

---

## Status at a glance

| # | Feature | Effort | Impact | Blocked on |
|---|---|---|---|---|
| 01 | [Service landing pages](01-service-landing-pages.md) | L | High | Clinical review (02) |
| 02 | [Clinical content review](02-clinical-content-review.md) | S | High | Dentist |
| 03 | [Clinician photography](03-clinician-photography.md) | M | High | Photo shoot |
| 04 | [Google Business Profile & reviews](04-google-business-profile-and-reviews.md) | S | **Highest** | Clinic's Google account |
| 05 | [Patient resource library](05-patient-resource-library.md) | M | Medium | Clinical review (02) |
| 06 | [Case gallery expansion](06-case-gallery-expansion.md) | M | Medium | Consent + images |
| 07 | [Urdu language support](07-urdu-language-support.md) | L | Medium | Translation |
| 08 | [Breadcrumbs](08-breadcrumbs.md) | S | Low-Medium | — |
| 09 | [Booking flow](09-booking-flow.md) | M | Medium | Decision on tooling |
| 10 | [Monitoring & analytics](10-monitoring-and-analytics.md) | S | Medium | Vercel dashboard |

---

## Recommended order

Sequenced by what unblocks the most, not by what is most interesting to build.

1. **04 — Google Business Profile.** Highest return of anything on this list,
   costs a couple of hours, and needs no engineering. The map pack outranks
   organic results for a clinic, and it is also where the site's reviews come
   from.
2. **02 — Clinical content review.** Removes the one real liability on the site
   and unblocks 01 and 05.
3. **10 — Monitoring.** Cheap, and pointless to defer: without it there is no
   way to tell whether anything else on this list worked.
4. **01 — Service landing pages.** The biggest structural SEO win, but only
   once 02 has happened.
5. **03 — Clinician photography.** The most visible gap to a first-time
   visitor, and blocked on the clinic booking a photographer rather than on
   anything technical.

---

## Not now

Deliberately not in the backlog, recorded so the reasoning isn't relitigated:

- **Review incentives.** Offering a free service in exchange for a positive
  Google review breaks Google's review policy on two counts and puts the
  Business Profile at risk. See `04`.
- **Area or sector landing pages** ("dentist G-10", "dentist F-11"). Thin
  doorway pages for a single-location practice; the risk of a manual action
  outweighs the upside.
- **Paid link building or directory blasts.** No meaningful gain for a clinic,
  real manual-action risk.
- **A full CMS.** Eight services and five clinicians change rarely. Editing
  `app/data.ts` is cheaper than maintaining an admin surface.
