import { Noto_Nastaliq_Urdu } from "next/font/google";

/**
 * The Urdu tagline previously relied on the viewer having a Nastaliq font
 * installed, which almost no device does — it was rendering in a generic
 * fallback. Self-hosted by next/font at build time, so no runtime request.
 *
 * Declared here rather than in the root layout on purpose: next/font emits a
 * preload for every font it declares, and at ~156 KB the Arabic subset was
 * being preloaded on all nine routes while the tagline only renders on `/` and
 * `/about`. Importing this from those two pages keeps the preload — and the
 * download — to the routes that use it.
 */
export const urduFont = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: "400",
  display: "swap",
  variable: "--font-urdu",
});
