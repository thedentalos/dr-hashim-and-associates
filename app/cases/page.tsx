import type { Metadata } from "next";
import { BookingLink, PageFrame, SectionHeading } from "../components";
import { cases } from "../data";
import { CaseGallery } from "../ui";

export const metadata: Metadata = {
  title: "Our Cases",
  description: "View clinical before-and-after examples supplied by Dr Hashim & Associates Dental Clinic in Islamabad.",
};

export default function CasesPage() {
  return (
    <PageFrame>
      <main id="main">
        <section className="route-hero" aria-labelledby="cases-page-title">
          <p className="eyebrow">Our cases</p>
          <h1 id="cases-page-title">Individual care.<br /><em>Individual outcomes.</em></h1>
          <p>These clinical examples were supplied by the clinic. Results vary from person to person, and no image can predict an individual treatment outcome.</p>
        </section>

        <section className="section case-directory" aria-labelledby="case-gallery-title">
          <SectionHeading eyebrow="Before & after" title="Clinical work," accent="shown with care." copy="Select an image to view it at a larger size. Cosmetic and restorative examples are shown where approved images are currently available." id="case-gallery-title" />
          <CaseGallery items={cases} />
          <p className="content-note">Orthodontic examples will be added only when approved clinical photographs are supplied.</p>
        </section>

        <section className="section booking-cta" aria-labelledby="cases-booking-title">
          <div><p className="eyebrow">Your needs are individual</p><h2 id="cases-booking-title">Discuss what is<br /><em>right for you.</em></h2></div>
          <div><p>A consultation is required to assess suitability and discuss realistic expectations.</p><BookingLink>Book an Appointment</BookingLink></div>
        </section>
      </main>
    </PageFrame>
  );
}
