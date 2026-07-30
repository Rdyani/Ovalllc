import { NextResponse } from "next/server";
import { site } from "@/lib/site";

/**
 * Contact form endpoint.
 *
 * Validates the submission, then delivers it. Delivery is via Resend when
 * RESEND_API_KEY is set (see .env.example); without it the enquiry is logged
 * to the server console so local development works without any credentials.
 *
 * Two abuse controls are in place: a honeypot field and a per-IP rate limit.
 * The rate limit is in-memory, which is fine for a single instance but resets
 * on deploy — swap it for Upstash Redis or Vercel KV if this gets hammered.
 */

const MAX_REQUESTS = 5;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_REQUESTS) return false;

  entry.count += 1;
  return true;
}

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  website?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  company_website?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(payload: Payload): string | null {
  if (!payload.name || payload.name.trim().length < 2) {
    return "Please tell us your name.";
  }
  if (!payload.email || !EMAIL_PATTERN.test(payload.email.trim())) {
    return "Please enter a valid email address.";
  }
  if (!payload.message || payload.message.trim().length < 20) {
    return "Please give us a little more detail — at least 20 characters.";
  }
  if (payload.message.length > 5000) {
    return "That message is too long. Please keep it under 5,000 characters.";
  }
  return null;
}

/** Strips characters that would let a value break out of an email header. */
function sanitize(value: string | undefined): string {
  return (value ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, 500);
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many enquiries from this address. Please try again shortly." },
      { status: 429 },
    );
  }

  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: only bots complete a field hidden off-screen. Return 200 so the
  // bot believes it succeeded and does not retry with a different strategy.
  if (payload.company_website) {
    return NextResponse.json({ ok: true });
  }

  const validationError = validate(payload);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const enquiry = {
    name: sanitize(payload.name),
    email: sanitize(payload.email),
    company: sanitize(payload.company) || "—",
    website: sanitize(payload.website) || "—",
    service: sanitize(payload.service) || "Not specified",
    budget: sanitize(payload.budget) || "Not specified",
    timeline: sanitize(payload.timeline) || "Not specified",
    message: (payload.message ?? "").trim().slice(0, 5000),
    receivedAt: new Date().toISOString(),
  };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !from) {
    // No mail provider configured — log it so nothing is silently dropped.
    console.info("[contact] New enquiry (email delivery not configured):", enquiry);
    return NextResponse.json({ ok: true });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: enquiry.email,
        subject: `New enquiry — ${enquiry.name}${enquiry.company !== "—" ? ` (${enquiry.company})` : ""}`,
        text: [
          `Name:     ${enquiry.name}`,
          `Email:    ${enquiry.email}`,
          `Company:  ${enquiry.company}`,
          `Website:  ${enquiry.website}`,
          `Service:  ${enquiry.service}`,
          `Budget:   ${enquiry.budget}`,
          `Timeline: ${enquiry.timeline}`,
          "",
          "Message:",
          enquiry.message,
          "",
          `Received: ${enquiry.receivedAt}`,
        ].join("\n"),
      }),
    });

    if (!response.ok) {
      // Log the full enquiry so a provider outage never loses a lead.
      console.error(
        "[contact] Resend rejected the message:",
        response.status,
        await response.text(),
        enquiry,
      );
      return NextResponse.json(
        { error: `We couldn't send that. Please email ${site.email} directly.` },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("[contact] Delivery failed:", error, enquiry);
    return NextResponse.json(
      { error: `We couldn't send that. Please email ${site.email} directly.` },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
