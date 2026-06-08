"use client";

import { useState } from "react";
import { sellData } from "@/data/sell";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { submitLead } from "@/lib/leads";
import { StepProgress, WizardNav, FormSuccess } from "./wizard-parts";

const STEPS = ["Contact", "Property", "Timeline"];

const empty = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  address: "",
  city: "Cleveland",
  bedrooms: "",
  bathrooms: "",
  propertyType: "",
  condition: "",
  timeline: "",
  notes: "",
};

export default function SellWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(empty);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof typeof empty, v: string) =>
    setData((d) => ({ ...d, [k]: v }));

  const canProceed = () => {
    if (step === 0)
      return data.firstName && data.lastName && data.phone && data.email;
    if (step === 1) return data.address && data.propertyType && data.condition;
    return data.timeline;
  };

  const next = () => {
    if (!canProceed()) {
      setError("Please fill in the required fields to continue.");
      return;
    }
    setError(null);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const back = () => {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canProceed()) {
      setError("Please select your timeline to submit.");
      return;
    }
    setSubmitting(true);
    try {
      await submitLead("seller", data);
      setDone(true);
    } catch {
      setError("Something went wrong submitting your information. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <FormSuccess
        title="Thank You — We've Got Your Information"
        message="There's no obligation and no pressure. A member of our team will review your property and reach out personally for a conversation about your goals."
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm sm:p-8"
    >
      <StepProgress steps={STEPS} current={step} />

      {step === 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="First Name" required>
            <Input value={data.firstName} onChange={(e) => set("firstName", e.target.value)} placeholder="Jane" />
          </Field>
          <Field label="Last Name" required>
            <Input value={data.lastName} onChange={(e) => set("lastName", e.target.value)} placeholder="Doe" />
          </Field>
          <Field label="Phone" required>
            <Input type="tel" value={data.phone} onChange={(e) => set("phone", e.target.value)} placeholder="(216) 000-0000" />
          </Field>
          <Field label="Email" required>
            <Input type="email" value={data.email} onChange={(e) => set("email", e.target.value)} placeholder="you@email.com" />
          </Field>
        </div>
      )}

      {step === 1 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Property Address" required className="sm:col-span-2">
            <Input value={data.address} onChange={(e) => set("address", e.target.value)} placeholder="123 Main St" />
          </Field>
          <Field label="City">
            <Input value={data.city} onChange={(e) => set("city", e.target.value)} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Bedrooms">
              <Input type="number" min={0} value={data.bedrooms} onChange={(e) => set("bedrooms", e.target.value)} />
            </Field>
            <Field label="Bathrooms">
              <Input type="number" min={0} value={data.bathrooms} onChange={(e) => set("bathrooms", e.target.value)} />
            </Field>
          </div>
          <Field label="Property Type" required>
            <Select value={data.propertyType} onChange={(e) => set("propertyType", e.target.value)}>
              <option value="">Select…</option>
              {sellData.options.propertyType.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </Select>
          </Field>
          <Field label="Estimated Condition" required>
            <Select value={data.condition} onChange={(e) => set("condition", e.target.value)}>
              <option value="">Select…</option>
              {sellData.options.condition.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </Select>
          </Field>
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-4">
          <Field label="Selling Timeline" required>
            <Select value={data.timeline} onChange={(e) => set("timeline", e.target.value)}>
              <option value="">Select…</option>
              {sellData.options.timeline.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </Select>
          </Field>
          <Field label="Additional Notes">
            <Textarea
              value={data.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Anything you'd like us to know about the property or your situation."
            />
          </Field>
        </div>
      )}

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <WizardNav
        onBack={back}
        onNext={next}
        isFirst={step === 0}
        isLast={step === STEPS.length - 1}
        submitting={submitting}
        submitLabel="Submit Property Information"
      />
    </form>
  );
}
