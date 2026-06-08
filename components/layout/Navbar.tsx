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

  // Close the mobile menu on route change.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-navy/10 bg-cream/85 backdrop-blur-md"
          : "border-b border-transparent bg-cream"
      )}
    >
      <nav className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="OG GROUP home">
          <Image
            src="/logo.png"
            alt="OG GROUP"
            width={48}
            height={48}
            className="h-11 w-11 rounded-md object-contain"
            priority
          />
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-display text-lg font-semibold tracking-tight text-navy">
              OG GROUP
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-navy/50">
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
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "text-gold-600"
                      : "text-navy/70 hover:text-navy"
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
            className="hidden cursor-pointer items-center gap-2 text-sm font-medium text-navy/70 transition-colors hover:text-navy xl:flex"
          >
            <Phone className="h-4 w-4 text-gold-600" />
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-navy lg:hidden"
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
