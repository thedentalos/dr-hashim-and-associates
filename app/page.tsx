import Image from "next/image";
import { BookingButton, MobileNavigation, MotionController, ServiceButton } from "./ui";

const principles = [
  ["We listen first.", "Your concerns, your goals, your pace. Every conversation starts with you."],
  ["Clarity at every step.", "Understand your options and ask questions before deciding on your care."],
  ["Looking ahead.", "A considered approach to everyday care and lasting oral health."],
];

const services = [
  { key: "general", label: "Everyday care", title: "Exams & prevention", copy: "Routine examinations, professional cleaning, and an ongoing plan for a healthy smile." },
  { key: "cosmetic", label: "Signature care", title: "Cosmetic dentistry", copy: "Thoughtful options for the shade, shape, and details that make your smile feel like yours." },
  { key: "restorative", label: "Restoring comfort", title: "Restorative dentistry", copy: "Individual care for damaged or missing teeth, explained clearly and planned around you." },
] as const;

const visitSteps = [
  ["Let’s get to know you", "Share what brings you in, your dental history, and what you’d like to feel more confident about."],
  ["Take a closer look", "Your consultation is a chance to understand your oral health and discuss every concern."],
  ["Make a plan, together", "We’ll explain next steps, suitable options, and costs before you move forward."],
];

const faqs = [
  ["I feel nervous about visiting the dentist.", "You’re welcome to tell us how you feel when arranging your visit. We’ll listen, explain what to expect, and work at a pace that feels comfortable."],
  ["What should I bring to my first visit?", "Bring any relevant dental records, a list of current medications, and the questions you’d like to ask. We’ll confirm anything else when you book."],
  ["How do I know which treatment I need?", "Start with a consultation. Your dentist will assess your needs, explain suitable options, and discuss a plan with you before you decide."],
  ["Can I discuss costs before treatment?", "Yes. We’ll explain the proposed treatment and its costs before proceeding. Fees depend on the individual care you need."],
];

const clinicImages = [
  { src: "/media/clinic2.webp", alt: "Dental operating microscope and treatment chair at Dr Hashim and Associates", number: "01", title: "A closer, clearer view", copy: "Purposeful equipment supports careful assessment and treatment." },
  { src: "/media/clinic3.webp", alt: "Prepared dental treatment room at Dr Hashim and Associates", number: "02", title: "Ready for your visit", copy: "A dedicated treatment space prepared with comfort and clinical care in mind." },
  { src: "/media/clinic4.webp", alt: "Patient waiting lounge at Dr Hashim and Associates", number: "03", title: "Room to settle in", copy: "A welcoming lounge where you can take a breath before your appointment." },
];

const resultImages = [
  { src: "/media/results1.webp", alt: "Before and after view of a patient's restored smile", label: "Smile restoration" },
  { src: "/media/results2.webp", alt: "Before and after view following professional dental care", label: "Professional dental care" },
  { src: "/media/results3.webp", alt: "Before and after view of a patient's smile", label: "Smile refinement" },
];

function Brand() {
  return <a className="brand" href="#top" aria-label="Dr Hashim and Associates home"><span className="monogram">DH</span><span className="brand-name">DR HASHIM<span>AND ASSOCIATES</span></span></a>;
}

