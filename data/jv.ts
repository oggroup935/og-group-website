import {
  Eye,
  Cog,
  Network,
  Building2,
  Lightbulb,
  Megaphone,
  BadgeCheck,
  CheckCircle2,
  XCircle,
  Repeat,
  Users,
  TrendingUp,
  Magnet,
} from "lucide-react";

export const jvData = {
  hero: {
    badge: "Acquisition Partner Network",
    headline: "Build Something Bigger Than A Single Deal",
    subtitle:
      "We partner with acquisition specialists, operators, and dispo partners who want to grow with an organized, systems-driven team — built on top of our own deal flow.",
    primaryCTA: { label: "Partner With Us", href: "#apply" },
  },

  // Section 2 — The Reality Of The Business
  reality: {
    title: "The Reality Of This Business",
    body:
      "Real estate isn't built on hype. It's built on consistency, systems, and relationships. We're honest about where we are — at the beginning, building deliberately — and we're looking for partners who value that over empty promises.",
  },

  // Section 3 — Who We're Looking For
  // Note: we generate our OWN leads — so we recruit people who CLOSE and operate,
  // not lead generators. Lead generation is listed as a strength we bring.
  lookingFor: [
    "Acquisition Partners",
    "Closers",
    "Follow Up Specialists",
    "Wholesalers",
    "Dispo Partners",
    "Operators",
  ],

  // Section 4 — What We Bring To The Table (Truth-Only)
  whatWeBring: {
    title: "What We Bring To The Table",
    // The honesty that sets the brand apart.
    dontBring: [
      "20 years of experience",
      "500 deals closed",
      "A large downtown office",
      "50 employees",
    ],
    doBring: [
      { title: "In-House Lead Generation — we bring our own deal flow", icon: Magnet },
      { title: "Buyer Network — active investor relationships", icon: Network },
      { title: "Vision, Systems & Organization", icon: Cog },
      { title: "Title Company Relationships", icon: Building2 },
      { title: "Marketing Infrastructure", icon: Megaphone },
      { title: "Professional Branding", icon: BadgeCheck },
      { title: "Long-Term Thinking", icon: Lightbulb },
    ],
  },

  // Section 5 — Why Cleveland
  whyCleveland: {
    title: "Why Cleveland",
    body:
      "Cleveland offers strong rental fundamentals, accessible price points, and consistent investor demand. It's a market where focused acquisition strategies create real opportunity.",
  },

  // Section 6 — Why Acquisition Partners Work With Us
  whyPartners: [
    "Our own lead generation — consistent, in-house deal flow",
    "A real buyer network to dispo to",
    "Professional branding that builds trust",
    "Clear systems and communication",
    "A long-term partnership mindset",
  ],

  // Section 7 — What Success Looks Like
  successLooksLike: {
    title: "What Success Looks Like",
    body:
      "A reliable flow of opportunities, matched to active buyers, with both sides building reputation and income over time. Success here is repeatable — not a single lucky deal.",
  },

  // Section 8 — Partnership Models
  partnershipModels: [
    { title: "Acquisition Partner", icon: Eye, description: "You source deals; we bring buyers, systems, and dispo." },
    { title: "Closing Partner", icon: Magnet, description: "We bring the deal flow and sellers — you help nurture and close." },
    { title: "Dispo Partnership", icon: Network, description: "You bring buyers; we bring inventory and structure." },
  ],

  // Section 9 — How Collaboration Works
  collaboration: [
    { step: "01", title: "Connect", description: "We have an honest conversation about fit and goals." },
    { step: "02", title: "Define Roles", description: "We agree on a clear split of responsibilities." },
    { step: "03", title: "Execute", description: "We run a defined process together, deal by deal." },
    { step: "04", title: "Grow", description: "We build a repeatable system and scale the relationship." },
  ],

  // Section 10 — Partnership Principles
  principles: [
    { title: "Honesty", icon: CheckCircle2, description: "We're transparent about what we can and can't do." },
    { title: "Consistency", icon: Repeat, description: "We show up and follow through, every time." },
    { title: "Mutual Growth", icon: TrendingUp, description: "We win when our partners win." },
    { title: "Reputation", icon: BadgeCheck, description: "We protect the brand and the relationship." },
  ],

  // Section 11 — The Ideal Partner
  idealPartner: [
    { title: "Consistent", description: "Shows up regularly." },
    { title: "Communicative", description: "Responds and follows through." },
    { title: "Accountable", description: "Owns responsibilities." },
    { title: "Growth Minded", description: "Focused on building something larger than individual transactions." },
    { title: "Reputable", description: "Values trust and reputation." },
  ],

  // Section 12 — What Happens Next
  whatHappensNext: [
    { title: "Application Received", description: "We review your background and what you bring." },
    { title: "Intro Conversation", description: "We connect to discuss fit and goals." },
    { title: "Define The Partnership", description: "We agree on roles and a first step." },
    { title: "Start Building", description: "We begin working deals together." },
  ],

  // Application form options
  options: {
    partnerType: [
      "Acquisition Partner",
      "Closer",
      "Follow Up Specialist",
      "Wholesaler",
      "Dispo Partner",
      "Operator",
      "Other",
    ],
    experience: ["New to this", "Some experience", "Experienced", "Very experienced"],
  },

  // Section 14 — Future Vision
  futureVision: {
    title: "Where This Is Going",
    body:
      "We're building an ecosystem where acquisition partners, investors, and operators all grow together. The best chapters are still ahead — and we're choosing the partners we build them with.",
  },

  finalCTA: {
    title: "Let's Build Something Together",
    subtitle: "If you value systems, honesty, and long-term growth — we should talk.",
  },

  // icons re-exported for sections that need yes/no markers
  icons: { yes: CheckCircle2, no: XCircle, who: Users },
};
