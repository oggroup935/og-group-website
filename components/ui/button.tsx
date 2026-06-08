import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        // Gold fill on navy text — primary CTA
        primary:
          "bg-gold text-navy hover:bg-gold-600 hover:-translate-y-0.5 shadow-sm hover:shadow-md",
        // Navy fill
        navy: "bg-navy text-cream hover:bg-navy-700 hover:-translate-y-0.5 shadow-sm hover:shadow-md",
        // Outline
        outline:
          "border border-navy/25 bg-transparent text-navy hover:border-navy hover:bg-navy hover:text-cream",
        // Outline on dark sections
        outlineLight:
          "border border-cream/30 bg-transparent text-cream hover:bg-cream hover:text-navy",
        ghost: "text-navy hover:bg-navy/5",
        link: "text-navy underline-offset-4 hover:text-gold-600 hover:underline px-0",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base py-3.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button };
