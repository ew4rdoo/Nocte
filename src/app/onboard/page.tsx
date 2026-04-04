"use client";

import { useState } from "react";

type TableDraft = {
  name: string;
  location: string;
  description: string;
  capacity_min: string;
  capacity_max: string;
  minimum_spend: string;
};

const VENUE_TYPES = [
  "Nightclub", "Ultra Lounge", "Lounge", "Restaurant & Bar", "Rooftop Bar",
  "Beach Club", "Cocktail Bar", "Steakhouse", "Japanese", "Mediterranean",
  "Omakase", "Fusion", "Other",
];

const NEIGHBORHOODS = [
  "South Beach", "Brickell", "Downtown", "Wynwood", "Design District",
  "Miami River", "Coral Gables", "Coconut Grove", "Midtown", "Edgewater", "Other",
];

const VIBES = [
  "Wild", "Electric", "Celebrity", "Intimate", "Upscale", "Social", "Trendy",
  "Sophisticated", "Chill", "Underground", "Festive", "Romantic", "Music-Focused",
  "Waterfront", "Fashionable",
];

const STEPS = ["Venue Basics", "Atmosphere", "Table Service", "Contact", "Review"];

function emptyTable(): TableDraft {
  return { name: "", location: "", description: "", capacity_min: "", capacity_max: "", minimum_spend: "" };
}

