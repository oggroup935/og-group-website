"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FAQGroup } from "@/data/faq";
import { cn } from "@/lib/utils";

export function FAQAccordion({ groups }: { groups: FAQGroup[] }) {
  // Track open item by "groupIndex-itemIndex"
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="space-y-12">
      {groups.map((group, gi) => (
        <div key={group.audience}>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold-600">
            {group.audience}
          </h3>
          <div className="divide-y divide-navy/10 overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm">
            {group.items.map((item, ii) => {
              const key = `${gi}-${ii}`;
              const isOpen = open === key;
              return (
                <div key={item.question}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : key)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-medium text-navy">{item.question}</span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 shrink-0 text-gold-600 transition-transform duration-300",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-sm leading-relaxed text-navy/65">
                        {item.answer}
                        {item.isPlaceholder && (
                          <span className="mt-2 block text-xs font-medium uppercase tracking-wider text-amber-600">
                            Answer pending — placeholder
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
