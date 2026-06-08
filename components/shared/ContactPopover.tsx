"use client";

import { useState } from "react";
import { Phone, Mail, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Click-to-reveal contact action. The initial click opens a small popover
 * (no navigation) — so it never triggers the preview's "link blocked" toast.
 * The popover's Call/Email link still opens the dialer/mail app on real devices.
 */
export function ContactPopover({
  kind,
  value,
  href,
  className,
  align = "left",
  direction = "up",
  children,
}: {
  kind: "phone" | "email";
  value: string;
  href: string;
  className?: string;
  align?: "left" | "right";
  direction?: "up" | "down";
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const Icon = kind === "phone" ? Phone : Mail;
  const actionLabel = kind === "phone" ? "Call" : "Email";

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard unavailable — the action link below still works.
    }
  }

  return (
    <span className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={className}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        {children}
      </button>

      {open && (
        <>
          {/* click-away */}
          <span
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div
            className={cn(
              "absolute z-50 w-64 rounded-xl border border-navy/10 bg-white p-4 text-left shadow-xl",
              direction === "down" ? "top-full mt-2" : "bottom-full mb-2",
              align === "right" ? "right-0" : "left-0"
            )}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-navy/50">
              {actionLabel} OG GROUP
            </p>
            <p className="mt-1 break-all font-display text-base font-semibold text-navy">
              {value}
            </p>
            <div className="mt-3 flex gap-2">
              <a
                href={href}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-gold px-3 py-2 text-sm font-medium text-navy"
              >
                <Icon className="h-4 w-4" />
                {actionLabel}
              </a>
              <button
                type="button"
                onClick={copy}
                className="flex items-center gap-1.5 rounded-lg border border-navy/20 px-3 py-2 text-sm font-medium text-navy"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </>
      )}
    </span>
  );
}
