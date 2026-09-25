import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { BookingLink, DoctorCard, PageFrame, SectionHeading } from "./components";
import { cases, CLINIC_ADDRESS, doctors, GOOGLE_MAPS_URL } from "./data";
import { getGoogleReviews } from "./google-reviews";
import { SmileJourney } from "./smile-journey";
import { GoogleReviewsCarousel, PracticeCarousel } from "./ui";

const siteUrl = process.env.SITE_URL?.trim().replace(/\/$/, "");

export const metadata: Metadata = {
  title: "Modern Dental Care in G-9 Markaz, Islamabad",
  description: "Visit Dr Hashim & Associates Dental Clinic in G-9 Markaz, Islamabad for patient-focused general, restorative, surgical, orthodontic, and cosmetic dental care.",
  robots: { index: true, follow: true },
  alternates: siteUrl ? { canonical: siteUrl } : undefined,
  openGraph: {
    title: "Dr Hashim & Associates Dental Clinic",
    description: "Modern dental care for everyone in G-9 Markaz, Islamabad.",
    type: "website",
    locale: "en_PK",
    siteName: "Dr Hashim & Associates Dental Clinic",
    url: siteUrl,
  },
};

const clinicStructuredData = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: "Dr Hashim & Associates Dental Clinic",
  description: "Modern dental care for everyone in G-9 Markaz, Islamabad.",
  slogan: "Modern dental care for everyone",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1st Floor, Pehchan Mall, G-9 Markaz",
    addressLocality: "Islamabad",
    addressCountry: "PK",
  },
  areaServed: {
    "@type": "City",
    name: "Islamabad",
  },
  hasMap: GOOGLE_MAPS_URL,
};

async function GoogleReviewsContent() {
  const reviewsData = await getGoogleReviews();
  return <GoogleReviewsCarousel reviewsData={reviewsData} />;
}

function GoogleReviewsLoading() {
  return <div className="reviews-status reviews-loading" role="status"><span className="review-status-mark" aria-hidden="true">“</span><div><h3>Loading reviews from Google Maps…</h3><p>Connecting to the clinic’s verified listing.</p></div></div>;
}

const reasons = [
  { number: "01", title: "Experienced team", copy: "Four clinicians covering general, restorative, digital, surgical, and orthodontic care." },
  { number: "02", title: "Modern equipment", copy: "Purposeful clinical equipment supports careful assessment and treatment." },
  { number: "03", title: "Gentle care", copy: "Clear explanations, room for questions, and a pace that keeps your comfort in focus." },
  { number: "04", title: "Convenient location", copy: "Find us on the 1st Floor of Pehchan Mall in G-9 Markaz, Islamabad." },
];

