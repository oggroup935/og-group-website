"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ParallaxImage({
  src,
  alt = "",
  priority = false,
  intensity = 0.15,
  overlay = "cream",
  className,
}: {
  src: string;
  alt?: string;
  priority?: boolean;
  intensity?: number;
  overlay?: "cream" | "navy" | "none";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const range = reduce ? 0 : intensity * 100;
  const y = useTransform(scrollYProgress, [0, 1], [`-${range}%`, `${range}%`]);

  const overlayClass =
    overlay === "cream"
      ? "bg-gradient-to-b from-cream/40 via-cream/20 to-cream/40"
      : overlay === "navy"
        ? "bg-gradient-to-b from-navy/50 via-navy/30 to-navy/50"
        : "";

  return (
    <div ref={ref} className={cn("relative h-full w-full overflow-hidden", className)}>
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover scale-[1.3]"
        />
      </motion.div>
      {overlay !== "none" && (
        <div className={`absolute inset-0 ${overlayClass}`} />
      )}
    </div>
  );
}
