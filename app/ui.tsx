"use client";

import Image from "next/image";
import Link from "next/link";
import {
  type CSSProperties,
  type FocusEvent,
  type FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { CLINIC_EMAIL, GOOGLE_MAPS_URL } from "./data";
import type { GoogleReview, GoogleReviewsData } from "./google-reviews";

const practiceSlides = [
  {
    src: "/media/clinic1.webp",
    alt: "Reception entrance at Dr Hashim and Associates Dental Clinic",
    title: "Welcome to your clinic.",
    detail: "Reception · G-9 Markaz",
  },
  {
    src: "/media/clinic2.webp",
    alt: "Dental operating microscope and treatment chair at Dr Hashim and Associates",
    title: "Carefully equipped.",
    detail: "Clinical assessment",
  },
  {
    src: "/media/clinic3.webp",
    alt: "Prepared dental treatment room at Dr Hashim and Associates",
    title: "Prepared for your visit.",
    detail: "Treatment room",
  },
  {
    src: "/media/clinic4.webp",
    alt: "Patient waiting lounge at Dr Hashim and Associates",
    title: "A calmer place to arrive.",
    detail: "Patient lounge",
  },
] as const;

function useCarousel(count: number, intervalMs: number, temporarilyPaused: boolean) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(media.matches);
    updateMotionPreference();
    media.addEventListener("change", updateMotionPreference);
    return () => media.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    const updateVisibility = () => setPageHidden(document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    if (count === 0) {
      setActive(0);
      return;
    }
    setActive((current) => Math.min(current, count - 1));
  }, [count]);

  useEffect(() => {
    if (count < 2 || paused || temporarilyPaused || reducedMotion || pageHidden) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % count);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [count, intervalMs, pageHidden, paused, reducedMotion, temporarilyPaused]);

  const move = useCallback((distance: number) => {
    if (count < 2) return;
    setActive((current) => (current + distance + count) % count);
    setPaused(true);
  }, [count]);

  const goTo = useCallback((index: number) => {
    if (count === 0) return;
    setActive(Math.max(0, Math.min(index, count - 1)));
    setPaused(true);
  }, [count]);

  return {
    active,
    paused: paused || reducedMotion,
    setPaused,
    next: () => move(1),
    previous: () => move(-1),
    goTo,
  };
}

function useInteractionPause() {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const onBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
  };

  return {
    temporarilyPaused: hovered || focused,
    interactionProps: {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      onFocus: () => setFocused(true),
      onBlur,
    },
  };
}

