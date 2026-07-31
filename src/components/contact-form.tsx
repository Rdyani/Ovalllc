"use client";

import { useState } from "react";
import { services } from "@/lib/services";
import { Icon } from "./icons";
import { Button } from "./ui";

type Status = "idle" | "submitting" | "success" | "error";

const budgets = [
  "Under $100",
  "$100 – $300",
  "$300 – $600",
  "$600 – $1,500",
  "$1,500+",
  "Not sure yet",
];

const timelines = ["ASAP", "Next 2–4 weeks", "Next 1–3 months", "Just exploring"];

const inputClass =
  "w-full rounded-xl border-0 bg-white px-4 py-3 text-ink-900 ring-1 ring-inset ring-ink-200 transition-shadow placeholder:text-ink-500 focus:ring-2 focus:ring-inset focus:ring-brand-500";

const labelClass = "mb-2 block text-sm font-medium text-ink-800";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(result.error ?? "Something went wrong. Please email us directly.");
        return;
      }

      setStatus("success");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
      setMessage(
        "We couldn't send that. Please email hello@ovalllc.net directly.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-2xl bg-white p-8 ring-1 ring-ink-100">
        <span className="flex size-12 items-center justify-center rounded-full bg-aurora-400/15 text-aurora-600">
          <Icon name="check" size={24} strokeWidth={2.2} />
        </span>
        <h2 className="text-2xl font-semibold">Thanks — that&rsquo;s with us.</h2>
        <p className="leading-relaxed text-ink-600">
          We read every enquiry personally and reply within one business day — telling
          you which package fits and sending the link to buy it, or quoting your project
          if it sits outside them. If we are not the right fit, we will say that too.
        </p>
        <Button variant="secondary" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-2xl bg-white p-6 ring-1 ring-ink-100 md:p-8"
      noValidate={false}
    >
      {/* Honeypot — bots fill this, humans never see it */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="company_website">Do not fill this in</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Your name <span className="text-brand-600">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClass}
            placeholder="Jane Whitfield"
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Work email <span className="text-brand-600">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
            placeholder="jane@company.com"
          />
        </div>

        <div>
          <label htmlFor="company" className={labelClass}>
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            className={inputClass}
            placeholder="Company Ltd."
          />
        </div>

        <div>
          <label htmlFor="website" className={labelClass}>
            Current website
          </label>
          <input
            id="website"
            name="website"
            type="text"
            autoComplete="url"
            className={inputClass}
            placeholder="company.com"
          />
        </div>

        <div>
          <label htmlFor="service" className={labelClass}>
            What do you need?
          </label>
          <select id="service" name="service" className={inputClass} defaultValue="">
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.slug} value={service.name}>
                {service.name}
              </option>
            ))}
            <option value="Custom project">Custom project — outside the packages</option>
            <option value="Not sure">Not sure — help me work it out</option>
          </select>
        </div>

        <div>
          <label htmlFor="budget" className={labelClass}>
            Budget range
          </label>
          <select id="budget" name="budget" className={inputClass} defaultValue="">
            <option value="">Select a range</option>
            {budgets.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="timeline" className={labelClass}>
            Timeline
          </label>
          <div className="flex flex-wrap gap-2">
            {timelines.map((timeline, index) => (
              <label
                key={timeline}
                className="cursor-pointer rounded-full bg-paper-subtle px-4 py-2 text-sm text-ink-600 ring-1 ring-ink-200 transition-colors has-checked:bg-ink-950 has-checked:text-white has-checked:ring-ink-950"
              >
                <input
                  type="radio"
                  name="timeline"
                  value={timeline}
                  defaultChecked={index === 1}
                  className="sr-only"
                />
                {timeline}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Tell us about the project <span className="text-brand-600">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          minLength={20}
          className={inputClass}
          placeholder="What are you trying to fix, what have you already tried, and is there a deadline we should know about?"
        />
      </div>

      {status === "error" && message ? (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {message}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <Button size="lg" type="submit" disabled={status === "submitting"} icon="arrow-right">
          {status === "submitting" ? "Sending…" : "Send enquiry"}
        </Button>
        <p className="text-sm text-ink-500">
          We reply within one business day. No mailing list, ever.
        </p>
      </div>
    </form>
  );
}
