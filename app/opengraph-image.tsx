import { ImageResponse } from "next/og";
import { CLINIC_ADDRESS, CLINIC_HOURS } from "./data";

/**
 * Share card for every route. Without one, a link to the clinic posted to
 * WhatsApp — the clinic's main channel — rendered as a bare text row with no
 * image at all.
 *
 * Colours are repeated as literals rather than read from the CSS custom
 * properties: this renders through satori, which has no access to the
 * stylesheet, and the values are the same ones declared in `:root`.
 */
export const alt = "Dr Hashim & Associates Dental Clinic, G-9 Markaz, Islamabad";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#1B3A8C",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 56, height: 3, background: "#2E9ED6" }} />
          <div
            style={{
              fontSize: 24,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#9BDCF7",
            }}
          >
            G-9 Markaz, Islamabad
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, lineHeight: 1.06, letterSpacing: -2 }}>
            Dr Hashim &amp; Associates
          </div>
          <div style={{ fontSize: 92, lineHeight: 1.06, letterSpacing: -2, color: "#9BDCF7" }}>
            Dental Clinic
          </div>
          <div style={{ marginTop: 26, fontSize: 32, color: "rgba(255,255,255,.82)" }}>
            Modern dental care for everyone.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            paddingTop: 26,
            borderTop: "1px solid rgba(255,255,255,.24)",
            fontSize: 24,
            color: "rgba(255,255,255,.72)",
          }}
        >
          <div>{CLINIC_ADDRESS}</div>
          <div style={{ color: "#9BDCF7" }}>{CLINIC_HOURS}</div>
        </div>
      </div>
    ),
    size,
  );
}
