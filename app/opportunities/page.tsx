import type { Metadata } from "next";
import Link from "next/link";
import { Lock, ArrowRight } from "lucide-react";
import { opportunitiesContent, sampleOpportunities } from "@/data/opportunities";
import { Container, Section } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { OpportunityList } from "@/components/opportunities/OpportunityList";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Current Opportunities",
  description:
    "Off-market investment properties in Cleveland, viewed through an investment lens. Full details shared with our registered investor network.",
};

export default function OpportunitiesPage() {
  const d = opportunitiesContent;
  return (
    <>
      <PageHero badge={d.hero.eyebrow} title={d.hero.headline} subtitle={d.hero.subtitle} />

      {/* Philosophy */}
      <Section className="bg-cream">
        <Container>
          <SectionHeading eyebrow="Our Philosophy" title={d.philosophy.title} />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {d.philosophy.principles.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} delay={i}>
                  <div className="h-full rounded-2xl border border-navy/10 bg-white p-7 shadow-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-semibold text-navy">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy/60">{p.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Snapshot — qualitative, no fake numbers */}
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {d.snapshot.map((s, i) => (
              <Reveal key={s} delay={i}>
                <span className="rounded-full border border-gold/30 bg-gold-soft px-5 py-2 text-sm font-semibold text-gold-600">
                  {s}
                </span>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Listings + filters */}
      <Section className="bg-white">
        <Container>
          <SectionHeading
            align="left"
            className="mx-0"
            eyebrow="Current Market Opportunities"
            title="Browse Off-Market Deals"
            subtitle="Public summaries only. Detailed numbers are shared with registered investors."
          />
          <div className="mt-10">
            <OpportunityList opps={sampleOpportunities} />
          </div>
        </Container>
      </Section>

      {/* Private Investor Access */}
      <Section className="bg-navy text-cream">
        <Container className="max-w-3xl">
          <Reveal>
            <div className="rounded-3xl border border-gold/30 bg-gold/[0.06] p-8 text-center sm:p-12">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold">
                <Lock className="h-6 w-6" />
              </div>
              <h2 className="mt-6 font-display text-2xl font-semibold text-cream sm:text-3xl">
                {d.investorAccess.title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl leading-relaxed text-cream/70">
                {d.investorAccess.description}
              </p>
              <Link
                href={d.investorAccess.cta.href}
                className={cn(buttonVariants({ variant: "primary", size: "lg" }), "mt-8")}
              >
                {d.investorAccess.cta.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* How It Works */}
      <Section className="bg-cream">
        <Container>
          <SectionHeading eyebrow="How It Works" title="From Interest To Information" />
          <ol className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-5">
            {d.howItWorks.map((step, i) => (
              <Reveal key={step} delay={i}>
                <li className="flex h-full flex-col items-center rounded-2xl border border-navy/10 bg-white p-5 text-center shadow-sm">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-sm font-bold text-navy">
                    {i + 1}
                  </span>
                  <p className="mt-3 text-sm font-medium text-navy/75">{step}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>
    </>
  );
}
