"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Scroll *through* a cloud bank that parts to reveal a new world (image).
 * Enter = fog; scroll = clouds drift apart; exit = the world behind is revealed.
 */
export function CloudTransition({
  src,
  kicker,
  height = "h-[80vh]",
}: {
  src: string;
  kicker?: string;
  height?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const s = reduce ? 0 : 1;
  // Clouds cover early, part as you scroll through
  const leftX = useTransform(scrollYProgress, [0.15, 0.85], ["0%", `-${80 * s}%`]);
  const rightX = useTransform(scrollYProgress, [0.15, 0.85], ["0%", `${80 * s}%`]);
  const fog = useTransform(scrollYProgress, [0.1, 0.4, 0.75], [1, 0.9, 0]);
  const imgScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.25, 1]);

  return (
    <div ref={ref} className={`relative w-full overflow-hidden bg-navy ${height}`}>
      {/* World behind the clouds */}
      <motion.div style={{ scale: imgScale }} className="absolute inset-0">
        <Image src={src} alt="" fill sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-navy/55" />

      {kicker && (
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <motion.span
            style={{ opacity: useTransform(scrollYProgress, [0.55, 0.8], [0, 1]) }}
            className="rounded-full border border-gold/40 bg-navy/70 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.28em] text-gold backdrop-blur-sm"
          >
            {kicker}
          </motion.span>
        </div>
      )}

      {/* Cloud banks (parting) */}
      <motion.div style={{ x: leftX, opacity: fog }} className="absolute -left-1/4 top-0 z-20 h-full w-3/4 blur-[55px]">
        <div className="h-full w-full" style={{ background: "radial-gradient(closest-side, rgba(247,245,242,0.92), rgba(247,245,242,0.4) 60%, transparent 80%)" }} />
      </motion.div>
      <motion.div style={{ x: rightX, opacity: fog }} className="absolute -right-1/4 top-0 z-20 h-full w-3/4 blur-[55px]">
        <div className="h-full w-full" style={{ background: "radial-gradient(closest-side, rgba(247,245,242,0.92), rgba(247,245,242,0.4) 60%, transparent 80%)" }} />
      </motion.div>
      <motion.div style={{ opacity: fog }} className="absolute inset-0 z-20 blur-[40px]" >
        <div className="h-full w-full" style={{ background: "radial-gradient(120% 80% at 50% 50%, rgba(247,245,242,0.6), transparent 70%)" }} />
      </motion.div>
    </div>
  );
}
