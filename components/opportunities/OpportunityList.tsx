"use client";

import { useMemo, useState } from "react";
import type { Opportunity } from "@/types";
import { opportunitiesContent } from "@/data/opportunities";
import { OpportunityCard } from "@/components/shared/OpportunityCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

export function OpportunityList({ opps }: { opps: Opportunity[] }) {
  const [type, setType] = useState("All");
  const [strategy, setStrategy] = useState("All");

  const filtered = useMemo(
    () =>
      opps.filter(
        (o) =>
          (type === "All" || o.propertyType === type) &&
          (strategy === "All" || o.strategyTags.includes(strategy))
      ),
    [opps, type, strategy]
  );

  // Nothing in the system at all -> headline empty state.
  if (opps.length === 0) {
    return (
      <EmptyState
        title={opportunitiesContent.emptyState.title}
        description={opportunitiesContent.emptyState.description}
        cta={opportunitiesContent.emptyState.cta}
      />
    );
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col gap-4 rounded-2xl border border-navy/10 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:gap-8">
        <FilterRow
          label="Property Type"
          value={type}
          onChange={setType}
          options={opportunitiesContent.filters.propertyType}
        />
        <FilterRow
          label="Strategy"
          value={strategy}
          onChange={setStrategy}
          options={opportunitiesContent.filters.strategy}
        />
      </div>

      {/* Grid / filtered empty */}
      <div className="mt-10">
        {filtered.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((opp, i) => (
              <Reveal key={opp.id} delay={i % 3}>
                <OpportunityCard opp={opp} />
              </Reveal>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No matches for those filters"
            description="Try adjusting the filters, or join our buyers list and we'll bring matching deals to you."
            cta={{ label: "Join Our Buyers List", href: "/buyers" }}
          />
        )}
      </div>
    </div>
  );
}

function FilterRow({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-navy/50">
        {label}
      </span>
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={cn(
            "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
            value === o
              ? "border-navy bg-navy text-cream"
              : "border-navy/15 bg-white text-navy/65 hover:border-navy/40"
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
