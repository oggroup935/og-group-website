import Link from "next/link";
import { Bed, Bath, Ruler, ArrowRight, ImageOff } from "lucide-react";
import type { Opportunity } from "@/types";
import { StatusBadge } from "./StatusBadge";
import { cn } from "@/lib/utils";

/**
 * Renders an opportunity using ONLY public-safe fields.
 * Investor-only numbers (price, ARV, repair, assignment fee) are never shown here.
 */
export function OpportunityCard({ opp }: { opp: Opportunity }) {
  const isSold = opp.status === "Sold";
  return (
    <Link
      href={`/opportunities/${opp.id}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        isSold && "opacity-80"
      )}
    >
      {/* Image / placeholder */}
      <div className="relative aspect-[16/10] overflow-hidden bg-navy-50">
        {opp.images[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={opp.images[0]}
            alt={opp.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-navy-50 to-cream text-navy/30">
            <ImageOff className="h-7 w-7" />
            <span className="text-xs font-medium uppercase tracking-wider">
              Photo available to investors
            </span>
          </div>
        )}
        <div className="absolute left-3 top-3">
          <StatusBadge status={opp.status} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-gold-600">
          {opp.city} · {opp.propertyType}
        </p>
        <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-navy">
          {opp.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-navy/60">
          {opp.summary}
        </p>

        {/* Public specs only */}
        {(opp.beds || opp.baths || opp.sqft) && (
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-navy/70">
            {opp.beds != null && (
              <span className="inline-flex items-center gap-1.5">
                <Bed className="h-4 w-4 text-navy/40" /> {opp.beds} bd
              </span>
            )}
            {opp.baths != null && (
              <span className="inline-flex items-center gap-1.5">
                <Bath className="h-4 w-4 text-navy/40" /> {opp.baths} ba
              </span>
            )}
            {opp.sqft != null && (
              <span className="inline-flex items-center gap-1.5">
                <Ruler className="h-4 w-4 text-navy/40" />{" "}
                {opp.sqft.toLocaleString()} sqft
              </span>
            )}
          </div>
        )}

        {/* Strategy tags */}
        {opp.strategyTags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {opp.strategyTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gold-soft px-2.5 py-1 text-xs font-medium text-gold-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition-colors group-hover:text-gold-600">
          View Opportunity
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
