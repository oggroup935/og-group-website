import {
  Building2,
  Users,
  Handshake,
  Target,
  ShieldCheck,
  Network,
  Sparkles,
  ClipboardList,
  Search,
  MessageSquare,
  ArrowRightLeft,
} from "lucide-react";

export const homeData = {
  hero: {
    eyebrow: "Cleveland, Ohio",
    headline: "Off-Market Investment Opportunities in Cleveland",
    subtitle: "We connect motivated sellers with serious investors.",
    primaryCTA: { label: "Get a Cash Offer", href: "/sell" },
    secondaryCTA: { label: "Join Buyers List", href: "/buyers" },
    // Placeholder stock hero (TODO: replace with a real Cleveland property photo).
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=70",
  },

  // Truth-Only trust signals — no fake numbers.
  trust: [
    { label: "Focused Market", icon: Target },
    { label: "Verified Buyers", icon: ShieldCheck },
    { label: "Clear Process", icon: ClipboardList },
    { label: "Professional Communication", icon: MessageSquare },
  ],

  whoWeHelp: [
    {
      title: "Sellers",
      icon: Building2,
      description:
        "Property owners looking for a straightforward, no-pressure path to selling — on their timeline.",
      cta: { label: "Sell Your Property", href: "/sell" },
    },
    {
      title: "Investors",
      icon: Users,
      description:
        "Serious buyers who want consistent access to off-market opportunities that fit their strategy.",
      cta: { label: "Join the Network", href: "/buyers" },
    },
    {
      title: "Partners",
      icon: Handshake,
      description:
        "Acquisition partners and operators who want to build something larger than a single deal — on top of our own deal flow.",
      cta: { label: "Partner With Us", href: "/partners" },
    },
  ],

  howItWorks: [
    {
      step: "01",
      title: "Reach Out",
      icon: MessageSquare,
      description:
        "Tell us about your property or your investment criteria. No obligation, no pressure.",
    },
    {
      step: "02",
      title: "We Review",
      icon: Search,
      description:
        "We evaluate the opportunity carefully and have a real conversation about the fit.",
    },
    {
      step: "03",
      title: "We Connect",
      icon: ArrowRightLeft,
      description:
        "We match the right opportunity with the right party — sellers, investors, or partners.",
    },
    {
      step: "04",
      title: "Move Forward",
      icon: Handshake,
      description:
        "Explore the next steps with a clear process and professional communication throughout.",
    },
  ],

  // The Four Pillars — "Why OG GROUP".
  whyOGGroup: [
    {
      title: "Vision",
      icon: Sparkles,
      description:
        "We're building a systems-driven investment organization — bigger than any single transaction.",
    },
    {
      title: "Systems",
      icon: ClipboardList,
      description:
        "A clear, repeatable process for sellers, investors, and partners alike.",
    },
    {
      title: "Network",
      icon: Network,
      description:
        "Active relationships with investors, partners, and a dedicated title company.",
    },
    {
      title: "Relationships",
      icon: Handshake,
      description:
        "We think long-term. The strongest businesses are built on trust, not one-off deals.",
    },
  ],

  finalCTA: {
    title: "Three Ways To Work With Us",
    subtitle: "Whether you're selling, investing, or partnering — there's a clear path forward.",
    routes: [
      {
        title: "Sell Your Property",
        description: "Get a straightforward cash offer with no obligation.",
        cta: { label: "Get a Cash Offer", href: "/sell" },
      },
      {
        title: "Join Our Buyers List",
        description: "Access off-market opportunities built around real deals.",
        cta: { label: "Join Buyers List", href: "/buyers" },
      },
      {
        title: "Partner With OG GROUP",
        description: "Build something long-term with an organized team.",
        cta: { label: "Partner With Us", href: "/partners" },
      },
    ],
  },
};
