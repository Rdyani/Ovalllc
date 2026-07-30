import { ImageResponse } from "next/og";
import { MARK_PATH } from "@/components/oval-mark";

/**
 * Apple touch icon. Generated as a PNG rather than shipped as an SVG because
 * iOS does not render SVG touch icons — Next.js only recognises raster formats
 * (or a generator like this one) for the `apple-icon` convention.
 *
 * Unlike the favicon this keeps a filled background: iOS composites touch icons
 * onto the home screen with no transparency, so a bare mark would land on black.
 */

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #6c63f5 0%, #12c795 100%)",
        }}
      >
        <svg width="124" height="124" viewBox="0 0 32 32">
          <path d={MARK_PATH} fill="#fff" fillRule="evenodd" />
        </svg>
      </div>
    ),
    size,
  );
}
