export const BOOKING_URL =
  "https://script.google.com/macros/s/AKfycbzTJIK9MVlZAKcQQrxgBU9RPxQkbA-6VcU5UtyVtO2gibmA_Cgs8kJg30BqIQG7kvGcMQ/exec";

export const WHATSAPP_URL = "https://wa.me/923008557144";

export const CLINIC_ADDRESS = "1st Floor, Pehchan Mall, G-9 Markaz, Islamabad";

/** Same number as the WhatsApp line. Kept in both forms so the structured data
 *  can carry E.164 while the page shows it the way the clinic writes it. */
export const CLINIC_PHONE_DISPLAY = "0300 855 7144";
export const CLINIC_PHONE_E164 = "+923008557144";

export const CLINIC_EMAIL = "drhahsimandassociates@gmail.com";

export const CLINIC_HOURS = "10:00 AM to 8:30 PM";

/** The same hours, in the 24-hour form schema.org expects. */
export const CLINIC_OPENS = "10:00";
export const CLINIC_CLOSES = "20:30";

export const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Dr%20Hashim%20and%20Associates%20Dental%20Clinic&query_place_id=ChIJ8zBMenhKz2cRBnRXb0-JHtI";

/**
 * `key` is the internal join key — `careStages` groups by it, `serviceDetails`
 * is keyed by it, and it is the anchor id each row carries on `/services`.
 *
 * `slug` is the public URL segment at `/services/<slug>`, and is deliberately
 * not the same string: the keys are clinical jargon ("endodontics") and the
 * slugs are what patients actually type. Changing a slug changes a live URL
 * and needs a redirect, so they are kept as separate fields rather than
 * renaming the keys and dragging every join along with them.
 *
 * `seoTitle` carries no clinic name — `app/layout.tsx` applies the
 * `%s | Dr Hashim & Associates` template. Both SEO strings are derived from
 * the copy in `service-details.ts` and make no claim that copy doesn't.
 */
export const services = [
  {
    key: "diagnostics",
    slug: "dental-check-up",
    seoTitle: "Dental Check-Up and X-Rays in G-9 Markaz, Islamabad",
    seoDescription: "A full exam, X-rays and screening for cavities, gum disease and oral cancer, with a clear plan and priorities before you leave.",
    title: "Diagnostics",
    label: "Understanding your needs",
    copy: "A careful assessment to understand your oral health and discuss suitable next steps.",
  },
  {
    key: "endodontics",
    slug: "root-canal-treatment",
    seoTitle: "Root Canal Treatment in G-9 Markaz, Islamabad",
    seoDescription: "Root canal treatment removes infected tissue from inside a tooth and seals it, so you can keep your natural tooth. Usually 60–90 minutes per visit.",
    title: "Endodontics",
    label: "Root canal care",
    copy: "Care focused on the inside of a tooth when root canal treatment is appropriate.",
  },
  {
    key: "periodontics",
    slug: "gum-treatment",
    seoTitle: "Gum Treatment in G-9 Markaz, Islamabad",
    seoDescription: "Assessment and treatment for bleeding, swollen or receding gums, including scaling and root planing below the gumline.",
    title: "Periodontics",
    label: "Gum treatment",
    copy: "Assessment and care for the gums and the tissues that support your teeth.",
  },
  {
    key: "pediatric",
    slug: "childrens-dentistry",
    seoTitle: "Children’s Dentistry in G-9 Markaz, Islamabad",
    seoDescription: "Gentle dental care for babies, children and teens, from the first tooth onward, with clear guidance for parents on brushing and diet.",
    title: "Pediatric Dentistry",
    label: "Care for children",
    copy: "Age-appropriate dental visits with clear explanations and a gentle pace.",
  },
  {
    key: "surgery",
    slug: "oral-surgery",
    seoTitle: "Oral Surgery in G-9 Markaz, Islamabad",
    seoDescription: "Extractions, wisdom tooth removal and implant placement, with written aftercare instructions and a clear plan for recovery.",
    title: "Oral Surgery",
    label: "Surgical dental care",
    copy: "Consultation and surgical care, including extractions when clinically appropriate.",
  },
  {
    key: "orthodontics",
    slug: "braces-and-aligners",
    seoTitle: "Braces and Clear Aligners in G-9 Markaz, Islamabad",
    seoDescription: "Braces and clear aligner treatment for crowding, gaps and bite problems in teens and adults, with regular adjustment visits.",
    title: "Orthodontics",
    label: "Braces and aligners",
    copy: "Options for improving tooth alignment and bite for children, teens, and adults.",
  },
  {
    key: "cosmetic",
    slug: "cosmetic-dentistry",
    seoTitle: "Cosmetic Dentistry in G-9 Markaz, Islamabad",
    seoDescription: "Whitening, bonding, veneers and reshaping to improve the look of your smile, planned around your goals and discussed before treatment.",
    title: "Cosmetic Dentistry",
    label: "Smile-focused care",
    copy: "Thoughtful options to discuss the shade, shape, and appearance of your smile.",
  },
  {
    key: "restorative",
    slug: "restorative-dentistry",
    seoTitle: "Fillings, Crowns and Bridges in G-9 Markaz, Islamabad",
    seoDescription: "Fillings, crowns, bridges and dentures that repair damaged or missing teeth, restoring comfortable chewing and appearance.",
    title: "Restorative Dentistry",
    label: "Restoring comfort",
    copy: "Individual care for damaged or missing teeth, explained clearly and planned with you.",
  },
] as const;

