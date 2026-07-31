"use client";

import Script from "next/script";
import { useCallback, useSyncExternalStore } from "react";
import { site } from "@/lib/site";

/**
 * Cookie consent gate for Google Analytics.
 *
 * Design decisions worth knowing:
 *
 * 1. gtag.js is not loaded at all until consent is granted. The alternative —
 *    Google Consent Mode v2, which loads the tag immediately in a "denied"
 *    state — is more capable but harder to defend. Not loading a third-party
 *    script until someone says yes is unambiguous.
 *
 * 2. The banner is shown to everyone, not just UK/EU visitors. Geo-gating needs
 *    request-time headers, which would make every page dynamic and cost the
 *    static rendering the whole site is built on. IP geolocation is also wrong
 *    often enough that a UK visitor on a VPN would silently lose their rights.
 *
 * 3. Accept and Decline are equally prominent. A banner where refusing is
 *    harder than accepting is not freely given consent under GDPR, and that
 *    pattern is what regulators have been fining.
 *
 * 4. The choice is kept in localStorage, not a cookie, so declining genuinely
 *    leaves the browser with nothing set by us.
 *
 * State comes from useSyncExternalStore rather than useState + useEffect:
 * localStorage is an external store, and reading it in an effect would both
 * trip react-hooks/set-state-in-effect and render the banner into the static
 * HTML of every page — making it flash for people who already answered.
 * getServerSnapshot returns "unknown" so nothing is emitted during SSR.
 */

const STORAGE_KEY = "oval-cookie-consent";
/** Footer button dispatches this to let someone change their mind. */
export const CONSENT_EVENT = "oval:cookie-settings";

type Decision = "granted" | "denied";
type State = Decision | null | "unknown";

const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  // "storage" fires when another tab changes the decision
  window.addEventListener("storage", onChange);
  window.addEventListener(CONSENT_EVENT, onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CONSENT_EVENT, onChange);
  };
}

function getSnapshot(): State {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "granted" || stored === "denied" ? stored : null;
  } catch {
    // Private browsing can throw on localStorage access — treat as undecided.
    return null;
  }
}

/** Nothing is known server-side, so the banner is never in the static HTML. */
function getServerSnapshot(): State {
  return "unknown";
}

export function CookieConsent() {
  const decision = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const choose = useCallback((next: Decision) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    emit();
  }, []);

  // Only load analytics in production, and only once consent is granted.
  const loadAnalytics =
    decision === "granted" &&
    Boolean(site.gaId) &&
    process.env.NODE_ENV === "production";

  return (
    <>
      {loadAnalytics ? (
        <>
          <Script
            id="ga-lib"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`}
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${site.gaId}');`}
          </Script>
        </>
      ) : null}

      {decision === null ? (
        <div
          role="dialog"
          aria-labelledby="cookie-consent-title"
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-xl rounded-2xl bg-ink-950 p-5 text-ink-300 shadow-lift-lg ring-1 ring-white/10 sm:bottom-6 sm:left-6 sm:right-auto"
        >
          <h2 id="cookie-consent-title" className="text-base font-semibold text-white">
            Can we measure how the site is used?
          </h2>
          <p className="mt-2 text-[0.9375rem] leading-relaxed">
            We&rsquo;d like to set two Google Analytics cookies to see which pages people
            read. Nothing is used for advertising and we never sell your data. The site
            works exactly the same either way.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => choose("granted")}
              className="inline-flex h-10 items-center justify-center rounded-full bg-white px-5 text-[0.9375rem] font-medium text-ink-950 transition-colors hover:bg-ink-100"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => choose("denied")}
              className="inline-flex h-10 items-center justify-center rounded-full bg-white/10 px-5 text-[0.9375rem] font-medium text-white ring-1 ring-inset ring-white/20 transition-colors hover:bg-white/15"
            >
              Decline
            </button>
            <a
              href="/privacy"
              className="ml-auto text-sm text-ink-400 underline underline-offset-4 transition-colors hover:text-white"
            >
              Privacy policy
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}

/** Footer control so a visitor can change their mind later. */
export function CookieSettingsButton({ className }: { className?: string }) {
  const reopen = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new Event(CONSENT_EVENT));
  }, []);

  return (
    <button type="button" onClick={reopen} className={className}>
      Cookie settings
    </button>
  );
}
