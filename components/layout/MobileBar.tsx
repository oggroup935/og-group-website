"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, DollarSign, Users, X, Copy, Check } from "lucide-react";
import { siteData } from "@/data/site";

/** Sticky bottom action bar on mobile for fast lead capture. */
export default function MobileBar() {
  const [showCall, setShowCall] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copyNumber() {
    try {
      await navigator.clipboard.writeText(siteData.phone);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard not available — the tel: link still works.
    }
  }

  return (
    <div className="sm:hidden">
      {/* Call popover — shows the actual number with a tappable call link */}
      {showCall && (
        <>
          <button
            type="button"
            aria-label="Close"
            onClick={() => setShowCall(false)}
            className="fixed inset-0 z-40 bg-navy/40"
          />
          <div className="fixed inset-x-3 bottom-20 z-50 rounded-2xl border border-navy/10 bg-white p-5 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-navy/50">
                  Call OG GROUP
                </p>
                <a
                  href={siteData.phoneHref}
                  className="mt-1 block font-display text-2xl font-semibold text-navy"
                >
                  {siteData.phone}
                </a>
              </div>
              <button
                type="button"
                onClick={() => setShowCall(false)}
                className="rounded-md p-1 text-navy/50 hover:text-navy"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 flex gap-2">
              <a
                href={siteData.phoneHref}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gold py-3 text-sm font-medium text-navy"
              >
                <Phone className="h-4 w-4" /> Call Now
              </a>
              <button
                type="button"
                onClick={copyNumber}
                className="flex items-center justify-center gap-2 rounded-lg border border-navy/20 px-4 py-3 text-sm font-medium text-navy"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </>
      )}

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-navy/10 bg-cream/95 backdrop-blur-md">
        <div className="grid grid-cols-3 divide-x divide-navy/10">
          <button
            type="button"
            onClick={() => setShowCall(true)}
            className="flex flex-col items-center gap-1 py-2.5 text-navy"
          >
            <Phone className="h-5 w-5 text-gold-600" />
            <span className="text-[11px] font-medium">Call</span>
          </button>
          <Link
            href="/sell"
            className="flex flex-col items-center gap-1 py-2.5 text-navy"
          >
            <DollarSign className="h-5 w-5 text-gold-600" />
            <span className="text-[11px] font-medium">Cash Offer</span>
          </Link>
          <Link
            href="/buyers"
            className="flex flex-col items-center gap-1 py-2.5 text-navy"
          >
            <Users className="h-5 w-5 text-gold-600" />
            <span className="text-[11px] font-medium">Invest</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
