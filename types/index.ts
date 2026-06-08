// OG GROUP — core data types
// Used across pages + Supabase tables. Keep in sync with the DB schema.
// Two-layer model: public-safe fields are always shown; investor-only
// fields (arv, repairCost, assignmentFee) are NEVER rendered on the public site.

export type OpportunityStatus = "Available" | "Under Contract" | "Sold";

export type PropertyType =
  | "Single Family"
  | "Duplex"
  | "Triplex"
  | "Fourplex"
  | "Multifamily"
  | "Other";

export interface Opportunity {
  id: string;
  title: string;
  address: string; // internal — not shown publicly until investor access
  city: string; // e.g. "Cleveland, OH"
  state: string; // default "OH"
  status: OpportunityStatus;
  propertyType: PropertyType;
  summary: string; // public-safe opportunity summary
  strategyTags: string[]; // ["Buy & Hold", "Value Add", "Rental", ...]
  beds?: number | null;
  baths?: number | null;
  sqft?: number | null;
  images: string[]; // URLs (Supabase storage)
  created_at: string; // ISO timestamp

  // --- Investor-only (NEVER expose on the public site) ---
  price?: number | null;
  arv?: number | null; // After Repair Value
  repairCost?: number | null;
  assignmentFee?: number | null;
}

/** Public-safe projection of an Opportunity — safe to send to the browser. */
export type PublicOpportunity = Omit<
  Opportunity,
  "address" | "price" | "arv" | "repairCost" | "assignmentFee"
>;

export interface SellerLead {
  id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  bedrooms?: number | null;
  bathrooms?: number | null;
  propertyType:
    | "Single Family"
    | "Duplex"
    | "Triplex"
    | "Fourplex"
    | "Multifamily"
    | "Other";
  condition:
    | "Excellent"
    | "Good"
    | "Average"
    | "Needs Updates"
    | "Major Repairs Needed";
  timeline: "ASAP" | "1-3 Months" | "3-6 Months" | "Just Exploring";
  notes?: string | null;
  created_at?: string;
}

export interface InvestorLead {
  id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  strategy: "Buy & Hold" | "BRRRR" | "Fix & Flip" | "Multifamily" | "Cash Buyer" | "Other";
  propertyTypes: string[];
  zipCodes?: string | null;
  priceRange?: string | null;
  rehabLevel?: string | null;
  financing?: "Cash" | "Hard Money" | "Private Capital" | "Conventional Financing" | "Other";
  portfolioSize?: string | null;
  experience?: string | null;
  notes?: string | null;
  created_at?: string;
}

export interface PartnerLead {
  id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  partnerType:
    | "Acquisition Partner"
    | "Closer"
    | "Follow Up Specialist"
    | "Wholesaler"
    | "Dispo Partner"
    | "Operator"
    | "Other";
  experience?: string | null;
  message?: string | null;
  created_at?: string;
}

export type InquiryType =
  | "Property Owner"
  | "Investor"
  | "Strategic Partner"
  | "General";

export interface ContactMessage {
  id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  inquiryType: InquiryType;
  // conditional fields
  propertyType?: string | null;
  strategy?: string | null;
  targetAreas?: string | null;
  partnerType?: string | null;
  experience?: string | null;
  message: string;
  created_at?: string;
}
