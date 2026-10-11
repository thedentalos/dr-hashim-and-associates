# 09 — Booking flow

**Effort:** M · **Impact:** Medium · **Blocked on:** a decision about tooling

---

## What it is

The booking page embeds a Google Apps Script form in an iframe
(`app/book-appointment/page.tsx`), with a fallback link to open it in a new tab.
Every "Book an Appointment" button on the site points here.

This item is about whether that path is good enough, and what would improve it.

---

## How it helps

**Every other feature on this backlog feeds this page.** Traffic, rankings,
reviews, photographs, case sliders — all of it exists to get someone to this
point. A conversion problem here quietly caps the return on everything else.

That makes it worth examining even though it currently *works*. The specific
things worth checking:

- **An iframe is a trust cliff at the worst moment.** The booking form is the
  single most sensitive interaction on the site — someone typing their name and
  phone number — and it renders as a third-party page inside the clinic's
  branding, or worse, a Google account prompt.
- **It's invisible to measurement.** Nothing on the site knows whether anyone
  completes a booking, so there is no way to tell whether any SEO work paid off
  in patients rather than visits.
- **Mobile is where it will be used.** A Google Apps Script form in an iframe is
  unlikely to be well-optimised for a phone, and that is where most of the
  traffic is.
- **Slow.** The earlier audit moved the iframe to `loading="lazy"`, but a
  heavyweight third-party document still loads when the visitor reaches it.

---

## Fit with the goals

- **Goal 1 (fill the appointment book)** — this *is* goal 1. Of everything on
  the backlog, this is the most direct.
- **Goal 3 (trust)** — a third-party iframe at the moment of entering personal
  details works against it.
- **Goals 2, 4** — n/a.

---

## Pros

- Directly addresses the point where every other investment either pays off or
  doesn't.
- Measuring bookings makes every other item on this backlog judgeable. Without
  it, none of them can be evaluated on outcome rather than on traffic.
- A native form would remove a third-party iframe from the critical path,
  improving both speed and perceived trust.
- The WhatsApp route is already built and prominent. For many patients in
  Islamabad, WhatsApp *is* the preferred booking channel — worth understanding
  which channel actually converts before rebuilding the other.

## Cons and risks

- **The Apps Script form is the clinic's actual workflow.** Replacing it means
  the practice has to change how it receives bookings, or engineering has to
  integrate with whatever it writes to. This is not purely a front-end decision.
- **A native form needs somewhere to send data**, and a spam strategy. The
  current form inherits Google's spam handling; a custom one starts from zero.
  This is a real cost that is easy to underestimate.
- **Bookings landing in a spreadsheet that nobody checks** is worse than an
  in-your-face Google form. Any change has to match the practice's habits, not
  an idealised process.
- **Risk of breaking a working path.** The current form functions. Any
  replacement must be strictly better, and needs a fallback while it's proven.

---

## What it would take

**First, measure — don't rebuild on assumption.** Add event tracking to the
existing buttons (see `10`) and watch for a few weeks which route people take:
the iframe, the fallback link, or WhatsApp. That data decides whether this item
is worth doing at all, and what "better" means.

**If the flow is the problem:**
- ask the clinic what happens to a submission today, and where it lands
- decide between: a native form posting to a serverless handler, keeping Apps
  Script but embedding it better, or leaning harder on WhatsApp as the primary
  channel and treating the form as secondary
- if a native form: server-side validation, a honeypot or rate limit, and a
  confirmation state that tells the patient what happens next — which the
  current flow does not

**Regardless of the outcome**, the confirmation step is worth improving. Today a
patient submits and gets nothing telling them what to expect or when they'll
hear back.

---

## How we'd measure it

- **Booking clicks** by channel (iframe, fallback, WhatsApp) — needs `10`.
- Submission completion rate, if a native form is built.
- Calls attributed via the Google Business Profile (see `04`), which may
  outnumber web bookings entirely.

## Verdict

**Instrument it before rebuilding it.** The strongest argument here isn't that
the current flow is bad — it's that no one can currently tell whether it is.
Add tracking, watch which channel patients actually use, and let that decide.
Rebuilding a working booking path on a hunch is a good way to lose bookings.
