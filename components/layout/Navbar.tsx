"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { siteData } from "@/data/site";
import { buttonVariants } from "@/components/ui/button";
import { ContactPopover } from "@/components/shared/ContactPopover";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        scrolled
          ? "border-b border-navy/10 bg-cream/95 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="OG GROUP home">
          <Image
            src="/logo.png"
            alt="OG GROUP"
            width={52}
            height={52}
            className="h-12 w-12 rounded-md object-contain"
            priority
          />
          <span className="hidden flex-col leading-none sm:flex">
            <span
              className={cn(
                "font-display text-lg font-semibold tracking-tight transition-colors",
                scrolled ? "text-navy" : "text-cream"
              )}
            >
              OG GROUP
            </span>
            <span
              className={cn(
                "text-[10px] font-medium uppercase tracking-[0.18em] transition-colors",
                scrolled ? "text-navy/50" : "text-cream/60"
              )}
            >
              Real Estate Wholesaling
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {siteData.nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "text-gold"
                      : scrolled
                        ? "text-navy/70 hover:text-navy"
                        : "text-cream/80 hover:text-cream",
                    "after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-gold after:transition-all after:duration-300 hover:after:w-3/4"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ContactPopover
            kind="phone"
            value={siteData.phone}
            href={siteData.phoneHref}
            align="right"
            direction="down"
            className={cn(
              "hidden cursor-pointer items-center gap-2 text-sm font-medium transition-colors xl:flex",
              scrolled ? "text-navy/70 hover:text-navy" : "text-cream/80 hover:text-cream"
            )}
          >
            <Phone className="h-4 w-4 text-gold" />
            {siteData.phone}
          </ContactPopover>
          <Link
            href={siteData.primaryCTA.href}
            className={cn(buttonVariants({ variant: "primary", size: "sm" }), "hidden sm:inline-flex")}
          >
            {siteData.primaryCTA.label}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-md transition-colors lg:hidden",
              scrolled || open ? "text-navy" : "text-cream"
            )}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-navy/10 bg-cream lg:hidden transition-[max-height] duration-300",
          open ? "max-h-[32rem]" : "max-h-0 border-t-0"
        )}
      >
        <ul className="flex flex-col gap-1 px-5 py-4">
          {siteData.nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "block rounded-lg px-3 py-3 text-base font-medium transition-colors",
                    active ? "bg-gold-soft text-gold-600" : "text-navy/80 hover:bg-navy/5"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li className="mt-2 flex flex-col gap-2">
            <Link href={siteData.primaryCTA.href} className={buttonVariants({ variant: "primary" })}>
              {siteData.primaryCTA.label}
            </Link>
            <ContactPopover
              kind="phone"
              value={siteData.phone}
              href={siteData.phoneHref}
              direction="down"
              className={cn(buttonVariants({ variant: "outline" }), "w-full cursor-pointer")}
            >
              <Phone className="h-4 w-4" /> {siteData.phone}
            </ContactPopover>
          </li>
        </ul>
      </div>
    </header>
  );
}
