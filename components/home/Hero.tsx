"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { homeData } from "@/data/home";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const { hero } = homeData;

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-cream">
      {/* Background photo (placeholder) with navy overlay for readability */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src={hero.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/80 to-navy/95" />
      </div>

      {/* Decorative gradient + grid */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-gold/5 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-5 py-24 text-center sm:px-8 sm:py-32">
        <motion.span
          custom={0}
          variants={fade}
          initial="hidden"
          animate="show"
          className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold"
        >
          <MapPin className="h-3.5 w-3.5" />
          {hero.eyebrow}
        </motion.span>

        <motion.h1
          custom={1}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl"
        >
          {hero.headline}
        </motion.h1>

        <motion.p
          custom={2}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-6 max-w-xl text-lg leading-relaxed text-cream/70"
        >
          {hero.subtitle}
        </motion.p>

        <motion.div
          custom={3}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <Link
            href={hero.primaryCTA.href}
            className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
          >
            {hero.primaryCTA.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={hero.secondaryCTA.href}
            className={cn(buttonVariants({ variant: "outlineLight", size: "lg" }))}
          >
            {hero.secondaryCTA.label}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