export default function Home() {
  return (
    <PageFrame>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicStructuredData).replace(/</g, "\\u003c") }} />
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow"><span className="small-line" />Dr. Hashim &amp; Associates Dental Clinic</p>
            <h1 className="hero-h1" id="hero-title">Modern dental care<br /><em>for everyone.</em></h1>
            <p className="hero-description hero-subhead">Expert care. Comfortable visits.<br />Dentistry done right, for everyone.</p>
            <p className="urdu-tagline" lang="ur" dir="rtl">آپ کی مسکراہٹ، ہماری ذمہ داری</p>
            <div className="hero-actions hero-ctas"><a className="button" href="#services">Explore Our Care</a><BookingLink className="secondary-button">Book an Appointment</BookingLink></div>
            <a className="hero-address" href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>
              <span><small>Visit the clinic</small>{CLINIC_ADDRESS}</span>
            </a>
          </div>
          <PracticeCarousel />
        </section>

        <div className="values-band" aria-label="Our values"><span>Expert care</span><i aria-hidden="true">•</i><span>Comfortable visits</span><i aria-hidden="true">•</i><span>Clear guidance</span><i aria-hidden="true">•</i><span>Care for everyone</span></div>

        <section className="section intro-section" aria-labelledby="intro-title">
          <SectionHeading eyebrow="Our mission" title="Care that begins" accent="with understanding." id="intro-title" />
          <div className="intro-copy" data-reveal><p className="large-copy">At Dr. Hashim &amp; Associates, modern dentistry starts with listening.</p><p>We explain your options clearly, make room for questions, and keep your comfort central to every conversation about care.</p><Link className="text-link" href="/about">Learn about the clinic <span aria-hidden="true">→</span></Link></div>
        </section>

        <section id="services" className="section services" aria-labelledby="services-title">
          <SectionHeading eyebrow="Our services" title="Clear care for" accent="every stage." copy="Explore the clinic’s areas of care as one connected path. Treatment availability and suitability are confirmed at your consultation." id="services-title" />
          <SmileJourney />
          <p className="journey-foot" data-reveal><Link className="text-link" href="/services">View all services and details <span aria-hidden="true">→</span></Link></p>
        </section>

        <section className="section why-section" aria-labelledby="why-title">
          <SectionHeading eyebrow="Why choose us" title="Professional care." accent="A human approach." id="why-title" />
          <div className="reason-grid">{reasons.map((reason, index) => <article key={reason.title} data-reveal style={{ transitionDelay: `${index * 70}ms` }}><span>{reason.number}</span><h3>{reason.title}</h3><p>{reason.copy}</p></article>)}</div>
        </section>

        <section className="section team-preview" aria-labelledby="team-title">
          <div className="split-heading"><SectionHeading eyebrow="Our team" title="Specialists who" accent="listen first." id="team-title" /><div data-reveal><p>Meet the clinicians behind your care. Professional photography will be added when supplied.</p><Link className="text-link" href="/team">View full team profiles <span aria-hidden="true">→</span></Link></div></div>
          <div className="doctor-grid doctor-grid-preview">{doctors.map((doctor) => <DoctorCard doctor={doctor} compact key={doctor.name} />)}</div>
        </section>

        <section id="cases" className="section cases-preview" aria-labelledby="cases-title">
          <SectionHeading eyebrow="Our cases" title="Individual care." accent="Individual outcomes." copy="Examples supplied by the clinic. Results vary by patient, and consultation is required to discuss suitability and expected outcomes." id="cases-title" />
          <div className="case-grid">{cases.map((item) => <Link className="case-card" href="/cases" key={item.src} data-reveal><div><Image src={item.src} alt={item.alt} fill sizes="(max-width: 767px) 88vw, 33vw" /></div><span className="case-preview-caption">{item.label}<small>Before &amp; after</small></span></Link>)}</div>
        </section>

        <section id="reviews" className="section reviews-section" aria-labelledby="reviews-title">
          <SectionHeading eyebrow="Patient reviews" title="Real experiences," accent="shared with care." id="reviews-title" />
          <Suspense fallback={<GoogleReviewsLoading />}><GoogleReviewsContent /></Suspense>
        </section>

        <section className="section booking-cta" aria-labelledby="booking-title">
          <div><p className="eyebrow">Book online</p><h2 id="booking-title">Ready when<br /><em>you are.</em></h2></div>
          <div><p>Use the clinic’s online form to request your appointment. The practice will confirm the details with you.</p><BookingLink>Book an Appointment</BookingLink></div>
        </section>

        <section id="location" className="section location-section home-location-section" aria-labelledby="home-location-title">
          <div className="location-copy">
            <SectionHeading eyebrow="Find us" title="Your clinic in" accent="G-9 Markaz." id="home-location-title" />
            <div className="location-details" data-reveal>
              <address><strong>Address</strong><span>{CLINIC_ADDRESS}</span></address>
              <p><strong>Clinic hours</strong><span>10:00 to 8:30</span></p>
              <div className="location-actions"><a className="secondary-button" href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer">Open in Google Maps</a><BookingLink>Book an Appointment</BookingLink></div>
            </div>
          </div>
          <div className="map-frame" data-reveal><iframe title="Map showing Dr Hashim and Associates Dental Clinic in G-9 Markaz, Islamabad" src="https://www.google.com/maps?q=1st%20Floor%2C%20Pehchan%20Mall%2C%20G-9%20Markaz%2C%20Islamabad&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
        </section>
      </main>
    </PageFrame>
  );
}
