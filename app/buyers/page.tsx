import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { buyersData } from "@/data/buyers";
import { Container, Section } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { TrustBadges } from "@/components/shared/TrustBadges";
import { ImageBand } from "@/components/shared/ImageBand";
import { images } from "@/lib/images";
import BuyerWizard from "@/components/forms/BuyerWizard";

export const metadata: Metadata = {
  title: "Investor Network",
  description:
    "Join the OG GROUP Investor Network — a private network with direct access to Cleveland investment opportunities matched to your strategy.",
};

export default function BuyersPage() {
  const d = buyersData;
  return (
    <>
      <PageHero
        badge={d.hero.badge}
        title={d.hero.headline}
        subtitle={d.hero.subtitle}
        cta={{ label: "Join The Investor Network", href: "#register" }}
        image={images.urbanAve}
      />

      {/* Why Join */}
      <Section className="bg-navy">
        <Container>
          <SectionHeading eyebrow="Why Join" title="Built For Serious Investors" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {d.whyJoin.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={i}>
                  <div className="h-full rounded-2xl border border-cream/10 bg-cream/[0.04] p-6 shadow-sm">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-gold">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold text-cream">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-cream/60">{item.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Opportunity Types */}
      <Section className="bg-cream/[0.04]">
        <Container>
          <SectionHeading eyebrow="What Type Of Opportunities" title="The Deals We Share" />
          <div className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-3">
            {d.opportunityTypes.map((t, i) => (
              <Reveal key={t} delay={i}>
                <span className="rounded-full border border-cream/10 bg-cream/[0.06] px-5 py-2.5 text-sm font-medium text-cream shadow-sm">
                  {t}
                </span>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Strategy Cards */}
      <Section className="bg-navy text-cream">
        <Container>
          <SectionHeading light eyebrow="Investor Strategies" title="However You Invest" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {d.strategies.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.title} delay={i}>
                  <div className="h-full rounded-2xl border border-cream/10 bg-cream/[0.03] p-6 transition-colors hover:border-gold/40">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 text-gold">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-semibold text-cream">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-cream/60">{s.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <ImageBand
        src={images.clevelandSkyline}
        alt="Cleveland skyline"
        kicker="Cleveland, Ohio"
      />

      {/* How The Network Works */}
      <Section className="bg-navy">
        <Container>
          <SectionHeading eyebrow="How The Network Works" title="A Simple Process" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {d.howItWorks.map((s, i) => (
              <Reveal key={s.step} delay={i}>
                <div className="h-full rounded-2xl border border-cream/10 bg-cream/[0.04] p-6 shadow-sm">
                  <span className="font-display text-4xl font-semibold text-gold/30">{s.step}</span>
                  <h3 className="mt-3 font-display text-lg font-semibold text-cream">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/60">{s.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Why Investors + After Register */}
      <Section className="bg-cream/[0.04]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading align="left" className="mx-0" eyebrow="Why Investors Work With Us" title="Built Around Relationships" />
              <ul className="mt-8 space-y-3">
                {d.whyInvestors.map((p, i) => (
                  <Reveal key={p} delay={i}>
                    <li className="flex items-center gap-3 rounded-xl border border-cream/10 bg-cream/[0.04] px-5 py-4 text-cream/75">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-gold" />
                      <span className="text-sm font-medium">{p}</span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading align="left" className="mx-0" eyebrow="After You Register" title="What Happens Next" />
              <div className="mt-8 space-y-4">
                {d.afterRegister.map((s, i) => (
                  <Reveal key={s.title} delay={i}>
                    <div className="flex gap-4 rounded-xl border border-cream/10 bg-cream/[0.04] p-5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-bold text-navy">
                        {i + 1}
                      </span>
                      <div>
                        <h4 className="font-semibold text-cream">{s.title}</h4>
                        <p className="mt-0.5 text-sm text-cream/60">{s.description}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Registration Form */}
      <Section id="register" className="bg-navy">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="Registration"
            title="Join The Network"
            subtitle="Tell us your strategy and criteria — we'll match you with opportunities that fit."
          />
          <div className="mt-10">
            <BuyerWizard />
          </div>
          <div className="mt-8">
            <TrustBadges items={d.trustStrip.map((t) => ({ label: t }))} />
          </div>
        </Container>
      </Section>
    </>
  );
}
