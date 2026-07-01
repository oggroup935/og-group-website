"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { homeData } from "@/data/home";
import { siteData } from "@/data/site";
import { images } from "@/lib/images";
import { Container, Section } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { TrustBadges } from "@/components/shared/TrustBadges";
import { ImageBand } from "@/components/shared/ImageBand";
import { ParallaxImage } from "@/components/shared/ParallaxImage";
import { ExpandingPanels } from "@/components/home/ExpandingPanels";
import { ScrollJourney } from "@/components/home/ScrollJourney";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* 2 — Trust Strip (dark) */
export function TrustStrip() {
  return (
    <div className="border-y border-cream/10 bg-navy">
      <Container className="py-8">
        <TrustBadges items={homeData.trust} light />
      </Container>
    </div>
  );
}

/* 3 — Who We Help — interactive expanding cinematic panels */
export function WhoWeHelp() {
  return (
    <section className="bg-navy">
      {/* Designed intro — cinematic backdrop */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <Image src={images.groupTalk} alt="" fill sizes="100vw" className="object-cover" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy via-navy/75 to-navy" />
        {/* floating gold orbs */}
        <motion.div
          animate={{ y: [0, -24, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-gold/15 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 24, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-gold/10 blur-3xl"
        />
        {/* grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <Container className="relative py-24 sm:py-32">
          <SectionHeading
            light
            eyebrow="Who We Help"
            title="A Platform For Three Sides Of Every Deal"
            subtitle="We connect sellers, serious investors, and strategic partners — each through a clear, professional path."
          />
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-10 h-px w-40 origin-center bg-gradient-to-r from-transparent via-gold to-transparent"
          />
        </Container>
      </div>

      <ExpandingPanels />
    </section>
  );
}

/* Image Band — Cleveland Skyline */
export function SkylineBand() {
  return (
    <ImageBand
      src={images.clevelandSkyline}
      alt="Cleveland skyline"
      kicker={siteData.location}
      caption={siteData.fullTagline}
    />
  );
}

/* 4 — How It Works — cinematic sticky scroll-journey (worlds shift as you scroll) */
export function HowItWorks() {
  return (
    <ScrollJourney
      eyebrow="How It Works"
      title="A Simple, Professional Process"
      subtitle="No pressure, no confusion — just a clear path from first conversation to next steps."
      steps={homeData.howItWorks}
      bg={[images.streetAlt2, images.standoutHome, images.clevelandSkyline, images.meeting]}
    />
  );
}

/* Image Band — Standout Home */
export function HomeBand() {
  return (
    <ImageBand
      src={images.conversation}
      alt="People in conversation"
      kicker="Relationships First"
    />
  );
}

/* 5 — Why OG GROUP (Four Pillars) — large editorial type on navy */
export function WhyOG() {
  return (
    <Section className="relative overflow-hidden bg-navy text-cream">
      <div className="pointer-events-none absolute inset-0 opacity-[0.12]">
        <Image src={images.handshake} alt="" fill sizes="100vw" className="object-cover" />
      </div>
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <Container className="relative">
        <SectionHeading
          light
          eyebrow="Why OG GROUP"
          title="Built On What's Real"
          subtitle="We don't lead with inflated numbers. We lead with what we can actually deliver."
        />
        <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {homeData.whyOGGroup.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={i}>
                <div className="group border-t border-cream/15 pt-6 transition-colors hover:border-gold/60">
                  <div className="flex items-center gap-4">
                    <span className="font-display text-5xl font-bold text-gold/30 transition-colors group-hover:text-gold/60">
                      0{i + 1}
                    </span>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 text-gold">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="mt-5 font-display text-3xl font-semibold text-cream">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-md text-base leading-relaxed text-cream/60">
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

/* 7 — Final CTA (3 routes) — image-backed glass panels */
export function FinalCTA() {
  const { finalCTA } = homeData;
  return (
    <section className="relative overflow-hidden bg-navy">
      <ParallaxImage src={images.meeting} alt="" overlay="none" intensity={0.16} className="absolute inset-0" />
      <div className="absolute inset-0 bg-navy/85" />

      <Container className="relative py-20 sm:py-28">
        <SectionHeading light eyebrow="Get Started" title={finalCTA.title} subtitle={finalCTA.subtitle} />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {finalCTA.routes.map((route, i) => (
            <Reveal key={route.title} delay={i}>
              <div className="group flex h-full flex-col items-start rounded-2xl border border-cream/15 bg-cream/[0.06] p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/50 hover:bg-cream/[0.1]">
                <h3 className="font-display text-2xl font-semibold text-cream">
                  {route.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-cream/70">
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
    </section>
  );
}
