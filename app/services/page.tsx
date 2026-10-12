import type { Metadata } from "next";
import Link from "next/link";
import { HeroBackdrop, PageFrame, SectionHeading } from "../components";
import { careStages, CLINIC_PHONE_E164, services } from "../data";

export const metadata: Metadata = {
  title: "Dental Services in G-9 Markaz, Islamabad",
  description: "Diagnostics, root canal treatment, gum care, children’s dentistry, oral surgery, braces, cosmetic and restorative dentistry in G-9 Markaz, Islamabad.",
  alternates: { canonical: "/services" },
};

const serviceByKey = new Map(services.map((service) => [service.key, service]));

/**
 * The clinic, and its treatment catalogue hanging off it. Every catalogue
 * entry names the treatment's own page, which is where the matching
 * `MedicalProcedure` is defined — so a crawler reads one procedure with one
 * page, rather than two descriptions of the same thing.
 *
 * The `FAQPage` that used to sit here has moved to those pages. Each service's
 * questions belong on the page about that treatment; leaving a pooled copy
 * here as well would publish the same answers twice, and the two would compete.
 */
const siteUrl = process.env.SITE_URL?.trim().replace(/\/$/, "");

const servicesStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Dentist",
    // Same node as the homepage, so the treatment catalogue attaches to the
    // clinic entity instead of describing a second, unrelated business.
    "@id": siteUrl ? `${siteUrl}/#dentist` : undefined,
    name: "Dr Hashim & Associates Dental Clinic",
    url: siteUrl,
    telephone: CLINIC_PHONE_E164,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      "@id": siteUrl ? `${siteUrl}/services#catalog` : undefined,
      name: "Dental Services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "MedicalProcedure",
          "@id": siteUrl ? `${siteUrl}/services/${service.slug}` : undefined,
          name: service.title,
          description: service.copy,
        },
      })),
    },
  },
];

/**
 * The hub is a directory: it names each treatment and links to the page that
 * covers it. The detail itself lives on those pages and nowhere else, so the
 * hub and a spoke never publish the same paragraph.
 */
export default function ServicesPage() {
  return (
    <PageFrame>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesStructuredData).replace(/</g, "\\u003c") }} />
      <main id="main" tabIndex={-1}>
        <section className="route-hero route-hero-photo" aria-labelledby="services-page-title">
          <HeroBackdrop src="/media/hero-services.webp" alt="Dentist treating a patient in a treatment room at Dr Hashim & Associates, G-9 Markaz" position="50%" />
          <p className="eyebrow">Our services</p>
          <h1 id="services-page-title">Clear guidance.<br /><em>Care for every stage.</em></h1>
          <p>Explore the clinic’s areas of care in straightforward language. Your dentist will confirm which options are appropriate after an individual assessment.</p>
        </section>

        <section className="section service-directory" aria-labelledby="service-directory-title">
          <SectionHeading eyebrow="Areas of care" title="Eight services." accent="One considered approach." copy="Every treatment begins with a conversation about your needs, available options, and suitable next steps. Here is the path most people follow." id="service-directory-title" />

          <div className="treatment-rail">
            {careStages.map((stage) => (
              <section className="rail-stage" key={stage.key} aria-labelledby={`stage-${stage.key}`}>
                <h2 className="rail-stage-name" id={`stage-${stage.key}`}>
                  <span className="rail-stage-dot" aria-hidden="true">{stage.index}</span>
                  {stage.name}
                </h2>
                <p className="rail-stage-sub">{stage.title}</p>

                <div className="rail-services">
                  {stage.services.map((key) => {
                    const service = serviceByKey.get(key);
                    if (!service) return null;

                    return (
                      /* `id={key}` is the row's own anchor, and the homepage
                         smile journey and any older external link still use it
                         (`/services#endodontics`). It deliberately survives the
                         move to per-treatment pages so those links keep landing
                         on the right row. `scroll-margin-top` in the stylesheet
                         keeps the sticky header off it. */
                      <article className="rail-service" id={key} key={key}>
                        <div className="rail-service-head">
                          <span className="rail-service-label">{service.label}</span>
                          <h3 className="rail-service-title">
                            <Link href={`/services/${service.slug}`}>{service.title}</Link>
                          </h3>
                          <span className="rail-service-copy">{service.copy}</span>
                        </div>
                        <Link className="rail-service-book" href="/book-appointment">
                          Book <span aria-hidden="true">&rarr;</span>
                        </Link>
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="section booking-cta" aria-labelledby="services-booking-title">
          <div><p className="eyebrow">Discuss your care</p><h2 id="services-booking-title">Start with an<br /><em>assessment.</em></h2></div>
          <div><p>Treatment availability and suitability are confirmed during your consultation.</p><Link className="button" href="/book-appointment">Book an Appointment</Link></div>
        </section>
      </main>
    </PageFrame>
  );
}
