import { ImageResponse } from "next/og";
import { MARK_PATH } from "@/components/oval-mark";
import { site } from "@/lib/site";

/**
 * Default social share card, used by every page that does not define its own.
 * Generated at build time — no image assets to keep in sync with the brand.
 */

export const alt = `${site.name} — digital marketing and web development agency`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#070c17",
          padding: 72,
          position: "relative",
        }}
      >
        {/* Aurora wash */}
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -160,
            width: 720,
            height: 720,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(93,67,233,0.55) 0%, rgba(7,12,23,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -280,
            left: -140,
            width: 640,
            height: 640,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(18,199,149,0.35) 0%, rgba(7,12,23,0) 70%)",
          }}
        />

        {/* Logo lockup */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* Solid fill rather than a gradient — satori's SVG support is
              limited, and white reads cleanly on the dark card either way. */}
          <svg width="60" height="60" viewBox="0 0 32 32">
            <path d={MARK_PATH} fill="#fff" fillRule="evenodd" />
          </svg>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 600, color: "#fff" }}>
            OVAL
            <span style={{ color: "#7287a6", marginLeft: 9 }}>LLC</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              fontSize: 74,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.05,
              letterSpacing: -2.5,
            }}
          >
            Websites that convert.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 74,
              fontWeight: 700,
              color: "#2ee0ae",
              lineHeight: 1.05,
              letterSpacing: -2.5,
            }}
          >
            SEO that compounds.
          </div>
        </div>

        {/* Footer strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            fontSize: 24,
            color: "#a3b2c9",
          }}
        >
          <div style={{ display: "flex" }}>Digital marketing &amp; web development</div>
          <div style={{ display: "flex", color: "#3d506b" }}>•</div>
          <div style={{ display: "flex" }}>USA &amp; UK</div>
        </div>
      </div>
    ),
    size,
  );
}
