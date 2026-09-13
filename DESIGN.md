# DESIGN.md — Zen Dental Studio (zen.dentist)

> Note: this was compiled from the site's rendered HTML/content (via fetch), not a pixel-level CSS/visual inspection. Colors and exact type specs below are inferred from imagery, copy, and structural patterns typical of this kind of Next.js marketing site — treat them as a strong starting reference, not a literal extracted stylesheet.

## 1. Brand Positioning
- **Category:** Dental practice marketing site (two Bay Area locations: San Francisco/SoMa, Mountain View)
- **Core promise:** "Modern dental care, thoughtfully delivered" — clinical competence wrapped in spa-like calm
- **Tagline:** "Dentistry, reimagined."
- **Tone:** Warm, plain-spoken, reassuring. Short sentences. Second-person ("you'll always know what's going on"). No jargon, no fear-based dental marketing clichés.
- **Emotional target:** Anxious/dental-averse patients — copy repeatedly de-escalates ("Nervous at the dentist? We get it.")

## 2. Site Architecture
```
/                      Home
/our-story             About / team
/services              Services hub
  /services/invisalign
  /services/dental-implants
  /services/veneers
  /services/teeth-whitening
  /services/exams-and-cleanings
  /services/fillings
  /services/dental-crowns
  /services/root-canals
  /services/extractions
  /services/emergency
/patients              Patient info hub (#insurance, #membership, #faq anchors)
/patients/first-visit
/contact
/san-francisco         Location page
/mountain-view         Location page
```
- Built on Next.js (evident from `/_next/image` optimized asset pipeline, `?w=&q=&dpl=` query params).
- Booking funnel routes to NexHealth (`app.nexhealth.com/appt/zendentalstudio?lid=...`), separate `lid` per location.

## 3. Page Composition (Homepage, top to bottom)
1. **Sticky nav** — logo left; primary links (Our Story, Services ▾, Patients ▾, Contact, San Francisco / Mountain View); persistent **"Book Now"** CTA button, right-aligned.
2. **Hero** — full-bleed photo of a warm, wood-lined treatment room with natural light. Location eyebrow ("San Francisco · Mountain View") → H1 → subhead → dual CTA ("Book a Visit" primary, "Call Now" secondary).
3. **"How We Care"** — 5-step numbered narrative (01–05), alternating text/image, each pairing a short label + bold micro-headline + 1–2 sentence explanation. Photography of staff/spaces breaks up the list every ~2 items.
4. **Testimonial pair** — pull-quote style, name-only attribution (first name + last initial).
5. **"What We Do"** — services organized into **two named tiers**: "Everyday care" and "Signature care," each a card linking to a service list, plus a separate "Urgent Care" card with same-day messaging. Clear content model: tiering communicates routine-vs-elective without saying so directly.
6. **"Technology"** — 6 in-house technologies as a numbered grid (CBCT Imaging, 3D Scanners, 3D Printing, AI-Assisted Diagnostics, Digital X-Rays, Laser Dentistry), each with a one-line benefit tag and "Details" link.
7. **Testimonial pair** (again).
8. **"The Details" (amenities)** — 8-item numbered grid: Netflix, heated lavender eye masks, organic blankets, premium beverages, aromatherapy, toxin-free products, massage chairs, noise-canceling headphones. This is the section doing the most brand differentiation.
9. **Patient Stories** — dense testimonial wall, multiple quotes, first name + last initial each.
10. **"Our Studios"** — two location cards (photo, address, phone, Book/Call CTAs).
11. **Closing CTA band** — restates value prop, dual CTA again, link to full services.
12. **Footer** — dark, full-width. Logo (white variant) + tagline "Dentistry, reimagined." Three link columns (Explore / Services / Studios) each location with full address, phone, and email. Copyright line, repeated location tag.

## 4. Recurring UI Patterns
- **Numbered micro-lists (01, 02, 03…)** used everywhere — care philosophy, services, technology, amenities. This is the site's signature structural device: it turns dense information into scannable, editorial-feeling steps rather than a features grid.
- **Two-tier service naming** ("Everyday care" vs "Signature care") instead of generic "General / Cosmetic" — softer, brand-voice-consistent labels.
- **Consistent dual-CTA pairing**: "Book a Visit" (primary/booking) + "Call Now"/"Call Studio" (secondary/tel: link) appears at hero, mid-page, and studio cards.
- **Photography-led sections**: every major section anchors to a real interior/team photo (not stock/illustration), reinforcing the "designed space" promise.
- **Testimonials as connective tissue** between sections rather than isolated in one carousel — used 3 separate times down the page.
- **Location duality baked into copy**, not bolted on: "San Francisco · Mountain View" eyebrow repeats in hero and footer; every location-specific CTA carries its own phone/booking ID.

## 5. Visual Language (inferred from imagery + brand cues)
- **Palette:** warm neutral/wood tones (light oak, cream, soft white) as the dominant interior palette, likely paired with a deep charcoal/black footer for contrast — consistent with the "spa, not clinic" positioning repeated in testimonials ("feels more like a spa visit than a dental one").
- **Imagery style:** natural light, minimal clinical signage visible, wood paneling, plants — architecture-photography quality rather than stock dental photos.
- **Typography (likely pattern for this design tier):** a clean geometric/humanist sans for UI and body copy, possibly a slightly warmer serif or higher-contrast display face for H1/section headlines to add a boutique, editorial feel — consistent with short, declarative headline copy like "You're in good hands."
- **Iconography:** minimal — numbers (01–08) substitute for icons throughout, which is a deliberate, distinctive choice over generic icon sets.
- **Logo:** two lockups in use — dark logo for light nav background, full white logo for dark footer.

