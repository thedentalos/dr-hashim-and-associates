import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingLink, Breadcrumbs, HeroBackdrop, PageFrame, SectionHeading, ServiceDetailBody } from "../../components";
import { CLINIC_PHONE_E164, getService, serviceDetails, services } from "../../data";

const siteUrl = process.env.SITE_URL?.trim().replace(/\/$/, "");

/**
 * Only the eight treatments in `data.ts` have pages. `dynamicParams = false`
 * means any other slug 404s at the router rather than rendering a page whose
 * only content would be a `notFound()`.
 *
 * The in-page guard stays as well. The route setting is enforced at build and
 * at the route level; `notFound()` is what covers a dev server, where an
 * unknown slug still reaches the component.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  const url = siteUrl ? `${siteUrl}/services/${service.slug}` : undefined;

  // `seoTitle` carries no clinic name — the root layout applies the
  // `%s | Dr Hashim & Associates` template to whatever is returned here.
  return {
    title: service.seoTitle,
    description: service.seoDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title: `${service.title} | Dr Hashim & Associates`, description: service.seoDescription, type: "website", url },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  // Keyed by `key`, not `slug` — the two differ on purpose. See `data.ts`.
  const detail = serviceDetails[service.key] ?? {};
  const siblings = services.filter((entry) => entry.key !== service.key);
  const url = siteUrl ? `${siteUrl}/services/${service.slug}` : undefined;

  /**
   * Two nodes. The procedure points at the clinic entity the homepage defines
   * and at the treatment catalogue the hub describes, so a crawler reads one
   * clinic, one catalogue and eight procedures rather than eight unrelated
   * pages. Its `@id` is this page's URL, which is what the hub's catalogue
   * entry references.
   *
   * `BreadcrumbList` is absent here because `Breadcrumbs` emits it alongside
   * the visible trail.
   *
   * Only descriptive properties. `MedicalProcedure` also accepts clinical
   * fields such as `preparation` and `howPerformed`; DESIGN.md §16 keeps those
   * out, and search engines have no use for them.
   */
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "MedicalProcedure",
      "@id": url ? `${url}#procedure` : undefined,
      name: service.title,
      description: detail.overview?.[0] ?? service.copy,
      url,
      mainEntityOfPage: url,
      provider: {
        "@type": "Dentist",
        "@id": siteUrl ? `${siteUrl}/#dentist` : undefined,
        name: "Dr Hashim & Associates Dental Clinic",
        url: siteUrl,
        telephone: CLINIC_PHONE_E164,
      },
      isPartOf: {
        "@type": "OfferCatalog",
        "@id": siteUrl ? `${siteUrl}/services#catalog` : undefined,
      },
    },
    ...(detail.faqs?.length
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: detail.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          },
        ]
      : []),
  ];

  return (
    <PageFrame>
      <main id="main" tabIndex={-1}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />

        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: service.title }]} />

        <section className="route-hero route-hero-photo" aria-labelledby="service-page-title">
          <HeroBackdrop src="/media/hero-services.webp" alt="Dentist treating a patient in a treatment room at Dr Hashim & Associates, G-9 Markaz" position="50%" />
          <p className="eyebrow">{service.label}</p>
          <h1 id="service-page-title">{service.title}</h1>
          <p>{service.copy}</p>
        </section>

        <section className="section" aria-labelledby="service-detail-title">
          <h2 id="service-detail-title" className="sr-only">{service.title} — treatment details</h2>
          <ServiceDetailBody detail={detail} />
        </section>

        <section className="section service-siblings" aria-labelledby="service-siblings-title">
          <SectionHeading eyebrow="Related care" title="Other services" accent="at the clinic." id="service-siblings-title" />
          <ul className="service-sibling-list">
            {siblings.map((entry) => (
              <li key={entry.key}>
                <Link href={`/services/${entry.slug}`}>
                  <span className="service-sibling-name">{entry.title}</span>
                  <span className="service-sibling-copy">{entry.label} · {entry.copy}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="content-note"><Link className="text-link" href="/services">All services <span aria-hidden="true">→</span></Link></p>
        </section>

        <section className="section booking-cta" aria-labelledby="service-booking-title">
          <div><p className="eyebrow">Discuss your care</p><h2 id="service-booking-title">Start with an<br /><em>assessment.</em></h2></div>
          <div><p>Treatment availability and suitability are confirmed during your consultation.</p><BookingLink>Book an Appointment</BookingLink></div>
        </section>
      </main>
    </PageFrame>
  );
}
