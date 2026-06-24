export const site = {
  name: "Prologue Partners",
  domain: "https://prologue.partners",
  tagline: "Product and growth partners for the zero-to-one stretch.",
  hero: {
    h1: "Every company has a first chapter. We help you write it.",
    sub: "Product and growth partners for the zero-to-one stretch.",
    cta: "Start the conversation",
  },
  nav: [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#experience" },
    { label: "About", href: "#partners" },
    { label: "Contact", href: "#contact" },
  ],
  services: [
    { title: "Product Strategy", outcome: "Decide what to build, and the roadmap to get there." },
    { title: "Growth & GTM", outcome: "Positioning, messaging, and the motion that wins your first customers." },
    { title: "AI Enablement", outcome: "Put AI to work inside your product and your team, practically." },
    { title: "Fractional Leadership", outcome: "An embedded product or growth lead while you build the bench." },
    { title: "Product & Growth Audits", outcome: "A clear read on what is working, what is not, and what to do next." },
  ],
  process: [
    { step: "01", title: "Conversation", body: "We start with your real challenge, not a sales script. The first session is free." },
    { step: "02", title: "Analysis", body: "We go deep on product, team, and data to find the constraint." },
    { step: "03", title: "Execution", body: "Strategy, coaching, or embedded leadership. We help you ship." },
  ],
  about: {
    eyebrow: "Who we are",
    headline: "We don't give advice we haven't lived.",
    body: [
      "Prologue Partners is two operators, not a consultancy of theorists. Between us, 18+ years building and growing companies across fintech, ecommerce, and AI, with scar tissue from Web3 and logistics too, on three continents.",
      "We partner with founders in the hardest, most decisive stretch: zero to one. The part where positioning, product, and the first real customers are still uncertain, and the decisions you make set the shape of everything after.",
    ],
  },
  experience: {
    eyebrow: "Track record",
    headline: "Experience built at companies across fintech, ecommerce, and AI.",
    note: "Named clients and outcomes are being cleared for public use. The work is real; the logos are coming.",
  },
  partners: [
    {
      name: "Wayne van Niekerk",
      role: "Growth",
      monogram: "WvN",
      body: "Fractional head of growth. GTM, marketing, content, pricing, ecosystem and partnerships. Deep in fast-moving frontier markets where the playbook is still being written.",
    },
    {
      name: "Josh Stubbs",
      role: "Product",
      monogram: "JS",
      body: "Product strategy and delivery. Fintech and KYC/compliance depth. Building and leading teams from scratch, then handing them something that runs without him.",
    },
  ],
  contactEmail: "hello@prologue.partners",
} as const;
