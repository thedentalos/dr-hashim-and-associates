import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import type { CSSProperties, ReactNode } from "react";
// A 512px derivative of logo.png (2000px, 1.4MB). The mark renders into a
// 132px box that the header clips to a 48px circle, so 512 covers 2x with room
// to spare — the visible crop is pixel-equivalent to the original. logo.png is
// left untouched as the source of truth.
import clinicLogo from "../logo-mark.webp";
import type { Doctor, ServiceDetail } from "./data";
import { CLINIC_EMAIL, CLINIC_HOURS, CLINIC_PHONE_DISPLAY, INSTAGRAM_URL, WHATSAPP_URL } from "./data";
import { PromoBanner } from "./promo-banner";
import { MobileNavigation, MotionController } from "./ui";

export function Brand() {
  return (
    <Link className="brand" href="/" aria-label="Dr Hashim &amp; Associates Dental Clinic home">
      <span className="brand-mark" aria-hidden="true">
        <Image className="brand-mark-source" src={clinicLogo} alt="" sizes="132px" />
      </span>
      <span className="brand-name"><span>Dr Hashim</span><span>&amp; Associates Dental Clinic</span></span>
    </Link>
  );
}

/**
 * The trail a reader can see, plus the `BreadcrumbList` that lets Google show
 * it in place of the URL in a result. The two have to be emitted together —
 * markup for a trail no visitor can see is the thing Google's guidance warns
 * about, so there is no way to opt into one without the other.
 *
 * The last item is the page itself, so it renders as plain text and carries no
 * `item` URL in the markup.
 */
export function Breadcrumbs({ items }: { items: Array<{ name: string; href?: string }> }) {
  const siteUrl = process.env.SITE_URL?.trim().replace(/\/$/, "");
  const trail = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.href ? { item: siteUrl ? `${siteUrl}${item.href === "/" ? "" : item.href}` : item.href } : {}),
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(trail).replace(/</g, "\\u003c") }} />
      <nav className="breadcrumb" aria-label="Breadcrumb">
        {items.map((item, index) => (
          <Fragment key={item.name}>
            {index > 0 && <span aria-hidden="true">/</span>}
            {item.href ? <Link href={item.href}>{item.name}</Link> : <span aria-current="page">{item.name}</span>}
          </Fragment>
        ))}
      </nav>
    </>
  );
}

export function BookingLink({ children = "Book an Appointment", className = "button" }: { children?: ReactNode; className?: string }) {
  return <Link className={className} href="/book-appointment">{children}</Link>;
}

/**
 * The promotion banner lives inside `.site-header-shell`, which is the sticky
 * element — so the banner and the navigation pin together as one bar. Section
 * scroll offsets are adjusted for the extra height in globals.css.
 */
export function Header({ showOffer = false }: { showOffer?: boolean }) {
  return (
    <div className="site-header-shell" id="top">
      {showOffer && <PromoBanner />}
      <header className="site-header">
        <Brand />
        <MobileNavigation />
        <BookingLink className="button header-book"><span className="book-long">Book Appointment</span><span className="book-short">Book</span></BookingLink>
      </header>
    </div>
  );
}

export function PageFrame({ children, showOffer = false }: { children: ReactNode; showOffer?: boolean }) {
  return (
    <>
      <MotionController />
      <a className="skip" href="#main">Skip to content</a>
      <Header showOffer={showOffer} />
      {children}
      <WhatsAppButton />
      <Footer />
    </>
  );
}

export function WhatsAppButton() {
  return (
    <a className="whatsapp-button" href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Chat with Dr Hashim and Associates on WhatsApp">
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path fill="currentColor" d="M16.04 3.2A12.75 12.75 0 0 0 5.11 22.52L3.3 29.12l6.75-1.77a12.74 12.74 0 1 0 5.99-24.15Zm0 2.15a10.59 10.59 0 1 1-5.4 19.7l-.38-.23-4 .99 1.06-3.88-.25-.4a10.59 10.59 0 0 1 8.97-16.18Zm-5.2 4.55c-.23 0-.6.09-.92.44-.31.35-1.2 1.17-1.2 2.86s1.23 3.32 1.4 3.55c.18.23 2.42 3.7 5.87 5.19.82.35 1.46.57 1.96.73.83.26 1.58.22 2.17.14.66-.1 2.04-.84 2.33-1.64.29-.81.29-1.5.2-1.64-.08-.15-.31-.23-.66-.41-.35-.17-2.04-1-2.36-1.12-.32-.12-.55-.18-.78.17-.23.35-.9 1.13-1.1 1.36-.2.23-.41.26-.76.09-.35-.18-1.48-.55-2.82-1.74a10.6 10.6 0 0 1-1.95-2.43c-.2-.35-.02-.54.15-.71.16-.16.35-.41.52-.61.18-.2.23-.35.35-.58.12-.23.06-.44-.03-.61-.09-.18-.79-1.9-1.08-2.6-.28-.68-.57-.59-.78-.6h-.67Z" />
      </svg>
      <span>WhatsApp</span>
    </a>
  );
}

