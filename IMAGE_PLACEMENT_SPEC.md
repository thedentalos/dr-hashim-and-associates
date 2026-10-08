# Image Placement Spec — Clinic Shoot

**Task for the implementing agent:** convert the photographs in `Clinic Shoot-20261005T160004Z-1-001/` into web formats and wire them into the pages listed below.

**Do not redesign any layout.** Every slot already exists and already renders an image — you are replacing placeholder art with real photography and writing accurate alt text.

---

## 0. Read this first — HEIC decoding

All 22 clinic photographs are Apple HEIC. **Two of the obvious tools fail on these files.**

| Tool | Result |
|---|---|
| `sharp` (libvips 8.18.6 / libheif 1.23.2) | ❌ **Fails on all 22** — `bad seek to <filesize + 32>`. Header parses, pixels do not. |
| `ffmpeg` (Playwright build 1011) | ❌ `Invalid data found when processing input` |
| **`pillow-heif` (Python)** | ✅ **Works.** Verified on all files. |

The files are **not corrupted**. I parsed the ISO-BMFF box structure of several: `ftyp` → `meta` → `mdat`, ending exactly at EOF with zero trailing bytes. It is a decoder bug in the libheif build that ships with `sharp`.

```bash
pip install --user pillow-heif
```

```python
from pillow_heif import register_heif_opener
from PIL import Image, ImageOps
register_heif_opener()

im = ImageOps.exif_transpose(Image.open(src))   # honours iPhone rotation
im.convert("RGB").save(dest, "WEBP", quality=82, method=6)
```

`exif_transpose` is **required** — these are iPhone captures and several carry an orientation flag.

### Strip EXIF on export

PIL preserves EXIF unless told otherwise. These photographs contain **GPS coordinates, capture timestamps and device identifiers**. Strip it:

```python
im.convert("RGB").save(dest, "WEBP", quality=82, method=6, exif=b"")
```

(`sharp` strips EXIF by default; PIL does not.)

---

## 1. Source inventory

**Location:** `Clinic Shoot-20261005T160004Z-1-001/Clinic Shoot/`

### Clinic photographs — 22 HEIC, all portrait 3:4

| File | What it shows |
|---|---|
| `IMG_9633.HEIC` | Dentist in scrubs treating a patient in the chair |
| `IMG_9657.HEIC` | Wide view — reception desk, seating, wood floor |
| `IMG_9664.HEIC` | Reception desk and clinic signage |
| `IMG_9677.HEIC` | Waiting lounge — sofas, coffee table, plants |
| `IMG_9682.HEIC` | Treatment room, empty, glass partition |
| `IMG_9683.HEIC` | Treatment room, empty, second angle |
| `IMG_9689.HEIC` | Treatment room with blue cabinetry |
| `IMG_9690.HEIC` | Treatment room, similar to 9689 |
| `IMG_9694.HEIC` | Treatment room with blue drawer unit |
| `IMG_9697.HEIC` | Dentist treating a patient, patient wearing eye protection |
| `IMG_9707.HEIC` | Dentist working under the operating light, dramatic blue cast |
| `IMG_9716.HEIC` | Wide shot of treatment in progress |
| `IMG_9755.HEIC` | Dentist at the operating microscope |
| `IMG_9770.HEIC` | Dentist and assistant at the operating microscope |
| `IMG_9771(1).HEIC` | Operating microscope, close |
| `IMG_9783.HEIC` | Dentist holding an extracted tooth toward camera |
| `IMG_9785.HEIC` | Dentist holding dental instruments |
| `IMG_9806.HEIC` | **Two dentists** at reception, arms crossed — team shot |
| `IMG_9815.HEIC` | **One dentist** behind the reception desk, smiling |
| `IMG_9818.HEIC` | **Two dentists** at the desk, one writing |
| `IMG_9844(1).HEIC` | Extracted tooth on a dark background |
| `IMG_9844(3).HEIC` | Same tooth, second angle |

