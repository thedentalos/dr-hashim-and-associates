export const BOOKING_URL =
  "https://script.google.com/macros/s/AKfycbzTJIK9MVlZAKcQQrxgBU9RPxQkbA-6VcU5UtyVtO2gibmA_Cgs8kJg30BqIQG7kvGcMQ/exec";

export const WHATSAPP_URL = "https://wa.me/923008557144";

export const CLINIC_ADDRESS = "1st Floor, Pehchan Mall, G-9 Markaz, Islamabad";

export const CLINIC_EMAIL = "drhahsimandassociates@gmail.com";

export const CLINIC_HOURS = "10:00 to 8:30";

export const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Dr%20Hashim%20and%20Associates%20Dental%20Clinic&query_place_id=ChIJ8zBMenhKz2cRBnRXb0-JHtI";

export const services = [
  { key: "diagnostics", title: "Diagnostics", label: "Understanding your needs", copy: "A careful assessment to understand your oral health and discuss suitable next steps." },
  { key: "endodontics", title: "Endodontics", label: "Root canal care", copy: "Care focused on the inside of a tooth when root canal treatment is appropriate." },
  { key: "periodontics", title: "Periodontics", label: "Gum treatment", copy: "Assessment and care for the gums and the tissues that support your teeth." },
  { key: "pediatric", title: "Pediatric Dentistry", label: "Care for children", copy: "Age-appropriate dental visits with clear explanations and a gentle pace." },
  { key: "surgery", title: "Oral Surgery", label: "Surgical dental care", copy: "Consultation and surgical care, including extractions when clinically appropriate." },
  { key: "orthodontics", title: "Orthodontics", label: "Braces and aligners", copy: "Options for improving tooth alignment and bite for children, teens, and adults." },
  { key: "cosmetic", title: "Cosmetic Dentistry", label: "Smile-focused care", copy: "Thoughtful options to discuss the shade, shape, and appearance of your smile." },
  { key: "restorative", title: "Restorative Dentistry", label: "Restoring comfort", copy: "Individual care for damaged or missing teeth, explained clearly and planned with you." },
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

export const cases = [
  { src: "/media/results1.webp", label: "Restorative", alt: "Before and after view of a restored smile" },
  { src: "/media/results2.webp", label: "Restorative", alt: "Before and after view following dental care" },
  { src: "/media/results3.webp", label: "Cosmetic", alt: "Before and after view of a smile" },
] as const;

export const doctors = [
  {
    name: "Dr. Hashim Asad",
    initials: "HA",
    designation: "Dental Surgeon / Principal",
    specialty: "General & Restorative Dentistry",
    bio: "Lead clinician and founder of the practice. Experienced in general dentistry with a focus on Endodontics and patient-centred, comprehensive care.",
  },
  {
    name: "Dr. Baryal Khan",
    initials: "BK",
    designation: "Dental Surgeon",
    specialty: "Digital Dentistry & Esthetics",
    bio: "Specialist in digital treatment planning, esthetic dentistry, and clear aligner therapy. Practices standardized pain-free dentistry.",
  },
  {
    name: "Dr. Ozair Shirazi",
    initials: "OS",
    designation: "Oral & Maxillofacial Surgeon",
    specialty: "Oral Surgery",
    bio: "Handles complex extractions, surgical procedures, and facial trauma cases.",
  },
  {
    name: "Dr. Zohra Mansoor",
    initials: "ZM",
    designation: "Orthodontist",
    specialty: "Orthodontics",
    bio: "Provides braces, aligner therapy, and bite correction for children, teens, and adults.",
  },
] as const;
