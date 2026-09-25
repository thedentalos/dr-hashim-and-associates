import { unstable_rethrow } from "next/navigation";

export type GoogleReview = {
  id: string;
  author: string;
  authorUri: string | null;
  authorPhotoUri: string | null;
  rating: number;
  text: string;
  relativeTime: string | null;
  publishedAt: string | null;
  reviewUri: string | null;
  reportUri: string | null;
  translated: boolean;
};

export type GoogleReviewsData = {
  configured: boolean;
  error?: string;
  placeName?: string;
  rating?: number | null;
  userRatingCount?: number | null;
  googleMapsUri?: string | null;
  providers?: Array<{ name: string; uri: string | null }>;
  reviews: GoogleReview[];
};

type LocalizedText = {
  text?: string;
  languageCode?: string;
};

type GooglePlaceReview = {
  name?: string;
  relativePublishTimeDescription?: string;
  text?: LocalizedText;
  originalText?: LocalizedText;
  rating?: number;
  publishTime?: string;
  flagContentUri?: string;
  googleMapsUri?: string;
  authorAttribution?: {
    displayName?: string;
    uri?: string;
    photoUri?: string;
  };
};

type GooglePlaceResponse = {
  displayName?: LocalizedText;
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  googleMapsLinks?: {
    placeUri?: string;
    reviewsUri?: string;
  };
  attributions?: Array<{ provider?: string; providerUri?: string }>;
  reviews?: GooglePlaceReview[];
};

const clinicPlaceId = "ChIJ8zBMenhKz2cRBnRXb0-JHtI";

export async function getGoogleReviews(): Promise<GoogleReviewsData> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACES_PLACE_ID || clinicPlaceId;

  if (!apiKey) return { configured: false, reviews: [] };

  const endpoint = new URL(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`);
  endpoint.searchParams.set("languageCode", "en");
  endpoint.searchParams.set("regionCode", "PK");

  try {
    const response = await fetch(endpoint, {
      cache: "no-store",
      signal: AbortSignal.timeout(7000),
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "displayName,rating,userRatingCount,googleMapsUri,googleMapsLinks,attributions,reviews",
      },
    });

    if (!response.ok) {
      console.error(`Google Places request failed with status ${response.status}.`);
      return {
        configured: true,
        error: "Google reviews are temporarily unavailable.",
        reviews: [],
      };
    }

    const place = (await response.json()) as GooglePlaceResponse;
    const placeMapsUri = place.googleMapsLinks?.reviewsUri
      || place.googleMapsLinks?.placeUri
      || place.googleMapsUri
      || null;
    const reviews = (place.reviews ?? [])
      .filter((review) => review.text?.text && typeof review.rating === "number")
      .map((review, index) => ({
        id: review.name ?? `${review.publishTime ?? "review"}-${index}`,
        author: review.authorAttribution?.displayName ?? "Google Maps reviewer",
        authorUri: review.authorAttribution?.uri ?? null,
        authorPhotoUri: review.authorAttribution?.photoUri ?? null,
        rating: review.rating as number,
        text: review.text?.text ?? "",
        relativeTime: review.relativePublishTimeDescription ?? null,
        publishedAt: review.publishTime ?? null,
        reviewUri: review.googleMapsUri ?? placeMapsUri,
        reportUri: review.flagContentUri ?? null,
        translated: Boolean(
          review.originalText?.text && review.originalText.text !== review.text?.text,
        ),
      }));

    return {
      configured: true,
      placeName: place.displayName?.text ?? "Dr Hashim & Associates Dental Clinic",
      rating: place.rating ?? null,
      userRatingCount: place.userRatingCount ?? null,
      googleMapsUri: placeMapsUri,
      providers: (place.attributions ?? []).map((attribution) => ({
        name: attribution.provider ?? "",
        uri: attribution.providerUri ?? null,
      })),
      reviews,
    };
  } catch (error) {
    unstable_rethrow(error);
    console.error("Google Places request failed.", error);
    return {
      configured: true,
      error: "Google reviews are temporarily unavailable.",
      reviews: [],
    };
  }
}
