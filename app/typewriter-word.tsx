"use client";

import { useEffect, useLayoutEffect, useState } from "react";

/**
 * Types through a list of words — the last one stays.
 *
 * The final word is always present in the server-rendered HTML, so the heading
 * reads correctly to search engines, to screen readers and to anyone without
 * JavaScript. A second, absolutely-positioned layer does the animation on top
 * of it while the original keeps the line at a fixed width, so nothing on the
 * page reflows and there is no unstyled flash before hydration.
 *
 * Phases:
 *   intact  → the final word is shown as-is (this is what the server renders)
 *   typing  → characters appear one at a time
 *   erasing → the current word is deleted back to nothing
 *   fading  → the last word cross-fades to the resting state
 *   settled → back to the intact markup, with the animated layer emptied
 */

const TYPE_START_MS = 620; // lets the headline's own fade-in land first
const TYPE_MS = 88; // per character while typing
const ERASE_MS = 40; // per character while deleting
const HOLD_MS = 1500; // pause on a completed word
const BETWEEN_MS = 280; // pause on an empty slot before the next word
const CROSSFADE_MS = 240; // matches the opacity transition on .typeword-* in globals.css

type Phase = "intact" | "typing" | "erasing" | "fading" | "settled";

/** useLayoutEffect warns during SSR; this picks the right one per environment. */
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function TypewriterWord({ words, suffix = "" }: { words: readonly string[]; suffix?: string }) {
  const finalWord = words[words.length - 1] ?? "";
  const [phase, setPhase] = useState<Phase>("intact");
  const [wordIndex, setWordIndex] = useState(0);
  const [count, setCount] = useState(0);

  const word = words[wordIndex] ?? finalWord;
  const isLastWord = wordIndex >= words.length - 1;
  const wordKey = words.join("|");

  useIsoLayoutEffect(() => {
    if (words.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => {
      setWordIndex(0);
      setCount(0);
      setPhase("typing");
    }, TYPE_START_MS);
    return () => window.clearTimeout(timer);
  }, [wordKey]);

  useEffect(() => {
    if (phase === "typing") {
      if (count < word.length) {
        const timer = window.setTimeout(() => setCount((n) => n + 1), TYPE_MS);
        return () => window.clearTimeout(timer);
      }
      // Word complete — hold, then delete it or settle on it for good.
      const timer = window.setTimeout(() => setPhase(isLastWord ? "fading" : "erasing"), HOLD_MS);
      return () => window.clearTimeout(timer);
    }

    if (phase === "erasing") {
      if (count > 0) {
        const timer = window.setTimeout(() => setCount((n) => n - 1), ERASE_MS);
        return () => window.clearTimeout(timer);
      }
      const timer = window.setTimeout(() => {
        setWordIndex((i) => i + 1);
        setPhase("typing");
      }, BETWEEN_MS);
      return () => window.clearTimeout(timer);
    }

    if (phase === "fading") {
      const timer = window.setTimeout(() => setPhase("settled"), CROSSFADE_MS);
      return () => window.clearTimeout(timer);
    }
  }, [phase, count, word.length, isLastWord]);

  const animating = phase === "typing" || phase === "erasing" || phase === "fading";

  return (
    <span className="typeword" data-phase={phase}>
      <span className="typeword-reserve">{finalWord}{suffix}</span>
      <span className="typeword-live" aria-hidden="true">
        {animating ? `${word.slice(0, count)}${suffix}` : null}
        {animating ? <span className="typeword-caret" /> : null}
      </span>
    </span>
  );
}
