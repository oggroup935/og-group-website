import type { Opportunity } from "@/types";
import { Target, Clock, Users } from "lucide-react";

export const opportunitiesContent = {
  hero: {
    eyebrow: "Current Opportunities — A Private Market Perspective",
    headline: "Properties Viewed Through An Investment Lens",
    subtitle:
      "We don't sell properties. We present opportunities — evaluated carefully and shared with serious investors.",
  },

  philosophy: {
    title: "Every Opportunity Tells A Different Story",
    principles: [
      { title: "Market Focus", icon: Target, description: "Concentrated expertise in the Cleveland market." },
      { title: "Long-Term Thinking", icon: Clock, description: "We evaluate every deal beyond a single transaction." },
      { title: "Investor-First", icon: Users, description: "Opportunities are matched to investor strategy and goals." },
    ],
  },

  // Qualitative snapshot — NO fake numbers (Truth-Only).
  snapshot: [
    "Cleveland Focus",
    "Off-Market",
    "Multiple Strategies",
    "Active Investor Network",
  ],

  filters: {
    propertyType: ["All", "Single Family", "Duplex", "Triplex", "Fourplex", "Multifamily", "Other"],
    strategy: ["All", "Buy & Hold", "Value Add", "Rental", "Fix & Flip", "BRRRR"],
  },

  howItWorks: [
    "Review the opportunity summary",
    "Register your interest",
    "Connect with the team",
    "Receive full details",
    "Evaluate the fit",
  ],

  investorAccess: {
    title: "Full Details Available To Registered Investors",
    description:
      "Detailed numbers, the full deal package, and direct communication are shared privately with our registered investor network. Public listings show opportunity summaries only.",
    cta: { label: "Join the Investor Network", href: "/buyers" },
  },

  emptyState: {
    title: "New Opportunities Added Regularly",
    description:
      "We're always sourcing off-market deals in Cleveland. Join our buyers list to be first to know when a new opportunity matches your criteria.",
    cta: { label: "Join Our Buyers List", href: "/buyers" },
  },
};

// Placeholder opportunities. TODO: replace with Supabase data at step 8.
// Only public-safe fields are rendered anywhere on the site.
export const sampleOpportunities: Opportunity[] = [
  {
    id: "cle-001",
    title: "Off-Market Single Family — West Side",
    address: "Address shared with registered investors",
    city: "Cleveland, OH",
    state: "OH",
    status: "Available",
    propertyType: "Single Family",
    summary:
      "A solid value-add single family in an established West Side neighborhood. Strong rental fundamentals with light cosmetic upside.",
    strategyTags: ["Buy & Hold", "Value Add", "Rental"],
    beds: 3,
    baths: 1,
    sqft: 1320,
    images: [],
    created_at: "2026-05-20T12:00:00.000Z",
  },
  {
    id: "cle-002",
    title: "Off-Market Duplex — Old Brooklyn",
    address: "Address shared with registered investors",
    city: "Cleveland, OH",
    state: "OH",
    status: "Under Contract",
    propertyType: "Duplex",
    summary:
      "Up/down duplex with both units in rentable condition. Investor-friendly cash flow profile in a steady rental pocket.",
    strategyTags: ["Buy & Hold", "Rental"],
    beds: 4,
    baths: 2,
    sqft: 2040,
    images: [],
    created_at: "2026-05-12T12:00:00.000Z",
  },
  {
    id: "cle-003",
    title: "Off-Market Fourplex — Cleveland",
    address: "Address shared with registered investors",
    city: "Cleveland, OH",
    state: "OH",
    status: "Sold",
    propertyType: "Fourplex",
    summary:
      "Door-count growth opportunity. Recently matched with an investor in our network focused on small multifamily.",
    strategyTags: ["Multifamily", "Buy & Hold"],
    beds: 8,
    baths: 4,
    sqft: 3600,
    images: [],
    created_at: "2026-04-28T12:00:00.000Z",
  },
];
