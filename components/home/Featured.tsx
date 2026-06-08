import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { sampleOpportunities } from "@/data/opportunities";
import { Container, Section } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { OpportunityCard } from "@/components/shared/OpportunityCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* 6 — Featured Opportunities (handles Empty State) */
export function Featured() {
  // Show the 3 most recent. Swap for Supabase data at step 8.
  const featured = sampleOpportunities.slice(0, 3);
  const hasOpps = featured.length > 0;

  return (
    <Section className="bg-white">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            className="mx-0"
            eyebrow="Featured Opportunities"
            title="Current Off-Market Deals"
            subtitle="A sample of what we're working on. Full details are shared with our registered investor network."
          />
          {hasOpps && (
            <Link
              href="/opportunities"
              className={cn(buttonVariants({ variant: "outline" }), "shrink-0")}
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        <div className="mt-12">
          {hasOpps ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featured.map((opp, i) => (
                <Reveal key={opp.id} delay={i}>
                  <OpportunityCard opp={opp} />
                </Reveal>
              ))}
            </div>
          ) : (
            <EmptyState
              title="New opportunities are added regularly"
              description="Join our buyers list to be first to know when a new deal matches your criteria."
              cta={{ label: "Join Our Buyers List", href: "/buyers" }}
            />
          )}
        </div>
      </Container>
    </Section>
  );
}
