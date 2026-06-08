import type { Metadata } from "next";
import Link from "next/link";
import { Quote } from "lucide-react";
import { aboutData } from "@/data/about";
import { Container, Section } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The story behind OG GROUP — a Cleveland-focused real estate investment platform built on vision, systems, and trust.",
};

export default function AboutPage() {
  const d = aboutData;
  return (
    <>
      <PageHero eyebrow={d.hero.eyebrow} title={d.hero.headline} subtitle={d.hero.subtitle} />

      {/* Mission + Vision */}
      <Section className="bg-cream">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-navy/10 bg-white p-8 shadow-sm">
                <h2 className="font-display text-2xl font-semibold text-navy">{d.mission.title}</h2>
                <p className="mt-4 leading-relaxed text-navy/65">{d.mission.body}</p>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div className="h-full rounded-2xl border border-navy/10 bg-navy p-8 text-cream shadow-sm">
                <h2 className="font-display text-2xl font-semibold text-gold">{d.vision.title}</h2>
                <p className="mt-4 leading-relaxed text-cream/70">{d.vision.body}</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Four Pillars */}
      <Section className="bg-white">
        <Container>
          <SectionHeading
            eyebrow="What Drives Us"
            title="The Four Pillars"
            subtitle="The values that guide every decision and every relationship."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {d.pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} delay={i}>
                  <div className="h-full rounded-2xl border border-navy/10 bg-cream/60 p-7">
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
        </Container>
      </Section>

      {/* Why Real Estate */}
      <Section className="bg-navy text-cream">
        <Container className="max-w-3xl text-center">
          <SectionHeading light eyebrow="Why Real Estate" title={d.whyRealEstate.title} />
          <Reveal>
            <p className="mt-6 text-lg leading-relaxed text-cream/75">{d.whyRealEstate.body}</p>
          </Reveal>
        </Container>
      </Section>

      {/* A Note From The Founders (placeholder) */}
      <Section className="bg-cream">
        <Container className="max-w-3xl">
          <Reveal>
            <figure className="relative rounded-3xl border border-gold/30 bg-white p-8 shadow-sm sm:p-12">
              <Quote className="absolute -top-5 left-8 h-12 w-12 text-gold/30" />
              <h2 className="font-display text-2xl font-semibold text-navy">
                {d.foundersNote.title}
              </h2>
              <blockquote className="mt-5 text-lg leading-relaxed text-navy/70">
                {d.foundersNote.body}
              </blockquote>
              {d.foundersNote.isPlaceholder && (
                <figcaption className="mt-5 text-xs font-medium uppercase tracking-wider text-amber-600">
                  Placeholder — final founders&apos; story pending
                </figcaption>
              )}
            </figure>
          </Reveal>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section className="bg-white">
        <Container className="max-w-3xl text-center">
          <SectionHeading eyebrow="Get Started" title={d.finalCTA.title} subtitle={d.finalCTA.subtitle} />
          <div className="mt-8 flex flex-col flex-wrap justify-center gap-3 sm:flex-row">
            {d.finalCTA.buttons.map((b, i) => (
              <Link
                key={b.href}
                href={b.href}
                className={cn(
                  buttonVariants({ variant: i === 0 ? "primary" : "outline", size: "lg" })
                )}
              >
                {b.label}
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
