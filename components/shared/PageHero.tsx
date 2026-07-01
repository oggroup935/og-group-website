"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

/** Reusable cinematic hero for inner pages — parallax photo + navy wash. */
export function PageHero({
  eyebrow,
  badge,
  title,
  subtitle,
  badges,
  cta,
  image,
  children,
}: {
  eyebrow?: string;
  badge?: string;
  title: string;
  subtitle?: string;
  badges?: string[];
  cta?: { label: string; href: string };
  image?: string;
  children?: React.ReactNode;
}) {
  const tag = badge ?? eyebrow;
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "20%"]);

  return (
    <section
      ref={ref}
      className="relative -mt-20 flex min-h-[60vh] items-center overflow-hidden bg-navy text-cream"
    >
      {/* Parallax photo */}
      {image && (
        <motion.div className="absolute inset-0" style={{ y: imgY }}>
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="scale-110 object-cover opacity-40"
          />
        </motion.div>
      )}

      {/* Wash for legibility + brand harmony */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/75 to-navy/95" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-4xl px-5 py-24 pt-32 text-center sm:px-8 sm:py-28 sm:pt-36">
        {tag && (
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            {tag}
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-cream/70"
          >
            {subtitle}
          </motion.p>
        )}

        {cta && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8"
          >
            <Link href={cta.href} className={cn(buttonVariants({ variant: "primary", size: "lg" }))}>
              {cta.label}
            </Link>
          </motion.div>
        )}

        {badges && badges.length > 0 && (
          <ul className="mt-9 flex flex-wrap items-center justify-center gap-2.5">
            {badges.map((b) => (
              <li
                key={b}
                className="rounded-full border border-cream/15 bg-cream/[0.04] px-4 py-1.5 text-sm font-medium text-cream/80 backdrop-blur-sm"
              >
                {b}
              </li>
            ))}
          </ul>
        )}

        {children}
      </div>

      {/* Bottom fade into cream */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream/0 to-transparent" />
    </section>
  );
}
