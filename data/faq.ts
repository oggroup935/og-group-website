// FAQ — Knowledge Center. Questions are locked (from the Master Bible).
// Answers authored in the OG GROUP brand voice: Truth-Only, professional,
// benefit-oriented, no fake stats or pressure. Review/adjust copy as needed.

export type FAQItem = {
  question: string;
  answer: string;
  isPlaceholder?: boolean;
};

export type FAQGroup = {
  audience: string;
  items: FAQItem[];
};

export const faqData = {
  hero: {
    badge: "Knowledge Center",
    headline: "Answers To Common Questions",
    subtitle: "Clear answers for property owners, investors, and partners.",
  },

  groups: [
    {
      audience: "Property Owners",
      items: [
        {
          question: "Do I need to repair my property first?",
          answer:
            "No. We review properties exactly as they are — no repairs, cleaning, or staging required. Whether the property is outdated, vacant, inherited, or needs significant work, it's still worth a conversation.",
        },
        {
          question: "Is there any obligation?",
          answer:
            "None at all. Reaching out is simply the start of a conversation. There's no cost, no commitment, and no pressure — you decide if and how you'd like to move forward.",
        },
        {
          question: "How does the process work?",
          answer:
            "It's straightforward. You share a few details about the property, we review it alongside the local market, we have a real conversation to understand your goals, and together we explore potential next steps. Professional and clear at every stage.",
        },
        {
          question: "What types of properties do you review?",
          answer:
            "Single family homes, duplexes, multifamily, rental properties, inherited properties, and value-add opportunities across the Cleveland area. If you're unsure whether yours fits, reach out — we're happy to take a look.",
        },
        {
          question: "How quickly will someone contact me?",
          answer:
            "A member of our team personally reviews every submission and reaches out to start the conversation. You'll always hear from a real person — never an automated reply.",
        },
      ],
    },
    {
      audience: "Investors",
      items: [
        {
          question: "What opportunities do you typically share?",
          answer:
            "Off-market opportunities in the Cleveland market — single family, small multifamily, fourplexes, rental portfolios, value-add, and distressed properties — shared to match your investment strategy.",
        },
        {
          question: "Do I need to be local?",
          answer:
            "No. We work with investors based both in the U.S. and abroad. What matters is your investment criteria, not your location — many of our investors operate entirely remotely.",
        },
        {
          question: "How do I join the network?",
          answer:
            "Register through our Investor Network page with your strategy and criteria. We review your profile, add you to the private network, and share opportunities that fit as they become available — private, confidential, and no spam.",
        },
        {
          question: "Is there a minimum budget?",
          answer:
            "We work across a range of price points and strategies, so there's no single fixed minimum. Share your target range when you register and we'll focus on the opportunities that match it.",
        },
      ],
    },
  ] as FAQGroup[],
};
