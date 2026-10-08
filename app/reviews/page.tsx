import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingLink, GoogleReviewsLoading, HeroBackdrop, PageFrame, SectionHeading } from "../components";
import { getGoogleReviews } from "../google-reviews";
import { GoogleReviewsCarousel } from "../ui";

export const metadata: Metadata = {
  title: "Patient Reviews",
  description: "Read patient reviews from the verified Google Maps listing for Dr Hashim & Associates Dental Clinic in Islamabad.",
  alternates: { canonical: "/reviews" },
};

/**
 * The Places call is awaited inside `ReviewsContent`, not in the page itself.
 * The page used to await it directly with no Suspense boundary, which meant the
 * whole document — heading, hero, footer — waited on Google, for up to the
 * 7-second timeout. The shell now streams immediately and the reviews fill in.
 */
async function ReviewsContent() {
  const reviewsData = await getGoogleReviews();
  return <GoogleReviewsCarousel reviewsData={reviewsData} />;
}

export default function ReviewsPage() {
  return (
    <PageFrame>
      <main id="main" tabIndex={-1}>
        <section className="route-hero route-hero-photo" aria-labelledby="reviews-page-title">
          <HeroBackdrop src="/media/hero-reviews.webp" alt="Clinicians at the reception of Dr Hashim & Associates Dental Clinic, G-9 Markaz" position="35%" />
          <p className="eyebrow">Patient reviews</p>
          <h1 id="reviews-page-title">Real experiences,<br /><em>shared with care.</em></h1>
          <p>Reviews below are drawn from the clinic’s verified Google Maps listing so you can read patient feedback in its original context.</p>
        </section>

        <section className="section reviews-directory" aria-labelledby="google-reviews-title">
          <SectionHeading eyebrow="Google Maps" title="Patient feedback." accent="Clearly attributed." id="google-reviews-title" />
          <Suspense fallback={<GoogleReviewsLoading />}><ReviewsContent /></Suspense>
        </section>

        <section className="section booking-cta" aria-labelledby="reviews-booking-title">
          <div><p className="eyebrow">Plan your visit</p><h2 id="reviews-booking-title">Ready when<br /><em>you are.</em></h2></div>
          <div><p>Request an appointment online and the practice will confirm the details with you.</p><BookingLink>Book an Appointment</BookingLink></div>
        </section>
      </main>
    </PageFrame>
  );
}
