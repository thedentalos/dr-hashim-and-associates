# 05 — Patient resource library

**Effort:** M · **Impact:** Medium · **Blocked on:** clinical review (`02`), and original writing

---

## What it is

A small library of patient-facing articles answering the questions people
actually type into Google before booking a dentist — distinct from the service
pages, which describe what the clinic offers.

Where `01` takes the *existing* copy and gives it better structure, this needs
**new** content written for the practice and signed off. Candidates, drawn from
what patients genuinely search:

- Does a root canal hurt?
- How long does a filling last?
- Is teeth whitening safe for enamel?
- What should I do about a chipped tooth?
- At what age should a child first see a dentist?
- Why do my gums bleed when I brush?
- Are dental X-rays safe?

The distinction from `01` matters: service pages answer *"what is this
treatment"*, articles answer *"I have this problem, what should I do"*. The
second is how people search before they know what treatment they need.

---

## How it helps

**It reaches people earlier in the decision.** Someone with bleeding gums
searches the symptom, not "periodontics". A service page can only be found by
someone who already knows the treatment name; an article can be found by someone
who doesn't yet know they need a dentist at all.

That's a larger pool of people, and for a clinic it's the difference between
competing for people already shopping around and being the practice that
explained the problem to them.

**It builds topical authority.** Google assesses whether a site knows its
subject by looking at the breadth of what it covers. A clinic with eight service
pages is a company page; a clinic with eight service pages and fifteen answered
questions is a resource. That supports the ranking of everything else on the
domain, including `01`.

**It's linkable.** Service pages rarely earn links. Articles answering a real
question sometimes do — from local forums, health directories, or a
patient-facing blog. The site currently has no inbound links and no content
designed to attract any.

**It supports the practice's own patients.** Aftercare questions are already the
most common reason a patient calls the front desk. A page that answers them
reduces that.

---

## Fit with the goals

- **Goal 1 (bookings)** — indirect. Reaches people earlier and routes them to
  booking, but the conversion path is longer.
- **Goal 2 (local search)** — moderate. Symptom queries are usually not
  local-intent, so these compete nationally, which is harder.
- **Goal 3 (trust, no overclaiming)** — **needs care**. Health content is held
  to a higher standard, and Google applies stricter quality expectations to
  medical topics. Every article needs a dentist's sign-off and must stay away
  from diagnosis.
- **Goal 4 (show the real practice)** — mild.

---

## Pros

- Reaches patients before they know which treatment they need.
- Builds topical breadth that supports the service pages.
- The only realistic source of earned inbound links for this site.
- Reduces repetitive calls to the front desk.

## Cons and risks

- **This is genuinely new content, not existing copy reshaped.** It is the only
  item on the backlog that cannot be built from what already exists, and writing
  it well takes real time.
- **Medical content standards are higher.** Google's quality guidelines are
  stricter for health topics, and thin or inaccurate articles can hurt the whole
  domain rather than just themselves.
- **Every article needs clinical review.** Fifteen articles is a much bigger ask
  of a dentist than one review sheet — this is why it sits behind `02`.
- **It must not diagnose.** Articles explain; they cannot tell a reader what's
  wrong with them. Anything that reads like advice for a specific condition
  needs a "see a dentist" framing.
- **It competes with established health sites.** Colgate, NHS, Mayo Clinic.
  Winning "does a root canal hurt" against those is not realistic soon. Winning
  narrower local and long-tail variants is.

---

## What it would take

1. **Pick the questions, not the topics.** Ten to fifteen, chosen from what
   patients actually ask at the desk plus what Search Console shows once there's
   data. Don't start before `01` has been live long enough to show which
   treatments people search for.
2. **Write with clinical input, not around it.** The most efficient version is
   a dentist answering the questions out loud, transcribed and edited — much
   less work than drafting and having it corrected.
3. **Sign off before publishing.** Same gate as `02`, applied per article.
4. **Route:** `app/resources/[slug]/page.tsx`, modelled on the other dynamic
   routes, with `Article` structured data and `author` pointing at a real
   clinician.
5. **Link both ways** — each article links to its service page, each service
   page links to relevant articles.

---

## How we'd measure it

- Search Console → **Pages** and **Performance**, filtered to `/resources/*`:
  impressions and their query text.
- **Links** report: whether anything earned an inbound link. Expect few, and
  treat any as a bonus rather than the goal.
- Assists rather than last-click: whether people who read an article go on to
  book. Needs event tracking (see `10`).

## Verdict

**Right idea, wrong time.** It's the only path to earned links, but it's the
largest writing commitment on the backlog and depends on clinical input. Do `02`
and `04` first, get `01` live, then use real Search Console data to pick the
questions worth answering rather than guessing.
