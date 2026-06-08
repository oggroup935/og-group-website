import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Bed, Bath, Ruler, MapPin, Lock, ArrowLeft, ArrowRight } from "lucide-react";
import { sampleOpportunities, opportunitiesContent } from "@/data/opportunities";
import { Container, Section } from "@/components/shared/Container";
import { Reveal } from "@/components/shared/Reveal";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// TODO(step 8): fetch from Supabase instead of the sample array.
function getOpportunity(id: string) {
  return sampleOpportunities.find((o) => o.id === id) ?? null;
}

export function generateStaticParams() {
  return sampleOpportunities.map((o) => ({ id: o.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const opp = getOpportunity(id);
  if (!opp) return { title: "Opportunity Not Found" };
  return {
    title: opp.title,
    description: opp.summary,
  };
}

export default async function OpportunityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const opp = getOpportunity(id);
  if (!opp) notFound();

  const specs = [
    opp.beds != null && { icon: Bed, label: `${opp.beds} Bedrooms` },
    opp.baths != null && { icon: Bath, label: `${opp.baths} Bathrooms` },
    opp.sqft != null && { icon: Ruler, label: `${opp.sqft.toLocaleString()} sqft` },
  ].filter(Boolean) as { icon: typeof Bed; label: string }[];

  return (
    <>
      {/* Header */}
      <section className="border-b border-navy/10 bg-navy text-cream">
        <Container className="py-10 sm:py-14">
          <Link
            href="/opportunities"
            className="inline-flex items-center gap-2 text-sm font-medium text-cream/60 transition-colors hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" /> All Opportunities
          </Link>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <StatusBadge status={opp.status} />
                <span className="text-xs font-semibold uppercase tracking-wider text-gold">
                  {opp.propertyType}
                </span>
              </div>
              <h1 className="mt-3 max-w-2xl font-display text-3xl font-semibold leading-tight sm:text-4xl">
                {opp.title}
              </h1>
              <p className="mt-2 flex items-center gap-2 text-cream/60">
                <MapPin className="h-4 w-4 text-gold" /> {opp.city}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Section className="bg-cream">
        <Container>
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Main */}
            <div className="lg:col-span-2">
              {/* Image / placeholder */}
              <div className="flex aspect-[16/9] items-center justify-center rounded-2xl border border-navy/10 bg-gradient-to-br from-navy-50 to-cream text-navy/30">
                <div className="flex flex-col items-center gap-2">
                  <Lock className="h-7 w-7" />
                  <span className="text-sm font-medium">Photos available to registered investors</span>
                </div>
              </div>

              {/* Specs */}
              {specs.length > 0 && (
                <div className="mt-6 grid grid-cols-3 gap-4">
                  {specs.map((s) => {
                    const Icon = s.icon;
                    return (
                      <div
                        key={s.label}
                        className="flex flex-col items-center gap-1.5 rounded-xl border border-navy/10 bg-white p-4 text-center shadow-sm"
                      >
                        <Icon className="h-5 w-5 text-gold-600" />
                        <span className="text-sm font-medium text-navy/75">{s.label}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Summary */}
              <div className="mt-8">
                <h2 className="font-display text-xl font-semibold text-navy">Opportunity Summary</h2>
                <p className="mt-3 leading-relaxed text-navy/70">{opp.summary}</p>
              </div>

              {/* Strategy tags */}
              {opp.strategyTags.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-navy/50">
                    Suited For
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {opp.strategyTags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-gold-soft px-3.5 py-1.5 text-sm font-medium text-gold-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar — investor gate (no private numbers ever shown) */}
            <aside className="lg:col-span-1">
              <Reveal>
                <div className="sticky top-24 rounded-2xl border border-gold/30 bg-white p-7 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold">
                    <Lock className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-navy">
                    Full Deal Package
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy/60">
                    Detailed numbers, the full deal package, photos, and the exact address are
                    shared privately with registered investors.
                  </p>
                  <Link
                    href="/buyers"
                    className={cn(buttonVariants({ variant: "primary" }), "mt-6 w-full")}
                  >
                    Register Interest <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className={cn(buttonVariants({ variant: "outline" }), "mt-3 w-full")}
                  >
                    Ask A Question
                  </Link>
                </div>
              </Reveal>
            </aside>
          </div>

          {/* How it works recap */}
          <div className="mt-16 rounded-2xl border border-navy/10 bg-white p-7 shadow-sm">
            <h3 className="font-display text-lg font-semibold text-navy">How To Move Forward</h3>
            <ol className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
              {opportunitiesContent.howItWorks.map((step, i) => (
                <li key={step} className="flex items-center gap-2 text-sm text-navy/65">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-xs font-bold text-navy">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>
    </>
  );
}
