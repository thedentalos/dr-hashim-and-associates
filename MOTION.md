# MOTION.md — Animation & Transition Spec (Dental Site)

Implementation reference for adding motion to a calm, boutique dental site. Audience includes anxious/dental-averse patients — motion should feel **unhurried, soft, and reassuring**, never bouncy, fast, or startling.

---

## 0. Global Rules

- **Easing default:** `cubic-bezier(0.22, 1, 0.36, 1)` (soft ease-out) for anything entering/appearing. Use `ease-in-out` for anything reversible (hover in/out, accordion open/close).
- **No bounce/elastic/spring easings.** No `overshoot`, no `cubic-bezier` values that dip past 1 or below 0.
- **Duration bands:**
  - Micro (hover, focus, button feedback): `150–200ms`
  - Standard (card lift, dropdown, accordion): `250–300ms`
  - Reveal (scroll-in content): `400–600ms`
  - Ambient (hero Ken Burns, background fades): `15,000–20,000ms`
- **Stagger:** `60–100ms` between sibling items in numbered/list sections.
- **Reduced motion:** every animation below MUST be wrapped or gated by:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
Implement this globally first, then build features on top — don't retrofit.

---

## 1. Hero Section

**Ambient background (Ken Burns)**
```css
.hero-image {
  animation: heroZoom 18s ease-out forwards;
  transform-origin: center;
}
@keyframes heroZoom {
  from { transform: scale(1); }
  to   { transform: scale(1.03); }
}
```

**Content stagger-in on load**
- Sequence: eyebrow → H1 → subhead → CTAs
- Each element: `opacity 0 → 1`, `translateY(12px → 0)`, `500ms`, ease-out
- Stagger delay: `100ms` per element (eyebrow=0ms, H1=100ms, subhead=200ms, CTAs=300ms)

```css
.hero-eyebrow, .hero-h1, .hero-subhead, .hero-ctas {
  opacity: 0;
  transform: translateY(12px);
  animation: fadeUp 500ms cubic-bezier(0.22,1,0.36,1) forwards;
}
.hero-eyebrow  { animation-delay: 0ms; }
.hero-h1       { animation-delay: 100ms; }
.hero-subhead  { animation-delay: 200ms; }
.hero-ctas     { animation-delay: 300ms; }

@keyframes fadeUp {
  to { opacity: 1; transform: translateY(0); }
}
```

---

## 2. Scroll-Triggered Reveals (Numbered Sections)

Applies to: "How We Care" (01–05), "Technology" (01–06), "The Details / Amenities" (01–08).

