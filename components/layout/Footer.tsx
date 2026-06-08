import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { siteData } from "@/data/site";
import { ContactPopover } from "@/components/shared/ContactPopover";

export default function Footer() {
  const year = 2026;
  return (
    <footer className="mt-auto bg-navy text-cream">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="OG GROUP"
                width={48}
                height={48}
                className="h-12 w-12 rounded-md bg-cream/95 object-contain p-1"
              />
              <div className="flex flex-col leading-none">
                <span className="font-display text-lg font-semibold">OG GROUP</span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-cream/50">
                  Real Estate Wholesaling
                </span>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/60">
              Off-market real estate opportunities in Cleveland. We connect
              motivated sellers with serious investors.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Explore
            </h4>
            <ul className="mt-4 space-y-2.5">
              {siteData.nav.slice(0, 5).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream/70 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Company
            </h4>
            <ul className="mt-4 space-y-2.5">
              {siteData.nav.slice(5).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream/70 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Get In Touch
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-cream/70">
              <li>
                <ContactPopover
                  kind="phone"
                  value={siteData.phone}
                  href={siteData.phoneHref}
                  className="flex cursor-pointer items-center gap-2.5 transition-colors hover:text-gold"
                >
                  <Phone className="h-4 w-4 shrink-0 text-gold" />
                  {siteData.phone}
                </ContactPopover>
              </li>
              <li>
                <ContactPopover
                  kind="email"
                  value={siteData.email}
                  href={siteData.emailHref}
                  className="flex cursor-pointer items-start gap-2.5 break-all text-left transition-colors hover:text-gold"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {siteData.email}
                </ContactPopover>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-gold" />
                {siteData.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-7 text-xs text-cream/50 sm:flex-row">
          <p>© {year} OG GROUP. All rights reserved.</p>
          <p className="text-cream/40">
            Off-Market Real Estate Opportunities · Cleveland, Ohio
          </p>
        </div>
      </div>
    </footer>
  );
}
