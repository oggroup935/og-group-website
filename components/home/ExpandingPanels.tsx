"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { homeData } from "@/data/home";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";

const panelImages = [images.standoutHome, images.urbanAve, images.streetAlt2];

/**
 * Cinematic expanding panels — pick an option, it grows and focuses while the
 * others collapse; each panel carries its own full-bleed background image.
 */
export function ExpandingPanels() {
  const [active, setActive] = useState(0);
  const items = homeData.whoWeHelp;

  return (
    <div className="flex h-[82vh] min-h-[560px] w-full flex-col gap-1.5 sm:flex-row">
      {items.map((item, i) => {
        const Icon = item.icon;
        const isActive = active === i;
        return (
          <motion.div
            key={item.title}
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}
            animate={{ flexGrow: isActive ? 6 : 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="group relative basis-0 cursor-pointer overflow-hidden"
            style={{ flexGrow: isActive ? 6 : 1 }}
          >
            {/* Background image — zooms in when selected */}
            <motion.div
              animate={{ scale: isActive ? 1 : 1.3 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={panelImages[i]}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, 60vw"
                className="object-cover"
              />
            </motion.div>

            {/* Selection sweep — a quick light/cloud whoosh on activation */}
            {isActive && (
              <motion.div
                key={`sweep-${active}`}
                initial={{ opacity: 0.6, x: "-100%" }}
                animate={{ opacity: 0, x: "100%" }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="pointer-events-none absolute inset-0 z-10 blur-2xl"
                style={{ background: "linear-gradient(90deg, transparent, rgba(247,245,242,0.35), transparent)" }}
              />
            )}

            {/* Overlay — image breathes when active, dim when collapsed */}
            <div
              className={cn(
                "absolute inset-0 transition-all duration-700",
                isActive
                  ? "bg-gradient-to-t from-navy via-navy/40 to-navy/5"
                  : "bg-navy/75"
              )}
            />
            {isActive && (
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy/75 via-navy/10 to-transparent" />
            )}

            {/* Number — always visible */}
            <span
              className={cn(
                "absolute left-5 top-5 font-display text-3xl font-bold transition-colors duration-500 sm:left-7 sm:top-7 sm:text-4xl",
                isActive ? "text-gold" : "text-cream/40"
              )}
            >
              0{i + 1}
            </span>

            {/* Collapsed label (vertical-ish, centered) */}
            <AnimatePresence>
              {!isActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 p-5 sm:bottom-8 sm:p-0"
                >
                  <Icon className="h-6 w-6 text-gold" />
                  <span className="font-display text-2xl font-semibold text-cream sm:[writing-mode:vertical-rl] sm:rotate-180">
                    {item.title}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Expanded content */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="absolute inset-0 flex flex-col justify-end p-7 sm:p-12"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/30 bg-gold/10 text-gold">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 font-display text-5xl font-semibold leading-[0.95] tracking-tight text-cream sm:text-7xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-cream/80 sm:text-lg">
                    {item.description}
                  </p>
                  <Link
                    href={item.cta.href}
                    className="mt-6 inline-flex w-fit items-center gap-3 text-lg font-semibold text-gold transition-colors hover:text-cream"
                  >
                    {item.cta.label}
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 transition-all hover:bg-gold hover:text-navy">
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