### Clinical cases — 6 JPEG in `CASES/`

Each is a **before/after pair stacked in a single image**. Several filenames contain typos — reproduce them exactly as listed, they are the literal filenames.

| File | Dimensions | Attribution (from filename) |
|---|---|---|
| `Composite filling done by Dr Baryal.jpeg` | 1280×1280 | Dr Baryal |
| `Composite fillings done by Dr Baryal.jpeg` | 1280×1280 | Dr Baryal |
| `composite veneers done by dr baryal.jpeg` | 1280×1280 | Dr Baryal |
| `scaling polishing anf teeth whitening done by dr hashim.jpg` | 1083×1020 | Dr Hashim |
| `teeth whitening doen by dr hashim.jpg` | 1049×1377 | Dr Hashim |
| `zirconia veneers done by dr hahsim.jpg` | **500×500** | Dr Hashim |

### Also present

- `IMG_9667.MOV`, `IMG_9762.MOV`, `IMG_9767.MOV` — video, **cannot be decoded with the tooling in this repo**. See §7.
- `WhatsApp Image 2026-10-05 at 2.01.26 PM.jpeg` (960×1280) — dentist treating a patient, duplicates the subject of IMG_9697. Unassigned.

---

## 2. ⚠️ Aspect ratio — read before cropping

**Every clinic photograph is portrait 3:4 (ratio 0.75).** Most destinations are landscape. With `object-fit: cover` a portrait source in a landscape frame loses roughly **40% of its height**, cropping top and bottom equally.

Check each placement: if the subject is not vertically centred, set `object-position` on that specific image. The reception and lounge shots are safe (subject in the middle band); the microscope and chair-side shots are **not** — heads sit high in frame and will be clipped.

Where a shot cannot survive the crop, swap it for another from the same category rather than shipping a cropped face.

---

## 3. Placements

### 3.1 Hero carousel — 4 slides

**Edit:** `app/ui.tsx` → the `practiceSlides` array (currently `/media/clinic1.webp` … `clinic4.webp`).

The container is `aspect-ratio: 4/5` below 768px and **full-bleed landscape** above it. The captions already exist and already match these subjects — **do not change the caption text**, only `src` and `alt`.

| Slide | Caption (existing — keep) | Source | New filename |
|---|---|---|---|
| 1 | "Welcome to your clinic." / "Reception · G-9 Markaz" | `IMG_9657.HEIC` | `public/media/clinic-reception.webp` |
| 2 | "Carefully equipped." / "Clinical assessment" | `IMG_9770.HEIC` | `public/media/clinic-microscope.webp` |
| 3 | "Prepared for your visit." / "Treatment room" | `IMG_9689.HEIC` | `public/media/clinic-treatment-room.webp` |
| 4 | "A calmer place to arrive." / "Patient lounge" | `IMG_9677.HEIC` | `public/media/clinic-lounge.webp` |

Slide 2 and 3 need attention on the crop — see §2. Prefer `IMG_9682` for slide 3 if `IMG_9689` crops badly.

**Sizes:** export at **1600px on the long edge**. The largest render is full-bleed at roughly half the viewport width, so 1600px covers a 2× retina display at 1440px wide. Do not ship the 6048px originals.

Slide 1 is `preload` and is the LCP element — keep it WebP, and confirm the LCP does not regress.

### 3.2 About page — hero image (1)

**Edit:** `app/about/page.tsx`, the `<Image>` inside `.inner-hero-image`.

| Source | Destination | Rendered as |
|---|---|---|
| `IMG_9657.HEIC` | `public/media/clinic-reception-wide.webp` | min-height 440px, `object-position: 62% center` |

⚠️ `IMG_9657` is also carousel slide 1. **Use a different frame for one of them** — `IMG_9664` (reception desk with signage) is the natural alternative here, since the about hero is the wider, calmer composition.

**Alt:** `"Reception and waiting area at Dr Hashim & Associates Dental Clinic, G-9 Markaz, Islamabad"`

### 3.3 About page — clinic space cards (3)

