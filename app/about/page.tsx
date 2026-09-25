import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookingLink, PageFrame, SectionHeading } from "../components";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about the mission, clinic spaces, and location of Dr Hashim & Associates Dental Clinic in G-9 Markaz, Islamabad.",
};

const spaces = [
  { src: "/media/clinic2.webp", title: "Clinical assessment", copy: "A dedicated treatment setting with equipment that supports careful assessment and treatment.", alt: "Dental operating microscope and treatment chair at Dr Hashim and Associates" },
  { src: "/media/clinic3.webp", title: "Prepared treatment rooms", copy: "Organised clinical spaces prepared with comfort and professional care in mind.", alt: "Prepared dental treatment room at Dr Hashim and Associates" },
  { src: "/media/clinic4.webp", title: "A welcoming lounge", copy: "A calm waiting area where patients can settle in before an appointment.", alt: "Patient waiting lounge at Dr Hashim and Associates" },
];

export default function AboutPage() {
  return (
    <PageFrame>
      <main id="main">
        <section className="inner-hero inner-hero-about" aria-labelledby="about-title">
          <div><p className="eyebrow">About us</p><h1 id="about-title">A modern clinic.<br /><em>A considered approach.</em></h1><p>Professional dental expertise, clear guidance, and patient comfort in the heart of G-9 Markaz.</p></div>
          <div className="inner-hero-image"><Image src="/media/clinic1.webp" alt="Entrance and reception of Dr Hashim and Associates Dental Clinic" fill priority sizes="(max-width: 767px) 100vw, 44vw" /></div>
        </section>

        <section className="section mission-section" aria-labelledby="mission-title">
          <SectionHeading eyebrow="Our mission" title="Modern dental care" accent="for everyone." id="mission-title" />
          <div className="mission-copy" data-reveal><p className="large-copy">Expert care. Comfortable visits. Dentistry done right, for everyone.</p><p>Our approach begins with listening closely, explaining clearly, and helping each patient understand the options available to them.</p><p className="urdu-tagline about-urdu" lang="ur" dir="rtl">آپ کی مسکراہٹ، ہماری ذمہ داری</p></div>
        </section>

        <section className="section clinic-spaces" aria-labelledby="spaces-title">
          <SectionHeading eyebrow="Inside the clinic" title="Purposeful spaces." accent="A calmer visit." copy="Real photographs from the clinic show the spaces prepared for assessment, treatment, and waiting." id="spaces-title" />
          <div className="space-grid">{spaces.map((space, index) => <article className="space-card" key={space.src} data-reveal style={{ transitionDelay: `${index * 70}ms` }}><div className="space-photo"><Image src={space.src} alt={space.alt} fill sizes="(max-width: 767px) 88vw, 33vw" /></div><div><span>0{index + 1}</span><h3>{space.title}</h3><p>{space.copy}</p></div></article>)}</div>
        </section>

        <section className="section equipment-section" aria-labelledby="equipment-title">
          <SectionHeading eyebrow="Facilities & equipment" title="Designed to support" accent="careful dentistry." id="equipment-title" />
          <div className="equipment-grid">
            <article data-reveal><span>01</span><h3>Clinical equipment</h3><p>The clinic’s equipment, including its dental operating microscope, supports detailed assessment and treatment where appropriate.</p></article>
            <article data-reveal><span>02</span><h3>Dedicated treatment spaces</h3><p>Treatment rooms are organised for professional care while keeping the patient experience clear and comfortable.</p></article>
            <article data-reveal><span>03</span><h3>Comfort between each step</h3><p>The reception and lounge provide a welcoming place to arrive, wait, and ask questions before your appointment.</p></article>
          </div>
          <p className="content-note">Specific treatment and equipment use depends on your individual clinical needs.</p>
        </section>

        <section className="section location-section" aria-labelledby="location-title">
          <div className="location-copy"><SectionHeading eyebrow="Find us" title="Conveniently located" accent="in G-9 Markaz." id="location-title" /><div className="location-details" data-reveal><p><strong>Address</strong><span>1st Floor, Pehchan Mall, G-9 Markaz, Islamabad</span></p><p><strong>Clinic hours</strong><span>10:00 to 8:30</span></p><p><strong>WhatsApp</strong><a href="https://wa.me/923008557144" target="_blank" rel="noreferrer">0300 855 7144</a></p><div className="location-actions"><BookingLink>Book an Appointment</BookingLink><Link className="secondary-button" href="/team">Meet Our Team</Link></div></div></div>
          <div className="map-frame" data-reveal><iframe title="Map showing Dr Hashim and Associates Dental Clinic in G-9 Markaz, Islamabad" src="https://www.google.com/maps?q=1st%20Floor%2C%20Pehchan%20Mall%2C%20G-9%20Markaz%2C%20Islamabad&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
        </section>
      </main>
    </PageFrame>
  );
}