export default function OnboardPage() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState("");
  const [error, setError] = useState("");

  // Step 1: Basics
  const [venueName, setVenueName] = useState("");
  const [venueType, setVenueType] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [address, setAddress] = useState("");
  const [capacity, setCapacity] = useState("");

  // Step 2: Atmosphere
  const [description, setDescription] = useState("");
  const [vibe, setVibe] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string>("$$$");
  const [hours, setHours] = useState("");
  const [dressCode, setDressCode] = useState("");

  // Step 3: Tables
  const [tables, setTables] = useState<TableDraft[]>([]);

  // Step 4: Contact
  const [contactName, setContactName] = useState("");
  const [contactRole, setContactRole] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [instagram, setInstagram] = useState("");
  const [notes, setNotes] = useState("");

  function toggleVibe(v: string) {
    setVibe((prev) => prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]);
  }

  function addTable() {
    setTables([...tables, emptyTable()]);
  }

  function removeTable(i: number) {
    setTables(tables.filter((_, idx) => idx !== i));
  }

  function updateTable(i: number, field: keyof TableDraft, value: string) {
    setTables(tables.map((t, idx) => idx === i ? { ...t, [field]: value } : t));
  }

  function canAdvance(): boolean {
    if (step === 0) return !!(venueName && venueType && neighborhood && address && capacity);
    if (step === 1) return !!(description && priceRange && hours);
    if (step === 2) return true;
    if (step === 3) return !!(contactName && contactRole && contactEmail && contactPhone);
    return true;
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError("");

    const body = {
      venue_name: venueName,
      venue_type: venueType,
      neighborhood,
      address,
      capacity,
      description,
      vibe,
      price_range: priceRange,
      hours,
      dress_code: dressCode,
      tables: tables
        .filter((t) => t.name && t.location)
        .map((t) => ({
          name: t.name,
          location: t.location,
          description: t.description,
          capacity_min: parseInt(t.capacity_min) || 2,
          capacity_max: parseInt(t.capacity_max) || 10,
          minimum_spend: parseInt(t.minimum_spend) || 0,
        })),
      contact_name: contactName,
      contact_role: contactRole,
      contact_email: contactEmail,
      contact_phone: contactPhone,
      website: website || undefined,
      instagram: instagram || undefined,
      notes: notes || undefined,
    };

    try {
      const res = await fetch("/api/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      const data = await res.json();
      setSubmissionId(data.submission.id);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div
        className="min-h-screen bg-nocte-black text-nocte-cream flex items-center justify-center"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 64px)" }}
      >
        <div className="px-6 text-center max-w-md">
          <div className="w-16 h-16 border border-nocte-gold mx-auto mb-6 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-nocte-gold">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-3">Submission Received</p>
          <h1 className="font-display text-3xl font-light mb-3">{venueName}</h1>
          <p className="font-sans text-sm text-nocte-muted mb-6 leading-relaxed">
            Thank you for onboarding with Noctē. Our team will review your venue and reach out within 24–48 hours to finalize your listing.
          </p>
          <p className="font-sans text-[10px] text-nocte-muted/60 tracking-[0.15em] uppercase">
            Reference: {submissionId}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-nocte-black text-nocte-cream"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 64px)" }}
    >
      {/* Header */}
      <div className="px-6 pt-16 pb-8">
        <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-2">Venue Onboarding</p>
        <h1 className="font-display text-4xl font-light mb-2">List Your Venue</h1>
        <p className="font-sans text-sm text-nocte-muted">Join Miami&apos;s premier nightlife concierge platform.</p>
      </div>

      {/* Step Indicator */}
      <div className="px-6 mb-8">
        <div className="flex gap-1 mb-3">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-[2px] flex-1 transition-all duration-300 ${
                i <= step ? "bg-nocte-gold" : "bg-nocte-border"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <p className="font-sans text-[10px] text-nocte-gold tracking-[0.2em] uppercase">
            {STEPS[step]}
          </p>
          <p className="font-sans text-[10px] text-nocte-muted tracking-[0.1em]">
            {step + 1} / {STEPS.length}
          </p>
        </div>
      </div>

      {/* Form Content */}
      <div className="px-6">
        {step === 0 && (
          <div className="flex flex-col gap-5">
            <Field label="Venue Name" required value={venueName} onChange={setVenueName} placeholder="e.g. LIV" />
            <SelectField label="Venue Type" required value={venueType} onChange={setVenueType} options={VENUE_TYPES} />
            <SelectField label="Neighborhood" required value={neighborhood} onChange={setNeighborhood} options={NEIGHBORHOODS} />
            <Field label="Full Address" required value={address} onChange={setAddress} placeholder="123 Collins Ave, Miami Beach, FL 33139" />
            <Field label="Max Capacity" required value={capacity} onChange={setCapacity} placeholder="e.g. 500" />
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-5">
            <TextArea label="Description" required value={description} onChange={setDescription} placeholder="Tell us what makes your venue special — the energy, the crowd, the experience." rows={4} />
            <div>
              <label className="font-sans text-[10px] text-nocte-muted tracking-[0.2em] uppercase block mb-3">Vibe Tags</label>
              <div className="flex flex-wrap gap-2">
                {VIBES.map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => toggleVibe(v)}
                    className={`font-sans text-[10px] tracking-[0.1em] uppercase border px-3 py-2 transition-all duration-200 ${
                      vibe.includes(v)
                        ? "border-nocte-gold text-nocte-gold bg-nocte-gold/5"
                        : "border-nocte-border text-nocte-muted hover:border-nocte-gold/40"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="font-sans text-[10px] text-nocte-muted tracking-[0.2em] uppercase block mb-3">Price Range <span className="text-nocte-gold">*</span></label>
              <div className="flex gap-2">
                {(["$", "$$", "$$$", "$$$$"] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriceRange(p)}
                    className={`flex-1 font-sans text-sm border py-3 transition-all duration-200 ${
                      priceRange === p
                        ? "border-nocte-gold text-nocte-gold bg-nocte-gold/5"
                        : "border-nocte-border text-nocte-muted hover:border-nocte-gold/40"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <Field label="Hours" required value={hours} onChange={setHours} placeholder="e.g. Fri–Sat 11pm–5am" />
            <Field label="Dress Code" value={dressCode} onChange={setDressCode} placeholder="e.g. Upscale — no athletic wear" />
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-5">
            <p className="font-sans text-sm text-nocte-muted leading-relaxed">
              Add your table options so guests can browse and book through Noctē. You can always update these later.
            </p>

            {tables.map((t, i) => (
              <div key={i} className="border border-nocte-border p-5" style={{ background: "linear-gradient(135deg, #0e0e0e, #090909)" }}>
                <div className="flex items-center justify-between mb-4">
                  <p className="font-sans text-[10px] text-nocte-gold tracking-[0.2em] uppercase">Table {i + 1}</p>
                  <button
                    type="button"
                    onClick={() => removeTable(i)}
                    className="font-sans text-[10px] text-nocte-muted hover:text-red-400 tracking-[0.1em] uppercase transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Table Name" value={t.name} onChange={(v) => updateTable(i, "name", v)} placeholder="e.g. VIP Booth" compact />
                    <Field label="Location" value={t.location} onChange={(v) => updateTable(i, "location", v)} placeholder="e.g. Main Floor" compact />
                  </div>
                  <Field label="Description" value={t.description} onChange={(v) => updateTable(i, "description", v)} placeholder="Brief description of the table" compact />
                  <div className="grid grid-cols-3 gap-3">
                    <Field label="Min Guests" value={t.capacity_min} onChange={(v) => updateTable(i, "capacity_min", v)} placeholder="2" type="number" compact />
                    <Field label="Max Guests" value={t.capacity_max} onChange={(v) => updateTable(i, "capacity_max", v)} placeholder="10" type="number" compact />
                    <Field label="Minimum $" value={t.minimum_spend} onChange={(v) => updateTable(i, "minimum_spend", v)} placeholder="0" type="number" compact />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addTable}
              className="border border-dashed border-nocte-border text-nocte-muted font-sans text-[10px] tracking-[0.2em] uppercase py-4 hover:border-nocte-gold/40 hover:text-nocte-cream transition-all duration-200"
            >
              + Add Table
            </button>

            {tables.length === 0 && (
              <p className="font-sans text-xs text-nocte-muted/60 text-center py-4">
                No tables yet — add your first table above, or skip this step and configure later.
              </p>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-5">
            <Field label="Your Name" required value={contactName} onChange={setContactName} placeholder="Full name" />
            <Field label="Your Role" required value={contactRole} onChange={setContactRole} placeholder="e.g. General Manager, Owner" />
            <Field label="Email" required value={contactEmail} onChange={setContactEmail} placeholder="you@venue.com" type="email" />
            <Field label="Phone" required value={contactPhone} onChange={setContactPhone} placeholder="+1 (305) 555-0000" type="tel" />
            <Field label="Website" value={website} onChange={setWebsite} placeholder="https://yourvenue.com" />
            <Field label="Instagram" value={instagram} onChange={setInstagram} placeholder="@yourvenue" />
            <TextArea label="Additional Notes" value={notes} onChange={setNotes} placeholder="Anything else we should know — current booking setup, special features, etc." rows={3} />
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col gap-4">
            <ReviewSection title="Venue">
              <ReviewRow label="Name" value={venueName} />
              <ReviewRow label="Type" value={venueType} />
              <ReviewRow label="Neighborhood" value={neighborhood} />
              <ReviewRow label="Address" value={address} />
              <ReviewRow label="Capacity" value={capacity} />
            </ReviewSection>

            <ReviewSection title="Atmosphere">
              <ReviewRow label="Description" value={description} />
              {vibe.length > 0 && <ReviewRow label="Vibe" value={vibe.join(", ")} />}
              <ReviewRow label="Price" value={priceRange} />
              <ReviewRow label="Hours" value={hours} />
              {dressCode && <ReviewRow label="Dress Code" value={dressCode} />}
            </ReviewSection>

            <ReviewSection title={`Tables (${tables.filter((t) => t.name).length})`}>
              {tables.filter((t) => t.name).length === 0 ? (
                <p className="font-sans text-xs text-nocte-muted/60 italic">No tables configured — you can add these later.</p>
              ) : (
                tables.filter((t) => t.name).map((t, i) => (
                  <div key={i} className={i > 0 ? "border-t border-nocte-border pt-2 mt-2" : ""}>
                    <ReviewRow label={t.name} value={`${t.location} · ${t.capacity_min || 2}–${t.capacity_max || 10} guests${parseInt(t.minimum_spend) > 0 ? ` · $${parseInt(t.minimum_spend).toLocaleString()} min` : ""}`} />
                  </div>
                ))
              )}
            </ReviewSection>

            <ReviewSection title="Contact">
              <ReviewRow label="Name" value={contactName} />
              <ReviewRow label="Role" value={contactRole} />
              <ReviewRow label="Email" value={contactEmail} />
              <ReviewRow label="Phone" value={contactPhone} />
              {website && <ReviewRow label="Website" value={website} />}
              {instagram && <ReviewRow label="Instagram" value={instagram} />}
              {notes && <ReviewRow label="Notes" value={notes} />}
            </ReviewSection>
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="font-sans text-xs text-red-400 mt-4">{error}</p>
        )}

        {/* Navigation */}
        <div className="flex gap-3 mt-8 pb-8">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="flex-1 border border-nocte-border text-nocte-muted font-sans text-[10px] tracking-[0.2em] uppercase py-4 hover:border-nocte-gold/40 hover:text-nocte-cream transition-all duration-200"
            >
              Back
            </button>
          )}
          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              disabled={!canAdvance()}
              className="flex-1 border border-nocte-gold text-nocte-gold font-sans text-[10px] tracking-[0.2em] uppercase py-4 hover:bg-nocte-gold hover:text-nocte-black transition-all duration-200 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-nocte-gold"
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="flex-1 bg-nocte-gold text-nocte-black font-sans text-[10px] tracking-[0.2em] uppercase py-4 hover:bg-nocte-gold-light transition-all duration-200 disabled:opacity-50"
            >
              {submitting ? "Submitting…" : "Submit Venue"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Form Components ───

function Field({ label, value, onChange, placeholder, required, type = "text", compact }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  compact?: boolean;
}) {
  return (
    <div>
      <label className={`font-sans text-nocte-muted tracking-[0.2em] uppercase block ${compact ? "text-[9px] mb-1.5" : "text-[10px] mb-2"}`}>
        {label} {required && <span className="text-nocte-gold">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-nocte-surface border border-nocte-border text-nocte-cream font-sans placeholder:text-nocte-muted/40 focus:border-nocte-gold focus:outline-none transition-colors ${compact ? "text-xs px-3 py-2.5" : "text-sm px-4 py-3"}`}
      />
    </div>
  );
}

function TextArea({ label, value, onChange, placeholder, required, rows = 3 }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}) {
  return (
    <div>
      <label className="font-sans text-[10px] text-nocte-muted tracking-[0.2em] uppercase block mb-2">
        {label} {required && <span className="text-nocte-gold">*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full bg-nocte-surface border border-nocte-border text-nocte-cream font-sans text-sm px-4 py-3 placeholder:text-nocte-muted/40 focus:border-nocte-gold focus:outline-none transition-colors resize-none"
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options, required }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label className="font-sans text-[10px] text-nocte-muted tracking-[0.2em] uppercase block mb-2">
        {label} {required && <span className="text-nocte-gold">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-nocte-surface border border-nocte-border text-nocte-cream font-sans text-sm px-4 py-3 focus:border-nocte-gold focus:outline-none transition-colors appearance-none"
      >
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function ReviewSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-nocte-border p-5" style={{ background: "linear-gradient(135deg, #0e0e0e, #090909)" }}>
      <p className="font-sans text-[10px] text-nocte-gold tracking-[0.2em] uppercase mb-3">{title}</p>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <p className="font-sans text-[9px] text-nocte-muted tracking-[0.1em] uppercase shrink-0">{label}</p>
      <p className="font-sans text-xs text-nocte-cream text-right">{value}</p>
    </div>
  );
}