function CarouselControls({
  active,
  count,
  label,
  paused,
  onPauseChange,
  onPrevious,
  onNext,
  onSelect,
}: {
  active: number;
  count: number;
  label: string;
  paused: boolean;
  onPauseChange: (paused: boolean) => void;
  onPrevious: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}) {
  if (count < 2) return null;

  return (
    <>
      <div className="carousel-controls">
        <button type="button" className="carousel-pause" onClick={() => onPauseChange(!paused)} aria-label={paused ? `Play ${label}` : `Pause ${label}`}>
          <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
        </button>
        <button type="button" onClick={onPrevious} aria-label={`Previous item in ${label}`}><span aria-hidden="true">←</span></button>
        <button type="button" onClick={onNext} aria-label={`Next item in ${label}`}><span aria-hidden="true">→</span></button>
      </div>
      <div className="carousel-dots" aria-label={`Choose an item in ${label}`}>
        {Array.from({ length: count }, (_, index) => (
          <button key={index} type="button" aria-label={`Show item ${index + 1} of ${count}`} aria-current={index === active ? "true" : undefined} onClick={() => onSelect(index)}><span /></button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">{paused ? `Item ${active + 1} of ${count}` : ""}</p>
    </>
  );
}

export function PracticeCarousel() {
  const { temporarilyPaused, interactionProps } = useInteractionPause();
  const carousel = useCarousel(practiceSlides.length, 6000, temporarilyPaused);
  const trackStyle = { "--carousel-index": carousel.active } as CSSProperties;
  const currentSlide = practiceSlides[carousel.active];

  return (
    <figure className="practice-carousel" role="region" aria-roledescription="carousel" aria-label="Clinic gallery" {...interactionProps}>
      <div className="practice-carousel-viewport">
        <div className="carousel-track" style={trackStyle}>
          {practiceSlides.map((slide, index) => (
            <div className="practice-slide" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${practiceSlides.length}`} aria-hidden={index !== carousel.active} inert={index !== carousel.active} key={slide.src}>
              <Image src={slide.src} alt={slide.alt} fill preload={index === 0} sizes="(max-width: 767px) calc(100vw - 48px), 46vw" />
            </div>
          ))}
        </div>
        <div className="practice-carousel-shade" aria-hidden="true" />
      </div>
      <figcaption>{currentSlide.title}<span>{currentSlide.detail}</span></figcaption>
      <CarouselControls active={carousel.active} count={practiceSlides.length} label="clinic gallery" paused={carousel.paused} onPauseChange={carousel.setPaused} onPrevious={carousel.previous} onNext={carousel.next} onSelect={carousel.goTo} />
    </figure>
  );
}

function StarRating({ rating }: { rating: number }) {
  const roundedRating = Math.round(rating);
  return (
    <span className="review-stars">
      <span aria-hidden="true">{Array.from({ length: 5 }, (_, index) => index < roundedRating ? "★" : "☆").join("")}</span>
      <span className="sr-only">{rating} out of 5 stars</span>
    </span>
  );
}

function initialsFor(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

function ReviewCard({ review, index, count }: { review: GoogleReview; index: number; count: number }) {
  return (
    <article className="review-card" aria-label={`Review ${index + 1} of ${count}`}>
      <header className="review-author">
        {review.authorPhotoUri ? <img src={review.authorPhotoUri} alt="" width="44" height="44" loading="lazy" referrerPolicy="no-referrer" /> : <span className="review-avatar" aria-hidden="true">{initialsFor(review.author)}</span>}
        <div>
          {review.authorUri ? <a href={review.authorUri} target="_blank" rel="noreferrer">{review.author}</a> : <strong>{review.author}</strong>}
          {review.relativeTime && <time dateTime={review.publishedAt ?? undefined}>{review.relativeTime}</time>}
        </div>
      </header>
      <StarRating rating={review.rating} />
      <p className="review-copy">{review.text}</p>
      {review.translated && <small className="translation-note">Translated by Google</small>}
      <div className="review-card-links">
        {review.reviewUri && <a href={review.reviewUri} target="_blank" rel="noreferrer">Read full review on Google Maps <span aria-hidden="true">↗</span></a>}
        {review.reportUri && <a href={review.reportUri} target="_blank" rel="noreferrer">Report</a>}
      </div>
    </article>
  );
}

export function GoogleReviewsCarousel({ reviewsData }: { reviewsData: GoogleReviewsData }) {
  const [paused, setPaused] = useState(false);
  const { temporarilyPaused, interactionProps } = useInteractionPause();

  if (!reviewsData.configured || reviewsData.error || reviewsData.reviews.length === 0) {
    return (
      <div className="reviews-status">
        <span className="review-status-mark" aria-hidden="true">“</span>
        <div>
          <h3>Read our reviews on Google Maps</h3>
          <p>Live reviews are temporarily unavailable here. The clinic’s verified Google Maps listing remains available directly.</p>
          <a className="text-link" href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer">Open Google Maps <span aria-hidden="true">→</span></a>
        </div>
      </div>
    );
  }

  const reviews = reviewsData.reviews;
  const mapsUrl = reviewsData.googleMapsUri || GOOGLE_MAPS_URL;
  const trackPaused = paused || temporarilyPaused;
  const trackStyle = { "--review-duration": `${Math.max(24, reviews.length * 7)}s` } as CSSProperties;

  return (
    <div className="google-reviews">
      <div className="google-reviews-overview">
        <span className="google-maps-attribution" translate="no">Google Maps</span>
        <div className="google-rating">
          {typeof reviewsData.rating === "number" && <strong>{reviewsData.rating.toFixed(1)}</strong>}
          {typeof reviewsData.rating === "number" && <StarRating rating={reviewsData.rating} />}
          {typeof reviewsData.userRatingCount === "number" && <span>{reviewsData.userRatingCount} reviews</span>}
        </div>
        <a className="text-link" href={mapsUrl} target="_blank" rel="noreferrer">See all on Google Maps <span aria-hidden="true">→</span></a>
      </div>

      <div className="review-marquee" role="region" aria-label="Google patient reviews">
        {reviews.length > 1 && <button type="button" className="review-motion-toggle" aria-pressed={paused} onClick={() => setPaused((value) => !value)}>{paused ? "Play review motion" : "Pause review motion"}</button>}
        <div className="review-marquee-viewport" {...interactionProps}>
          <div className={`review-marquee-track${trackPaused ? " is-paused" : ""}${reviews.length < 2 ? " is-static" : ""}`} style={trackStyle}>
            {reviews.map((review, index) => <ReviewCard review={review} index={index} count={reviews.length} key={review.id} />)}
          </div>
        </div>
        <p className="sr-only" aria-live="polite">{paused ? "Review motion paused." : ""}</p>
      </div>

      <div className="review-disclosure">
        <p>Reviews are selected and ordered by Google Maps by relevance. Google does not verify reviews, but checks for and removes fake content when identified.</p>
        <a href="https://support.google.com/contributionpolicy/answer/7400114" target="_blank" rel="noreferrer">About Google reviews</a>
        {(reviewsData.providers ?? []).filter((provider) => provider.name).map((provider) => provider.uri ? <a href={provider.uri} target="_blank" rel="noreferrer" key={provider.name}>{provider.name}</a> : <span key={provider.name}>{provider.name}</span>)}
      </div>
    </div>
  );
}

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="nav-wrap">
      <nav id="navigation" className={open ? "open" : ""} aria-label="Main navigation">
        <Link className="nav-link" onClick={close} href="/">Home</Link>
        <Link className="nav-link" onClick={close} href="/about">About Us</Link>
        <Link className="nav-link" onClick={close} href="/team">Our Team</Link>
        <Link className="nav-link" onClick={close} href="/services">Services</Link>
        <Link className="nav-link" onClick={close} href="/cases">Our Cases</Link>
        <Link className="nav-link" onClick={close} href="/reviews">Patient Reviews</Link>
        <Link className="nav-link" onClick={close} href="/contact">Contact</Link>
      </nav>
      <button className="menu-toggle" aria-controls="navigation" aria-expanded={open} aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen((value) => !value)}><span /><span /></button>
    </div>
  );
}

export function CaseGallery({ items }: { items: ReadonlyArray<{ src: string; label: string; alt: string }> }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const activePosition = activeIndex ?? 0;
  const activeItem = activeIndex === null ? null : items[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") setActiveIndex((index) => index === null ? null : (index + 1) % items.length);
      if (event.key === "ArrowLeft") setActiveIndex((index) => index === null ? null : (index - 1 + items.length) % items.length);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, items.length]);

  return (
    <>
      <div className="case-grid case-directory-grid">
        {items.map((item, index) => (
          <button className="case-card case-gallery-button" type="button" onClick={() => setActiveIndex(index)} key={item.src} data-reveal>
            <span className="case-image"><Image src={item.src} alt={item.alt} fill sizes="(max-width: 767px) 88vw, 33vw" /></span>
            <span className="case-caption"><span>{item.label}</span><small>Before &amp; after · Enlarge</small></span>
          </button>
        ))}
      </div>
      {activeItem && (
        <div className="case-lightbox" role="dialog" aria-modal="true" aria-label={`${activeItem.label} case image`} onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveIndex(null); }}>
          <div className="case-lightbox-panel">
            <button ref={closeButtonRef} className="case-lightbox-close" type="button" onClick={() => setActiveIndex(null)} aria-label="Close enlarged image">Close <span aria-hidden="true">×</span></button>
            <div className="case-lightbox-image"><Image src={activeItem.src} alt={activeItem.alt} fill sizes="92vw" priority /></div>
            <div className="case-lightbox-caption"><strong>{activeItem.label}</strong><span>Before &amp; after</span></div>
            {items.length > 1 && <div className="case-lightbox-controls"><button type="button" onClick={() => setActiveIndex((activePosition - 1 + items.length) % items.length)}>Previous</button><span>{activePosition + 1} / {items.length}</span><button type="button" onClick={() => setActiveIndex((activePosition + 1) % items.length)}>Next</button></div>}
          </div>
        </div>
      )}
    </>
  );
}

export function ContactEnquiryForm() {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const body = [`Name: ${name}`, `Email: ${email}`, phone ? `Phone / WhatsApp: ${phone}` : "", "", message].filter(Boolean).join("\n");
    window.location.href = `mailto:${CLINIC_EMAIL}?subject=${encodeURIComponent(`Website enquiry from ${name}`)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="form-field"><label htmlFor="contact-name">Name</label><input id="contact-name" name="name" autoComplete="name" required /></div>
      <div className="form-field"><label htmlFor="contact-email">Email</label><input id="contact-email" name="email" type="email" autoComplete="email" required /></div>
      <div className="form-field"><label htmlFor="contact-phone">Phone or WhatsApp <span>(optional)</span></label><input id="contact-phone" name="phone" type="tel" autoComplete="tel" /></div>
      <div className="form-field form-field-full"><label htmlFor="contact-message">How can we help?</label><textarea id="contact-message" name="message" rows={6} required /></div>
      <div className="form-submit"><button className="button" type="submit">Prepare Email Enquiry</button><p>This opens your email app. Please do not include sensitive medical information.</p></div>
    </form>
  );
}

export function MotionController() {
  useEffect(() => {
    const header = document.querySelector(".site-header");
    const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 40);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const parents = new Set(Array.from(items, (item) => item.parentElement).filter((parent): parent is HTMLElement => Boolean(parent)));
    parents.forEach((parent) => {
      const siblings = Array.from(parent.children).filter((child): child is HTMLElement => child instanceof HTMLElement && child.hasAttribute("data-reveal"));
      siblings.forEach((item, index) => item.style.setProperty("--reveal-delay", `${Math.min(index * 80, 400)}ms`));
    });
    if (reducedMotion || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return () => window.removeEventListener("scroll", updateHeader);
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.2 });

    items.forEach((item) => observer.observe(item));
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateHeader);
    };
  }, []);

  return null;
}
