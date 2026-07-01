import type { Metadata } from "next";
import { CheckCircle2, XCircle, Users, ArrowRight } from "lucide-react";
import { jvData } from "@/data/jv";
import { Container, Section } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { ImageBand } from "@/components/shared/ImageBand";
import { images } from "@/lib/images";
import PartnerForm from "@/components/forms/PartnerForm";

export const metadata: Metadata = {
  title: "JV Partners",
  description:
    "Partner with OG GROUP. We work with acquisition partners, lead generators, and operators to build something bigger than a single deal in Cleveland.",
};

export default function PartnersPage() {
  const d = jvData;
  return (
    <>
      <PageHero
        badge={d.hero.badge}
        title={d.hero.headline}
        subtitle={d.hero.subtitle}
        cta={{ label: "Partner With Us", href: "#apply" }}
        image={images.clevelandSkyline}
      />

      {/* The Reality Of The Business */}
      <Section className="bg-navy">
        <Container className="max-w-3xl text-center">
          <SectionHeading eyebrow="The Reality" title={d.reality.title} />
          <Reveal>
            <p className="mt-6 text-lg leading-relaxed text-cream/70">{d.reality.body}</p>
          </Reveal>
        </Container>
      </Section>

      {/* Who We're Looking For */}
      <Section className="bg-cream/[0.04]">
        <Container>
          <SectionHeading eyebrow="Who We're Looking For" title="Roles We Partner With" />
          <div className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-3">
            {d.lookingFor.map((role, i) => (
              <Reveal key={role} delay={i}>
                <span className="inline-flex items-center gap-2 rounded-full border border-cream/10 bg-cream/[0.06] px-5 py-2.5 text-sm font-medium text-cream shadow-sm">
                  <Users className="h-4 w-4 text-gold" />
                  {role}
                </span>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* What We Bring (yes/no — Truth-Only) */}
      <Section className="bg-navy text-cream">
        <Container>
          <SectionHeading light eyebrow="Honest Positioning" title={d.whatWeBring.title} />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {/* Don't bring */}
            <Reveal>
              <div className="h-full rounded-2xl border border-cream/10 bg-cream/[0.03] p-7">
                <h3 className="font-display text-lg font-semibold text-cream/90">
                  What We Don&apos;t Claim
                </h3>
                <ul className="mt-5 space-y-3">
                  {d.whatWeBring.dontBring.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-cream/60">
                      <XCircle className="h-5 w-5 shrink-0 text-red-400/70" />
                      <span className="text-sm line-through decoration-cream/40">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            {/* Do bring */}
            <Reveal delay={1}>
              <div className="h-full rounded-2xl border border-gold/30 bg-gold/[0.06] p-7">
                <h3 className="font-display text-lg font-semibold text-gold">
                  What We Actually Bring
                </h3>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {d.whatWeBring.doBring.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.title} className="flex items-start gap-2.5">
                        <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                        <span className="text-sm font-medium text-cream/90">{item.title}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Why Cleveland + Why Partners */}
      <Section className="bg-navy">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <Reveal>
              <div className="rounded-2xl border border-cream/10 bg-cream/[0.04] p-8 shadow-sm">
                <h3 className="font-display text-2xl font-semibold text-cream">{d.whyCleveland.title}</h3>
                <p className="mt-4 leading-relaxed text-cream/65">{d.whyCleveland.body}</p>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div className="rounded-2xl border border-cream/10 bg-cream/[0.04] p-8 shadow-sm">
                <h3 className="font-display text-2xl font-semibold text-cream">
                  Why Partners Work With Us
                </h3>
                <ul className="mt-5 space-y-3">
                  {d.whyPartners.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-cream/70">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-gold" />
                      <span className="text-sm">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <ImageBand
        src={images.streetAlt2}
        alt="Residential street"
        kicker="Cleveland, Ohio"
      />

      {/* Partnership Models */}
      <Section className="bg-cream/[0.04]">
        <Container>
          <SectionHeading eyebrow="Partnership Models" title="Ways We Work Together" />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {d.partnershipModels.map((m, i) => {
              const Icon = m.icon;
              return (
                <Reveal key={m.title} delay={i}>
                  <div className="h-full rounded-2xl border border-cream/10 bg-cream/[0.04] p-7">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-semibold text-cream">{m.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-cream/60">{m.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* How Collaboration Works */}
      <Section className="bg-navy">
        <Container>
          <SectionHeading eyebrow="How Collaboration Works" title="A Clear, Repeatable Process" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {d.collaboration.map((s, i) => (
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

      {/* Principles + Ideal Partner */}
      <Section className="bg-cream/[0.04]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading align="left" className="mx-0" eyebrow="Partnership Principles" title="How We Operate" />
              <div className="mt-8 space-y-4">
                {d.principles.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <Reveal key={p.title} delay={i}>
                      <div className="flex gap-4 rounded-xl border border-cream/10 bg-cream/[0.04] p-5">
                        <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                        <div>
                          <h4 className="font-semibold text-cream">{p.title}</h4>
                          <p className="mt-0.5 text-sm text-cream/60">{p.description}</p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
            <div>
              <SectionHeading align="left" className="mx-0" eyebrow="The Ideal Partner" title="Who Thrives Here" />
              <div className="mt-8 space-y-4">
                {d.idealPartner.map((p, i) => (
                  <Reveal key={p.title} delay={i}>
                    <div className="flex gap-4 rounded-xl border border-cream/10 bg-cream/[0.04] p-5">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                      <div>
                        <h4 className="font-semibold text-cream">{p.title}</h4>
                        <p className="mt-0.5 text-sm text-cream/60">{p.description}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* What Happens Next */}
      <Section className="bg-navy text-cream">
        <Container>
          <SectionHeading light eyebrow="What Happens Next" title="From Application To Partnership" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {d.whatHappensNext.map((s, i) => (
              <Reveal key={s.title} delay={i}>
                <div className="h-full rounded-2xl border border-cream/10 bg-cream/[0.03] p-6">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-sm font-bold text-navy">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-cream">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/60">{s.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Application Form */}
      <Section id="apply" className="bg-navy">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="Strategic Partner Application"
            title="Let's Talk"
            subtitle={d.finalCTA.subtitle}
          />
          <div className="mt-10">
            <PartnerForm />
          </div>
        </Container>
      </Section>

      {/* Future Vision */}
      <Section className="bg-cream/[0.04]">
        <Container className="max-w-3xl text-center">
          <SectionHeading eyebrow="Future Vision" title={d.futureVision.title} />
          <Reveal>
            <p className="mt-6 text-lg leading-relaxed text-cream/70">{d.futureVision.body}</p>
          </Reveal>
          <Reveal>
            <a
              href="#apply"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-navy"
            >
              Start your application <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
