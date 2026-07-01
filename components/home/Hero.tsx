"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { homeData } from "@/data/home";
import { images } from "@/lib/images";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const { hero } = homeData;

const fade = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.25 + i * 0.16, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "28%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "14%"]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative -mt-20 h-[100svh] min-h-[640px] overflow-hidden bg-navy">
      {/* Parallax + slow Ken Burns settle */}
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.18 }}
          animate={reduce ? {} : { scale: 1.0 }}
          transition={{ duration: 6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={images.heroStreet}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Dark cinematic wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/75 via-navy/45 to-navy/95" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/45 to-transparent" />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_220px_70px_rgba(4,12,28,0.55)]" />


      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-start justify-center px-5 sm:px-8"
        style={{ y: textY, opacity: fadeOut }}
      >
        <div className="max-w-4xl">
          <motion.span
            custom={0}
            variants={fade}
            initial="hidden"
            animate="show"
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-navy/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-gold backdrop-blur-sm"
          >
            <MapPin className="h-3.5 w-3.5" />
            {hero.eyebrow}
          </motion.span>

          <motion.h1
            custom={1}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-6 font-display text-[3.25rem] font-semibold leading-[0.98] tracking-[-0.02em] text-cream sm:text-7xl lg:text-[6.5rem]"
          >
            {hero.headline}
          </motion.h1>

          <motion.p
            custom={2}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-7 max-w-xl text-lg leading-relaxed text-cream/80 sm:text-2xl"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            custom={3}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-col gap-3 sm:flex-row"
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
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: fadeOut }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={reduce ? {} : { y: [0, 9, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-cream/40 p-1.5"
        >
          <span className="h-2 w-1 rounded-full bg-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}
