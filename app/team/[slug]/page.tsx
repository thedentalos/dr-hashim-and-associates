import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingLink, PageFrame, SectionHeading } from "../../components";
import { CLINIC_ADDRESS, CLINIC_PHONE_E164, doctors, getCasesForDoctor, getDoctor, GOOGLE_MAPS_URL } from "../../data";

const siteUrl = process.env.SITE_URL?.trim().replace(/\/$/, "");

/**
 * Only the four clinicians in `data.ts` have profiles. `dynamicParams = false`
 * means anything else 404s at the router rather than rendering a page whose
 * only content is a `notFound()`.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return doctors.map((doctor) => ({ slug: doctor.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doctor = getDoctor(slug);
  if (!doctor) return {};

  // Phrased with the designation as an appositive so it reads correctly for
  // every clinician: "is dental surgeon" / "is orthodontist" would need an
  // article that differs per designation.
  const description = `${doctor.name} — ${doctor.designation} at Dr Hashim & Associates Dental Clinic in G-9 Markaz, Islamabad, with a focus on ${doctor.specialty}.`;
  const url = siteUrl ? `${siteUrl}/team/${doctor.slug}` : undefined;

  return {
    title: `${doctor.name} — ${doctor.specialty}`,
    description,
    alternates: { canonical: `/team/${doctor.slug}` },
    openGraph: { title: `${doctor.name} | Dr Hashim & Associates`, description, type: "profile", url },
  };
}

export default async function DoctorProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doctor = getDoctor(slug);
  if (!doctor) notFound();

  const performedCases = getCasesForDoctor(doctor.slug);
  const colleagues = doctors.filter((entry) => entry.slug !== doctor.slug);
  const profileUrl = siteUrl ? `${siteUrl}/team/${doctor.slug}` : undefined;

  /**
   * schema.org's `Physician` is an Organization subtype, not a Person, so the
   * clinician is marked up as a Person who works for the clinic's Dentist
   * entity. `knowsAbout` carries the specialty, which `medicalSpecialty` would
   * reject — it only accepts the MedicalSpecialty enumeration.
   *
   * `worksFor` repeats the clinic's own properties as well as its `@id`, so the
   * node stands on its own if this page is crawled first, and still merges with
   * the homepage entity once both are seen.
   */
  const personStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: doctor.name,
    jobTitle: doctor.designation,
    description: doctor.bio,
    knowsAbout: doctor.specialty,
    url: profileUrl,
    mainEntityOfPage: profileUrl,
    worksFor: {
      "@type": "Dentist",
      "@id": siteUrl ? `${siteUrl}/#dentist` : undefined,
      name: "Dr Hashim & Associates Dental Clinic",
      url: siteUrl,
      telephone: CLINIC_PHONE_E164,
      address: {
        "@type": "PostalAddress",
        streetAddress: "1st Floor, Pehchan Mall, G-9 Markaz",
        addressLocality: "Islamabad",
        addressRegion: "Islamabad Capital Territory",
        addressCountry: "PK",
      },
    },
  };

  return (
    <PageFrame>
      <main id="main" tabIndex={-1}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData).replace(/</g, "\\u003c") }} />

        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/team">Our Team</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{doctor.name}</span>
        </nav>

        <section className="inner-hero team-hero doctor-hero" aria-labelledby="doctor-page-title">
          <div><p className="eyebrow">{doctor.designation}</p><h1 id="doctor-page-title">{doctor.name}</h1><p>{doctor.specialty} at Dr Hashim &amp; Associates Dental Clinic, G-9 Markaz, Islamabad.</p></div>
          <div className="doctor-hero-monogram" aria-hidden="true">{doctor.initials}</div>
        </section>

        <section className="section doctor-profile" aria-labelledby="doctor-about-title">
          <div className="doctor-profile-copy" data-reveal>
            <p className="eyebrow">About</p>
            <h2 id="doctor-about-title">Professional background</h2>
            <p className="large-copy">{doctor.bio}</p>
            <p>{doctor.name} sees patients at {CLINIC_ADDRESS}. Availability of any specific treatment depends on your individual clinical needs, which are assessed at consultation.</p>
            <div className="doctor-profile-actions">
              <BookingLink>Book an Appointment</BookingLink>
              <a className="secondary-button" href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer">Open in Google Maps</a>
            </div>
          </div>
        </section>

        {performedCases.length > 0 && (
          <section className="section doctor-cases" aria-labelledby="doctor-cases-title">
            <SectionHeading
              eyebrow="Clinical examples"
              title="Before &amp; after work"
              accent={`by ${doctor.name}.`}
              copy="Results vary from person to person, and no image can predict an individual treatment outcome."
              id="doctor-cases-title"
            />
            <div className="case-grid">
              {performedCases.map((item) => (
                <Link className="case-card case-card-open" href="/cases" key={item.src} data-reveal>
                  <span className="case-image"><Image src={item.src} alt={item.alt} fill sizes="(max-width: 767px) 88vw, (max-width: 1023px) 44vw, 28vw" /></span>
                  <span className="case-preview-caption">{item.label}<small>Before &amp; after</small></span>
                </Link>
              ))}
            </div>
            <p className="content-note"><Link className="text-link" href="/cases">See all clinical examples <span aria-hidden="true">→</span></Link></p>
          </section>
        )}

        <section className="section doctor-colleagues" aria-labelledby="doctor-colleagues-title">
          <SectionHeading eyebrow="The team" title="Other clinicians" accent="at the practice." id="doctor-colleagues-title" />
          <ul className="colleague-list">
            {colleagues.map((colleague) => (
              <li key={colleague.slug}>
                <Link href={`/team/${colleague.slug}`}>
                  <span className="colleague-name">{colleague.name}</span>
                  <span className="colleague-role">{colleague.designation} · {colleague.specialty}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="content-note"><Link className="text-link" href="/team">Back to all team profiles <span aria-hidden="true">→</span></Link></p>
        </section>

        <section className="section booking-cta" aria-labelledby="doctor-booking-title">
          <div><p className="eyebrow">Your next visit</p><h2 id="doctor-booking-title">Book with<br /><em>{doctor.name}.</em></h2></div>
          <div><p>Use the clinic’s online form to request an appointment. The practice will confirm the details with you.</p><BookingLink>Book an Appointment</BookingLink></div>
        </section>
      </main>
    </PageFrame>
  );
}
