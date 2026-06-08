// Lead submission. Writes to Supabase when configured; otherwise simulates
// success so the UI keeps working in dev/preview without keys.

import { supabase, isSupabaseConfigured } from "./supabase";

export type LeadKind = "seller" | "investor" | "partner" | "contact";

const TABLE: Record<LeadKind, string> = {
  seller: "seller_leads",
  investor: "investor_leads",
  partner: "partner_leads",
  contact: "contact_messages",
};

/** Convert a camelCase form payload into the snake_case DB column shape. */
function toRow(kind: LeadKind, p: Record<string, unknown>): Record<string, unknown> {
  const s = (v: unknown) => (v === "" || v === undefined ? null : v);
  const num = (v: unknown) =>
    v === "" || v === undefined || v === null ? null : Number(v);

  const common = {
    first_name: s(p.firstName),
    last_name: s(p.lastName),
    phone: s(p.phone),
    email: s(p.email),
  };

  switch (kind) {
    case "seller":
      return {
        ...common,
        address: s(p.address),
        city: s(p.city),
        bedrooms: num(p.bedrooms),
        bathrooms: num(p.bathrooms),
        property_type: s(p.propertyType),
        condition: s(p.condition),
        timeline: s(p.timeline),
        notes: s(p.notes),
      };
    case "investor":
      return {
        ...common,
        strategy: s(p.strategy),
        property_types: p.propertyTypes ?? [],
        zip_codes: s(p.zipCodes),
        price_range: s(p.priceRange),
        rehab_level: s(p.rehabLevel),
        financing: s(p.financing),
        portfolio_size: s(p.portfolioSize),
        experience: s(p.experience),
        notes: s(p.notes),
      };
    case "partner":
      return {
        ...common,
        partner_type: s(p.partnerType),
        experience: s(p.experience),
        message: s(p.message),
      };
    case "contact":
      return {
        ...common,
        inquiry_type: s(p.inquiryType),
        property_type: s(p.propertyType),
        strategy: s(p.strategy),
        target_areas: s(p.targetAreas),
        partner_type: s(p.partnerType),
        experience: s(p.experience),
        message: s(p.message),
      };
  }
}

export async function submitLead(
  kind: LeadKind,
  payload: Record<string, unknown>
): Promise<{ ok: true }> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from(TABLE[kind]).insert(toRow(kind, payload));
    if (error) {
      // eslint-disable-next-line no-console
      console.error(`[lead:${kind}] supabase insert failed`, error.message);
      throw new Error("We couldn't submit your information. Please try again.");
    }
    return { ok: true };
  }

  // Fallback — no Supabase keys yet. Simulate a successful submission.
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.info(`[lead:${kind}] (no Supabase configured — simulated)`, payload);
  }
  await new Promise((r) => setTimeout(r, 700));
  return { ok: true };
}
