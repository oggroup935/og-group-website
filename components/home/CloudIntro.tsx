"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Dramatic cinematic entrance — a wall of cloud/fog billows in, a gold light
 * blooms, then the clouds part to reveal the site. Plays once on mount.
 */
export function CloudIntro() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);

  if (reduce || done) return null;

  const cloud = (cls: string, x: string, delay: number) => (
    <motion.div
      className={`absolute h-[140vh] w-[80vw] blur-[60px] ${cls}`}
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 0, x, scale: 1.6 }}
      transition={{ duration: 2.6, delay, ease: [0.5, 0, 0.2, 1] }}
      style={{ background: "radial-gradient(closest-side, rgba(247,245,242,0.96), rgba(247,245,242,0.5) 55%, transparent 78%)" }}
    />
  );

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 2.9, ease: "easeInOut" }}
      onAnimationComplete={() => setDone(true)}
    >
      {/* Base fog */}
      <motion.div
        className="absolute inset-0 bg-cream"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 2.4, delay: 0.5, ease: [0.5, 0, 0.2, 1] }}
      />

      {/* Gold light bloom */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: [0, 0.55, 0], scale: 1.8 }}
        transition={{ duration: 2.8, ease: "easeOut" }}
        style={{ background: "radial-gradient(closest-side, rgba(212,175,55,0.5), transparent 70%)" }}
      />

      {/* Parting cloud banks — dense, billowing */}
      <div className="absolute inset-0 flex items-center justify-center">
        {cloud("-translate-x-1/2 -translate-y-1/4", "-80vw", 0.15)}
        {cloud("translate-x-1/2 -translate-y-1/4", "80vw", 0.15)}
        {cloud("-translate-x-1/3 translate-y-1/4", "-70vw", 0.3)}
        {cloud("translate-x-1/3 translate-y-1/4", "70vw", 0.3)}
        {cloud("-translate-y-1/3", "0vw", 0.45)}
        {cloud("translate-y-1/3", "0vw", 0.55)}
      </div>
    </motion.div>
  );
}
