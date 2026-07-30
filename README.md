# OVAL — agency website

An SEO-first marketing site for a small web design and SEO studio serving the
USA and UK, selling fixed-price packages ($35–$299) rather than retainers.
Built with Next.js 16 (App Router), React 19 and Tailwind CSS v4. Every page is
statically generated except the contact endpoint.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
npm run lint    # eslint
```

---

## Before you go live

| # | What | Where |
|---|------|-------|
| 1 | **Check the email address.** `contant@ovalllc.net` is what was supplied — if that is a typo for `contact@`, fix it here first. | `src/lib/site.ts` |
| 2 | **Check the phone number.** `+1 680368344` is 9 digits; US numbers need 10, so the `tel:` link will not dial as-is. | `src/lib/site.ts` |
| 3 | **Confirm the domain.** `ovalllc.net` was inferred from the email. It drives every canonical URL, the sitemap and all JSON-LD IDs. | `src/lib/site.ts` |
| 4 | **Create the Stripe Payment Links** and add them to `.env.local`. See below. | `.env.example` |
| 5 | **Have a lawyer review** the privacy policy, terms and refund policy. Good templates, not legal advice. | `src/app/{privacy,terms,refund-policy}/` |
| 6 | **Add Search Console / Bing verification tokens** | `verification` block in `src/app/layout.tsx` |
| 7 | Update the social media URLs (currently `/ovalllc` placeholders) | `site.socials` in `src/lib/site.ts` |

---

## Stripe

### Why the site is built this way

Digital marketing is an elevated-risk category for card processors, mostly
because of historic chargebacks on vague SEO retainers. Several deliberate
choices here reduce that risk:

- **Every charge maps to one concrete deliverable.** Packages have a written
  scope, so a disputed charge can be judged against something specific.
- **No outcome promises anywhere.** Copy never guarantees a ranking, a traffic
  number or a revenue figure. This is enforced by convention — keep it that way
  when you edit content, and never add "guaranteed #1 on Google" style claims.
- **A published refund policy** at `/refund-policy`, linked from the footer,
  the pricing page and the homepage. Its absence is a common reason new
  accounts are held.
- **One-time payments, not subscriptions.** Easier to approve for a new account,
  and far less likely to generate disputes.

### Wiring up the buy buttons

1. In the Stripe dashboard, go to **Product catalogue → Payment links** and
   create one link per package: $35, $60, $149, $299.
2. For each link, enable **collect customer name and email** — you need those to
   send the project questionnaire.
3. Copy the four URLs into `.env.local`:

   ```
   STRIPE_LINK_SEO_AUDIT=https://buy.stripe.com/...
   STRIPE_LINK_ON_PAGE_SEO=https://buy.stripe.com/...
   STRIPE_LINK_LANDING_PAGE=https://buy.stripe.com/...
   STRIPE_LINK_BUSINESS_WEBSITE=https://buy.stripe.com/...
   ```

4. Rebuild. These are read at **build time**, so a redeploy is required after
   changing them.

Until they are set, every buy button falls back to `/contact?package=<slug>`
and the button label changes from "Buy now" to "Get started" — so the site is
fully usable while your account is still under review.

Nothing else is needed: no API keys, no webhooks, no card data touching this
site.

### Custom projects (invoiced, not a Payment Link)

Anything outside the four packages is quoted individually from $350 and billed
through **Stripe Invoicing** — there is nothing to configure on the site.

1. Agree the scope with the customer in writing.
2. In Stripe, create an invoice with **the agreed scope as the line items**. This
   matters: if a charge is ever disputed, the invoice is the evidence of what was
   sold.
3. Send the 50% deposit invoice. Work starts when it clears.
4. Invoice the remaining 50% on delivery, due within 14 days.

The 50/50 split is written into **Terms §3.7** and **refund policy §8**. If you
change it, change it in `src/lib/packages.ts` (`customProject.paymentTerms`) and
both legal pages, or they will contradict each other.

---

## Adding content

Everything is generated from five data files. Add an entry and the route,
navigation, sitemap, internal links and structured data all follow.

| Add a… | Edit | Creates |
|--------|------|---------|
| Package | `src/lib/packages.ts` | A pricing card, homepage tile, and Offer schema |
| Custom-project detail | `customProject` in `src/lib/packages.ts` | The wide 5th card on the pricing page |
| Service | `src/lib/services.ts` | `/services/[slug]` + nav, footer, homepage cards |
| City/market | `src/lib/locations.ts` | `/digital-marketing-agency/[city]` |
| Blog post | `src/lib/posts.ts` | `/blog/[slug]` + its own OG image |
| Add-on | `addOns` in `src/lib/packages.ts` | A row in the pricing add-ons table |

Adding a package also means creating its Stripe Payment Link and adding a
matching entry to the `paymentLinks` map at the top of `packages.ts` — the env
lookups are explicit because Next.js only inlines literal `process.env.X` keys.

### Writing a blog post

Posts are structured blocks rather than MDX, so every `h2` gets a stable anchor
id (used by the table of contents, and by AI search engines when citing a
passage), and `faqs` can be lifted directly into `FAQPage` schema.

```ts
blocks: [
  { type: "p", text: "Body copy with **bold** and [a link](/services/seo-services)." },
  { type: "h2", text: "A section", id: "a-section" },   // id must be unique per post
  { type: "list", ordered: true, items: ["First", "Second"] },
  { type: "callout", title: "Worth knowing", text: "…" },
  { type: "table", head: ["A", "B"], rows: [["1", "2"]], caption: "…" },
  { type: "quote", text: "…", cite: "Optional attribution" },
]
```

Inline formatting supports `**bold**` and `[label](/path)` only — parsed into
real React nodes, never `dangerouslySetInnerHTML`. Posts are published under
the company name; there are no personal bylines.

---

## SEO implementation

Since all traffic is intended to come from organic search, this is the part that
matters most.

**Per page:** a unique `<title>` and meta description, a self-referencing
canonical, and Open Graph + Twitter tags. Where a title comes from a data file it
uses `title: { absolute: … }`, because those values already include the brand
suffix and the root layout's template would otherwise append it twice.

**Structured data** (`src/lib/schema.ts`, rendered by `<JsonLd>`):

- `ProfessionalService` + `WebSite` sitewide, declared once with stable `@id`s
  that every other block references
- `OfferCatalog` of `Offer`s on the pricing page, with price and delivery time
- `Service` + `Offer` on service pages; `Service` + `City` areaServed on location pages
- `BlogPosting` on articles, credited to the Organization
- `BreadcrumbList` on every interior page, matching the visible trail
- `FAQPage` wherever an FAQ block renders

**Crawl and indexing:** `src/app/sitemap.ts` generates every URL from the data
files; blog entries carry their real `updatedAt` date. `src/app/robots.ts` allows
AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) explicitly —
remove any you would rather not be cited by.

**Content structure:** one `h1` per page with correct heading nesting, FAQs built
on native `<details>` so answers sit in the DOM at load, and dense internal
linking between services ↔ locations ↔ packages ↔ blog.

**Performance:** everything is statically prerendered. The only client-side
JavaScript is the header menu and the contact form; the icon set is inline SVG
and there is no icon or CSS framework runtime.

---

## Structure

```
src/
├── app/
│   ├── layout.tsx                        root metadata, sitewide JSON-LD
│   ├── page.tsx                          homepage
│   ├── opengraph-image.tsx               generated default share card
│   ├── sitemap.ts  robots.ts  not-found.tsx
│   ├── pricing/                          packages + Stripe buy buttons
│   ├── services/[slug]/                  5 service pages
│   ├── digital-marketing-agency/[city]/  8 location pages
│   ├── blog/[slug]/                      + per-post opengraph-image.tsx
│   ├── about/  contact/
│   ├── privacy/  terms/  refund-policy/
│   └── api/contact/route.ts              validation, honeypot, rate limit
├── components/                           all server components except
│                                         site-header and contact-form
└── lib/                                  site config, content, schema builders
```

## Design system

Tokens live in `src/app/globals.css` under `@theme`. The palette is `ink`
(near-black navy), `brand` (indigo) and `aurora` (teal), on a light base with
deep sections for rhythm. The site commits to one look — there is no dark-mode
variant, so changing `--color-*` values in that block re-skins everything.

## Deploying

Push to GitHub and import at [vercel.com/new](https://vercel.com/new) — zero
config. Add the `.env.local` values as environment variables in the project
settings, then point your domain at it.

Anywhere running Node 20.9+ works too (`npm run build && npm start`). The one
requirement is a Node runtime for `/api/contact`; if you would rather host as
pure static files, replace that route with a third-party form endpoint.

After launch: verify the domain in Google Search Console and Bing Webmaster
Tools, submit `/sitemap.xml` in both, and check the rich results report for
schema errors.
