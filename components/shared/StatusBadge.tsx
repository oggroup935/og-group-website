import { cn } from "@/lib/utils";
import type { OpportunityStatus } from "@/types";

const styles: Record<OpportunityStatus, string> = {
  Available: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Under Contract": "bg-amber-50 text-amber-700 border-amber-200",
  Sold: "bg-navy/5 text-navy/60 border-navy/15",
};

const dot: Record<OpportunityStatus, string> = {
  Available: "bg-emerald-500",
  "Under Contract": "bg-amber-500",
  Sold: "bg-navy/40",
};

export function StatusBadge({
  status,
  className,
}: {
  status: OpportunityStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        styles[status],
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", dot[status])} />
      {status}
    </span>
  );
}
