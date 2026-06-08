"use client";

import { useState } from "react";
import { contactData } from "@/data/contact";
import type { InquiryType } from "@/types";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { buttonVariants } from "@/components/ui/button";
import { submitLead } from "@/lib/leads";
import { FormSuccess } from "./wizard-parts";
import { cn } from "@/lib/utils";

const empty = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  inquiryType: "" as InquiryType | "",
  propertyType: "",
  strategy: "",
  targetAreas: "",
  partnerType: "",
  experience: "",
  message: "",
};

export default function ContactForm({
  initialType,
}: {
  initialType?: InquiryType;
}) {
  const [data, setData] = useState({
    ...empty,
    inquiryType: initialType ?? "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof typeof empty, v: string) =>
    setData((d) => ({ ...d, [k]: v }));

  const t = data.inquiryType;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!data.firstName || !data.email || !data.inquiryType || !data.message) {
      setError("Please complete the required fields.");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await submitLead("contact", data);
      setDone(true);
    } catch {
      setError("Something went wrong sending your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <FormSuccess
        title="Message Received"
        message="Thanks for reaching out. We review every inquiry personally and will respond as soon as we can — no auto-replies."
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First Name" required>
          <Input value={data.firstName} onChange={(e) => set("firstName", e.target.value)} />
        </Field>
        <Field label="Last Name">
          <Input value={data.lastName} onChange={(e) => set("lastName", e.target.value)} />
        </Field>
        <Field label="Phone">
          <Input type="tel" value={data.phone} onChange={(e) => set("phone", e.target.value)} />
        </Field>
        <Field label="Email" required>
          <Input type="email" value={data.email} onChange={(e) => set("email", e.target.value)} />
        </Field>

        <Field label="I am a…" required className="sm:col-span-2">
          <Select
            value={data.inquiryType}
            onChange={(e) => set("inquiryType", e.target.value)}
          >
            <option value="">Select…</option>
            {contactData.routes.map((r) => (
              <option key={r.type} value={r.type}>{r.title}</option>
            ))}
          </Select>
        </Field>

        {/* Conditional fields */}
        {t === "Property Owner" && (
          <Field label="Property Type" className="sm:col-span-2">
            <Select value={data.propertyType} onChange={(e) => set("propertyType", e.target.value)}>
              <option value="">Select…</option>
              {contactData.conditionalOptions.propertyType.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </Select>
          </Field>
        )}

        {t === "Investor" && (
          <>
            <Field label="Investment Strategy">
              <Select value={data.strategy} onChange={(e) => set("strategy", e.target.value)}>
                <option value="">Select…</option>
                {contactData.conditionalOptions.strategy.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </Select>
            </Field>
            <Field label="Target Areas">
              <Input value={data.targetAreas} onChange={(e) => set("targetAreas", e.target.value)} placeholder="Cleveland West Side, 44102…" />
            </Field>
          </>
        )}

        {t === "Strategic Partner" && (
          <>
            <Field label="Partner Type">
              <Select value={data.partnerType} onChange={(e) => set("partnerType", e.target.value)}>
                <option value="">Select…</option>
                {contactData.conditionalOptions.partnerType.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </Select>
            </Field>
            <Field label="Experience">
              <Input value={data.experience} onChange={(e) => set("experience", e.target.value)} placeholder="Brief background" />
            </Field>
          </>
        )}

        <Field label="Message" required className="sm:col-span-2">
          <Textarea
            value={data.message}
            onChange={(e) => set("message", e.target.value)}
            placeholder="How can we help?"
          />
        </Field>
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className={cn(buttonVariants({ variant: "primary", size: "lg" }), "mt-6 w-full")}
      >
        {submitting ? "Sending…" : "Start The Conversation"}
      </button>
    </form>
  );
}
