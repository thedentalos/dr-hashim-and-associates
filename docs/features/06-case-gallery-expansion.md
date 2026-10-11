# 06 — Case gallery expansion

**Effort:** M · **Impact:** Medium · **Blocked on:** consent, and more photography

---

## What it is

Two separate things that share a page:

1. **An interactive before/after slider.** `DESIGN.md` §9.5 lists it as a
   nice-to-have and it was never built. The current gallery shows each case as a
   single composite image in a lightbox.
2. **More cases.** Six exist today — three restorative, three cosmetic. There
   are no orthodontic cases at all, even though the clinic has a full-time
   orthodontist.

---

## How it helps

**The slider is evidence, not decoration.** A composite "before | after" image
asks the viewer to trust that the two halves are the same person and that the
change is real. A slider the reader drags themselves is far more convincing,
because they control the comparison and can see the change happen in one image
rather than across two frames.

For a clinic whose main hesitation is "will this actually work for me", that's
the most persuasive asset on the site. It's also the only interactive moment
that does real work — everything else is presentation.

**Orthodontic cases close an obvious gap.** The site has an orthodontist, an
orthodontics service page, and a dedicated treatments section, but no
orthodontic evidence. A visitor considering braces sees nothing showing the
clinic does them. `cases/page.tsx` already carries a note saying orthodontic
examples will be added when supplied — this is that supply.

**It strengthens the clinician attribution already built.** Each case is
credited to the dentist who performed it and links to their profile. More cases
means those profiles have more substance, and the orthodontist's profile stops
being a page with a bio and nothing else.

---

## Fit with the goals

- **Goal 1 (bookings)** — the slider works on the decision, at the point of
  hesitation.
- **Goal 4 (show the real practice)** — directly; more real work, shown.
- **Goal 3 (trust, no overclaiming)** — **needs care**. DESIGN.md §16 forbids
  implying a guaranteed result, and the current captions already carry "results
  vary" framing. A slider is more persuasive and therefore needs the framing to
  stay visible, not be optimised away.
- **Goal 2 (search)** — minor. Case images could rank in image search; that is
  not where clinic patients come from.

---

## Pros

- The slider is a genuine UX improvement over two static frames.
- Fills the orthodontic gap in the evidence.
- Gives the orthodontist's profile real content.
- Uses the attribution structure already in place — `cases` entries already
  carry a `doctor` slug.

## Cons and risks

- **Consent is the blocker, and it is not negotiable.** Every new case needs
  the patient's consent for publication. The six existing images have that
  recorded; new ones need the same process, per patient.
- **Bad photography is worse than none.** Before/after pairs fail on
  inconsistent lighting, angle, framing or background. A poorly matched pair
  doesn't just look bad — it undermines the credibility of the good ones.
  Composite images are more forgiving than sliders for exactly this reason: a
  slider makes any mismatch between the two shots immediately obvious.
- **The 500×500 problem repeats.** `case-zirconia-veneers.webp` is 500×500 while
  every sibling is 1083–1280², and it is visibly soft in the lightbox. Any new
  case must be captured at full resolution, or it becomes the next soft one.
- **The slider needs accessible controls.** Dragging is not keyboard-operable on
  its own; it needs a keyboard path and an accessible name, or it fails the same
  accessibility standard the rest of the site now meets.
- **Ethical framing has to survive the design.** The more persuasive the
  slider, the more important the "results vary, consultation required" line
  becomes. It should not be dropped to make the section look cleaner.

---

## What it would take

**Clinic:** more cases, captured consistently, with consent recorded per
patient. For orthodontics, treatment takes months — so the practical ask is
"start capturing now", not "supply next week".

**Engineering — slider (M):**
- a range-input-based slider rather than pointer-drag alone, so it works with a
  keyboard and a screen reader out of the box
- the existing square `case-image` frame already reserves the geometry, so no
  layout shift
- respects `prefers-reduced-motion` — no automated wipe animation
- falls back to the composite image where only a composite exists, since the six
  current cases are single images, not pairs

**Engineering — more cases (S):**
- add entries to `cases` in `data.ts` with `src`, `label`, `doctor` and alt text
- the sitemap and clinician profiles pick them up automatically

---

## How we'd measure it

- Whether the orthodontist's profile gains cases.
- Engagement is measurable only with event tracking (see `10`) — a slider
  interaction event is a reasonable proxy for "this person is seriously
  considering treatment".

## Verdict

**The slider is worth building; the cases are worth chasing.** The slider is
contained engineering with a clear payoff. The case images depend on a
photography habit the clinic has to start now, because the useful ones take
months to accumulate.
