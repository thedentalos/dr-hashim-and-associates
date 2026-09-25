"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { careStages, services } from "./data";
import { ServiceIcon } from "./service-icon";

/**
 * Every service stays in the server-rendered HTML. Inactive stage panels are
 * marked `hidden` rather than unmounted, so all eight service names, their
 * descriptions and their /services#key links are crawlable without JavaScript.
 */

/** Quadratic Bézier, control point pulled down to make the arch. */
const CURVE_PATH = "M100 57 Q500 177 900 57";

/**
 * Where that curve sits at t = 0, .25, .5, .75, 1 — so each dot lands exactly
 * on the line rather than near it. The five column centres are at the matching
 * 10/30/50/70/90% of the grid, which is why only the y value is needed.
 */
const DOT_Y = [57, 102, 117, 102, 57];

/** How far the accent stroke has travelled along the arc, per stage. */
const PROGRESS = [0, 25, 50, 75, 100];

const SERVICE_BY_KEY = new Map<string, { service: (typeof services)[number]; index: number }>(
  services.map((service, index) => [service.key, { service, index }]),
);

export function SmileJourney() {
  const [active, setActive] = useState(0);

  return (
    <div className="journey">
      <svg className="journey-curve" viewBox="0 0 1000 180" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path className="journey-curve-base" d={CURVE_PATH} pathLength={100} />
        <path className="journey-curve-progress" d={CURVE_PATH} pathLength={100} style={{ strokeDasharray: `${PROGRESS[active]} 100` }} />
      </svg>

      {careStages.slice(0, -1).map((stage, index) => (
        <span
          key={`connector-${stage.key}`}
          className={`journey-connector${index < active ? " is-travelled" : ""}`}
          style={{ "--row": index * 2 + 1 } as CSSProperties}
          aria-hidden="true"
        />
      ))}

      {careStages.map((stage, index) => (
        <button
          key={stage.key}
          type="button"
          className={`journey-step${index === active ? " is-active" : ""}`}
          style={{ "--row": index * 2 + 1, "--col": index + 1, "--dot-y": DOT_Y[index] } as CSSProperties}
          aria-expanded={index === active}
          aria-controls={`journey-panel-${stage.key}`}
          onClick={() => setActive(index)}
        >
          <span className="journey-dot">{stage.index}</span>
          <span className="journey-step-name">{stage.name}</span>
        </button>
      ))}

      {careStages.map((stage, index) => (
        <div
          key={stage.key}
          id={`journey-panel-${stage.key}`}
          className="journey-panel"
          style={{ "--row": index * 2 + 2 } as CSSProperties}
          hidden={index !== active}
        >
          <div className="journey-panel-head">
            <p className="journey-kicker">Stage {stage.index} &middot; {stage.name}</p>
            <h3>{stage.title}</h3>
            <p className="journey-copy">{stage.copy}</p>
          </div>

          <ul className="journey-procedures">
            {stage.services.map((key) => {
              const entry = SERVICE_BY_KEY.get(key);
              if (!entry) return null;
              return (
                <li className="journey-procedure" key={key}>
                  <span className="journey-procedure-label">{entry.service.label}</span>
                  <h4 className="journey-procedure-title">
                    <ServiceIcon index={entry.index} />
                    <Link href={`/services#${key}`}>{entry.service.title}</Link>
                  </h4>
                  <span className="journey-procedure-arrow" aria-hidden="true">&rarr;</span>
                  <p className="journey-procedure-copy">{entry.service.copy}</p>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