## 6. Content/Voice Guidelines (extractable style rules)
- Sentences are short and confident; avoid dental jargon (uses "goopy molds" instead of "alginate impressions").
- Every capability is framed as a patient benefit, not a feature: "Digital scans instead of goopy molds" rather than "iTero scanner."
- Numbers/stats used sparingly but concretely ("over 30 years of experience between them," "same day whenever possible").
- Testimonials are curated to reinforce specific themes: calm environment, transparency/no upselling, holistic health framing, tech-forward care.
- CTAs are always verbs: "Book a Visit," "Call Now," "Explore all services," "Read our story."

## 7. Suggested Design Tokens (starting point if rebuilding)
| Token | Suggested value | Rationale |
|---|---|---|
| `color-bg` | `#FAF8F5` / warm off-white | Matches wood/interior warmth |
| `color-surface-dark` | near-black charcoal | Footer contrast band |
| `color-accent-wood` | muted tan/oak | Pulled from hero imagery |
| `color-text-primary` | soft charcoal, not pure black | Consistent with calm/soft brand tone |
| `font-display` | warm serif or rounded sans, medium weight | For H1/section headers |
| `font-body` | neutral sans (e.g., Inter-like) | For paragraph copy, nav |
| `radius` | generous rounding on cards/buttons | Softness matches "zen" positioning |
| `motion` | subtle fade/slide on scroll reveal (numbered sections) | Editorial, unhurried feel |

## 8. Responsive Strategy — Mobile-First

This design should be built **mobile-first**: author all base styles for the smallest viewport, then layer on complexity with `min-width` media queries as the screen grows. Never design/build desktop first and shrink it down — that's how the numbered-list sections, dual-CTA rows, and full-bleed hero imagery break on phones.

### Breakpoint scale
| Name | Min-width | Target devices | Notes |
|---|---|---|---|
| `base` (default, no query) | `0px` | Small phones (iPhone SE, older Android) | This is the real default — write it first, not as an afterthought override |
| `sm` | `480px` | Standard phones (iPhone 12–16, Pixel, Galaxy) | Slightly looser spacing, larger tap targets settle in |
| `md` | `768px` | Tablets / phones landscape | Nav can start expanding; 2-column grids become viable |
| `lg` | `1024px` | Small laptops / iPad landscape | Full desktop nav, multi-column sections |
| `xl` | `1280px` | Desktop | Max content width, generous whitespace, side-by-side text/image sections |
| `2xl` | `1536px` | Large desktop | Cap content width (e.g. `max-width: 1440px`), center, avoid line-length blowout |

### Per-section mobile-first rules
- **Nav:** Base = logo + hamburger menu + single "Book Now" button (icon-only or short label if space is tight). Full horizontal link list (Our Story / Services ▾ / Patients ▾ / Contact / location switch) only appears at `md`+. Dropdowns (Services, Patients) become tap-to-expand accordions on mobile, not hover menus.
- **Hero:** Base = image cropped to portrait/square focal point (not the wide desktop crop), stacked H1 → subhead → CTAs, both CTAs full-width and stacked vertically. At `md`+, CTAs go side-by-side; at `lg`+, hero can use the wide landscape crop.
- **Numbered "How We Care" / Technology / Amenities lists:** Base = single column, image always above its text block (never side-by-side), numbers stay large and left-aligned as a visual anchor. Two-column text/image alternating layout only kicks in at `lg`+.
- **Service tier cards (Everyday / Signature / Urgent):** Base = stacked full-width cards, one per row. `md` = 2-up grid. `lg` = 3-up.
- **Testimonials:** Base = single quote at a time, full width, generous line-height for readability at small sizes. Consider swipeable/scroll-snap carousel on mobile rather than a static grid. `lg`+ can show 2–3 quotes side-by-side.
- **Studio cards (SF / Mountain View):** Base = stacked, full-width photo above address/phone/CTAs. `md`+ = side-by-side two-up.
- **Footer:** Base = single-column stacked link groups (Explore / Services / Studios), each collapsible/accordion if long. `md`+ = 3-column grid as designed.
- **Touch targets:** All CTA buttons, nav links, and accordion headers ≥ 44×44px tap area at every breakpoint — this matters more than it did at desktop-first hover-driven design.
- **Typography scale:** Don't just shrink desktop type — use a distinct mobile type scale (e.g., H1 ~28–32px on base, scaling to ~48–56px by `xl`) so headlines wrap cleanly at phone widths without awkward line breaks.
- **Images:** Serve responsive `srcset`/`sizes` (the site already uses Next.js `_next/image` with `w=` params, so this is a natural fit) — smaller crops/resolutions at `base`, full-res wide crops only loaded at `lg`+.

### Testing checklist
- [ ] 320px width (smallest common phone) — no horizontal scroll, no overlapping text
- [ ] 375px / 390px (iPhone standard) — primary target, should feel native
- [ ] 428px (large phones) — CTAs and numbered lists still comfortable
- [ ] 768px (tablet portrait) — verify transition point doesn't look like an awkward in-between
- [ ] 1024px+ — full desktop layout, verify max-width containers prevent overly long text lines

## 9. Limitations of This Document
This was generated from the site's fetched HTML/markdown content, not from live CSS, computed styles, or a rendered screenshot. Exact colors, font families, spacing scale, and breakpoints are not confirmed. If you need pixel-accurate tokens (hex values, font names, spacing units), the next step would be to inspect the live site's CSS/computed styles directly (e.g., via browser devtools or a rendering tool) rather than relying on this fetch-based summary.
