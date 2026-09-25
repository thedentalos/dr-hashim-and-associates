import type { Metadata } from "next";
import { BookingLink, PageFrame, SectionHeading } from "../components";
import { CLINIC_ADDRESS, CLINIC_EMAIL, CLINIC_HOURS, GOOGLE_MAPS_URL, WHATSAPP_URL } from "../data";
import { ContactEnquiryForm } from "../ui";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Dr Hashim & Associates Dental Clinic at Pehchan Mall, G-9 Markaz, Islamabad.",
};

export default function ContactPage() {
  return (
    <PageFrame>
      <main id="main">
        <section className="route-hero" aria-labelledby="contact-page-title">
          <p className="eyebrow">Contact</p>
          <h1 id="contact-page-title">Clear directions.<br /><em>A simple way to reach us.</em></h1>
          <p>Find the clinic in G-9 Markaz, send a general enquiry, or use the online form to request an appointment.</p>
        </section>

        <section className="section contact-details-section" aria-labelledby="contact-details-title">
          <SectionHeading eyebrow="Clinic details" title="Everything you need" accent="before your visit." id="contact-details-title" />
          <div className="contact-detail-grid">
            <address><span>Address</span><strong>{CLINIC_ADDRESS}</strong><a href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer">Open in Google Maps <span aria-hidden="true">↗</span></a></address>
            <div><span>WhatsApp</span><strong>0300 855 7144</strong><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">Start a WhatsApp chat <span aria-hidden="true">↗</span></a></div>
            <div><span>Email</span><strong>{CLINIC_EMAIL}</strong><a href={`mailto:${CLINIC_EMAIL}`}>Send an email</a></div>
            <div><span>Clinic hours</span><strong>{CLINIC_HOURS}</strong><BookingLink className="text-link">Book an Appointment</BookingLink></div>
          </div>
        </section>

        <section className="section contact-enquiry-section" aria-labelledby="contact-form-title">
          <div><SectionHeading eyebrow="General enquiry" title="Send a note." accent="We’ll take it from there." copy="For appointment requests, please use the dedicated booking form. For urgent medical concerns, seek appropriate emergency care." id="contact-form-title" /></div>
          <ContactEnquiryForm />
        </section>

        <section className="section contact-map-section" aria-labelledby="contact-map-title">
          <div className="location-copy"><SectionHeading eyebrow="Find us" title="1st Floor," accent="Pehchan Mall." id="contact-map-title" /><p>{CLINIC_ADDRESS}</p><a className="secondary-button" href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer">Open in Google Maps</a></div>
          <div className="map-frame" data-reveal><iframe title="Map showing Dr Hashim and Associates Dental Clinic in G-9 Markaz, Islamabad" src="https://www.google.com/maps?q=1st%20Floor%2C%20Pehchan%20Mall%2C%20G-9%20Markaz%2C%20Islamabad&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
        </section>
      </main>
    </PageFrame>
  );
}