**Edit:** `app/about/page.tsx` → the `spaces` array.

Container is `aspect-ratio: 4 / 3` — landscape, so §2 applies.

| Card | Title (existing — keep) | Source | New filename |
|---|---|---|---|
| 1 | "Clinical assessment" | `IMG_9683.HEIC` | `public/media/clinic-assessment-room.webp` |
| 2 | "Prepared treatment rooms" | `IMG_9690.HEIC` | `public/media/clinic-treatment-rooms.webp` |
| 3 | "A welcoming lounge" | `IMG_9664.HEIC` | `public/media/clinic-lounge-reception.webp` |

Export at **1200px wide**.

### 3.4 Cases — 3 → 6

**Edit:** `app/data.ts` → the `cases` array.

Container is `aspect-ratio: 1 / 1`. The square sources drop in cleanly.

| # | Source | `label` | New filename |
|---|---|---|---|
| 1 | `Composite filling done by Dr Baryal.jpeg` | `Restorative` | `public/media/case-composite-filling.webp` |
| 2 | `Composite fillings done by Dr Baryal.jpeg` | `Restorative` | `public/media/case-composite-fillings.webp` |
| 3 | `composite veneers done by dr baryal.jpeg` | `Cosmetic` | `public/media/case-composite-veneers.webp` |
| 4 | `scaling polishing anf teeth whitening done by dr hashim.jpg` | `Cosmetic` | `public/media/case-scaling-whitening.webp` |
| 5 | `teeth whitening doen by dr hashim.jpg` | `Cosmetic` | `public/media/case-teeth-whitening.webp` |
| 6 | `zirconia veneers done by dr hahsim.jpg` | `Cosmetic` | `public/media/case-zirconia-veneers.webp` |

**Alt text pattern** — describe the treatment factually, never claim an outcome:

```
"Before and after view of a composite filling carried out at Dr Hashim & Associates"
```

Do **not** write "transformed smile", "perfect result", "life-changing" or similar. DESIGN.md §16 forbids unsupported outcome claims, and the section already carries a results-vary disclaimer — leave that alone.

**Two flags on this set:**

1. **`zirconia veneers done by dr hahsim.jpg` is only 500×500.** In a three-up grid each tile renders about 430px wide, and 500px is soft on any retina screen. Either exclude it, or ask the clinic for the full-resolution original.
2. **Consent.** These are real patient before/after photographs, several showing lips and facial hair. Publishing them requires the patients' consent for web use. **Confirm with the clinic before these go live.** If consent is unclear, ship the three existing placeholders and leave this section alone.

**Homepage knock-on:** the homepage preview renders the same `cases` array. Six entries produce two rows of three. If the homepage should stay at three, use `.slice(0, 3)` in `app/page.tsx` rather than splitting the data.

### 3.5 Doctor portraits — ⚠️ CANNOT BE COMPLETED FROM THIS SHOOT

**Edit:** `app/components.tsx` → `DoctorCard`, which currently renders `.doctor-photo-placeholder`.

The clinic has **four** doctors. This shoot contains no usable headshots:

- `IMG_9815` is the only single-person portrait — usable in principle.
- `IMG_9806` and `IMG_9818` show **two** people at the reception desk.
- The shoot appears to feature only two or three distinct people in total.

**I cannot identify who is who.** Do not guess. Assigning the wrong face to a doctor's name misrepresents a real clinician and misattributes their credentials — worse than leaving a placeholder.

Leave all four placeholders in place and raise this with the clinic. Either they identify the individuals in `IMG_9806` / `IMG_9815` / `IMG_9818`, or a headshot session is needed. A proper headshot also needs a consistent crop — the existing placeholder box is a fixed aspect ratio, and candid reception shots will not match.

### 3.6 Optional: equipment section has no images

