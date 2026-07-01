"use client";

import Image from "next/image";
import { gallery } from "@/lib/images";

/**
 * Cinematic film-strip — an infinitely scrolling reel of property & street
 * photography. Pure CSS animation (GPU transform), pauses for reduced-motion.
 */
export function PhotoMarquee({
  label = "Cleveland, Ohio",
  speed = 60,
  reverse = false,
}: {
  label?: string;
  speed?: number;
  reverse?: boolean;
}) {
  const reel = [...gallery, ...gallery];
  return (
    <section className="relative overflow-hidden border-y border-navy/10 bg-navy py-6">
      {label && (
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <span className="rounded-full border border-gold/40 bg-navy/80 px-5 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-gold backdrop-blur-sm">
            {label}
          </span>
        </div>
      )}
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-navy to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-navy to-transparent" />

      <div
        className="flex w-max gap-3 marquee-track"
        style={{ animationDuration: `${speed}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {reel.map((src, i) => (
          <div
            key={i}
            className="relative h-44 w-72 shrink-0 overflow-hidden rounded-xl sm:h-56 sm:w-96"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="384px"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-cream/10" />
          </div>
        ))}
      </div>
    </section>
  );
}
