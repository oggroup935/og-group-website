"use client";

import { ParallaxImage } from "./ParallaxImage";

export function ImageBand({
  src,
  alt = "",
  height = "h-[60vh] sm:h-[78vh]",
  overlay = "navy",
  caption,
  kicker,
}: {
  src: string;
  alt?: string;
  height?: string;
  overlay?: "cream" | "navy" | "none";
  caption?: string;
  kicker?: string;
}) {
  return (
    <section className={`relative w-full overflow-hidden ${height}`}>
      <ParallaxImage src={src} alt={alt} overlay={overlay} intensity={0.18} className="absolute inset-0" />
      {(caption || kicker) && (
        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
            <div className="max-w-3xl">
              {kicker && (
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
                  <span className="h-px w-8 bg-gold" />
                  {kicker}
                </span>
              )}
              {caption && (
                <p className="mt-4 font-display text-3xl font-semibold leading-[1.1] text-cream sm:text-5xl">
                  {caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
