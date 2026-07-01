import type { Metadata } from "next";
import Link from "next/link";
import { faqData } from "@/data/faq";
import { Container, Section } from "@/components/shared/Container";
import { PageHero } from "@/components/shared/PageHero";
import { images } from "@/lib/images";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions for property owners and investors working with OG GROUP in Cleveland.",
};

export default function FAQPage() {
  return (
    <>
      <PageHero
        badge={faqData.hero.badge}
        title={faqData.hero.headline}
        subtitle={faqData.hero.subtitle}
        image={images.streetAlt2}
      />

      <Section className="bg-navy">
        <Container className="max-w-3xl">
          <FAQAccordion groups={faqData.groups} />

          <div className="mt-12 rounded-2xl border border-cream/10 bg-cream/[0.04] p-7 text-center shadow-sm">
            <h3 className="font-display text-xl font-semibold text-cream">
              Still have a question?
            </h3>
            <p className="mt-2 text-sm text-cream/60">
              We&apos;re happy to help — reach out and we&apos;ll respond personally.
            </p>
            <Link
              href="/contact"
              className={cn(buttonVariants({ variant: "primary" }), "mt-5")}
            >
              Contact Us
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
