import { Flame, Target, Handshake, Clock } from "lucide-react";

export const aboutData = {
  hero: {
    eyebrow: "The Story Behind OG GROUP",
    headline: "Built On Vision, Systems, And Trust",
    subtitle:
      "OG GROUP is a Cleveland-focused real estate investment platform connecting sellers, serious investors, and strategic partners.",
  },

  mission: {
    title: "Our Mission",
    body:
      "OG GROUP connects sellers, serious investors, and strategic partners through real estate opportunities in Cleveland, Ohio — with professionalism, transparency, and a long-term mindset.",
  },

  vision: {
    title: "Our Vision",
    body:
      "To build a recognized, systems-driven real estate investment organization — an ecosystem where opportunities, capital, and operators meet. Bigger than a single transaction, a single year, or a single market.",
  },

  // Section 4 — What Drives Us (Four Pillars)
  pillars: [
    { title: "Ambition", icon: Flame, description: "We are driven by growth and the pursuit of excellence." },
    { title: "Discipline", icon: Target, description: "We believe consistency beats motivation." },
    { title: "Relationships", icon: Handshake, description: "The strongest businesses are built on trust." },
    { title: "Long-Term Thinking", icon: Clock, description: "We are focused on where we will be years from now, not weeks from now." },
  ],

  // Section 5 — Why Real Estate
  whyRealEstate: {
    title: "Why Real Estate",
    body:
      "Real estate is more than property. It's people. It's families. It's investors. It's opportunity. It's one of the few industries where vision, discipline, and relationships compound over time. That's what attracted us to it. And that's what keeps us committed.",
  },

  // Section 8 — A Note From The Founders
  // CONTENT PENDING — real founders story to be supplied later.
  foundersNote: {
    title: "A Note From The Founders",
    // TODO: Replace with the founders' real, verbatim story once supplied by the client.
    body:
      "We're still at the beginning. We're still learning. We're still improving. We're still building. And that's exactly what excites us. Every relationship. Every conversation. Every challenge. Every opportunity. They all become part of the journey with us. The best chapters are still ahead.",
    isPlaceholder: true,
  },

  finalCTA: {
    title: "Let's Build Something Meaningful",
    subtitle: "Whether you're selling, investing, or partnering — we'd like to hear from you.",
    buttons: [
      { label: "Sell Your Property", href: "/sell" },
      { label: "Join Investor Network", href: "/buyers" },
      { label: "Explore Partnerships", href: "/partners" },
    ],
  },
};
