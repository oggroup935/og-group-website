import type { Metadata } from "next";
import { CheckCircle2, Home } from "lucide-react";
import { sellData } from "@/data/sell";
import { Container, Section } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import SellWizard from "@/components/forms/SellWizard";

export const metadata: Metadata = {
  title: "Sell Your Property",
  description:
    "A professional, no-pressure way to explore selling your Cleveland property. Get a cash offer with no obligation.",
};

export default function SellPage() {
  const d = sellData;
  return (
    <>
      <PageHero
        eyebrow={d.hero.eyebrow}
        title={d.hero.headline}
        subtitle={d.hero.subtitle}
        badges={d.benefitsStrip}
      />

      {/* Why Sellers Work With Us */}
      <Section className="bg-cream">
        <Container>
          <SectionHeading
            eyebrow="Why Sellers Work With Us"
            title="A Better Way To Sell"
            subtitle="No repairs, no pressure, no games — just a professional process built on respect."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {d.whySellers.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={i}>
                  <div className="h-full rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-gold">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold text-navy">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy/60">{item.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Selling Process */}
      <Section className="bg-white">
        <Container>
          <SectionHeading eyebrow="Selling Process" title="Four Simple Steps" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {d.process.map((s, i) => (
              <Reveal key={s.step} delay={i}>
                <div className="h-full rounded-2xl border border-navy/10 bg-cream/60 p-6">
                  <span className="font-display text-4xl font-semibold text-gold/30">{s.step}</span>
                  <h3 className="mt-3 font-display text-lg font-semibold text-navy">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy/60">{s.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Property Types We Review */}
      <Section className="bg-navy text-cream">
        <Container>
          <SectionHeading light eyebrow="Property Types We Review" title="What We Look At" />
          <div className="mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-2">
            {d.propertyTypes.map((t, i) => (
              <Reveal key={t} delay={i}>
                <div className="flex items-center gap-3 rounded-xl border border-cream/10 bg-cream/[0.03] px-5 py-4">
                  <Home className="h-5 w-5 shrink-0 text-gold" />
                  <span className="text-sm font-medium text-cream">{t}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Submission Form */}
      <Section id="submit" className="bg-cream">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="Property Submission"
            title="Tell Us About Your Property"
            subtitle="It takes about a minute. No obligation, ever."
          />
          <div className="mt-10">
            <SellWizard />
          </div>

          {/* After You Reach Out */}
          <Reveal>
            <div className="mt-10 flex gap-4 rounded-2xl border border-gold/30 bg-gold-soft p-6">
              <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-gold-600" />
              <div>
                <h3 className="font-display text-lg font-semibold text-navy">
                  {d.afterYouReachOut.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-navy/70">
                  {d.afterYouReachOut.description}
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
