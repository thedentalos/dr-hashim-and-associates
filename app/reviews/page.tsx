import type { Metadata } from "next";
import { BookingLink, PageFrame, SectionHeading } from "../components";
import { getGoogleReviews } from "../google-reviews";
import { GoogleReviewsCarousel } from "../ui";

export const metadata: Metadata = {
  title: "Patient Reviews",
  description: "Read patient reviews from the verified Google Maps listing for Dr Hashim & Associates Dental Clinic in Islamabad.",
};

export default async function ReviewsPage() {
  const reviewsData = await getGoogleReviews();

  return (
    <PageFrame>
      <main id="main">
        <section className="route-hero route-hero-tint" aria-labelledby="reviews-page-title">
          <p className="eyebrow">Patient reviews</p>
          <h1 id="reviews-page-title">Real experiences,<br /><em>shared with care.</em></h1>
          <p>Reviews below are drawn from the clinic’s verified Google Maps listing so you can read patient feedback in its original context.</p>
        </section>

        <section className="section reviews-directory" aria-labelledby="google-reviews-title">
          <SectionHeading eyebrow="Google Maps" title="Patient feedback." accent="Clearly attributed." id="google-reviews-title" />
          <GoogleReviewsCarousel reviewsData={reviewsData} />
        </section>

        <section className="section testimonial-section" aria-labelledby="video-testimonials-title">
          <SectionHeading eyebrow="Video testimonials" title="Patient stories," accent="when supplied." copy="No video testimonials have been added because approved YouTube or Vimeo links have not yet been supplied by the clinic." id="video-testimonials-title" />
          <div className="media-placeholder" role="img" aria-label="Placeholder for future approved video testimonials"><span aria-hidden="true">▶</span><p>Approved video testimonials will appear here.</p></div>
        </section>

        <section className="section booking-cta" aria-labelledby="reviews-booking-title">
          <div><p className="eyebrow">Plan your visit</p><h2 id="reviews-booking-title">Ready when<br /><em>you are.</em></h2></div>
          <div><p>Request an appointment online and the practice will confirm the details with you.</p><BookingLink>Book an Appointment</BookingLink></div>
        </section>
      </main>
    </PageFrame>
  );
}
