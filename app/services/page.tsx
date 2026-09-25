import type { Metadata } from "next";
import { BookingLink, PageFrame, SectionHeading, ServiceIcon } from "../components";
import { services } from "../data";

export const metadata: Metadata = {
  title: "Dental Services",
  description: "Explore diagnostic, root canal, gum, pediatric, surgical, orthodontic, cosmetic, and restorative dental care at Dr Hashim & Associates in Islamabad.",
};

export default function ServicesPage() {
  return (
    <PageFrame>
      <main id="main">
        <section className="route-hero route-hero-tint" aria-labelledby="services-page-title">
          <p className="eyebrow">Our services</p>
          <h1 id="services-page-title">Clear guidance.<br /><em>Care for every stage.</em></h1>
          <p>Explore the clinic’s areas of care in straightforward language. Your dentist will confirm which options are appropriate after an individual assessment.</p>
        </section>

        <section className="section service-directory" aria-labelledby="service-directory-title">
          <SectionHeading eyebrow="Areas of care" title="Eight services." accent="One considered approach." copy="Every treatment begins with a conversation about your needs, available options, and suitable next steps." id="service-directory-title" />
          <div className="service-directory-list">
            {services.map((service, index) => (
              <article id={service.key} className="service-detail-card" key={service.key} data-reveal>
                <div className="service-detail-number"><ServiceIcon index={index} /><span>0{index + 1}</span></div>
                <div><p className="card-label">{service.label}</p><h2>{service.title}</h2><p>{service.copy}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="section booking-cta" aria-labelledby="services-booking-title">
          <div><p className="eyebrow">Discuss your care</p><h2 id="services-booking-title">Start with an<br /><em>assessment.</em></h2></div>
          <div><p>Treatment availability and suitability are confirmed during your consultation.</p><BookingLink>Book an Appointment</BookingLink></div>
        </section>
      </main>
    </PageFrame>
  );
}
