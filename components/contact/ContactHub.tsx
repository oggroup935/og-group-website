"use client";

import { useState } from "react";
import { contactData } from "@/data/contact";
import type { InquiryType } from "@/types";
import { Reveal } from "@/components/shared/Reveal";
import ContactForm from "@/components/forms/ContactForm";
import { cn } from "@/lib/utils";

export function ContactHub() {
  const [selected, setSelected] = useState<InquiryType | undefined>(undefined);

  return (
    <div className="grid gap-10 lg:grid-cols-5">
      {/* Selector cards */}
      <div className="lg:col-span-2">
        <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-600">
          How Can We Help?
        </h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {contactData.routes.map((r, i) => {
            const Icon = r.icon;
            const active = selected === r.type;
            return (
              <Reveal key={r.type} delay={i}>
                <button
                  type="button"
                  onClick={() => setSelected(r.type as InquiryType)}
                  className={cn(
                    "flex w-full items-start gap-4 rounded-2xl border p-5 text-left transition-all",
                    active
                      ? "border-gold bg-gold-soft shadow-sm"
                      : "border-navy/10 bg-white hover:border-navy/30"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors",
                      active ? "bg-gold text-navy" : "bg-navy text-gold"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy">{r.button}</p>
                    <p className="mt-0.5 text-sm text-navy/60">{r.description}</p>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Form — remounts when the selected type changes so it prefills */}
      <div className="lg:col-span-3">
        <ContactForm key={selected ?? "none"} initialType={selected} />
      </div>
    </div>
  );
}
