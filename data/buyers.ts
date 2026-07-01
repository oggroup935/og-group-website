import {
  Target,
  ShieldCheck,
  Network,
  Handshake,
  TrendingUp,
  RefreshCw,
  Hammer,
  Building2,
  Wallet,
  LineChart,
} from "lucide-react";

export const buyersData = {
  hero: {
    badge: "Private Investor Network",
    headline: "Join A Network Built Around Real Deals",
    subtitle:
      "Not a generic buyers list — a private network of serious investors with direct access to Cleveland opportunities.",
    primaryCTA: { label: "Join The Investor Network", href: "#register" },
  },

  // Section 2 — Why Join (4 cards: "Built For Serious Investors")
  whyJoin: [
    { title: "Direct Access", icon: Target, description: "Opportunities you won't find on the MLS, matched to your strategy." },
    { title: "Verified & Focused", icon: ShieldCheck, description: "A Cleveland-focused pipeline, evaluated through an investment lens." },
    { title: "An Active Network", icon: Network, description: "Real relationships with a team that communicates professionally." },
    { title: "Relationship-Driven", icon: Handshake, description: "Built for long-term partnerships, not one-off transactions." },
  ],

  // Section 3 — What Type Of Opportunities
  opportunityTypes: [
    "Single Family",
    "Fourplexes",
    "Small Multifamily",
    "Rental Portfolios",
    "Value-Add",
    "Distressed",
  ],

  // Section 4 — Strategy Cards
  strategies: [
    { title: "Buy & Hold", icon: Building2, description: "Long-term rental income." },
    { title: "BRRRR", icon: RefreshCw, description: "Buy, Rehab, Rent, Refinance, Repeat." },
    { title: "Fix & Flip", icon: Hammer, description: "Renovate and resell." },
    { title: "Multifamily", icon: TrendingUp, description: "Door count growth." },
    { title: "Cash Buyers", icon: Wallet, description: "Quick acquisition opportunities." },
    { title: "Portfolio Expansion", icon: LineChart, description: "Scaling existing holdings." },
  ],

  // Section 5 — How The Network Works (4 steps)
  howItWorks: [
    { step: "01", title: "Register Your Profile", description: "Tell us your strategy, target areas, and criteria." },
    { step: "02", title: "We Match Opportunities", description: "We share deals that fit your specific investment profile." },
    { step: "03", title: "Connect Directly", description: "Get the full deal package and talk directly with our team." },
    { step: "04", title: "Evaluate The Fit", description: "Review the numbers and decide on your own terms." },
  ],

  // Section 6 — Why Investors Work With Us
  whyInvestors: [
    "Built around professional relationships",
    "Cleveland market focus and expertise",
    "Clear, honest communication",
    "Strategy-matched opportunities",
  ],

  // Section 8 — What Happens After You Register
  afterRegister: [
    { title: "Profile Review", description: "We review your investment criteria and strategy." },
    { title: "Criteria Matching", description: "We align your profile with our opportunity pipeline." },
    { title: "Network Integration", description: "You're added to the private investor network." },
    { title: "Opportunity Matching", description: "You receive deals that fit as they come available." },
  ],

  trustStrip: [
    "Private & Confidential",
    "Professional Communication",
    "No Spam",
    "Relationship Focused",
  ],

  // Registration wizard dropdown options
  options: {
    strategy: ["Buy & Hold", "BRRRR", "Fix & Flip", "Multifamily", "Cash Buyer", "Other"],
    propertyTypes: ["Single Family", "Duplex", "Triplex", "Fourplex", "Multifamily", "Other"],
    rehabLevel: ["Turnkey", "Light", "Moderate", "Heavy", "Any"],
    financing: ["Cash", "Hard Money", "Private Capital", "Conventional Financing", "Other"],
    experience: ["New Investor", "1-3 Deals", "4-10 Deals", "10+ Deals"],
  },

  finalCTA: {
    title: "Let's Build Something Long-Term",
    subtitle: "Join a network of serious investors with access to real opportunities.",
  },
};
