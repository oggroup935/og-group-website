"use client";

import { Check, CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

/** Step progress indicator. */
export function StepProgress({
  steps,
  current,
}: {
  steps: string[];
  current: number;
}) {
  return (
    <ol className="mb-8 flex items-center gap-2">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={label} className="flex flex-1 items-center gap-2">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                  done && "bg-gold text-navy",
                  active && "bg-navy text-cream ring-4 ring-gold/20",
                  !done && !active && "bg-navy/10 text-navy/50"
                )}
              >
                {done ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <span
                className={cn(
                  "hidden text-sm font-medium sm:block",
                  active ? "text-navy" : "text-navy/50"
                )}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <span
                className={cn(
                  "h-px flex-1 transition-colors",
                  done ? "bg-gold" : "bg-navy/15"
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

/** Success state shown after a form is submitted. */
export function FormSuccess({
  title,
  message,
  homeHref = "/",
}: {
  title: string;
  message: string;
  homeHref?: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-emerald-200 bg-emerald-50/50 px-6 py-14 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
        <CircleCheck className="h-8 w-8" />
      </div>
      <h3 className="mt-5 font-display text-2xl font-semibold text-navy">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-navy/60">{message}</p>
      <Link href={homeHref} className={cn(buttonVariants({ variant: "outline" }), "mt-7")}>
        Back to Home
      </Link>
    </div>
  );
}

/** Nav buttons row for wizards. */
export function WizardNav({
  onBack,
  onNext,
  isFirst,
  isLast,
  submitting,
  nextLabel,
  submitLabel,
}: {
  onBack: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
  submitting?: boolean;
  nextLabel?: string;
  submitLabel: string;
}) {
  return (
    <div className="mt-8 flex items-center justify-between gap-3">
      <button
        type="button"
        onClick={onBack}
        disabled={isFirst || submitting}
        className={cn(buttonVariants({ variant: "ghost" }), isFirst && "invisible")}
      >
        Back
      </button>
      <button
        type={isLast ? "submit" : "button"}
        onClick={isLast ? undefined : onNext}
        disabled={submitting}
        className={cn(buttonVariants({ variant: "primary" }))}
      >
        {submitting ? "Submitting…" : isLast ? submitLabel : nextLabel ?? "Continue"}
      </button>
    </div>
  );
}
