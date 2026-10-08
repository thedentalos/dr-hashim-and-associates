"use client";

import Link from "next/link";
import { useState } from "react";
import { offer } from "./data";

/**
 * Dismissal is stored on `<html data-offer-dismissed>` by a tiny inline script
 * in the root layout, which runs before first paint. That attribute is what
 * actually hides the banner for returning visitors — so it never flashes and
 * never shifts the page. React state only handles the click.
 */
export const OFFER_DISMISSED_ATTRIBUTE = "offerDismissed";
export const OFFER_STORAGE_KEY = "dha-offer-banner-dismissed";

export function PromoBanner() {
  const [dismissed, setDismissed] = useState(false);

  function dismiss() {
    setDismissed(true);
    document.documentElement.dataset[OFFER_DISMISSED_ATTRIBUTE] = "1";
    try {
      window.localStorage.setItem(OFFER_STORAGE_KEY, "1");
    } catch {
      // Private mode or blocked storage — the banner still closes for this view.
    }
  }

  if (dismissed) return null;

  return (
    <aside className="promo-banner" aria-label="Current clinic offer">
      <p className="promo-banner-text">
        <span className="promo-banner-long">{offer.bannerLong}</span>
        <span className="promo-banner-short">{offer.bannerShort}</span>
      </p>
      <Link className="promo-banner-cta" href="/book-appointment">Book Now</Link>
      <button className="promo-banner-close" type="button" onClick={dismiss} aria-label="Dismiss offer">
        <span aria-hidden="true">&times;</span>
      </button>
    </aside>
  );
}
