import { ImageResponse } from "next/og";
import { MARK_PATH } from "@/components/oval-mark";
import { getPost, posts } from "@/lib/posts";

/** Per-article share card showing the post title, category and reading time. */

export const alt = "OVAL article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);

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
        <div
          style={{
            position: "absolute",
            top: -240,
            left: -180,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(93,67,233,0.5) 0%, rgba(7,12,23,0) 70%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="52" height="52" viewBox="0 0 32 32">
            <path d={MARK_PATH} fill="#fff" fillRule="evenodd" />
          </svg>
          <div style={{ display: "flex", fontSize: 26, fontWeight: 600, color: "#fff" }}>
            OVAL
            <span style={{ color: "#7287a6", marginLeft: 8 }}>LLC</span>
          </div>
          {post ? (
            <div
              style={{
                display: "flex",
                marginLeft: 12,
                padding: "8px 18px",
                borderRadius: 9999,
                background: "rgba(46,224,174,0.12)",
                color: "#2ee0ae",
                fontSize: 20,
              }}
            >
              {post.category}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: post && post.title.length > 60 ? 58 : 68,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.1,
            letterSpacing: -2,
            maxWidth: 1000,
          }}
        >
          {post?.title ?? "OVAL"}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 24,
            color: "#a3b2c9",
          }}
        >
          <div style={{ display: "flex" }}>ovalllc.net</div>
          {post ? (
            <>
              <div style={{ display: "flex", color: "#3d506b" }}>•</div>
              <div style={{ display: "flex" }}>{post.readingMinutes} min read</div>
            </>
          ) : null}
        </div>
      </div>
    ),
    size,
  );
}