`app/about/page.tsx` has an `.equipment-grid` of three text-only cards. It is not part of this task, but if you want to use the remaining material, the microscope shots (`IMG_9755`, `IMG_9771(1)`) and the extracted-tooth shots (`IMG_9844(1)`, `IMG_9844(3)`) are the strongest unused frames. **Only do this if the layout already supports images** — do not restructure a section to fit a photograph.

---

## 4. SEO requirements

These determine whether the images earn anything in search, so treat them as part of the task rather than polish.

1. **Descriptive filenames.** `clinic-treatment-room.webp`, not `IMG_9689.webp` or `clinic2.webp`. Kebab-case, lowercase, no spaces. This is why §3 specifies new names — the existing `clinic1.webp` … `clinic4.webp` are replaced, and every reference must be updated.

   **References to update when renaming:**
   - `app/ui.tsx` — `practiceSlides` array (4 entries)
   - `app/about/page.tsx` — `inner-hero-image` and the `spaces` array
   - `app/data.ts` — `cases` array

   Search the repo for `clinic1` / `clinic2` / `results1` and confirm nothing is left pointing at a deleted file.

2. **Alt text describes the photograph, honestly.** Name the room or the treatment and the clinic where it reads naturally. Never keyword-stuff; never describe something not visible in the frame.

   - ✅ `"Treatment room prepared for a patient at Dr Hashim & Associates, G-9 Markaz"`
   - ❌ `"dental clinic Islamabad best dentist G-9 Markaz root canal"`

   Purely decorative images get `alt=""` — the existing brand logo mark already does this correctly.

3. **WebP, quality 82.** Every existing asset in `public/media/` is WebP; stay consistent. Do not ship HEIC or JPEG to the browser.

4. **Never upscale.** All clinic photos are 3024×4032 or larger, which is ample. The one exception is the 500×500 zirconia case — see §3.4.

5. **Set explicit dimensions.** Slots using `next/image` with `fill` inherit the container's aspect ratio and need nothing extra. Anywhere you switch to a plain `<img>`, set `width` and `height` or you introduce layout shift.

6. **Loading priority.** Only the first hero slide is `preload`. Everything below the fold stays lazy — including the entire About page gallery.

7. **Do not delete the old files until the build passes.** `clinic1–4.webp` and `results1–3.webp` are the current safety net.

---

## 5. Definition of done

- [ ] All HEIC converted via `pillow-heif` with `exif_transpose` applied
- [ ] EXIF (GPS, timestamps, device) stripped from every exported file
- [ ] `npm run build` passes
- [ ] `npm run build && npm start` then load `/`, `/about`, `/cases`, `/services` — every image renders, none 404
- [ ] No reference to a deleted file remains (`grep -r "clinic1\|clinic2\|clinic3\|clinic4\|results1\|results2\|results3" app/`)
- [ ] No layout shift on load (images sized or using `fill`)
- [ ] Alt text present on every content image, `alt=""` on decorative ones
- [ ] Doctor placeholders **unchanged** (§3.5)
- [ ] Patient consent confirmed before case photographs are published (§3.4)
- [ ] Verify at 375px and 1440px — portrait sources crop hardest on desktop

---

## 6. Files you will touch

| File | Change |
|---|---|
| `public/media/*.webp` | New exports added |
| `app/ui.tsx` | `practiceSlides` — 4 × `src`, `alt` |
| `app/about/page.tsx` | hero `<Image src>`, `spaces` array |
| `app/data.ts` | `cases` array |
| `app/components.tsx` | **No change** — doctor placeholders stay |

---

## 7. Unresolved

**The three `.MOV` files cannot be decoded here.** `ffmpeg` (Playwright build 1011) rejects them, and they are HEVC in a QuickTime container. I confirmed the container structure is valid — `ftyp` → `wide` → `mdat`, roughly 9 MB, 9 MB and 40 MB — but could not inspect a single frame.

There is also **no video slot anywhere in the app**. The reviews section displays Google reviews only; DESIGN.md §9.6 mentions video testimonials as a future addition. Leave the videos alone and raise them with the clinic — they need a human to watch them and decide, and a new component before they can be used.
