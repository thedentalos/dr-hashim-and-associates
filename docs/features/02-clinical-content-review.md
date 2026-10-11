# 02 — Clinical content review

**Effort:** S (engineering) · **Impact:** High · **Blocked on:** a dentist

---

## What it is

`app/service-details.ts` opens with this, transcribed from the clinic's own
source document:

> Supplied by the clinic as a document titled *"Services Page Copy: Draft for
> Review"*. That document states in its own header that *"a dentist should
> confirm all clinical details, timeframes, aftercare, and any cost or sedation
> statements before this goes live"*. It is transcribed here as written and has
> **NOT been medically reviewed** — get that sign-off before the site goes
> public.

The site went public with it in place. This item is getting that sign-off, and
is not engineering work in the usual sense — it is a dentist reading a document.

---

## How it helps

This is the only item on the backlog with a **real-world** risk rather than a
commercial one.

The copy is live and indexable. It includes:

- **Aftercare instructions** — what to do after a root canal, an extraction, a
  restoration. A patient may follow these.
- **Timeframes** — how long treatment takes, how long soreness lasts, when
  numbness wears off.
- **Clinical details** — when a treatment is appropriate, what it involves.
- **Cost and sedation statements** — if any are present, these are the kind of
  claim that gets compared against what a patient is actually charged.

None of it has been confirmed by a clinician. The clinic's own document said it
needed to be. For a medical practice that is a liability question first and an
SEO question second — and it is the gate on items `01` and `05`, because both
publish more of the same material.

---

## Fit with the goals

- **Goal 3 (build trust without overclaiming)** — this *is* that goal. Copy
  asserting clinical facts that no clinician has verified is the specific thing
  DESIGN.md §16 exists to prevent.
- **Goals 1, 2, 4** — enabling. Clearing this unblocks the service pages, which
  serve goals 1 and 2 directly.

---

## Pros

- Removes the one genuine liability on the site.
- Unblocks `01` (service landing pages) and `05` (patient resource library).
- Prevents rework: reviewing after building eight new pages means editing all
  eight afterwards.
- Reviewed copy is better copy — a dentist will catch phrasing that is
  technically wrong even where it isn't dangerous.

## Cons and risks

- **Depends on someone else's time.** A dentist has to read and mark up a
  document. For a working practice this is the real cost, and it is the kind of
  thing that slips.
- **Could open a can of worms.** Review may surface treatments the clinic no
  longer offers, or details that have changed since the draft was written. That
  is a good outcome, but it means content edits, not just a sign-off.
- **No engineering leverage.** There is nothing to automate here. The only way
  to make it easier is to reduce what has to be read.

---

## What it would take

**Engineering half — do this now, it's a sitting:**

Pull every clinical claim out of `service-details.ts` into a single review
document, grouped by service, so a dentist reads one thing rather than clicking
through eight accordions. Concretely:

- an overview paragraph per service
- the `recommendedWhen`, `whatToExpect` and `aftercare` lists
- the `typicalVisits` figures
- all 29 FAQ answers
- any cost or sedation mention, flagged separately since those are the
  highest-risk category

Output format matters: a table a dentist can mark up, with a tick column and a
comment column, rather than prose they have to rewrite.

**Clinic half:** a dentist reviews it, corrects what's wrong, and confirms the
rest.

**Then:** apply corrections to `service-details.ts` and remove the "NOT
medically reviewed" warning from the file header.

---

## How we'd measure it

Binary. Either the file header says it has been reviewed and by whom, or it
doesn't. Worth recording **who** signed it off and **when** in the header, so a
future reader knows the copy has a provenance rather than assuming it.

---

## Verdict

**Do this first among the content items.** It is the only item with a
real-world risk, it is cheap on the engineering side, and it gates the two
biggest content features. Build the review sheet and hand it over.
