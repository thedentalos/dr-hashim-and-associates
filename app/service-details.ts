/**
 * Extended detail for each service, shown on /services.
 *
 * ── Provenance ──────────────────────────────────────────────────────────────
 * Supplied by the clinic as a document titled "Services Page Copy: Draft for
 * Review". That document states in its own header that "a dentist should
 * confirm all clinical details, timeframes, aftercare, and any cost or
 * sedation statements before this goes live". It is transcribed here as
 * written and has NOT been medically reviewed — get that sign-off before the
 * site goes public.
 *
 * Every field is optional and the page renders only what is present, so a
 * service without detail still reads as a complete entry.
 *
 * `faqs` is the highest-value field for search: questions like "does a root
 * canal hurt" are how patients actually look for treatment.
 *
 * `performedBy` is left unset. The draft carries "[Dr. ___]" placeholders for
 * every treatment, and who delivers what is the clinic's call rather than
 * something to infer from a job title.
 * ────────────────────────────────────────────────────────────────────────────
 */
export type ServiceDetail = {
  /** Paragraphs: what the treatment is, in patient language. */
  overview?: string[];
  /** Paragraphs: when this treatment is usually recommended. */
  recommendedWhen?: string[];
  /** Paragraphs: what happens during the appointment. */
  whatToExpect?: string[];
  /** Paragraphs: aftercare guidance. */
  aftercare?: string[];
  /** Patient questions and answers — the highest-value content for search. */
  faqs?: Array<{ question: string; answer: string }>;
  /** Shown in the summary block beside the description. */
  typicalVisits?: string;
  performedBy?: string;
};