/**
 * The smile journey: the eight services above, grouped into the five stages a
 * patient actually moves through. Every `services` entry here is a key from the
 * `services` array, so the journey and the services page can never drift apart —
 * titles, labels and copy are read from the one source.
 */
export const careStages = [
  {
    key: "prevent",
    index: "01",
    name: "Prevent",
    title: "Start with a healthy baseline.",
    copy: "Regular visits build trust, spot concerns early, and help every patient understand their own oral health.",
    services: ["pediatric", "periodontics"],
  },
  {
    key: "diagnose",
    index: "02",
    name: "Diagnose",
    title: "Understand before deciding.",
    copy: "A careful examination and a clear explanation turn uncertainty into an informed, comfortable plan.",
    services: ["diagnostics"],
  },
  {
    key: "treat",
    index: "03",
    name: "Treat",
    title: "Resolve the immediate concern.",
    copy: "Focused treatment relieves discomfort, manages disease, and protects the surrounding teeth and gums.",
    services: ["endodontics", "surgery"],
  },
  {
    key: "restore",
    index: "04",
    name: "Restore",
    title: "Rebuild strength and function.",
    copy: "Restorative care brings back comfortable chewing while respecting the natural structure of the tooth.",
    services: ["restorative"],
  },
  {
    key: "refine",
    index: "05",
    name: "Refine",
    title: "Shape the smile you see first.",
    copy: "Once the foundations are healthy, alignment and appearance can be refined at a pace you choose.",
    services: ["orthodontics", "cosmetic"],
  },
] as const;

/**
 * The current clinic offer, used by both the top banner and the homepage offer
 * section so the two can never state different terms.
 *
 * Terms as confirmed by the clinic: free consultation for everyone, 30% off
 * general dental procedures, valid 12 months from the first visit, no deadline.
 * Specialist work and lab fees are excluded.
 */
export const offer = {
  bannerLong: "Free Consultation + 30% off on all general dental procedures",
  bannerShort: "Free Consultation + 30% off",
  heading: "Free Consultation + 30% off on all general dental procedures",
  audience: "Available to all patients, for 12 months from your first visit.",
  terms: "Excludes orthodontics, implants, cosmetic treatment and laboratory fees.",
} as const;

/* Extended service detail lives in its own module — see service-details.ts. */
export { serviceDetails, type ServiceDetail } from "./service-details";

/**
 * Clinical before/after examples supplied by the clinic. The alt text names
 * the treatment factually — DESIGN.md §16 forbids unsupported outcome claims,
 * so nothing here promises a result. The homepage previews the first three.
 *
 * `doctor` is the slug of the clinician who carried out the treatment, read
 * from the clinic's own filenames in the supplied case folder. It is never
 * inferred from a clinician's stated specialty — a guessed attribution would
 * credit one dentist with another's clinical work.
 */