/**
 * Photographic backdrop for the route heroes (services, cases, contact,
 * reviews, booking). Rendered through next/image rather than a CSS
 * background so it is optimised, preloaded as the page's LCP, and carries
 * real alt text — a CSS background would be invisible to search.
 *
 * `position` sets the vertical slice the wide desktop band shows; the
 * source photographs are portrait, so the default centre would clip heads.
 * It is ignored on phones, where the band crops horizontally instead.
 */
export function HeroBackdrop({ src, alt, position = "50%" }: { src: string; alt: string; position?: string }) {
  return (
    <div className="route-hero-media" style={{ "--hero-y": position } as CSSProperties}>
      <Image src={src} alt={alt} fill sizes="100vw" preload />
    </div>
  );
}

export function SectionHeading({ eyebrow, title, accent, copy, id }: { eyebrow: string; title: string; accent?: string; copy?: string; id?: string }) {
  return <div className="section-heading" data-reveal><p className="eyebrow">{eyebrow}</p><h2 id={id}>{title}{accent && <><br /><em>{accent}</em></>}</h2>{copy && <p className="section-intro">{copy}</p>}</div>;
}

/**
 * The clinic's written detail for one treatment, rendered on that treatment's
 * own page. It used to expand inside an accordion on `/services`; it moved
 * here when the eight services got their own URLs, so this copy now lives in
 * exactly one place rather than being duplicated across a hub and eight pages.
 *
 * The blocks are direct children of `.service-detail` deliberately — the
 * stylesheet reaches them with `>`, so an extra wrapper element here would
 * silently drop the paragraph styling.
 *
 * Headings are `h2` because the page's `h1` is the treatment itself. Nothing
 * is invented: every field comes from the clinic's reviewed copy in
 * `service-details.ts`, and a field the clinic left out renders nothing.
 */
export function ServiceDetailBody({ detail }: { detail: ServiceDetail }) {
  return (
    <div className="service-detail">
      {detail.overview?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}

      {detail.recommendedWhen?.length ? (
        <>
          <h2>When it’s recommended</h2>
          {detail.recommendedWhen.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </>
      ) : null}

      {detail.whatToExpect?.length ? (
        <>
          <h2>What to expect</h2>
          {detail.whatToExpect.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </>
      ) : null}

      {detail.aftercare?.length ? (
        <>
          <h2>Aftercare</h2>
          {detail.aftercare.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </>
      ) : null}

      {detail.faqs && detail.faqs.length > 0 && (
        <>
          <h2>Common questions</h2>
          <dl className="faq-list">
            {detail.faqs.map((faq) => (
              <div key={faq.question}>
                <dt>{faq.question}</dt>
                <dd>{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </>
      )}

      {(detail.typicalVisits || detail.performedBy) && (
        <dl className="service-facts">
          {detail.typicalVisits && <div><dt>Typical visits</dt><dd>{detail.typicalVisits}</dd></div>}
          {detail.performedBy && <div><dt>Performed by</dt><dd>{detail.performedBy}</dd></div>}
        </dl>
      )}
    </div>
  );
}

/**
 * The name links to the clinician's own profile page. On the full (non-compact)
 * variant a second, explicit link is offered as well, because a name styled in
 * the display serif does not read as a link on its own.
 */
export function DoctorCard({ doctor, compact = false }: { doctor: Doctor; compact?: boolean }) {
  const profileHref = `/team/${doctor.slug}`;
  return (
    <article className={`doctor-card${compact ? " doctor-card-compact" : ""}`} data-reveal>
      <div className="doctor-photo-placeholder" aria-hidden="true"><span>{doctor.initials}</span></div>
      <div className="doctor-card-copy">
        <p className="doctor-specialty">{doctor.specialty}</p>
        <h3><Link href={profileHref}>{doctor.name}</Link></h3>
        <p className="doctor-designation">{doctor.designation}</p>
        {!compact && <p className="doctor-bio">{doctor.bio}</p>}
        {!compact && <Link className="text-link doctor-card-profile-link" href={profileHref}>View profile <span aria-hidden="true">→</span></Link>}
      </div>
    </article>
  );
}

/**
 * Placeholder while the Google Places call is in flight. It reserves close to
 * the height of the real carousel (overview card + marquee + disclosure), so
 * the section does not shove everything below it down when the reviews land.
 */
export function GoogleReviewsLoading() {
  return <div className="reviews-status reviews-loading" role="status"><span className="review-status-mark" aria-hidden="true">“</span><div><h3>Loading reviews from Google Maps…</h3><p>Connecting to the clinic’s verified listing.</p></div></div>;
}

export function Footer() {
  return (
    <footer id="contact">
      <div className="footer-brand"><Brand /><p>Modern dental care for everyone.</p></div>
      <div className="footer-details">
        <div><h2>Visit</h2><p>1st Floor, Pehchan Mall<br />G-9 Markaz, Islamabad</p></div>
        <div><h2>Contact</h2><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">WhatsApp: {CLINIC_PHONE_DISPLAY}</a><a href={`mailto:${CLINIC_EMAIL}`}>{CLINIC_EMAIL}</a><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram <span aria-hidden="true">↗</span></a></div>
        <div><h2>Clinic hours</h2><p>{CLINIC_HOURS}</p><BookingLink className="footer-book">Book an Appointment</BookingLink></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Dr Hashim &amp; Associates Dental Clinic</span><span>G-9 Markaz, Islamabad</span></div>
    </footer>
  );
}
