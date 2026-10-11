# 10 — Monitoring and analytics

**Effort:** S · **Impact:** Medium · **Blocked on:** the Vercel dashboard, and a decision

---

## What it is

Four small things that together make the site's performance observable:

1. **Confirm Vercel Web Analytics is switched on.** The `<Analytics />` tag is
   deployed in `app/layout.tsx`, but it collects nothing until Web Analytics is
   enabled in the Vercel project. If it's still off, the site has been live for
   days with no traffic data at all.
2. **Track booking intent as an event.** Right now only page views are recorded.
   That answers "how many people visited" and not "did anyone try to book" —
   which is the only question that matters for goal 1.
3. **Consider Speed Insights** for real Core Web Vitals from actual visitors,
   rather than lab scores.
4. **An uptime monitor** pointed at the homepage. Vercel reports build
   failures; it does not tell you the site is unreachable from a patient's
   perspective.

---

## How it helps

**Without this, nothing else on the backlog can be evaluated.**

Every other item here — service pages, case slider, resource library, Urdu
support — is a bet that more of something will produce more bookings. None of
them can be judged on outcome without measurement, so they get judged on
opinion instead, and the ones that work can't be distinguished from the ones
that don't.

**Booking events are the missing number.** Page views are a vanity metric for a
clinic. "How many people clicked Book an Appointment this week, and from which
page" is actionable: it tells you which pages actually generate intent.

**Uptime matters more than usual here.** The site carries the booking form, the
phone number and the address. If it goes down, patients can't book and can't
find the clinic — and nobody would know until someone mentioned it.

**It's cheap.** All four items are a couple of hours total, and three of them
are configuration rather than code.

---

## Fit with the goals

- **Goal 1 (bookings)** — this is how the goal is measured. Booking events are
  the only honest proxy for it on the site.
- **Goal 2 (local search)** — supports it via Search Console, already set up,
  and Core Web Vitals which is a ranking input.
- **Goals 3, 4** — n/a. This is infrastructure.

---

## Pros

- Makes every other backlog item measurable, including ones already shipped.
- Booking-click data would immediately inform `09` — whether to rebuild the
  booking flow, or whether patients use WhatsApp instead.
- Privacy-friendly: Vercel Analytics sets no cookies and needs no consent
  banner, so there's no compliance overhead.
- Speed Insights costs nothing to enable and surfaces real-device performance
  rather than lab conditions.

## Cons and risks

- **Vercel Web Analytics is capped at 50,000 events/month on Hobby.** A clinic
  site will not approach that, but it's worth knowing the ceiling exists and
  that hitting it pauses collection rather than billing.
- **Custom events need a small code change** on the booking CTAs, which are in
  several components. Low risk, but it is a deploy.
- **Analytics without a decision is just noise.** The value is entirely in
  someone looking at it monthly and acting. If nobody owns that, don't bother.
- **Uptime alerts need somewhere to go.** An alert nobody reads is the same as
  no alert.

---

## What it would take

**Configuration (no code):**
- Vercel → project → **Analytics** → enable Web Analytics
- Vercel → project → **Analytics** → enable Speed Insights if wanted
- an uptime service (Better Stack, UptimeRobot and similar all have free tiers)
  pointed at `https://drhashimandassociates.com`, alerting to a monitored inbox

**Code (small):**
- a `track()` call on the booking CTAs — `BookingLink` in `components.tsx`, the
  header button, and the offer panel — with a distinguishing property so you can
  tell *which* CTA on *which* page earned the click
- ideally the same on the WhatsApp button, so the two channels can be compared

That's a handful of call sites, all going through one shared component.

---

## How we'd measure it

This item *is* the measurement. The things to actually look at monthly:

- **Vercel Analytics** — visitors, top pages, referrers
- **Search Console** — impressions, queries, indexed page count
- **Booking events by page** — which pages create intent
- **Speed Insights** — Core Web Vitals once there's field data, which needs
  roughly 28 days of traffic

## Verdict

**Do this second, immediately after `04`.** It's cheap, it's mostly
configuration, and it's the prerequisite for judging everything else. The
booking event in particular should be added while the deploy is fresh — without
it, there's no way to tell whether any of the SEO work produced a single
patient.
