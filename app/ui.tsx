"use client";

import { useEffect, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react";

const care = {
  general: { title: "The everyday essentials.", body: "General dental care begins with understanding your teeth and gums.", items: ["Routine dental examinations and cleaning", "Questions about your teeth and gums", "A plan for ongoing preventive care"] },
  cosmetic: { title: "A smile that feels like you.", body: "A cosmetic consultation is a chance to talk about what you would like to change and understand your options.", items: ["The colour and appearance of your teeth", "Whitening or veneer options to ask about", "Your priorities, expectations, and budget"] },
  restorative: { title: "Care for your next chapter.", body: "Restorative dentistry considers the function and appearance of damaged or missing teeth.", items: ["Concerns about damaged teeth", "Options such as fillings, crowns, or tooth replacement", "The stages and costs of an individual treatment plan"] },
};

type DialogContent = { title: string; body: string; items?: string[] };

function InfoDialog({ content, onClose }: { content: DialogContent | null; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (content && dialog && !dialog.open) dialog.showModal();
    if (!content && dialog?.open) dialog.close();
  }, [content]);
  if (!content) return null;
  return <dialog ref={dialogRef} onClose={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }} aria-labelledby="dialog-title"><button className="close-dialog" onClick={onClose} aria-label="Close dialog">Close</button><p className="eyebrow">Dr Hashim and Associates</p><h2 id="dialog-title">{content.title}</h2><p>{content.body}</p>{content.items && <ul>{content.items.map((item) => <li key={item}>{item}</li>)}</ul>}<p>The practice will confirm which services are available and appropriate for you.</p><button className="button dialog-done" onClick={onClose}>Got it</button></dialog>;
}

function useDialog() {
  const [content, setContent] = useState<DialogContent | null>(null);
  return { setContent, dialog: <InfoDialog content={content} onClose={() => setContent(null)} /> };
}

export function BookingButton({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  const { setContent, dialog } = useDialog();
  return <><button {...props} onClick={() => setContent({ title: "Your first step to a healthier smile.", body: "Online booking is not available yet. The practice’s confirmed phone number, address, and appointment details will be added here before launch." })}>{children}</button>{dialog}</>;
}

export function ServiceButton({ service, children }: { service: keyof typeof care; children: ReactNode }) {
  const { setContent, dialog } = useDialog();
  return <><button className="service-link" onClick={() => setContent(care[service])}>{children}</button>{dialog}</>;
}

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  return <div className="nav-wrap"><nav id="navigation" className={open ? "open" : ""} aria-label="Main navigation"><a className="nav-link" onClick={() => setOpen(false)} href="#approach">Our approach</a><a className="nav-link" onClick={() => setOpen(false)} href="#services">Our care</a><a className="nav-link" onClick={() => setOpen(false)} href="#results">Results</a><a className="nav-link" onClick={() => setOpen(false)} href="#first-visit">Your first visit</a><a className="nav-link" onClick={() => setOpen(false)} href="#questions">FAQs</a><a className="nav-link" onClick={() => setOpen(false)} href="#contact">Contact</a></nav><button className="menu-toggle" aria-controls="navigation" aria-expanded={open} aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen((value) => !value)}><span /><span /></button></div>;
}

export function MotionController() {
  useEffect(() => {
    const header = document.querySelector(".site-header");
    const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 40);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (reducedMotion || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return () => window.removeEventListener("scroll", updateHeader);
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.2 });
    items.forEach((item) => observer.observe(item));
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateHeader);
    };
  }, []);

  return null;
}
