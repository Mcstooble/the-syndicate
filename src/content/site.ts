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
  contactEmail: "hello@prologue.partners",
} as const;
