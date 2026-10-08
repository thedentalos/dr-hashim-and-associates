/**
 * Next only fills `twitter:image` from a `twitter-image` file convention — it
 * does not fall back to `opengraph-image`. This reuses the Open Graph card so
 * the two never drift apart.
 */
export { alt, size, contentType, default } from "./opengraph-image";
