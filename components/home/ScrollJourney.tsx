"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";

type Step = { step: string; title: string; description: string; icon: React.ComponentType<{ className?: string }> };

/**
 * Cinematic sticky "journey" — scroll position selects ONE active phase. Each
 * phase fully replaces the last (AnimatePresence: old exits, then new enters),
 * and the world (background image) crossfades in lockstep. Ends on the last step.
 */
export function ScrollJourney({
  steps,
  bg,
  eyebrow,
  title,
  subtitle,
}: {
  steps: Step[];
  bg: string[];
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const n = steps.length;
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.max(0, Math.min(n - 1, Math.floor(v * n)));
    setActive((prev) => (prev === idx ? prev : idx));
  });

  const current = steps[active];
  const Icon = current.icon;

  return (
    <section ref={ref} className="relative bg-navy" style={{ height: `${n * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Crossfading world backgrounds — only the active one shows */}
        {bg.map((src, i) => (
          <motion.div
            key={src}
            initial={false}
            animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1.03 : 1.12 }}
            transition={{ opacity: { duration: 0.9, ease: "easeInOut" }, scale: { duration: 6, ease: "easeOut" } }}
            className="absolute inset-0"
          >
            <Image src={src} alt="" fill sizes="100vw" priority={i === 0} className="object-cover" />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/75 to-navy/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/60" />

        {/* Heading */}
        <div className="absolute inset-x-0 top-0 z-10 pt-24 sm:pt-28">
          <SectionHeading light eyebrow={eyebrow} title={title} subtitle={subtitle} />
        </div>

        {/* Progress rail */}
        <div className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-end gap-4 sm:flex">
          {steps.map((s, i) => (
            <div key={s.step} className="flex items-center gap-2.5">
              <span
                className={cn(
                  "font-display text-sm font-bold transition-all duration-300",
                  active === i ? "text-gold" : "text-gold/35"
                )}
              >
                {s.step}
              </span>
              <span
                className={cn(
                  "block rounded-full bg-gold transition-all duration-300",
                  active === i ? "h-3 w-3" : "h-2 w-2 bg-gold/40"
                )}
              />
            </div>
          ))}
        </div>

        {/* Pinned step content — exactly one at a time */}
        <div className="absolute inset-0 z-10 mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8">
          <div className="relative w-full max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-4">
                  <span className="font-display text-7xl font-bold text-gold/50 sm:text-8xl">{current.step}</span>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/30 bg-gold/10 text-gold">
                    <Icon className="h-7 w-7" />
                  </div>
                </div>
                <h3 className="mt-6 font-display text-5xl font-semibold leading-[0.95] tracking-tight text-cream sm:text-7xl">
                  {current.title}
                </h3>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-cream/80">{current.description}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
