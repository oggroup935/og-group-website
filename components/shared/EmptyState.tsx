import Link from "next/link";
import { Inbox } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function EmptyState({
  title,
  description,
  cta,
  className,
}: {
  title: string;
  description?: string;
  cta?: { label: string; href: string };
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-2xl border border-dashed border-navy/20 bg-white/60 px-6 py-16 text-center",
        className
      )}
    >
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gold-soft text-gold-600">
        <Inbox className="h-6 w-6" />
      </div>
      <h3 className="font-display text-xl font-semibold text-navy">{title}</h3>
      {description && (
        <p className="mt-2 max-w-md text-sm leading-relaxed text-navy/60">
          {description}
        </p>
      )}
      {cta && (
        <Link href={cta.href} className={cn(buttonVariants({ variant: "primary" }), "mt-6")}>
          {cta.label}
        </Link>
      )}
    </div>
  );
}
