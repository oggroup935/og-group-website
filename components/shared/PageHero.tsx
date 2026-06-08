import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

/** Reusable navy hero for inner pages. */
export function PageHero({
  eyebrow,
  badge,
  title,
  subtitle,
  badges,
  cta,
  children,
}: {
  eyebrow?: string;
  badge?: string;
  title: string;
  subtitle?: string;
  badges?: string[];
  cta?: { label: string; href: string };
  children?: React.ReactNode;
}) {
  const tag = badge ?? eyebrow;
  return (
    <section className="relative overflow-hidden bg-navy text-cream">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 sm:py-24">
        {tag && (
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            {tag}
          </span>
        )}
        <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-cream/70">
            {subtitle}
          </p>
        )}

        {cta && (
          <div className="mt-8">
            <Link href={cta.href} className={cn(buttonVariants({ variant: "primary", size: "lg" }))}>
              {cta.label}
            </Link>
          </div>
        )}

        {badges && badges.length > 0 && (
          <ul className="mt-9 flex flex-wrap items-center justify-center gap-2.5">
            {badges.map((b) => (
              <li
                key={b}
                className="rounded-full border border-cream/15 bg-cream/[0.04] px-4 py-1.5 text-sm font-medium text-cream/80"
              >
                {b}
              </li>
            ))}
          </ul>
        )}

        {children}
      </div>
    </section>
  );
}
