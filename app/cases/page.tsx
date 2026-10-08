import type { Metadata } from "next";
import { BookingLink, HeroBackdrop, PageFrame, SectionHeading } from "../components";
import { cases } from "../data";
import { CaseGallery } from "../ui";

export const metadata: Metadata = {
  title: "Our Cases",
  description: "View before-and-after examples of restorative and cosmetic dental treatment at Dr Hashim & Associates Dental Clinic, Islamabad.",
  alternates: { canonical: "/cases" },
};

export default function CasesPage() {
  return (
    <PageFrame>
      <main id="main" tabIndex={-1}>
        <section className="route-hero route-hero-photo" aria-labelledby="cases-page-title">
          <HeroBackdrop src="/media/hero-cases.webp" alt="Treatment room prepared for a patient at Dr Hashim & Associates, G-9 Markaz" position="50%" />
          <p className="eyebrow">Our cases</p>
          <h1 id="cases-page-title">Individual care.<br /><em>Individual outcomes.</em></h1>
          <p>Results vary from person to person, and no image can predict an individual treatment outcome.</p>
        </section>

        <section className="section case-directory" aria-labelledby="case-gallery-title">
          <SectionHeading eyebrow="Before & after" title="Clinical work," accent="shown with care." copy="Select an image to view it at a larger size." id="case-gallery-title" />
          <CaseGallery items={cases} />
        </section>

        <section className="section booking-cta" aria-labelledby="cases-booking-title">
          <div><p className="eyebrow">Your needs are individual</p><h2 id="cases-booking-title">Discuss what is<br /><em>right for you.</em></h2></div>
          <div><p>A consultation is required to assess suitability and discuss realistic expectations.</p><BookingLink>Book an Appointment</BookingLink></div>
        </section>
      </main>
    </PageFrame>
  );
}
