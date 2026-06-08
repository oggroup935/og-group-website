import { ShieldCheck, MessageSquare, Home, ClipboardCheck } from "lucide-react";

export const sellData = {
  hero: {
    eyebrow: "Sell Your Property",
    headline: "Why Property Owners Reach Out To Us",
    subtitle:
      "A professional, no-pressure way to explore selling your property — on your terms, on your timeline.",
    primaryCTA: { label: "Get a Cash Offer", href: "#submit" },
  },

  benefitsStrip: [
    "No Obligation",
    "Professional Communication",
    "As-Is Opportunities",
    "Simple Process",
  ],

  whySellers: [
    {
      title: "No Obligation",
      icon: ShieldCheck,
      description:
        "Reaching out costs you nothing and commits you to nothing. It's simply a conversation.",
    },
    {
      title: "Professional Communication",
      icon: MessageSquare,
      description:
        "Clear, respectful communication from first contact to final decision.",
    },
    {
      title: "As-Is Opportunities",
      icon: Home,
      description:
        "No repairs, no cleaning, no staging required. We review properties in their current condition.",
    },
    {
      title: "A Simple Process",
      icon: ClipboardCheck,
      description:
        "A straightforward path with no confusing paperwork or high-pressure tactics.",
    },
  ],

  // Section 3 — Selling Process (4 steps)
  process: [
    { step: "01", title: "Tell Us About The Property", description: "Share a few details about your property and your situation." },
    { step: "02", title: "Property Review", description: "We review the property and the local market carefully." },
    { step: "03", title: "Conversation & Evaluation", description: "We have a real conversation and evaluate the opportunity together." },
    { step: "04", title: "Explore Potential Next Steps", description: "If it's a fit, we walk through clear potential next steps — no pressure." },
  ],

  // Section 4 — Property Types We Review
  propertyTypes: [
    "Single Family Homes",
    "Duplexes",
    "Multifamily",
    "Rental Properties",
    "Inherited Properties",
    "Value-Add Opportunities",
  ],

  // Section — "After You Reach Out" (removes anxiety)
  afterYouReachOut: {
    title: "After You Reach Out",
    description:
      "Submitting your information is not a commitment. There's no obligation and no pressure. A member of our team reviews your property and reaches out for a personal conversation to understand your goals. From there, we explore whether there's a fit — together.",
  },

  // Dropdown options (mirror types/index.ts)
  options: {
    propertyType: ["Single Family", "Duplex", "Triplex", "Fourplex", "Multifamily", "Other"],
    condition: ["Excellent", "Good", "Average", "Needs Updates", "Major Repairs Needed"],
    timeline: ["ASAP", "1-3 Months", "3-6 Months", "Just Exploring"],
  },

  finalCTA: {
    title: "Let's Start The Conversation",
    subtitle: "No obligation. No pressure. Just a professional conversation about your property.",
  },
};
