import type { Metadata } from "next";
import { HeroBackdrop, PageFrame, SectionHeading } from "../components";
import { BOOKING_URL } from "../data";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description: "Request a dental appointment with Dr Hashim & Associates Dental Clinic in G-9 Markaz, Islamabad.",
  alternates: { canonical: "/book-appointment" },
};

export default function BookAppointmentPage() {
  return (
    <PageFrame>
      <main id="main" tabIndex={-1}>
        <section className="route-hero route-hero-photo booking-page-hero" aria-labelledby="booking-page-title">
          <HeroBackdrop src="/media/hero-appointment.webp" alt="Treatment room with dental chair and equipment at Dr Hashim & Associates" position="50%" />
          <p className="eyebrow">Book online</p>
          <h1 id="booking-page-title">Request your<br /><em>appointment.</em></h1>
          <p>Complete the clinic’s online form below. Your request is not confirmed until the practice contacts you with the appointment details.</p>
        </section>

        <section className="section booking-form-section" aria-labelledby="booking-form-title">
          <SectionHeading eyebrow="Appointment form" title="A simple first step." accent="We’ll confirm the rest." id="booking-form-title" />
          <div className="booking-embed" data-reveal>
            <iframe title="Dr Hashim and Associates online appointment request form" src={BOOKING_URL} loading="lazy" />
          </div>
          <div className="booking-fallback"><a className="button" href={BOOKING_URL} target="_blank" rel="noreferrer">Open Booking Form</a></div>
        </section>
      </main>
    </PageFrame>
  );
}
