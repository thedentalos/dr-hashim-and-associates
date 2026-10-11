# 04 — Google Business Profile and reviews

**Effort:** S · **Impact:** Highest on the backlog · **Blocked on:** the clinic's Google account

---

## What it is

No code. Claiming, completing and maintaining the clinic's Google Business
Profile, and building a review flow that complies with Google's policy.

The site is already wired to it: the homepage and `/reviews` pull live reviews
from the Places API against place ID `ChIJ8zBMenhKz2cRBnRXb0-JHtI`, and the
clinic entity is marked up as `Dentist` in structured data with matching NAP.

---

## How it helps

**For a single-location clinic, the map pack outranks the website.**

When someone searches "dentist near me" or "dentist G-9 Markaz" — which is how
most patients actually search — Google shows a map with three businesses above
every organic result. Being in that three is worth more than any position on
page one of the blue links. The website cannot win those queries, because they
aren't the kind of query a website wins.

The profile is what determines whether you're in that three:

- **Proximity, relevance and prominence** are the ranking inputs, and the
  profile is where two of the three are expressed.
- **Reviews are the strongest prominence signal**, and they are on the profile,
  not the site.
- **The profile's hours, address and phone flow into the knowledge panel** that
  appears when someone searches the clinic by name.

It also feeds the website: the reviews rendered on the homepage come from this
listing. A well-maintained profile with a steady review flow directly improves
what visitors see on the site.

**Return on effort is far higher than anything in code.** A couple of hours
here will move more patient enquiries than item `01` will in its first year.

---

## Fit with the goals

- **Goal 2 (win local search)** — this *is* the local search strategy.
- **Goal 1 (bookings)** — the profile has its own call and directions buttons;
  it converts independently of the website.
- **Goal 4 (show the real practice)** — reviews and photos are the profile's
  substance.
- **Goal 3 (trust)** — a verified, complete, actively-maintained profile reads
  as a real practice.

---

## Pros

- Highest impact per hour on the entire backlog.
- No engineering, no deployment, no risk to the site.
- Compounds: a better profile earns more reviews, which raises prominence, which
  earns more calls.
- Feeds the website's reviews section for free.

## Cons and risks

- **Depends on the clinic acting.** Nobody in engineering can do this.
- **The review-incentive trap.** See below — it's the single most likely way to
  damage the profile.
- **Inconsistency between profile and site is a real cost.** If the phone
  number, hours or address differ by a character, it weakens both. The site
  currently says `10:00 AM to 8:30 PM` and `1st Floor, Pehchan Mall, G-9 Markaz`
  — the profile must match exactly.
- **Reviews can't be deleted.** The only legitimate responses are a reply or a
  policy report. Expect some negative ones and plan who answers them.

---

## The review-incentive trap

A proposal was made to offer **"one free online consultation if a positive
review is left on Google"**. It should not be implemented. Checked against
Google's review policy rather than memory:

- Offering *"payment, discounts, free goods and/or services"* in exchange for
  reviews is prohibited.
- *"Selectively solicit[ing] positive reviews"* is prohibited separately.

The wording breaks both rules — it's an incentive, and it's gated on the
sentiment. Google's stated consequences run from removing the reviews to
**suspending the Business Profile**.

That would be doubly damaging here, because the profile is also the *source* of
the reviews rendered on the clinic's own website. A suspension would blank the
reviews section on the homepage at the same time as removing the practice from
the map pack.

**The compliant alternative:** if the clinic wants to offer a free online
consultation, offer it as a plain promotion with no review condition attached.
Same attractive offer, no policy breach. Ask every patient for honest feedback
regardless of how their visit went.

---

## What it would take

**Profile:**
- claim and verify if not already done
- set primary category **Dentist**, secondary categories for services offered
- **hours `10:00 AM – 8:30 PM`**, matching the schema on the site
- address and phone matching the site exactly — `1st Floor, Pehchan Mall, G-9
  Markaz`, Islamabad, `0300 855 7144`
- upload the clinic photography already in `public/media/`
- add the services, and a description written for patients rather than for
  search engines

**Reviews:**
- a simple ask at the end of a visit, to **every** patient, with no incentive
  and no filtering
- a named person responsible for replying, and a tone guide for replies
- never dispute a review for being negative — only for breaching policy

**Ongoing, monthly:** a post or an update, fresh photos, replies to new reviews.

---

## How we'd measure it

- **Profile insights** — calls, direction requests, website clicks. These are
  the numbers that matter, more than the website's own analytics.
- **Review count and rating** over time, tracked monthly.
- **Map pack position** for "dentist G-9 Markaz" from a device near the clinic.
- Search Console → **Performance** → queries containing "near me" — these
  correlate with profile visibility.

---

## Verdict

**Do this first.** Nothing else on the backlog comes close on return, and it
costs the clinic a couple of hours and no engineering at all. Everything else
can wait; this shouldn't.
