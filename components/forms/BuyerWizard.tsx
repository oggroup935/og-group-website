"use client";

import { useState } from "react";
import { buyersData } from "@/data/buyers";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { submitLead } from "@/lib/leads";
import { StepProgress, WizardNav, FormSuccess } from "./wizard-parts";
import { cn } from "@/lib/utils";

const STEPS = ["Contact", "Strategy", "Criteria", "Profile"];

const empty = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  strategy: "",
  propertyTypes: [] as string[],
  zipCodes: "",
  priceRange: "",
  rehabLevel: "",
  financing: "",
  portfolioSize: "",
  experience: "",
  notes: "",
};

export default function BuyerWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(empty);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof typeof empty, v: string) =>
    setData((d) => ({ ...d, [k]: v }));

  const toggleType = (t: string) =>
    setData((d) => ({
      ...d,
      propertyTypes: d.propertyTypes.includes(t)
        ? d.propertyTypes.filter((x) => x !== t)
        : [...d.propertyTypes, t],
    }));

  const canProceed = () => {
    if (step === 0) return data.firstName && data.lastName && data.phone && data.email;
    if (step === 1) return data.strategy && data.propertyTypes.length > 0;
    return true;
  };

  const next = () => {
    if (!canProceed()) {
      setError("Please complete the required fields to continue.");
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
    setSubmitting(true);
    try {
      await submitLead("investor", data);
      setDone(true);
    } catch {
      setError("Something went wrong joining the network. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <FormSuccess
        title="Welcome To The Network"
        message="You're on the list. We'll review your profile and reach out with opportunities that fit your strategy. Private, confidential, and no spam."
        homeHref="/"
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
            <Input value={data.firstName} onChange={(e) => set("firstName", e.target.value)} />
          </Field>
          <Field label="Last Name" required>
            <Input value={data.lastName} onChange={(e) => set("lastName", e.target.value)} />
          </Field>
          <Field label="Phone" required>
            <Input type="tel" value={data.phone} onChange={(e) => set("phone", e.target.value)} />
          </Field>
          <Field label="Email" required>
            <Input type="email" value={data.email} onChange={(e) => set("email", e.target.value)} />
          </Field>
        </div>
      )}

      {step === 1 && (
        <div className="grid gap-5">
          <Field label="Primary Investment Strategy" required>
            <Select value={data.strategy} onChange={(e) => set("strategy", e.target.value)}>
              <option value="">Select…</option>
              {buyersData.options.strategy.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </Select>
          </Field>
          <div>
            <p className="mb-2 text-sm font-medium text-navy">
              Property Types <span className="text-gold-600">*</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {buyersData.options.propertyTypes.map((t) => {
                const active = data.propertyTypes.includes(t);
                return (
                  <button
                    type="button"
                    key={t}
                    onClick={() => toggleType(t)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                      active
                        ? "border-gold bg-gold-soft text-gold-600"
                        : "border-navy/15 bg-white text-navy/70 hover:border-navy/40"
                    )}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Preferred ZIP Codes / Areas">
            <Input value={data.zipCodes} onChange={(e) => set("zipCodes", e.target.value)} placeholder="44102, 44109…" />
          </Field>
          <Field label="Target Price Range">
            <Input value={data.priceRange} onChange={(e) => set("priceRange", e.target.value)} placeholder="$50k – $150k" />
          </Field>
          <Field label="Desired Rehab Level">
            <Select value={data.rehabLevel} onChange={(e) => set("rehabLevel", e.target.value)}>
              <option value="">Select…</option>
              {buyersData.options.rehabLevel.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </Select>
          </Field>
          <Field label="Financing Method">
            <Select value={data.financing} onChange={(e) => set("financing", e.target.value)}>
              <option value="">Select…</option>
              {buyersData.options.financing.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </Select>
          </Field>
        </div>
      )}

      {step === 3 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Current Portfolio Size">
            <Input value={data.portfolioSize} onChange={(e) => set("portfolioSize", e.target.value)} placeholder="e.g. 4 units" />
          </Field>
          <Field label="Experience Level">
            <Select value={data.experience} onChange={(e) => set("experience", e.target.value)}>
              <option value="">Select…</option>
              {buyersData.options.experience.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </Select>
          </Field>
          <Field label="Additional Notes" className="sm:col-span-2">
            <Textarea value={data.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Anything else we should know about your investment goals." />
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
        submitLabel="Join The Investor Network"
      />
    </form>
  );
}
