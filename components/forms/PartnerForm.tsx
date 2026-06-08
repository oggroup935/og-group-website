"use client";

import { useState } from "react";
import { jvData } from "@/data/jv";
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
  partnerType: "",
  experience: "",
  message: "",
};

export default function PartnerForm() {
  const [data, setData] = useState(empty);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof typeof empty, v: string) =>
    setData((d) => ({ ...d, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!data.firstName || !data.lastName || !data.email || !data.partnerType) {
      setError("Please fill in the required fields.");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await submitLead("partner", data);
      setDone(true);
    } catch {
      setError("Something went wrong submitting your application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <FormSuccess
        title="Application Received"
        message="Thanks for reaching out. We review every application personally and will be in touch to discuss whether there's a fit."
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
        <Field label="Last Name" required>
          <Input value={data.lastName} onChange={(e) => set("lastName", e.target.value)} />
        </Field>
        <Field label="Phone">
          <Input type="tel" value={data.phone} onChange={(e) => set("phone", e.target.value)} />
        </Field>
        <Field label="Email" required>
          <Input type="email" value={data.email} onChange={(e) => set("email", e.target.value)} />
        </Field>
        <Field label="Partner Type" required>
          <Select value={data.partnerType} onChange={(e) => set("partnerType", e.target.value)}>
            <option value="">Select…</option>
            {jvData.options.partnerType.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </Select>
        </Field>
        <Field label="Experience Level">
          <Select value={data.experience} onChange={(e) => set("experience", e.target.value)}>
            <option value="">Select…</option>
            {jvData.options.experience.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </Select>
        </Field>
        <Field label="What do you bring to the table?" className="sm:col-span-2">
          <Textarea
            value={data.message}
            onChange={(e) => set("message", e.target.value)}
            placeholder="Tell us about your experience, your market, and how you'd like to partner."
          />
        </Field>
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className={cn(buttonVariants({ variant: "primary", size: "lg" }), "mt-6 w-full")}
      >
        {submitting ? "Submitting…" : "Partner With Us"}
      </button>
    </form>
  );
}