export const serviceDetails: Record<string, ServiceDetail> = {
  diagnostics: {
    overview: [
      "Diagnostics is how we find out what’s going on in your mouth, often before you feel anything. It includes a full exam, X-rays, and screening for cavities, gum disease and oral cancer.",
    ],
    recommendedWhen: [
      "At least once or twice a year, when you’re a new patient, or any time you have pain, swelling, a chipped tooth or something that feels “off.”",
    ],
    whatToExpect: [
      "We review your health history, examine your teeth, gums and jaw. Then we take X-rays if needed and talk through what we see. You leave with a clear plan and priorities.",
    ],
    aftercare: [
      "Nothing special. Keep brushing twice a day and flossing daily, and follow any treatment plan we give you.",
    ],
    faqs: [
      { question: "How often should I get a dental check-up?", answer: "Usually every 6 months, though some people need more frequent visits." },
      { question: "Are dental X-rays safe?", answer: "Yes. Modern digital X-rays use very low radiation and we only take them when they’re needed." },
      { question: "Does a check-up hurt?", answer: "No. It’s usually painless." },
    ],
    typicalVisits: "1 (repeated every 6–12 months)",
  },

  endodontics: {
    overview: [
      "A root canal treats an infected or badly damaged tooth from the inside. We remove the damaged nerve tissue, clean the space and seal it so you can keep your natural tooth.",
    ],
    recommendedWhen: [
      "When you have a severe toothache, lingering sensitivity to hot or cold, swelling or a deep cavity or crack that has reached the nerve.",
    ],
    whatToExpect: [
      "We numb the area, make a small opening, remove the infected tissue, clean and shape the canals and seal them. The tooth is then restored, usually with a filling or crown.",
    ],
    aftercare: [
      "Mild soreness for a few days is normal and usually eases with over-the-counter pain relief. Avoid chewing on that side until the tooth is fully restored, and keep up your regular brushing and flossing.",
    ],
    faqs: [
      { question: "Does a root canal hurt?", answer: "With modern anesthesia, it feels similar to getting a filling. The treatment relieves the pain caused by the infection." },
      { question: "How long does a root canal take?", answer: "Usually 60–90 minutes per visit." },
      { question: "Can I go to work afterward?", answer: "Most people can." },
      { question: "Why not just pull the tooth?", answer: "Saving your natural tooth is generally better for your bite and jaw, and often cheaper in the long run than replacing it." },
    ],
    typicalVisits: "1–2, plus a follow-up for the crown",
  },

  periodontics: {
    overview: [
      "Periodontics treats the gums and the bone that support your teeth. It’s used for gum disease, which starts as inflammation and can lead to loose teeth if untreated.",
    ],
    recommendedWhen: [
      "If your gums bleed, look red or swollen, recede or you have persistent bad breath or loose teeth.",
    ],
    whatToExpect: [
      "We measure the pockets around your teeth, then deep-clean below the gumline (scaling and root planing). More advanced cases may need additional procedures.",
    ],
    aftercare: [
      "Your gums may be tender for a few days. Use a soft brush, rinse gently as advised, and don’t skip follow-up cleanings, since maintenance is what keeps gum disease under control.",
    ],
    faqs: [
      { question: "Why do my gums bleed when I brush?", answer: "Usually it’s inflammation from plaque build up, a sign of gum disease rather than a reason to brush less." },
      { question: "Can gum disease be reversed?", answer: "Early-stage gingivitis can be. Advanced gum disease can be controlled but not fully reversed." },
      { question: "Does a deep cleaning hurt?", answer: "We numb the area, so most people feel pressure but not pain." },
    ],
    typicalVisits: "2–4, then ongoing maintenance every 3–4 months",
  },

  pediatric: {
    overview: [
      "Dental care designed for babies, children and teens, with a gentle approach that helps kids feel comfortable and builds good habits early.",
    ],
    recommendedWhen: [
      "From the first tooth or by the first birthday, then regular check-ups. Come sooner for pain, injury or concerns about thumb-sucking or crooked teeth.",
    ],
    whatToExpect: [
      "We keep things friendly and unhurried. We check teeth and growth, clean them and may apply fluoride or sealants. We also coach parents and kids on brushing and diet.",
    ],
    aftercare: [
      "After fluoride or sealants, follow any short eating restrictions we give you. After fillings, watch that your child doesn’t chew their numb cheek or lip.",
    ],
    faqs: [
      { question: "When should my child first see a dentist?", answer: "By their first birthday or when the first tooth appears." },
      { question: "Do baby teeth really matter?", answer: "Yes. They hold space for adult teeth and affect eating and speech." },
      { question: "My child is scared. What can I do?", answer: "Keep it positive, avoid scary words and let us handle the explaining." },
      { question: "Are fluoride and sealants safe?", answer: "Yes, when used as directed and they significantly reduce cavities." },
    ],
    typicalVisits: "1 per check-up, every 6 months",
  },

  surgery: {
    overview: [
      "Oral surgery covers procedures such as tooth extractions, wisdom tooth removal, and implant placement.",
    ],
    recommendedWhen: [
      "For teeth that can’t be saved, impacted wisdom teeth, or when a missing tooth is best replaced with an implant.",
    ],
    whatToExpect: [
      "We numb the area (or discuss sedation options), perform the procedure, and give you written aftercare instructions. Stitches may be placed.",
    ],
    aftercare: [
      "Bite on gauze to control bleeding, apply a cold pack, stick to soft foods, and avoid straws, smoking, and vigorous rinsing for the first few days. Call us if you have heavy bleeding, fever, or pain that gets worse after day 3.",
    ],
    faqs: [
      { question: "Does getting a tooth pulled hurt?", answer: "You’ll feel pressure but no sharp pain during the procedure. Soreness afterward is manageable." },
      { question: "How long is recovery from wisdom teeth removal?", answer: "Most people feel better in 3–5 days, with full healing taking a few weeks." },
      { question: "What is dry socket?", answer: "A painful condition when the blood clot is dislodged. Following aftercare instructions greatly lowers the risk." },
    ],
    typicalVisits: "1–2 for extractions; implants take several visits over a few months",
  },

  orthodontics: {
    overview: [
      "Orthodontics straightens teeth and corrects bite problems using braces or clear aligners, for better function, easier cleaning, and a confident smile.",
    ],
    recommendedWhen: [
      "For crowding, gaps, overbites, underbites or crooked teeth, in both teens and adults.",
    ],
    whatToExpect: [
      "We take photos, X-rays, and impressions or scans, then plan your treatment. Regular adjustment visits follow, usually every 4–8 weeks.",
    ],
    aftercare: [
      "Brush and floss carefully around braces or aligners, avoid hard and sticky foods, and wear retainers as instructed once treatment ends. Retainers keep teeth from shifting back.",
    ],
    faqs: [
      { question: "How long do braces take?", answer: "Typically 12–24 months, depending on the case." },
      { question: "Do braces hurt?", answer: "There’s mild soreness after adjustments, usually for a few days." },
      { question: "Am I too old for braces?", answer: "No. Many adults get treated." },
      { question: "Braces or clear aligners?", answer: "It depends on your case. We’ll recommend the best fit for you." },
    ],
    typicalVisits: "Consultation, then regular visits every 4–8 weeks over 1–2 years",
  },

  cosmetic: {
    overview: [
      "Treatments that improve the look of your smile, such as whitening, bonding, veneers and reshaping.",
    ],
    recommendedWhen: [
      "If you’re unhappy with stained, chipped, gapped or uneven teeth and want a more confident smile.",
    ],
    whatToExpect: [
      "We discuss your goals, then design a plan, sometimes with a preview of the result. Treatments range from a one-visit whitening to multi-visit veneers.",
    ],
    aftercare: [
      "After whitening, you may have temporary sensitivity, so avoid dark-colored foods and drinks for a couple of days. For veneers and bonding, avoid biting hard objects and keep up regular cleanings.",
    ],
    faqs: [
      { question: "Is teeth whitening safe?", answer: "Yes, when supervised by a dentist. It doesn’t damage enamel." },
      { question: "How long do veneers last?", answer: "Often 10–15 years with good care." },
      { question: "Does whitening cause sensitivity?", answer: "Sometimes, temporarily." },
      { question: "How much does it cost?", answer: "It depends on the treatment, so we’ll give you a clear quote after your consultation." },
    ],
    typicalVisits: "1–3 for whitening or bonding; 2–3 for veneers",
  },

  restorative: {
    overview: [
      "Treatments that repair damaged or missing teeth, including fillings, crowns, bridges, and dentures, restoring both function and appearance.",
    ],
    recommendedWhen: [
      "For cavities, cracked or broken teeth, worn teeth, or when teeth are missing.",
    ],
    whatToExpect: [
      "We remove decay or damage and rebuild the tooth with a filling or crown. For crowns and bridges, we usually take impressions or scans, place a temporary, then fit the final restoration.",
    ],
    aftercare: [
      "Avoid chewing until numbness wears off. Mild sensitivity is normal for a few days. Avoid very hard or sticky foods on a new restoration, and keep brushing and flossing.",
    ],
    faqs: [
      { question: "Does getting a filling hurt?", answer: "We numb the area, so it shouldn’t." },
      { question: "How long does a crown last?", answer: "Often 10–15 years or longer with good care." },
      { question: "Filling or crown?", answer: "Fillings suit smaller damage, while crowns protect larger or weakened teeth." },
      { question: "What are my options for a missing tooth?", answer: "Implants, bridges, or dentures, and we’ll help you choose." },
    ],
    typicalVisits: "1 for a filling; 2 for a crown or bridge",
  },
};