**Trigger:** IntersectionObserver, `threshold: 0.2`, fire once (`unobserve` after trigger — don't re-animate on scroll-back-up, it feels gimmicky on a calm site).

**Per-item animation:**
```css
.reveal-item {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 500ms cubic-bezier(0.22,1,0.36,1),
              transform 500ms cubic-bezier(0.22,1,0.36,1);
}
.reveal-item.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

**Stagger within a section:** add `transition-delay` of `(index * 80ms)`, capped at ~`400ms` max delay so later items in long lists (e.g. 08 amenities) don't feel sluggish.

**Number treatment:** the numeral (01, 02...) fades in ~80ms before its accompanying text, not simultaneously — reinforces sequential pacing.
```css
.reveal-item .item-number {
  transition-delay: calc(var(--i) * 80ms);
}
.reveal-item .item-text {
  transition-delay: calc(var(--i) * 80ms + 80ms);
}
```

---

## 3. Navigation

**Link hover (underline fade):**
```css
.nav-link {
  position: relative;
  transition: color 180ms ease-in-out;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px; left: 0;
  width: 100%; height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 200ms ease-in-out;
}
.nav-link:hover::after { transform: scaleX(1); }
```

**Dropdown (Services / Patients):**
```css
.dropdown-menu {
  opacity: 0;
  transform: translateY(-6px);
  visibility: hidden;
  transition: opacity 220ms ease-out, transform 220ms ease-out;
}
.dropdown-menu.is-open {
  opacity: 1;
  transform: translateY(0);
  visibility: visible;
}
```

**Sticky nav background on scroll:**
- Add class `.scrolled` after ~40px scroll (JS scroll listener or IntersectionObserver on a sentinel element).
```css
.site-nav {
  background: transparent;
  box-shadow: none;
  transition: background-color 300ms ease, box-shadow 300ms ease;
}
.site-nav.scrolled {
  background: var(--color-bg, #FAF8F5);
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}
```

**Mobile menu (hamburger → panel):**
```css
.mobile-menu {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: max-height 300ms ease-in-out, opacity 250ms ease-in-out;
}
.mobile-menu.is-open {
  max-height: 600px; /* or measured scrollHeight */
  opacity: 1;
}
```

---

## 4. Buttons & CTAs

**Primary CTA hover/tap:**
```css
.btn-primary {
  transition: transform 180ms ease-out, background-color 180ms ease-out, box-shadow 180ms ease-out;
}
.btn-primary:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
}
.btn-primary:active {
  transform: scale(0.98);
  transition-duration: 100ms;
}
```

**Click "confirm" fill effect (optional, for Book Now):**
```css
.btn-primary {
  position: relative;
  overflow: hidden;
}
.btn-primary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0.25);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 400ms ease-out;
}
.btn-primary:active::before { transform: scaleX(1); }
```

---

## 5. Cards (Services, Studios, Technology, Amenities)

```css
.card {
  transition: transform 220ms ease-out, box-shadow 220ms ease-out;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
}
.card:hover .card-icon,
.card:hover .card-number {
  transform: scale(1.05);
  transition: transform 220ms ease-out;
}
```

---

## 6. Testimonials

**Single-quote fade transition (carousel or scroll-driven):**
```css
.testimonial {
  opacity: 0;
  transition: opacity 500ms ease-in-out;
}
.testimonial.is-active { opacity: 1; }
```
- If using a carousel: crossfade between quotes (500ms), not slide — sliding text can feel busy for long quotes.
- Autoplay interval (if any): 6–8s minimum per quote, always with visible pause/prev/next controls. No autoplay on page load for the first 2s (let hero settle first).

---

## 7. Images (Lazy Load / Location Switch)

**Lazy load fade-in:**
```css
img.lazy {
  opacity: 0;
  filter: blur(8px);
  transition: opacity 400ms ease-out, filter 400ms ease-out;
}
img.lazy.loaded {
  opacity: 1;
  filter: blur(0);
}
```

**Location toggle (SF ↔ Mountain View) crossfade:**
```css
.location-image {
  transition: opacity 350ms ease-in-out;
}
```
Implement as a crossfade between two stacked/absolute-positioned images, not a hard swap.

---

## 8. Accordions (FAQ, Mobile Dropdowns)

```css
.accordion-panel {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: max-height 280ms ease-in-out, opacity 250ms ease-in-out;
}
.accordion-panel.is-open {
  max-height: 500px; /* or JS-measured scrollHeight for accuracy */
  opacity: 1;
}
.accordion-icon {
  transition: transform 250ms ease-in-out;
}
.accordion-item.is-open .accordion-icon {
  transform: rotate(180deg);
}
```

---

## 9. Form Fields (Contact, First Visit)

```css
.form-field input,
.form-field textarea {
  border-color: var(--color-border, #ddd);
  transition: border-color 200ms ease-out, box-shadow 200ms ease-out;
}
.form-field input:focus,
.form-field textarea:focus {
  border-color: var(--color-accent, #A8896B);
  box-shadow: 0 0 0 3px rgba(168,137,107,0.15);
  outline: none;
}
.form-field label {
  transition: transform 180ms ease-out, font-size 180ms ease-out, color 180ms ease-out;
}
```

---

## 10. Explicitly Avoid

| Effect | Why not |
|---|---|
| Bounce / elastic / spring easing | Reads as playful/gamey — wrong tone for clinical-calm brand |
| Fast (<100ms feels instant, jarring) or very fast page-load animations | Undermines "unhurried" positioning |
| Aggressive parallax | Motion-sensitivity risk for anxious patients; also janky on mobile |
| Autoplay carousels with no pause control | Accessibility issue + feels pushy |
| Spinning/shaking/rotating loaders or icons | Too playful/startling for healthcare context |
| Animating on every scroll pass (re-triggering on scroll-up) | Feels gimmicky/nervous rather than calm |

---

## 11. Implementation Notes for Agent

- Centralize easing/duration values as CSS custom properties so they're easy to tune globally:
```css
:root {
  --ease-soft: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-inout: ease-in-out;
  --dur-micro: 180ms;
  --dur-standard: 280ms;
  --dur-reveal: 500ms;
}
```
- Use IntersectionObserver (not scroll event listeners) for all scroll-triggered reveals — better performance, especially on mobile.
- Respect `prefers-reduced-motion` globally before implementing any individual effect (see §0).
- Test all animations at mobile breakpoints (per DESIGN.md §8) — some effects (parallax, large translateY reveals) may need reduced distances on small screens to avoid layout jank.
- Prioritize implementation order: (1) reduced-motion fallback, (2) nav + CTA micro-interactions, (3) scroll reveals, (4) hero ambient motion, (5) testimonial/carousel, (6) forms/accordions.
