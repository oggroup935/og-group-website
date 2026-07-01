import type { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";
import { contactData } from "@/data/contact";
import { siteData } from "@/data/site";
import { Container, Section } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { ImageBand } from "@/components/shared/ImageBand";
import { images } from "@/lib/images";
import { ContactHub } from "@/components/contact/ContactHub";
import { ContactPopover } from "@/components/shared/ContactPopover";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with OG GROUP. Call, email, or send a message — we respond to every inquiry personally.",
};

const contactDetails = [
  { icon: Phone, label: "Phone", value: siteData.phone, href: siteData.phoneHref, kind: "phone" as const },
  { icon: Mail, label: "Email", value: siteData.email, href: siteData.emailHref, kind: "email" as const },
  { icon: MapPin, label: "Location", value: siteData.location, href: undefined, kind: undefined },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow={contactData.hero.eyebrow}
        title={contactData.hero.headline}
        subtitle={contactData.hero.subtitle}
        image={images.urbanAve}
      />

      {/* Contact details strip */}
      <Section className="bg-navy pb-0">
        <Container>
          <div className="grid gap-4 sm:grid-cols-3">
            {contactDetails.map((c, i) => {
              const Icon = c.icon;
              const inner = (
                <div className="flex items-center gap-4 rounded-2xl border border-cream/10 bg-cream/[0.04] p-5 shadow-sm transition-colors hover:border-gold/40">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-cream/50">
                      {c.label}
                    </p>
                    <p className="mt-0.5 break-words font-medium text-cream">{c.value}</p>
                  </div>
                </div>
              );
              return (
                <Reveal key={c.label} delay={i}>
                  {c.href && c.kind ? (
                    <ContactPopover
                      kind={c.kind}
                      value={c.value}
                      href={c.href}
                      className="block w-full cursor-pointer text-left"
                    >
                      {inner}
                    </ContactPopover>
                  ) : (
                    inner
                  )}
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Dynamic hub */}
      <Section className="bg-navy">
        <Container>
          <ContactHub />
        </Container>
      </Section>

      <ImageBand
        src={images.streetAlt2}
        alt="Residential street"
        kicker={siteData.location}
        height="h-[45vh] sm:h-[60vh]"
      />

      {/* Process */}
      <Section className="bg-cream/[0.04]">
        <Container>
          <SectionHeading eyebrow="What To Expect" title="Our Process" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contactData.process.map((s, i) => (
              <Reveal key={s.title} delay={i}>
                <div className="h-full rounded-2xl border border-cream/10 bg-cream/[0.04] p-6">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-sm font-bold text-navy">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-cream">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/60">{s.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