export const cases = [
  { src: "/media/case-composite-filling.webp", label: "Restorative", doctor: "dr-baryal-khan", alt: "Before and after view of a composite filling carried out at Dr Hashim & Associates" },
  { src: "/media/case-composite-fillings.webp", label: "Restorative", doctor: "dr-baryal-khan", alt: "Before and after view of composite fillings carried out at Dr Hashim & Associates" },
  { src: "/media/case-composite-veneers.webp", label: "Cosmetic", doctor: "dr-baryal-khan", alt: "Before and after view of composite veneers carried out at Dr Hashim & Associates" },
  { src: "/media/case-scaling-whitening.webp", label: "Cosmetic", doctor: "dr-hashim-asad", alt: "Before and after view of scaling, polishing and teeth whitening carried out at Dr Hashim & Associates" },
  { src: "/media/case-teeth-whitening.webp", label: "Cosmetic", doctor: "dr-hashim-asad", alt: "Before and after view of teeth whitening carried out at Dr Hashim & Associates" },
  { src: "/media/case-zirconia-veneers.webp", label: "Cosmetic", doctor: "dr-hashim-asad", alt: "Before and after view of zirconia veneers carried out at Dr Hashim & Associates" },
] as const;

/**
 * `slug` gives each clinician a stable, indexable profile URL at /team/<slug>.
 * It is the join key between a doctor and the `cases` entries they performed.
 */
export const doctors = [
  {
    slug: "dr-hashim-asad",
    name: "Dr. Hashim Asad",
    initials: "HA",
    designation: "Dental Surgeon / Principal",
    specialty: "General & Restorative Dentistry",
    bio: "Lead clinician and founder of the practice. Experienced in general dentistry with a focus on Endodontics and patient-centred, comprehensive care.",
  },
  {
    slug: "dr-baryal-khan",
    name: "Dr. Baryal Khan",
    initials: "BK",
    designation: "Dental Surgeon",
    specialty: "Digital Dentistry & Esthetics",
    bio: "Specialist in digital treatment planning, esthetic dentistry, and clear aligner therapy. Practices standardized pain-free dentistry.",
  },
  {
    slug: "dr-ozair-shirazi",
    name: "Dr. Ozair Shirazi",
    initials: "OS",
    designation: "Oral & Maxillofacial Surgeon",
    specialty: "Oral Surgery",
    bio: "Handles complex extractions, surgical procedures, and facial trauma cases.",
  },
  {
    slug: "dr-zohra-mansoor",
    name: "Dr. Zohra Mansoor",
    initials: "ZM",
    designation: "Orthodontist",
    specialty: "Orthodontics",
    bio: "Provides braces, aligner therapy, and bite correction for children, teens, and adults.",
  },
  {
    slug: "dr-shehryar-baigal",
    name: "Dr. Shehryar Baigal",
    initials: "SB",
    designation: "Associate Dentist",
    specialty: "General Dentistry",
    bio: "Committed to providing thoughtful, patient-centred dental care, Dr. Shehryar Baigal believes every patient deserves to feel heard, understood, and confident in their treatment.",
  },
] as const;

export type Doctor = (typeof doctors)[number];
export type CaseItem = (typeof cases)[number];
export type Service = (typeof services)[number];
/** The closed union of live `/services/<slug>` URLs. */
export type ServiceSlug = Service["slug"];

export function getDoctor(slug: string): Doctor | undefined {
  return doctors.find((doctor) => doctor.slug === slug);
}

/**
 * Resolves a `/services/<slug>` URL segment. Takes a wide `string` because the
 * caller's slug comes from route params — `generateStaticParams` is what
 * narrows the set of slugs that can actually reach it.
 */
export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

/** The clinical examples credited to one clinician, in gallery order. */
export function getCasesForDoctor(slug: string): ReadonlyArray<CaseItem> {
  return cases.filter((item) => item.doctor === slug);
}