export default function Home() {
  return <>
    <MotionController />
    <a className="skip" href="#main">Skip to content</a>
    <header className="site-header" id="top"><Brand /><MobileNavigation /><BookingButton className="button header-book">Book now</BookingButton></header>
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow"><span className="small-line" /> A little more care. A lot more you.</p>
          <h1 className="hero-h1" id="hero-title">Good dentistry.<br />Great comfort.<br /><em>Your smile.</em></h1>
          <p className="hero-description hero-subhead">Modern dental care, thoughtfully delivered.<br />For a healthier smile and a more comfortable you.</p>
          <div className="hero-actions hero-ctas"><BookingButton className="button">Book your first visit</BookingButton><a className="secondary-button" href="#services">Explore our care</a></div>
          <div className="hero-note"><p>Care that starts with listening.<strong>Welcome to Dr Hashim and Associates.</strong></p></div>
        </div>
        <figure className="hero-image"><Image src="/media/clinic1.webp" alt="Reception entrance at Dr Hashim and Associates Dental Clinic" fill priority sizes="(max-width: 767px) 88vw, 50vw" /><figcaption>Welcome to your clinic.<span>Dr Hashim and Associates, G-9 Islamabad</span></figcaption></figure>
        <a className="scroll-cue" href="#approach">A healthier smile starts here</a>
      </section>
      <div className="values-band" aria-label="Our values"><span>Thoughtful dentistry</span><span>A personal approach</span><span>Comfort comes first</span><span>Care for the long run</span></div>
      <section id="approach" className="section approach">
        <div className="section-heading" data-reveal><p className="eyebrow">01 / How we care</p><h2>More than a smile.<br /><em>A person behind it.</em></h2></div>
        <div className="approach-content"><div data-reveal><p className="intro">Feeling good about your dental care starts with feeling understood.</p><p>Our approach is simple: listen closely, explain clearly, and make room for your questions. Your comfort matters just as much as your smile.</p></div><div className="principles">{principles.map(([title, copy], index) => <article key={title} data-reveal style={{ transitionDelay: `${index * 80}ms` }}><span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div>
      </section>
      <section className="section clinic-gallery" aria-labelledby="clinic-title">
        <div className="editorial-heading" data-reveal><p className="eyebrow">Inside the clinic</p><h2 id="clinic-title">Careful dentistry.<br /><em>Comfortable spaces.</em></h2><p>Real spaces from our practice, designed to make each stage of your visit feel familiar and considered.</p></div>
        <div className="clinic-grid">{clinicImages.map((item, index) => <article className="clinic-card" key={item.src} data-reveal style={{ transitionDelay: `${index * 80}ms` }}><div className="clinic-photo"><Image src={item.src} alt={item.alt} fill sizes="(max-width: 767px) 88vw, 33vw" /></div><div className="clinic-copy"><span className="item-number">{item.number}</span><div><h3>{item.title}</h3><p>{item.copy}</p></div></div></article>)}</div>
      </section>
      <section id="services" className="section services">
        <div className="services-heading"><div><p className="eyebrow">02 / What we do</p><h2>A little care today.<br /><em>More smiles tomorrow.</em></h2></div><p>From everyday essentials to a fresh start for your smile. Explore common areas of care and what to discuss at your visit.</p></div>
        <div className="service-grid">{services.map((service, index) => <article className="service-card" key={service.key} data-reveal style={{ transitionDelay: `${index * 80}ms` }}><div className="card-top"><span className="service-number">0{index + 1}</span></div><p className="eyebrow">{service.label}</p><h3>{service.title}</h3><p>{service.copy}</p><ServiceButton service={service.key}>Explore this care</ServiceButton></article>)}</div>
        <p className="service-note">Treatment availability and suitability are confirmed at your consultation.</p>
      </section>
      <section id="results" className="section results" aria-labelledby="results-title">
        <div className="editorial-heading" data-reveal><p className="eyebrow">Real patient results</p><h2 id="results-title">Small changes.<br /><em>Meaningful confidence.</em></h2><p>Every smile and treatment plan is individual. These examples show outcomes achieved for previous patients.</p></div>
        <div className="results-grid">{resultImages.map((item, index) => <figure className="result-card" key={item.src} data-reveal style={{ transitionDelay: `${index * 80}ms` }}><div className="result-photo"><Image src={item.src} alt={item.alt} fill sizes="(max-width: 767px) 88vw, 33vw" /></div><figcaption><span>0{index + 1}</span>{item.label}</figcaption></figure>)}</div>
        <p className="results-note">Results vary by patient. A consultation is required to assess suitability and expected outcomes.</p>
      </section>
      <section id="first-visit" className="section first-visit">
        <div className="visit-panel" data-reveal><p className="eyebrow">A fresh start</p><h2>New here?<br /><em>Feel at home.</em></h2><p>No question is too small. No concern goes unheard. Let’s make your first step a comfortable one.</p><BookingButton className="button cream">Plan your first visit</BookingButton></div>
        <div className="visit-steps"><div data-reveal><p className="eyebrow">03 / Your first visit</p><h2>A familiar face.<br />A clear next step.</h2></div>{visitSteps.map(([title, copy], index) => <article key={title} data-reveal style={{ transitionDelay: `${index * 80}ms` }}><span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
      </section>
      <section id="questions" className="section faq"><div data-reveal><p className="eyebrow">04 / A little reassurance</p><h2>Good questions.<br /><em>Clear answers.</em></h2><p>A few things to know before your visit.</p></div><div className="faq-items">{faqs.map(([question, answer], index) => <details key={question} data-reveal style={{ transitionDelay: `${index * 80}ms` }}><summary>{question}<span aria-hidden>+</span></summary><p>{answer}</p></details>)}</div></section>
      <section id="contact" className="section contact" data-reveal><p className="eyebrow">Your next chapter starts with a smile</p><h2>Let’s take good care<br /><em>of your smile.</em></h2><a className="button whatsapp-button" href="https://wa.me/923008557144" target="_blank" rel="noreferrer">Contact us on WhatsApp</a><div className="contact-details"><p><strong>Call the practice</strong><a href="tel:+923008557144">0300 8557144</a></p><p><strong>Find us</strong><a href="https://share.google/2viXfrvcbjT234ivc" target="_blank" rel="noreferrer">View on Google Maps</a></p><p><strong>Location</strong><span>G-9 Markaz, Islamabad</span></p></div></section>
    </main>
    <footer><div className="footer-main"><Brand /><p>Thoughtful care.<br />Something to smile about.</p><div><a href="#approach">Our approach</a><a href="#services">Our care</a></div><div><a href="#first-visit">Your first visit</a><a href="#questions">Your questions</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Dr Hashim and Associates</span><span>Made with care, for your smile.</span></div></footer>
  </>;
}
