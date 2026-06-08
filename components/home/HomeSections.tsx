import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeData } from "@/data/home";
import { Container, Section } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { TrustBadges } from "@/components/shared/TrustBadges";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* 2 — Trust Strip */
export function TrustStrip() {
  return (
    <div className="border-b border-navy/10 bg-cream">
      <Container className="py-8">
        <TrustBadges items={homeData.trust} />
      </Container>
    </div>
  );
}

/* 3 — Who We Help */
export function WhoWeHelp() {
  return (
    <Section className="bg-cream">
      <Container>
        <SectionHeading
          eyebrow="Who We Help"
          title="A Platform For Three Sides Of Every Deal"
          subtitle="We connect motivated sellers, serious investors, and strategic partners — each through a clear, professional path."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {homeData.whoWeHelp.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={i}>
                <div className="group flex h-full flex-col rounded-2xl border border-navy/10 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold transition-colors group-hover:bg-gold group-hover:text-navy">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-navy/60">
                    {item.description}
                  </p>
                  <Link
                    href={item.cta.href}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 transition-colors hover:text-navy"
                  >
                    {item.cta.label}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

/* 4 — How It Works */
export function HowItWorks() {
  return (
    <Section className="bg-white">
      <Container>
        <SectionHeading
          eyebrow="How It Works"
          title="A Simple, Professional Process"
          subtitle="No pressure, no confusion — just a clear path from first conversation to next steps."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {homeData.howItWorks.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.step} delay={i}>
                <div className="relative h-full rounded-2xl border border-navy/10 bg-cream/60 p-6">
                  <span className="font-display text-4xl font-semibold text-gold/30">
                    {item.step}
                  </span>
                  <div className="mt-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gold-soft text-gold-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy/60">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

/* 5 — Why OG GROUP (Four Pillars) */
export function WhyOG() {
  return (
    <Section className="bg-navy text-cream">
      <Container>
        <SectionHeading
          light
          eyebrow="Why OG GROUP"
          title="Built On What's Real"
          subtitle="We don't lead with inflated numbers. We lead with what we can actually deliver."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {homeData.whyOGGroup.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={i}>
                <div className="h-full rounded-2xl border border-cream/10 bg-cream/[0.03] p-6 transition-colors hover:border-gold/40 hover:bg-cream/[0.06]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 text-gold">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-cream">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/60">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

/* 7 — Final CTA (3 routes) */
export function FinalCTA() {
  const { finalCTA } = homeData;
  return (
    <Section className="bg-cream">
      <Container>
        <SectionHeading eyebrow="Get Started" title={finalCTA.title} subtitle={finalCTA.subtitle} />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {finalCTA.routes.map((route, i) => (
            <Reveal key={route.title} delay={i}>
              <div className="flex h-full flex-col items-start rounded-2xl border border-navy/10 bg-white p-7 shadow-sm">
                <h3 className="font-display text-xl font-semibold text-navy">
                  {route.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-navy/60">
                  {route.description}
                </p>
                <Link
                  href={route.cta.href}
                  className={cn(buttonVariants({ variant: "primary" }), "mt-6 w-full")}
                >
                  {route.cta.label}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
