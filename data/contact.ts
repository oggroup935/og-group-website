import { Building2, Users, Handshake, MessageSquare } from "lucide-react";

export const contactData = {
  hero: {
    eyebrow: "Connection Hub",
    headline: "Let's Start The Conversation",
    subtitle: "Tell us who you are and how we can help — we'll route you to the right place.",
  },

  // How Can We Help? — 4 cards
  routes: [
    { type: "Property Owner", title: "Property Owners", button: "Seller Inquiry", icon: Building2, description: "You own a property and want to explore selling." },
    { type: "Investor", title: "Investors", button: "Investor Inquiry", icon: Users, description: "You want access to off-market opportunities." },
    { type: "Strategic Partner", title: "Strategic Partners", button: "Partnership Inquiry", icon: Handshake, description: "You want to partner and build together." },
    { type: "General", title: "General", button: "General Inquiry", icon: MessageSquare, description: "Something else? We're happy to help." },
  ],

  // Process strip
  process: [
    { title: "Inquiry Received", description: "Your message reaches our team." },
    { title: "Internal Review", description: "We review and route it to the right person." },
    { title: "Personal Response", description: "We reach out personally — no auto-replies." },
    { title: "Next Steps", description: "We outline clear next steps together." },
  ],

  // Conditional fields by inquiry type
  conditionalOptions: {
    propertyType: ["Single Family", "Duplex", "Triplex", "Fourplex", "Multifamily", "Other"],
    strategy: ["Buy & Hold", "BRRRR", "Fix & Flip", "Multifamily", "Cash Buyer", "Other"],
    partnerType: [
      "Acquisition Partner",
      "Closer",
      "Follow Up Specialist",
      "Wholesaler",
      "Dispo Partner",
      "Operator",
      "Other",
    ],
  },

  finalCTA: {
    title: "Prefer To Reach Out Directly?",
    subtitle: "Call or email us anytime — we'd love to hear from you.",
  },
};
