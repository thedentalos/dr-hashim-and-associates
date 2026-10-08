import type { Metadata } from "next";
import Link from "next/link";
import { HeroBackdrop, PageFrame, SectionHeading } from "../components";
import { careStages, CLINIC_PHONE_E164, serviceDetails, services, type ServiceDetail } from "../data";

export const metadata: Metadata = {
  title: "Dental Services in G-9 Markaz, Islamabad",
  description: "Diagnostics, root canal treatment, gum care, children’s dentistry, oral surgery, braces, cosmetic and restorative dentistry in G-9 Markaz, Islamabad.",
  alternates: { canonical: "/services" },
};

const serviceByKey = new Map(services.map((service) => [service.key, service]));

/** Every patient question the clinic supplied, across all treatments. */
const allFaqs = Object.values(serviceDetails).flatMap((detail) => detail.faqs ?? []);

/**
 * Two graphs: the clinic and its treatment catalogue, plus a FAQPage built from
 * the questions on this page. The first paragraph of each overview is used as
 * the procedure description where it exists, falling back to the short summary.
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
      name: "Dental Services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "MedicalProcedure",
          name: service.title,
          description: serviceDetails[service.key]?.overview?.[0] ?? service.copy,
        },
      })),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  },
];

function hasDetail(detail: ServiceDetail) {
  return Boolean(
    detail.overview?.length || detail.recommendedWhen?.length || detail.whatToExpect?.length ||
    detail.aftercare?.length || detail.faqs?.length,
  );
}

/** The expandable half of a service row. Renders nothing until the clinic fills it in. */
function ServiceDetailBody({ detail }: { detail: ServiceDetail }) {
  return (
    <>
      {detail.overview?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}

      {detail.recommendedWhen?.length ? (
        <>
          <h4>When it’s recommended</h4>
          {detail.recommendedWhen.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </>
      ) : null}

      {detail.whatToExpect?.length ? (
        <>
          <h4>What to expect</h4>
          {detail.whatToExpect.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </>
      ) : null}

      {detail.aftercare?.length ? (
        <>
          <h4>Aftercare</h4>
          {detail.aftercare.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </>
      ) : null}

      {detail.faqs && detail.faqs.length > 0 && (
        <>
          <h4>Common questions</h4>
          <dl className="rail-faqs">
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
        <dl className="rail-facts">
          {detail.typicalVisits && <div><dt>Typical visits</dt><dd>{detail.typicalVisits}</dd></div>}
          {detail.performedBy && <div><dt>Performed by</dt><dd>{detail.performedBy}</dd></div>}
        </dl>
      )}
    </>
  );
}

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
                    const detail = serviceDetails[key] ?? {};
                    const expandable = hasDetail(detail);

                    const head = (
                      <>
                        <span className="rail-service-label">{service.label}</span>
                        <h3 className="rail-service-title">{service.title}</h3>
                        <span className="rail-service-copy">{service.copy}</span>
                      </>
                    );

                    return (
                      <article className="rail-service" id={key} key={key}>
                        {expandable ? (
                          <details className="rail-service-details">
                            <summary className="rail-service-head">
                              {head}
                              <span className="rail-service-chevron" aria-hidden="true" />
                            </summary>
                            <div className="rail-service-body">
                              <ServiceDetailBody detail={detail} />
                            </div>
                          </details>
                        ) : (
                          <div className="rail-service-head rail-service-static">{head}</div>
                        )}
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
