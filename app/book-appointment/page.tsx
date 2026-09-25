import type { Metadata } from "next";
import { PageFrame, SectionHeading } from "../components";
import { BOOKING_URL } from "../data";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description: "Request a dental appointment with Dr Hashim & Associates Dental Clinic in G-9 Markaz, Islamabad.",
};

export default function BookAppointmentPage() {
  return (
    <PageFrame>
      <main id="main">
        <section className="route-hero route-hero-tint booking-page-hero" aria-labelledby="booking-page-title">
          <p className="eyebrow">Book online</p>
          <h1 id="booking-page-title">Request your<br /><em>appointment.</em></h1>
          <p>Complete the clinic’s online form below. Your request is not confirmed until the practice contacts you with the appointment details.</p>
        </section>

        <section className="section booking-form-section" aria-labelledby="booking-form-title">
          <SectionHeading eyebrow="Appointment form" title="A simple first step." accent="We’ll confirm the rest." copy="The form is provided by the clinic and opens securely through Google Apps Script." id="booking-form-title" />
          <div className="booking-embed" data-reveal>
            <iframe title="Dr Hashim and Associates online appointment request form" src={BOOKING_URL} loading="eager" />
          </div>
          <div className="booking-fallback"><p>If the form does not display correctly on your device, open it in a new tab.</p><a className="button" href={BOOKING_URL} target="_blank" rel="noreferrer">Open Booking Form</a></div>
        </section>
      </main>
    </PageFrame>
  );
}
