/**
 * Service catalogue.
 *
 * Each entry renders a full landing page at /services/[slug] and feeds the
 * services hub, the footer, the sitemap and the Service JSON-LD schema.
 *
 * Scope rule: only list services that can genuinely be delivered at the prices
 * in src/lib/packages.ts. Nothing here promises a ranking, a traffic number or
 * a revenue figure — those are neither deliverable nor safe to advertise when
 * you are taking card payments.
 */

export type Deliverable = {
  title: string;
  body: string;
};

export type ProcessStep = {
  title: string;
  body: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type Service = {
  slug: string;
  /** Short label used in navigation and cards */
  name: string;
  /** Primary target keyword — drives the H1 */
  h1: string;
  /** <title> — keep under ~60 characters */
  metaTitle: string;
  /** meta description — aim for 140-158 characters */
  metaDescription: string;
  /** One-line summary used on cards and the services hub */
  excerpt: string;
  /** Opening paragraph of the landing page */
  intro: string;
  icon: string;
  startingPrice: number;
  priceUnit: string;
  timeline: string;
  outcomes: string[];
  deliverables: Deliverable[];
  process: ProcessStep[];
  faqs: Faq[];
  /** Slugs of related services for internal linking */
  related: string[];
};

export const services: Service[] = [
  {
    slug: "seo-services",
    name: "SEO Services",
    h1: "Affordable SEO Services for Small Businesses",
    metaTitle: "Affordable SEO Services from $35 | OVAL",
    metaDescription:
      "Fixed-price SEO for small businesses in the US and UK. Website audits from $35, full on-page setup from $60. Clear scope, fast turnaround, no monthly contract.",
    excerpt:
      "Audits and on-page optimisation at a fixed price — find what is broken, then get it fixed properly.",
    intro:
      "Most small business websites have never had SEO done to them at all. Missing title tags, no sitemap, images with no alt text, pages Google cannot even reach. None of that is complicated to fix — it is just unglamorous, and agencies charging four figures a month are not interested in doing it. We are. Fixed price, clear scope, and you keep everything we produce.",
    icon: "search",
    startingPrice: 35,
    priceUnit: "audit",
    timeline: "3–5 business days",
    outcomes: [
      "A written list of every technical and on-page issue on your site, ranked by priority",
      "Title tags, meta descriptions and headings written for the keywords you should be targeting",
      "Google Search Console and Analytics 4 properly set up so you can see what is happening",
      "Schema markup, sitemap and robots.txt in place",
    ],
    deliverables: [
      {
        title: "Technical crawl",
        body: "We crawl up to 100 pages and check indexing, redirects, broken links, duplicate content and anything blocking search engines from reading your site.",
      },
      {
        title: "Keyword research",
        body: "30–50 keywords your customers actually search, mapped to the right page on your site, with the intent behind each one noted.",
      },
      {
        title: "On-page optimisation",
        body: "Title tags and meta descriptions rewritten, heading structure corrected, alt text added, and internal links built between your important pages.",
      },
      {
        title: "Speed and Core Web Vitals",
        body: "A mobile and desktop performance report with the specific fixes that would move each metric, rather than a generic 'compress your images'.",
      },
      {
        title: "Schema markup",
        body: "Organisation and LocalBusiness structured data added so search engines understand who you are, where you are, and what you sell.",
      },
      {
        title: "Tracking setup",
        body: "Search Console and Google Analytics 4 verified and configured, plus your sitemap submitted, so there is a record of what happens next.",
      },
    ],
    process: [
      {
        title: "1. You send us the URL",
        body: "That is genuinely all we need to start the audit. Search Console access makes it better, but it is optional.",
      },
      {
        title: "2. We audit",
        body: "Two to three business days. You get a written report with every issue ranked high, medium or low, and a plain-English summary of the top five.",
      },
      {
        title: "3. We implement (optional)",
        body: "If you take the On-Page SEO Setup package, we make the fixes ourselves on up to 10 pages rather than handing you a to-do list.",
      },
      {
        title: "4. Handover",
        body: "A note listing every change made, and answers to your follow-up questions in writing. No lock-in, no retainer, nothing to cancel.",
      },
    ],
    faqs: [
      {
        question: "How much do SEO services cost?",
        answer:
          "Our Website SEO Audit is $35 and the On-Page SEO Setup, where we implement the fixes for you, is $60. Both are one-time payments with no ongoing contract. Most agencies charge $1,000–$5,000 per month; we keep prices low by selling fixed, clearly-scoped packages rather than open-ended retainers.",
      },
      {
        question: "How long does SEO take to work?",
        answer:
          "Technical fixes like removing an indexing blocker can show up within days. On-page changes to existing pages typically take four to eight weeks to affect rankings. Competitive commercial keywords take many months and sustained content work. We can tell you honestly where your site sits after the audit — and if the answer is that SEO will not help you yet, we will say so.",
      },
      {
        question: "Do you guarantee first-page rankings?",
        answer:
          "No, and you should be careful of anyone who does. Nobody controls Google's index. What we do guarantee is the work: every item in the package scope is delivered, or you get your money back under our refund policy.",
      },
      {
        question: "Is a $35 SEO audit any good?",
        answer:
          "It is a genuine 15–20 page audit, not an automated tool export with our logo on it. We keep the price low because the process is standardised and we are building a client base. What you do not get at this price is a custom content strategy or ongoing management — those are different services at different prices.",
      },
      {
        question: "Do you work with UK businesses?",
        answer:
          "Yes — the United States and United Kingdom are the two markets we serve. UK sites are researched against google.co.uk rather than assuming US search behaviour transfers, and we write in British English where your audience expects it. Prices are in US dollars, and UK customers are not charged US sales tax.",
      },
    ],
    related: ["local-seo", "web-design-and-development", "content-writing"],
  },
  {
    slug: "web-design-and-development",
    name: "Web Design & Development",
    h1: "Affordable Web Design & Development",
    metaTitle: "Affordable Web Design & Development from $149 | OVAL",
    metaDescription:
      "Fixed-price websites for small businesses in the US and UK. Landing pages from $149, full 5-page sites from $299. Fast, mobile-first, SEO-ready and yours to keep.",
    excerpt:
      "Fast, mobile-first websites built at a fixed price — launched, optimised and fully owned by you.",
    intro:
      "You do not need a $15,000 website. What you need is a fast, credible site that loads in under two seconds on a phone, says clearly what you do, and gives people an obvious way to contact you. That is what we build — at a fixed price, in one to two weeks, with the SEO groundwork already in place rather than sold to you as a separate project later.",
    icon: "layout",
    startingPrice: 149,
    priceUnit: "project",
    timeline: "7–14 business days",
    outcomes: [
      "A live, responsive website that loads fast on mobile",
      "A clear path from landing on the page to contacting you",
      "On-page SEO, schema markup and analytics configured at launch",
      "Full ownership — the code, the domain and every account is in your name",
    ],
    deliverables: [
      {
        title: "Custom design",
        body: "Designed around your brand and your customers, not dropped into a template everyone else is using. Responsive across mobile, tablet and desktop.",
      },
      {
        title: "Conversion-focused structure",
        body: "Hero, benefits, proof, FAQ and a clear call to action — the page order that consistently turns visitors into enquiries.",
      },
      {
        title: "Fast by default",
        body: "Images compressed and converted to modern formats, fonts loaded properly, Core Web Vitals in the green before we hand over.",
      },
      {
        title: "Working contact form",
        body: "Form submissions delivered straight to your inbox, with spam protection built in. Tested before launch.",
      },
      {
        title: "SEO built in",
        body: "Titles, meta descriptions, heading structure, alt text, schema markup, sitemap and Search Console verification — all included, not an upsell.",
      },
      {
        title: "Launch and handover",
        body: "Deployed on your domain with SSL and hosting configured, plus a recorded walkthrough so you can update your own content.",
      },
    ],
    process: [
      {
        title: "1. Brief",
        body: "A short questionnaire covering what you do, who you sell to and what you want visitors to do. Fifteen minutes of your time.",
      },
      {
        title: "2. Design",
        body: "You see the design before anything is built. Two to three rounds of revisions depending on the package.",
      },
      {
        title: "3. Build",
        body: "We build, optimise and test across browsers and devices. You get a staging link to review before it goes live.",
      },
      {
        title: "4. Launch",
        body: "Domain, SSL, hosting, analytics and Search Console all set up. Then everything transfers into your accounts.",
      },
    ],
    faqs: [
      {
        question: "How much does a website cost?",
        answer:
          "Our Landing Page Build is $149 for a single page and our 5-Page Business Website is $299. Extra pages are $45 each. Both are one-time payments that include design, build, SEO setup, hosting configuration and launch. There are no monthly fees unless you choose the optional $25/month maintenance add-on.",
      },
      {
        question: "How can you build a website for $299?",
        answer:
          "By keeping the scope fixed and the process tight. We build on modern frameworks with a component system we reuse, we do not run a large team with an office to pay for, and we are building our client base. What you are not buying at this price is unlimited revisions, custom illustration, or a complex ecommerce build — those need a bigger budget and we will tell you so.",
      },
      {
        question: "How long does it take?",
        answer:
          "Seven business days for a landing page and fourteen for a five-page site, counted from when you send us your content. Content is almost always what causes delays, so if you have not written it yet, tell us and we will send a questionnaire that draws it out of you.",
      },
      {
        question: "Do I own the website?",
        answer:
          "Completely. The domain, hosting, code, design files and every third-party account are in your name from the start and stay with you. There is no proprietary platform, nothing to license, and leaving costs you nothing.",
      },
      {
        question: "Do you offer ecommerce websites?",
        answer:
          "Not at these prices. A proper ecommerce build with payments, inventory and shipping is a considerably larger project. If that is what you need, we would rather point you elsewhere than sell you something that does not fit.",
      },
      {
        question: "What if I do not like the design?",
        answer:
          "You see the design before we build anything, and revisions are included — two rounds on the Landing Page, three on the 5-Page Website. If we cannot get to something you are happy with during the design stage, you can cancel for a full refund. See our refund policy for the detail.",
      },
    ],
    related: ["seo-services", "brand-identity-design", "content-writing"],
  },
  {
    slug: "local-seo",
    name: "Local SEO",
    h1: "Local SEO & Google Business Profile Optimisation",
    metaTitle: "Local SEO & Google Business Profile from $50 | OVAL",
    metaDescription:
      "Get your business found on Google Maps. Business Profile setup and optimisation from $50 for local service businesses across the US and UK. One-time fee.",
    excerpt:
      "Get found on Google Maps — Business Profile setup, optimisation and local listing consistency.",
    intro:
      "If you serve customers in a specific area, the Google map results matter more than anything else on the page. Most small businesses either have never claimed their Business Profile, or claimed it and filled in three fields. Fixing that is one of the highest-return hours anyone can spend on a local business, and it does not require a monthly retainer to do.",
    icon: "pin",
    startingPrice: 50,
    priceUnit: "setup",
    timeline: "3–5 business days",
    outcomes: [
      "A claimed, verified and fully completed Google Business Profile",
      "Consistent name, address and phone details across the major directories",
      "Location-relevant content and schema markup on your website",
      "A simple, repeatable way to ask customers for reviews",
    ],
    deliverables: [
      {
        title: "Profile claim and verification",
        body: "We claim your Google Business Profile, walk you through verification, and merge or remove duplicate listings competing with your real one.",
      },
      {
        title: "Full profile optimisation",
        body: "Primary and secondary categories, services list, opening hours, service area, attributes and a description written for how people actually search.",
      },
      {
        title: "Photo and post setup",
        body: "Your images uploaded, named and organised correctly, plus your first Google Post published and a template so you can keep going.",
      },
      {
        title: "Citation consistency",
        body: "Your name, address and phone number checked and corrected across the major directories, so conflicting data stops undermining your listing.",
      },
      {
        title: "LocalBusiness schema",
        body: "Structured data added to your website connecting it to your profile, with address, hours and service area marked up properly.",
      },
      {
        title: "Review request system",
        body: "A short review link and a message template you can send after every job — the single most effective thing a local business can do.",
      },
    ],
    process: [
      {
        title: "1. Audit what exists",
        body: "We check whether a profile already exists, whether there are duplicates, and how your details appear across directories today.",
      },
      {
        title: "2. Claim and verify",
        body: "Google verification can take a few days and sometimes needs a postcard to your address. We handle the process and tell you exactly what to expect.",
      },
      {
        title: "3. Optimise",
        body: "Every field completed, categories chosen deliberately, photos uploaded, description written, schema added to your site.",
      },
      {
        title: "4. Hand over",
        body: "Ownership of the profile stays with you. You get the review link, the posting template and a short guide to keeping it current.",
      },
    ],
    faqs: [
      {
        question: "How much does Google Business Profile optimisation cost?",
        answer:
          "$50 as a one-time setup, or included free in our $299 5-Page Business Website package. There is no monthly fee — once a profile is set up properly, keeping it current takes you a few minutes a month, and we show you how.",
      },
      {
        question: "How long until I show up on Google Maps?",
        answer:
          "Verification usually takes two to seven days, and sometimes requires a postcard from Google to your business address, which can take longer. After verification, profiles typically begin appearing in local results within a few weeks. Where you rank depends on your category's competitiveness, your proximity to the searcher and your review count — none of which anyone can guarantee.",
      },
      {
        question: "Do I need a physical address?",
        answer:
          "Not necessarily. Service-area businesses can hide their address and set a service radius instead, which suits trades, mobile services and home-based businesses. You do need a real address to verify with, even if it is not shown publicly.",
      },
      {
        question: "Can you get me more reviews?",
        answer:
          "We set up the system that makes asking easy — a short link and a message template you send after each job. We will not write reviews or buy them. Fake reviews violate Google's policies, get profiles suspended, and in the US can attract FTC penalties.",
      },
    ],
    related: ["seo-services", "web-design-and-development", "content-writing"],
  },
  {
    slug: "content-writing",
    name: "Content Writing",
    h1: "SEO Content Writing for Small Business Websites",
    metaTitle: "SEO Content Writing from $40 per Article | OVAL",
    metaDescription:
      "Website copy and SEO blog posts written for small businesses in the US and UK. From $40 per article. Researched, edited and optimised — never raw AI output.",
    excerpt:
      "Website copy and blog articles researched, written and optimised for the terms your customers search.",
    intro:
      "Search engines cannot rank a page that does not answer anything. Most small business sites have a homepage, a services page with two paragraphs, and nothing else — which leaves every question your customers type into Google being answered by a competitor. We write the pages that answer them, structured so both Google and AI search engines can pull the answer out.",
    icon: "pen",
    startingPrice: 40,
    priceUnit: "article",
    timeline: "4–6 business days",
    outcomes: [
      "Pages that answer the questions your customers are actually searching",
      "Content structured with proper headings, FAQs and schema so it can be cited",
      "Copy that reads like a person wrote it, because one did",
      "Internal links routing readers toward your contact or booking page",
    ],
    deliverables: [
      {
        title: "Keyword and question research",
        body: "We find the specific phrasing and questions your customers use before writing a word, so the piece targets demand that exists.",
      },
      {
        title: "Researched, written article",
        body: "1,000–1,500 words, drafted and then genuinely edited. We use AI for research and outlining; the writing and the editing are human.",
      },
      {
        title: "On-page optimisation",
        body: "Title, meta description, heading hierarchy, image alt text and internal links to your commercial pages, all included.",
      },
      {
        title: "FAQ section with schema",
        body: "A question-and-answer block at the end, marked up with FAQPage structured data — the format most likely to earn a rich result or an AI citation.",
      },
      {
        title: "Website copy rewrites",
        body: "Not just blog posts. We rewrite homepage, service and about page copy when the problem is that your existing pages do not say anything specific.",
      },
    ],
    process: [
      {
        title: "1. Topic and angle",
        body: "You tell us the subject, or we suggest topics from the keyword research in your audit. We agree the angle before writing.",
      },
      {
        title: "2. Outline",
        body: "For longer pieces you approve a brief outline first, so we are not writing 1,500 words in the wrong direction.",
      },
      {
        title: "3. Draft and edit",
        body: "Written, then edited properly. Facts checked, claims sourced, filler removed.",
      },
      {
        title: "4. Delivery",
        body: "Supplied as a formatted document, or published directly to your site if we built it. Two rounds of revisions included.",
      },
    ],
    faqs: [
      {
        question: "How much does SEO content writing cost?",
        answer:
          "$40 per article of 1,000–1,500 words, including keyword research, on-page optimisation and an FAQ section with schema markup. Website page rewrites are quoted individually and usually fall between $30 and $60 per page depending on length.",
      },
      {
        question: "Do you use AI to write the content?",
        answer:
          "We use AI for research, keyword clustering and outlining, where it genuinely helps. The drafting and editing are done by a person. Unedited AI content reads as generic, gets outranked by anything with real specificity, and increasingly fails to earn citations — so it would be a bad deal for you even if it were cheaper for us.",
      },
      {
        question: "How many articles do I need?",
        answer:
          "Fewer, better pieces beat volume every time for a small site. Four to six well-researched articles covering the questions your customers ask will do more than thirty thin ones. Start with one, see whether the style fits, then decide.",
      },
      {
        question: "Will the content rank?",
        answer:
          "That depends on your site's authority, your competition and the keyword — none of which we control, so we do not promise rankings. What we control is that the piece is well researched, correctly optimised, properly structured and genuinely worth reading.",
      },
    ],
    related: ["seo-services", "web-design-and-development", "local-seo"],
  },
  {
    slug: "brand-identity-design",
    name: "Logo & Brand Design",
    h1: "Affordable Logo & Brand Identity Design",
    metaTitle: "Affordable Logo & Brand Design from $75 | OVAL",
    metaDescription:
      "Logo design and brand basics for new businesses in the US and UK. Three concepts, all file formats, colour and type system. From $75, delivered in a week.",
    excerpt:
      "A logo and the basic brand system around it — colours, type and files that work everywhere.",
    intro:
      "A new business needs a mark that looks deliberate, a colour palette that works on a screen and in print, and files in the formats every platform asks for. It does not need a twelve-week brand strategy engagement. We do the first thing properly and skip the second until you are big enough to need it.",
    icon: "sparkles",
    startingPrice: 75,
    priceUnit: "project",
    timeline: "5–7 business days",
    outcomes: [
      "A logo that stays legible at favicon size and on a shopfront",
      "A colour palette with accessible contrast, so it works for everyone",
      "Every file format you will be asked for, organised and ready",
      "A one-page guide so anyone you hire stays consistent",
    ],
    deliverables: [
      {
        title: "Three logo concepts",
        body: "Three distinct directions, presented in realistic applications rather than floating on a white page, so you can judge them properly.",
      },
      {
        title: "Final logo suite",
        body: "Primary mark, stacked and horizontal variants, an icon-only version for avatars and favicons, plus one-colour and reversed versions.",
      },
      {
        title: "Colour and type system",
        body: "A palette with hex, RGB and CMYK values and checked contrast ratios, plus a font pairing with clear rules on when to use each.",
      },
      {
        title: "All file formats",
        body: "SVG, PNG with transparency, JPG, PDF and favicon set — organised in folders so you can find what you need without asking.",
      },
      {
        title: "One-page brand guide",
        body: "Clear spacing, minimum sizes, do-and-don't examples. Short enough that people will actually read it before using your logo.",
      },
    ],
    process: [
      {
        title: "1. Brief",
        body: "A short questionnaire on what you do, who you serve, and which brands you admire or want to avoid looking like.",
      },
      {
        title: "2. Three concepts",
        body: "Presented within three to four business days, shown in context so you can see how each would actually feel in use.",
      },
      {
        title: "3. Refine",
        body: "You pick one direction and we refine it. Two rounds of revisions on the chosen concept are included.",
      },
      {
        title: "4. Package and deliver",
        body: "Every variant, every format and the brand guide, delivered in an organised folder. Full commercial rights transfer to you.",
      },
    ],
    faqs: [
      {
        question: "How much does logo design cost?",
        answer:
          "$75 for three concepts, two rounds of revisions on your chosen direction, the full file suite and a one-page brand guide. Adding it to a website package brings the total down — ask when you enquire.",
      },
      {
        question: "Do I own the logo?",
        answer:
          "Yes. Full commercial rights transfer to you on final payment, including the source files. You can trademark it, print it, and use it however you like without coming back to us.",
      },
      {
        question: "What if I do not like any of the three concepts?",
        answer:
          "It happens, usually because the brief was not specific enough. We will do one further round of concepts free, working from a tightened brief. If that still does not land, you can cancel and get a partial refund under our refund policy.",
      },
      {
        question: "Can you match my existing brand?",
        answer:
          "Yes — if you have a logo you want to keep, we can build the rest of the system around it, or modernise it while keeping what people already recognise. Tell us what exists and we will say honestly whether it is worth keeping.",
      },
    ],
    related: ["web-design-and-development", "content-writing", "seo-services"],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getRelatedServices(service: Service): Service[] {
  return service.related
    .map((slug) => getService(slug))
    .filter((entry): entry is Service => Boolean(entry));
}

export const serviceSlugs = services.map((service) => service.slug);
