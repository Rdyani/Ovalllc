/**
 * Blog content.
 *
 * Posts are structured data rather than MDX so that every heading gets a
 * stable anchor id (needed for the table of contents and for AI search
 * citation), and so FAQ blocks can be lifted straight into FAQPage schema.
 *
 * Inline formatting inside any `text` string supports:
 *   **bold**            → <strong>
 *   [label](/path)      → <Link> for internal, <a rel="noopener"> for external
 *
 * Posts are published under the company name rather than a personal byline —
 * see articleSchema() in schema.ts, which credits the Organization.
 *
 * To add a post: append an entry below. The route, sitemap entry, hub listing
 * and schema markup are all generated from it.
 */

import type { Faq } from "./services";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string; id: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "callout"; title: string; text: string }
  | { type: "table"; caption?: string; head: string[]; rows: string[][] };

export type Post = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  /** ISO date — used in Article schema and the sitemap */
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  blocks: Block[];
  faqs?: Faq[];
  /** Slugs of related posts */
  related: string[];
};

export const posts: Post[] = [
  {
    slug: "how-much-does-a-website-cost",
    title: "How Much Does a Website Cost in 2026? US & UK Pricing, Broken Down",
    metaTitle: "How Much Does a Website Cost in 2026? | OVAL",
    metaDescription:
      "Real website pricing for 2026, from $35 fixed packages to $150k custom builds. What each tier includes, what drives cost, and how to tell if a quote is fair.",
    excerpt:
      "Website quotes range from under $100 to $150,000 for what sounds like the same brief. Here is what actually drives the number, and how to judge whether a quote is reasonable.",
    category: "Web Development",
    publishedAt: "2026-03-11",
    updatedAt: "2026-07-02",
    readingMinutes: 11,
    blocks: [
      {
        type: "p",
        text: "Ask five agencies what a website costs and you will get five numbers spanning three orders of magnitude. This is not because four of them are lying. It is because \"a website\" describes anything from a five-page template with stock photography to a bespoke platform serving ten thousand indexable URLs with a custom CMS behind it.",
      },
      {
        type: "p",
        text: "Below is what each tier genuinely costs in 2026, what you receive at each level, and the specific factors that move a quote up or down. Figures are in US dollars; the UK equivalents run roughly 15–25% lower at the agency tier and broadly similar at the freelance tier.",
      },
      { type: "h2", text: "The short answer", id: "the-short-answer" },
      {
        type: "table",
        caption: "Typical all-in website build cost by tier, 2026",
        head: ["Tier", "Cost (USD)", "Timeline", "Best for"],
        rows: [
          ["DIY builder", "$200 – $1,500/yr", "1–3 weeks", "Pre-revenue, validating an idea"],
          ["Productized package", "$150 – $600", "1–2 weeks", "Small business, standard brief"],
          ["Freelancer", "$3,000 – $15,000", "3–8 weeks", "Small business, custom brief"],
          ["Boutique agency", "$12,000 – $60,000", "6–12 weeks", "Funded startups, established SMBs"],
          ["Mid-market agency", "$50,000 – $150,000", "3–6 months", "Multi-template, integrations, ecommerce"],
          ["Enterprise", "$150,000+", "6–18 months", "Multi-language, complex platform work"],
        ],
      },
      {
        type: "p",
        text: "Most businesses reading this belong in the productized-package or freelancer band. If you are being quoted $80,000 for a nine-page brochure site, something has gone wrong. If you are being quoted $400 for a bilingual ecommerce build with an ERP integration, something has also gone wrong, and it will surface around week six.",
      },
      { type: "h2", text: "What actually drives the price", id: "what-drives-the-price" },
      { type: "h3", text: "1. Number of unique templates", id: "unique-templates" },
      {
        type: "p",
        text: "Not page count — **template** count. A site with 400 blog posts and 200 product pages might only need eight unique templates. A twelve-page site where every page is bespoke can cost more than a two-hundred-page site built on a tight design system. When you compare quotes, compare templates.",
      },
      { type: "h3", text: "2. Content: who writes it", id: "content-production" },
      {
        type: "p",
        text: "Copywriting is the single most common cause of a project running late, and it is frequently excluded from the quote. Professional web copy runs $150–$500 per page. If your quote does not mention content, assume it is on you, and assume it will take you longer than you think.",
      },
      { type: "h3", text: "3. Integrations", id: "integrations" },
      {
        type: "p",
        text: "Every external system — CRM, ERP, payment provider, booking engine, marketing automation — adds real cost. A well-documented Stripe integration might be a day of work. An undocumented SOAP endpoint on a 2011 inventory system can consume three weeks. Ask specifically how each integration is being estimated.",
      },
      { type: "h3", text: "4. Whether SEO is designed in or bolted on", id: "seo-designed-in" },
      {
        type: "p",
        text: "This is where cheap builds get expensive. A site built without URL planning, crawlable rendering, semantic markup and a redirect strategy will need remediation the moment you take organic search seriously — and retrofitting is consistently more expensive than doing it correctly the first time. Our own [web design and development](/services/web-design-and-development) engagements include the keyword-to-URL map before design begins, because changing it afterwards means changing everything.",
      },
      {
        type: "callout",
        title: "The redesign trap",
        text: "Roughly a third of the redesign enquiries we receive come from businesses that lost 40–70% of their organic traffic after a rebuild. In almost every case the cause is the same: no redirect map, and URLs changed without anyone checking which ones were earning traffic.",
      },
      { type: "h3", text: "5. Performance requirements", id: "performance" },
      {
        type: "p",
        text: "Hitting Core Web Vitals thresholds on mobile is engineering work, not a checkbox. Image pipelines, font loading strategy, render-blocking resource elimination and a rendering strategy suited to the content type all take time. Builds that skip it ship faster and cost less — and then cost more later. See our guide to [what actually affects Core Web Vitals](/blog/core-web-vitals-seo-guide) for the specifics.",
      },
      { type: "h2", text: "What each tier gets you", id: "what-each-tier-gets" },
      { type: "h3", text: "DIY builders ($200–$1,500/year)", id: "diy-builders" },
      {
        type: "p",
        text: "Squarespace, Wix, Framer and Webflow templates. Genuinely fine for validating an idea or for a business whose customers arrive by referral. The constraints appear when you need custom functionality, when the template's markup limits your technical SEO, or when you need to publish hundreds of programmatically generated pages.",
      },
      { type: "h3", text: "Productized packages ($150–$600)", id: "productized-packages" },
      {
        type: "p",
        text: "A newer model: a studio sells a fixed scope at a fixed price — five pages, two revision rounds, fourteen days — rather than quoting each project. You give up custom scope and unlimited revisions; you gain a price you can see before contacting anyone and a delivery date that is stated rather than estimated. It suits a standard small-business brief well and suits an unusual one badly. Our own [packages](/pricing) work this way, starting at $149 for a landing page.",
      },
      { type: "h3", text: "Freelancers ($3,000–$15,000)", id: "freelancers" },
      {
        type: "list",
        items: [
          "**Good fit when:** the brief is clear, the scope is stable and you have someone internally to manage the project.",
          "**Risk:** single point of failure. If your freelancer takes another contract or gets ill, the project stops.",
          "**Ask for:** a written scope, a payment schedule tied to milestones, and explicit confirmation that you own the code and design files.",
        ],
      },
      { type: "h3", text: "Boutique agencies ($12,000–$60,000)", id: "boutique-agencies" },
      {
        type: "p",
        text: "A small team — strategy, design, engineering — working on a handful of projects at once. You get process, redundancy and specialist skills without a mid-market agency's overhead. This is where most funded startups and established SMBs land once a project genuinely needs custom scope.",
      },
      { type: "h3", text: "Mid-market and enterprise ($50,000+)", id: "mid-market" },
      {
        type: "p",
        text: "Justified by genuine complexity: multi-language, multi-region, deep platform integration, strict compliance requirements, or a design system serving several products. It is not justified by wanting a nicer homepage. A large fee should map to a large scope you can point at line by line.",
      },
      { type: "h2", text: "The costs quotes usually omit", id: "hidden-costs" },
      {
        type: "table",
        head: ["Item", "Typical annual cost", "Frequently omitted?"],
        rows: [
          ["Hosting & CDN", "$240 – $3,600", "Sometimes"],
          ["CMS licensing", "$0 – $12,000", "Often"],
          ["Copywriting", "$2,000 – $20,000", "Very often"],
          ["Photography", "$1,500 – $15,000", "Very often"],
          ["Ongoing maintenance", "$1,200 – $18,000", "Often"],
          ["Analytics & tracking setup", "$1,000 – $6,000", "Often"],
        ],
      },
      {
        type: "p",
        text: "When you compare two quotes, normalise them against this list before deciding one is cheaper. A $14,000 quote that includes copy, photography and a year of maintenance is usually better value than a $9,000 quote that includes none of it.",
      },
      { type: "h2", text: "How to tell if a quote is fair", id: "fair-quote" },
      {
        type: "list",
        ordered: true,
        items: [
          "**It itemises deliverables.** A single line reading \"website — $22,000\" is not a proposal, it is a number.",
          "**It names the templates.** You should be able to count what you are buying.",
          "**It states who writes the content.** Ambiguity here becomes a delay later.",
          "**It includes a redirect and migration plan** if you have an existing site with traffic.",
          "**It defines revision rounds.** Unlimited revisions are either priced in already or a source of future conflict.",
          "**It confirms you own everything** — code, designs, domains and third-party accounts.",
          "**It has a payment schedule tied to milestones,** not to dates.",
        ],
      },
      {
        type: "quote",
        text: "The most expensive website is the one you have to build twice.",
      },
      { type: "h2", text: "So what should you budget?", id: "what-to-budget" },
      {
        type: "p",
        text: "If organic search is going to be a meaningful acquisition channel, budget at the boutique agency tier and insist that SEO architecture is part of the build rather than a later phase. If your site is essentially a business card and customers arrive through referral or paid social, a freelancer or a good template will serve you well and the difference is better spent on acquisition.",
      },
      {
        type: "p",
        text: "If you want a number without a sales call, our [pricing page](/pricing) lists every package, what it includes and how long it takes. If your brief does not fit one, [tell us about it](/contact) and we will quote it or tell you honestly that we are the wrong fit.",
      },
    ],
    faqs: [
      {
        question: "How much does a small business website cost in 2026?",
        answer:
          "It depends on the model. A fixed-scope productized package runs $150–$600 for a standard five-page site. A freelancer quoting your project individually runs $3,000–$15,000. An agency with strategy, custom design and technical SEO starts around $12,000. DIY builders cost $200–$1,500 per year if you do the work yourself.",
      },
      {
        question: "Why do agencies charge so much more than freelancers?",
        answer:
          "You are paying for a team rather than an individual — separate strategy, design and engineering specialists, plus project management, QA and redundancy if someone becomes unavailable. For a straightforward brief with stable scope, a good freelancer is often better value. For a complex build where the project cannot afford to stall, an agency usually is.",
      },
      {
        question: "Is a monthly website subscription worth it?",
        answer:
          "Subscription web design ($200–$800 per month) spreads the cost and typically includes hosting and maintenance, which suits businesses that prefer operating expenditure. The catch is that you rarely own the code, so leaving means rebuilding. Read the ownership terms before signing.",
      },
      {
        question: "How much should I budget for ongoing website maintenance?",
        answer:
          "Plan for 10–20% of the original build cost annually. That covers security updates, dependency upgrades, hosting, backups and small content changes. Sites with heavy integrations or frequent publishing sit at the upper end of that range.",
      },
    ],
    related: ["how-long-does-seo-take", "core-web-vitals-seo-guide"],
  },
  {
    slug: "how-long-does-seo-take",
    title: "How Long Does SEO Take to Work? An Honest Timeline",
    metaTitle: "How Long Does SEO Take to Work? | OVAL",
    metaDescription:
      "SEO timelines by activity type, from four-week technical wins to twelve-month authority building. What to expect month by month, and the signals to watch early.",
    excerpt:
      "Not all SEO moves at the same speed. Technical fixes can land in weeks; competitive commercial rankings take the better part of a year. Here is the honest breakdown.",
    category: "SEO",
    publishedAt: "2026-04-22",
    updatedAt: "2026-06-18",
    readingMinutes: 9,
    blocks: [
      {
        type: "p",
        text: "\"How long until we see results?\" is the first question in almost every SEO conversation, and the honest answer is genuinely unsatisfying: it depends entirely on which kind of SEO you mean. Fixing a robots.txt rule that is blocking your product pages produces results in days. Outranking an established competitor for a high-value commercial term takes the better part of a year.",
      },
      {
        type: "p",
        text: "Treating those as one timeline is why so many SEO engagements feel like they are failing at month three. Below is the realistic schedule, split by activity.",
      },
      { type: "h2", text: "Timeline by activity type", id: "timeline-by-activity" },
      {
        type: "table",
        caption: "Realistic time to measurable impact, by SEO activity",
        head: ["Activity", "First signal", "Full impact"],
        rows: [
          ["Fixing indexation blockers", "3–14 days", "2–4 weeks"],
          ["On-page optimisation of existing pages", "2–6 weeks", "2–3 months"],
          ["Core Web Vitals improvements", "4–8 weeks", "3 months"],
          ["Internal linking restructure", "3–6 weeks", "2–4 months"],
          ["New content, low competition", "4–10 weeks", "4–6 months"],
          ["New content, high competition", "3–6 months", "8–14 months"],
          ["Digital PR & authority building", "2–4 months", "9–18 months"],
          ["Recovering from an algorithmic hit", "1 core update", "2–3 core updates"],
        ],
      },
      {
        type: "callout",
        title: "Why the ranges are wide",
        text: "Crawl frequency, domain authority, competitor activity and how often Google runs a core update all affect the timeline, and none of them are under your control. An established domain publishing into a weak niche can move in weeks. A new domain entering a competitive market will not, regardless of how good the content is.",
      },
      { type: "h2", text: "What a normal twelve months looks like", id: "twelve-months" },
      { type: "h3", text: "Months 1–2: foundations, minimal traffic change", id: "months-1-2" },
      {
        type: "p",
        text: "Audit, technical remediation, keyword mapping and on-page work on existing pages. Traffic often stays flat, which is normal and is where nervous clients cancel. What you should be watching instead is crawl stats, index coverage and impressions in Search Console — impressions move before clicks do.",
      },
      { type: "h3", text: "Months 3–4: first real movement", id: "months-3-4" },
      {
        type: "p",
        text: "On-page work on pages that were already sitting in positions 8–20 starts producing gains, because those pages only needed a push rather than a standing start. This is usually the first month with a visible traffic line change, and it comes disproportionately from existing pages rather than new ones.",
      },
      { type: "h3", text: "Months 5–8: content compounds", id: "months-5-8" },
      {
        type: "p",
        text: "Content published in months two and three reaches its ranking ceiling. Clusters begin reinforcing each other through internal links. Long-tail terms convert first because they are less contested and carry sharper intent. Lead volume typically becomes attributable around here.",
      },
      { type: "h3", text: "Months 9–12: competitive terms move", id: "months-9-12" },
      {
        type: "p",
        text: "With topical depth established and authority built through earned links, the high-value commercial terms you actually wanted at the start begin to move. This is where a properly run programme separates decisively from one that published thin content on a schedule.",
      },
      { type: "h2", text: "Leading indicators to watch before rankings move", id: "leading-indicators" },
      {
        type: "list",
        items: [
          "**Impressions in Search Console** — rises before clicks. If impressions are climbing, you are being surfaced and the click-through work comes next.",
          "**Average position for tracked terms** — moving from 34 to 19 produces no traffic but is unambiguous progress.",
          "**Pages indexed** — for larger sites, index coverage growth is the earliest signal that technical work landed.",
          "**Crawl requests per day** — increased crawl frequency indicates Google is treating the site as more worth revisiting.",
          "**Referring domains** — the input that eventually moves competitive rankings, and the one that lags most visibly.",
        ],
      },
      { type: "h2", text: "What makes SEO faster or slower", id: "faster-or-slower" },
      { type: "h3", text: "Faster", id: "faster" },
      {
        type: "list",
        items: [
          "An established domain with existing authority and crawl history",
          "A large library of pages already ranking in positions 5–20",
          "A niche where competitors publish thin, outdated content",
          "An in-house team that can ship technical changes within days",
          "Genuine subject-matter expertise available for content production",
        ],
      },
      { type: "h3", text: "Slower", id: "slower" },
      {
        type: "list",
        items: [
          "A brand-new domain with no history",
          "Year-, finance-, health- or safety-adjacent topics held to a higher trust bar",
          "Competitors with large in-house content teams publishing weekly",
          "A development backlog where SEO tickets wait months for release",
          "A prior manual action or link-based penalty in the domain's history",
        ],
      },
      { type: "h2", text: "When to conclude it is not working", id: "not-working" },
      {
        type: "p",
        text: "Give a programme six months before judging outcomes — but judge the **work** monthly from day one. Those are different things. By month three you should be able to see technical issues resolved and verified, content published against a documented keyword map, impressions trending upward, and reporting that explains what changed and why.",
      },
      {
        type: "p",
        text: "If at month three you cannot point at what has been done, the issue is not that SEO is slow. Our [SEO services](/services/seo-services) are structured around exactly this distinction: the deliverables and cadence are contractual and visible monthly, even while the ranking outcomes are still compounding.",
      },
      {
        type: "quote",
        text: "Judge the work monthly. Judge the results at six months. Confusing the two is how good programmes get cancelled at month four.",
      },
    ],
    faqs: [
      {
        question: "How long does SEO take to show results?",
        answer:
          "Technical fixes and on-page optimisation of existing pages typically show movement in four to eight weeks. New content targeting low-competition terms ranks within four to ten weeks. Competitive commercial keywords generally take eight to fourteen months of consistent content and authority building.",
      },
      {
        question: "Can SEO work in 30 days?",
        answer:
          "Only for specific situations: removing an indexation blocker, fixing a mistaken noindex tag, or optimising a page already ranking in positions 5–15. Nobody can rank a new page for a competitive commercial term in thirty days, and any agency promising it is either targeting keywords with no search volume or misrepresenting what they will deliver.",
      },
      {
        question: "Why is my SEO not working after six months?",
        answer:
          "The most common causes are targeting keywords far above the site's current authority, publishing content that does not match search intent, unresolved technical issues suppressing indexation, or insufficient publishing volume against competitors. A diagnostic audit will usually identify which within a fortnight.",
      },
      {
        question: "Is SEO faster for a new website or an existing one?",
        answer:
          "An existing site with crawl history and some authority moves considerably faster — often three to six months ahead of a new domain targeting the same terms. New domains face an effective probation period while search engines gather quality signals.",
      },
    ],
    related: ["how-much-does-a-website-cost", "core-web-vitals-seo-guide"],
  },
  {
    slug: "core-web-vitals-seo-guide",
    title: "Core Web Vitals in 2026: What Actually Affects Rankings",
    metaTitle: "Core Web Vitals 2026: What Affects Rankings | OVAL",
    metaDescription:
      "A practical guide to LCP, INP and CLS in 2026 — the thresholds that matter, how much they really move rankings, and the fixes with the highest return.",
    excerpt:
      "Core Web Vitals are a real ranking factor and a small one. Here is what the thresholds are, how much they matter, and which fixes are worth engineering time.",
    category: "Technical SEO",
    publishedAt: "2026-05-30",
    updatedAt: "2026-07-15",
    readingMinutes: 10,
    blocks: [
      {
        type: "p",
        text: "Core Web Vitals occupy a strange position in SEO discourse. Half the industry treats them as the deciding ranking factor; the other half dismisses them as a tiebreaker that never matters. Both are wrong in the same way — they are asking about rankings when the larger effect is on conversion.",
      },
      {
        type: "p",
        text: "Here is a working engineer's view of what the metrics measure, what the thresholds are, and which fixes are worth the time.",
      },
      { type: "h2", text: "The three metrics and their thresholds", id: "the-three-metrics" },
      {
        type: "table",
        caption: "Core Web Vitals thresholds (75th percentile of real user traffic)",
        head: ["Metric", "Good", "Needs improvement", "Poor"],
        rows: [
          ["LCP — Largest Contentful Paint", "≤ 2.5s", "2.5s – 4.0s", "> 4.0s"],
          ["INP — Interaction to Next Paint", "≤ 200ms", "200ms – 500ms", "> 500ms"],
          ["CLS — Cumulative Layout Shift", "≤ 0.1", "0.1 – 0.25", "> 0.25"],
        ],
      },
      {
        type: "callout",
        title: "The 75th percentile detail everyone misses",
        text: "Assessment uses the 75th percentile of real user data over a rolling 28-day window, not your lab score. A perfect Lighthouse result on a fast laptop tells you almost nothing about the mid-range Android phone on a congested network that represents your slowest quartile. Always check field data in Search Console or CrUX.",
      },
      { type: "h2", text: "How much do they actually affect rankings?", id: "ranking-impact" },
      {
        type: "p",
        text: "Directly: not much. Page experience is a lightweight signal, and relevance and authority dominate it comfortably. A slow page with the best answer will outrank a fast page with a mediocre one, consistently.",
      },
      {
        type: "p",
        text: "Indirectly: quite a lot. Slow pages get abandoned, which suppresses engagement signals. Slow pages consume more crawl budget per URL, which matters enormously on large sites. And slow pages convert worse — which is the point of the traffic in the first place.",
      },
      {
        type: "quote",
        text: "Optimise Core Web Vitals for revenue, and take the ranking benefit as a bonus. Optimising them purely for rankings gets the priorities backwards.",
      },
      { type: "h2", text: "Fixing LCP — the highest-return metric", id: "fixing-lcp" },
      {
        type: "p",
        text: "LCP fails more often than the other two combined, and in the overwhelming majority of cases the culprit is the hero image or the web font.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "**Identify the LCP element** in Chrome DevTools' Performance panel. It is nearly always a hero image, a heading, or a background image.",
          "**Preload it.** Add `<link rel=\"preload\" as=\"image\">` for the hero image so it is not discovered late in the parse.",
          "**Serve modern formats.** AVIF or WebP with correct `width` and `height` attributes to reserve layout space.",
          "**Never lazy-load the LCP element.** Applying `loading=\"lazy\"` above the fold is one of the most common self-inflicted LCP failures.",
          "**Fix font loading.** Use `font-display: swap`, preload the primary weight, and self-host rather than fetching from a third-party origin.",
          "**Cut render-blocking resources.** Inline critical CSS; defer everything that is not needed for the first paint.",
        ],
      },
      { type: "h3", text: "The rendering strategy question", id: "rendering-strategy" },
      {
        type: "p",
        text: "For content-led pages, static generation or server rendering with a CDN will beat client-side rendering on LCP essentially every time, because the browser receives markup rather than an empty div and a JavaScript bundle. This is the single largest architectural decision affecting your vitals, and it is very expensive to reverse after launch — which is why we settle it during [web design and development](/services/web-design-and-development) discovery rather than at the optimisation stage.",
      },
      { type: "h2", text: "Fixing INP — a JavaScript problem", id: "fixing-inp" },
      {
        type: "p",
        text: "INP measures how quickly the page responds to a user interaction. Poor INP is almost always long tasks blocking the main thread.",
      },
      {
        type: "list",
        items: [
          "**Break up long tasks.** Anything over 50ms blocks interaction; yield to the main thread with `scheduler.yield()` where supported.",
          "**Reduce hydration cost.** Ship less JavaScript. Server components and islands architecture exist precisely for this.",
          "**Debounce expensive handlers.** Search-as-you-type and scroll handlers are frequent offenders.",
          "**Audit third-party scripts.** Chat widgets, heat-mapping tools and tag managers regularly cost more INP than the entire application.",
        ],
      },
      {
        type: "callout",
        title: "Third-party scripts are usually the answer",
        text: "When we audit a site with poor INP, the cause is a third-party script roughly two times out of three. Load them with `defer`, gate them behind interaction where possible, and measure each one's cost individually before deciding it earns its place.",
      },
      { type: "h2", text: "Fixing CLS — mostly reserved space", id: "fixing-cls" },
      {
        type: "list",
        items: [
          "Set explicit `width` and `height` (or `aspect-ratio`) on every image and video.",
          "Reserve space for ad slots and embeds rather than letting them push content down on arrival.",
          "Avoid injecting banners, cookie notices or promotional bars above existing content after first paint.",
          "Use `font-display: optional` or match fallback metrics with `size-adjust` to prevent text reflow when the web font loads.",
          "Trigger animations on `transform` and `opacity`, never on properties that affect layout.",
        ],
      },
      { type: "h2", text: "A sensible order of operations", id: "order-of-operations" },
      {
        type: "list",
        ordered: true,
        items: [
          "Pull **field data** from Search Console — fix what real users experience, not what your laptop reports.",
          "Segment by device. Mobile fails far more often, and mobile is what is assessed.",
          "Fix **LCP first**. It fails most often and has the clearest link to conversion.",
          "Then **CLS**, because the fixes are cheap and mostly mechanical.",
          "Then **INP**, which usually means renegotiating your third-party script inventory.",
          "Re-measure after 28 days — the rolling window means changes do not appear immediately.",
        ],
      },
      {
        type: "p",
        text: "If your vitals are failing and you would rather not spend a quarter of engineering time on it, this is a standard part of our [SEO services](/services/seo-services) engagements. And if you are wondering how long any of this takes to affect traffic, we wrote about [realistic SEO timelines](/blog/how-long-does-seo-take) separately.",
      },
    ],
    faqs: [
      {
        question: "Are Core Web Vitals a ranking factor in 2026?",
        answer:
          "Yes, as part of the page experience signals, but a comparatively weak one. Relevance and authority matter considerably more. The stronger argument for fixing them is conversion rate and crawl efficiency rather than a direct ranking gain.",
      },
      {
        question: "What replaced First Input Delay?",
        answer:
          "Interaction to Next Paint (INP) replaced FID in March 2024. INP is a stricter measure because it assesses the full interaction latency across all interactions on the page rather than only the first input's delay.",
      },
      {
        question: "Why does my Lighthouse score differ from Search Console?",
        answer:
          "Lighthouse runs a simulated lab test on your machine. Search Console reports field data — the 75th percentile of real users over 28 days, on their devices and networks. Field data is what Google assesses, so treat it as authoritative when the two disagree.",
      },
      {
        question: "How long until Core Web Vitals improvements show up?",
        answer:
          "Field data uses a rolling 28-day window, so expect around four weeks before improvements are fully reflected in Search Console, and up to eight weeks before any associated ranking effect becomes visible.",
      },
    ],
    related: ["how-long-does-seo-take", "how-much-does-a-website-cost"],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getRelatedPosts(post: Post): Post[] {
  return post.related
    .map((slug) => getPost(slug))
    .filter((entry): entry is Post => Boolean(entry));
}

/** Newest first — used by the blog hub and the homepage teaser. */
export const sortedPosts = [...posts].sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
);

export const postSlugs = posts.map((post) => post.slug);

/** Extracts h2 headings for the on-page table of contents. */
export function getTableOfContents(post: Post) {
  return post.blocks
    .filter((block): block is Extract<Block, { type: "h2" }> => block.type === "h2")
    .map((block) => ({ id: block.id, text: block.text }));
}
