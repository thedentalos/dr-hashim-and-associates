import type { Metadata } from "next";
import { BookingLink, DoctorCard, PageFrame, SectionHeading } from "../components";
import { doctors } from "../data";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the dental surgeons and specialists at Dr Hashim & Associates Dental Clinic in Islamabad.",
};

export default function TeamPage() {
  return (
    <PageFrame>
      <main id="main">
        <section className="inner-hero team-hero" aria-labelledby="team-page-title">
          <div><p className="eyebrow">Our team</p><h1 id="team-page-title">Different specialties.<br /><em>One thoughtful team.</em></h1><p>Meet the clinicians who bring together general, restorative, digital, surgical, and orthodontic care.</p></div>
          <div className="team-hero-note"><span aria-hidden="true">04</span><p>Clinicians represented with the credentials and specialties supplied by the practice.</p></div>
        </section>

        <section className="section team-directory" aria-labelledby="directory-title">
          <SectionHeading eyebrow="Meet the clinicians" title="Professional expertise." accent="Patient-centred care." copy="Professional photographs are intentionally shown as placeholders until the clinic supplies approved headshots." id="directory-title" />
          <div className="doctor-grid doctor-grid-full">{doctors.map((doctor) => <DoctorCard doctor={doctor} key={doctor.name} />)}</div>
        </section>

        <section className="section team-principles" aria-labelledby="principles-title">
          <SectionHeading eyebrow="How we work" title="Clear conversations." accent="Considered plans." id="principles-title" />
          <div className="principle-list">
            <article data-reveal><span>01</span><div><h3>Listen first</h3><p>Every appointment starts with your concerns, priorities, and questions.</p></div></article>
            <article data-reveal><span>02</span><div><h3>Explain clearly</h3><p>Suitable options and next steps are discussed before you decide on care.</p></div></article>
            <article data-reveal><span>03</span><div><h3>Plan around the person</h3><p>Treatment decisions depend on individual clinical needs and circumstances.</p></div></article>
          </div>
        </section>

        <section className="section booking-cta" aria-labelledby="team-booking-title">
          <div><p className="eyebrow">Your next visit</p><h2 id="team-booking-title">Start with a<br /><em>conversation.</em></h2></div>
          <div><p>Use the clinic’s online form to request an appointment. The practice will confirm the details with you.</p><BookingLink>Book an Appointment</BookingLink></div>
        </section>
      </main>
    </PageFrame>
  );
}
