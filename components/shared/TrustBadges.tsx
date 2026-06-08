import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type Item = { label: string; icon?: React.ComponentType<{ className?: string }> };

/** A row of Truth-Only trust signals (no fake numbers). */
export function TrustBadges({
  items,
  light = false,
  className,
}: {
  items: Item[];
  light?: boolean;
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-3 gap-y-3",
        className
      )}
    >
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <Reveal as="li" key={item.label} delay={i}>
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium",
                light
                  ? "border-cream/20 bg-cream/5 text-cream/90"
                  : "border-navy/10 bg-white text-navy/80 shadow-sm"
              )}
            >
              {Icon && (
                <Icon
                  className={cn("h-4 w-4", light ? "text-gold" : "text-gold-600")}
                />
              )}
              {item.label}
            </span>
          </Reveal>
        );
      })}
    </ul>
  );
}
