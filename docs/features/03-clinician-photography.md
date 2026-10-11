# 03 — Clinician photography

**Effort:** M · **Impact:** High · **Blocked on:** a photo shoot

---

## What it is

All five clinicians are currently represented by an initials monogram — `HA`,
`BK`, `OS`, `ZM`, `SB` — on their team cards and on their profile pages.

The monograms are a deliberate design decision, not an oversight: they read as
a considered placeholder rather than a broken image, and they were built that
way because no headshots exist. `IMAGE_PLACEMENT_SPEC.md` §3.5 marks doctor
portraits as **"CANNOT BE COMPLETED FROM THIS SHOOT"** — the existing clinic
photography has no usable portraits in it.

So this is a photography booking, not a build.

---

## How it helps

**This is the largest visible gap on the site to a first-time visitor.** Every
other part of the design is finished; the team section is the one place that
says "not yet".

It matters more for a clinic than for most businesses. Choosing a dentist is a
trust decision made about a person who is going to put instruments in your
mouth. A named face does work that no amount of copy can:

- The team section is where a hesitant visitor decides whether to book.
- Google's own guidance treats genuine author and practitioner imagery as a
  signal of a real, accountable business.
- Doctor profile pages currently carry a large monogram panel where a portrait
  belongs. On `/team/dr-baryal-khan` that panel is the single biggest element on
  the page and it says nothing.

**Goal 4 — "show the real practice" — is unachievable without this.** The site
can describe five clinicians; only photography shows them.

---

## Fit with the goals

- **Goal 3 (trust)** — directly. Faces are the cheapest trust signal a clinic
  has.
- **Goal 4 (show the real practice)** — this is that goal.
- **Goal 1 (bookings)** — indirect but real. It works on the decision, not on
  the traffic.
- **Goal 2 (local search)** — minor. Practitioners' names and images support
  entity building; not a ranking lever on its own.

---

## Pros

- Closes the most visible gap on the site.
- Replaces five large monogram panels with content that does actual work.
- Combined with the existing name, designation and specialty, it makes each
  profile page a credible page rather than a stub.
- No code decisions are needed — the components already expect a photo and
  currently render a placeholder in its place.

## Cons and risks

- **Entirely outside engineering control.** Until a shoot happens, nothing
  moves. This is the item most likely to sit untouched for months.
- **Consistency matters and is easy to get wrong.** Five portraits shot at
  different times, in different light, against different backgrounds will look
  worse than five monograms. Either book one session for everyone, or accept the
  mismatch knowingly.
- **DESIGN.md §16 forbids fabricated photography.** No stock images, no
  AI-generated faces, no stand-ins. If the shoot doesn't happen, the monograms
  stay — that is the correct outcome, not a compromise.
- **Photos need to be cropped to the existing frames**, which are portrait-ish
  with a circle-crop on some surfaces. Worth briefing the photographer on the
  aspect ratios rather than fixing it in post.

---

## What it would take

**Clinic:** book a photographer, ideally one session with all five clinicians.

**Brief the shoot on:**
- five individual portraits, consistent lighting and background
- portrait orientation — the team cards and profile panels are tall
- neutral, clinical-appropriate dress
- enough headroom that a circular crop on the monogram panels still works

**Engineering, once images exist (small):**
- add a `photo` field to each entry in `doctors`
- `DoctorCard` renders the image when present and the monogram when not — the
  fallback stays, so a missing photo degrades to today's behaviour rather than
  breaking
- the profile page monogram panel becomes the portrait
- update the `aria-label`s, which currently say "to be provided" nowhere visible
  but do describe the placeholder

Alt text should be the clinician's name, not a description of the photo —
`"Dr. Baryal Khan"`, not `"portrait of a smiling dentist"`.

---

## How we'd measure it

Not really measurable, and worth not pretending otherwise. The useful proxy:
whether the team section still reads as unfinished when shown to someone who
hasn't seen the site before.

## Verdict

**Do it as soon as the clinic can book a shoot.** Highest visual impact of
anything on the backlog, and the engineering afterwards is trivial. The
monograms are an acceptable holding position, not something to rush with stock
photography.
