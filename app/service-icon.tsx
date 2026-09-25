/**
 * Lives in its own module so both the Server Component service lists and the
 * client-side smile journey can use it. Importing it from `components.tsx`
 * would drag the header, footer and logo into the client bundle.
 */
export function ServiceIcon({ index }: { index: number }) {
  const paths = [
    <g key="diagnostics"><circle cx="12" cy="12" r="7" /><path d="m17 17 4 4M9 12h6M12 9v6" /></g>,
    <g key="endodontics"><path d="M8 3c-2 1-3 4-2 7 1 3 2 9 4 11 1 1 2-4 2-6 0 2 1 7 2 6 2-2 3-8 4-11 1-3 0-6-2-7-2-1-3 1-4 1s-2-2-4-1Z" /><path d="M12 7v6" /></g>,
    <g key="periodontics"><path d="M4 15c3-2 5-2 8 0s5 2 8 0M5 19c3-2 5-2 7 0s4 2 7 0M8 4c1 0 2 2 4 2s3-2 4-2" /></g>,
    <g key="pediatric"><circle cx="12" cy="9" r="4" /><path d="M5 21c1-5 3-7 7-7s6 2 7 7M8 8h8" /></g>,
    <g key="surgery"><path d="M12 3v18M7 7c0-2 2-4 5-4s5 2 5 4-2 4-5 4-5 2-5 5 2 5 5 5 5-2 5-5" /></g>,
    <g key="orthodontics"><path d="M4 8c4-3 12-3 16 0M4 16c4 3 12 3 16 0M7 7v10M12 6v12M17 7v10" /></g>,
    <g key="cosmetic"><path d="M4 13c4 6 12 6 16 0M7 8h.01M17 8h.01M8 14c2 2 6 2 8 0" /></g>,
    <g key="restorative"><path d="M7 4h10v16H7zM9 8h6M9 12h6M9 16h4" /></g>,
  ];
  return <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[index]}</svg>;
}
