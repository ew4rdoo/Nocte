"use client";

import { useState } from "react";
import type { ClubServiceInfo, RestaurantServiceInfo, RooftopServiceInfo, ServiceInfo } from "@/lib/venue-submissions";

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

const STEPS = ["Venue Basics", "Atmosphere", "Service Setup", "Contact", "Review"];

const CLUB_TYPES = new Set(["Nightclub", "Ultra Lounge", "Lounge"]);
const RESTAURANT_TYPES = new Set(["Restaurant & Bar", "Steakhouse", "Japanese", "Mediterranean", "Omakase", "Fusion"]);
const ROOFTOP_TYPES = new Set(["Rooftop Bar", "Beach Club", "Cocktail Bar"]);

function getServiceCategory(venueType: string): "club" | "restaurant" | "rooftop" {
  if (CLUB_TYPES.has(venueType)) return "club";
  if (RESTAURANT_TYPES.has(venueType)) return "restaurant";
  if (ROOFTOP_TYPES.has(venueType)) return "rooftop";
  return "club";
}

const SPEND_STOPS = [0, 500, 1000, 1500, 2000, 2500, 3000, 5000, 7500, 10000, 15000, 20000, 50000];

function formatSpend(v: number): string {
  if (v === 0) return "$0";
  if (v >= 1000) return `$${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1)}k`;
  return `$${v}`;
}

function nearestStop(v: number): number {
  let closest = SPEND_STOPS[0];
  for (const s of SPEND_STOPS) {
    if (Math.abs(s - v) < Math.abs(closest - v)) closest = s;
  }
  return closest;
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

  // Step 3: Service — Club
  const [vipTables, setVipTables] = useState("0");
  const [standardTables, setStandardTables] = useState("0");
  const [minSpendLow, setMinSpendLow] = useState(1);
  const [minSpendHigh, setMinSpendHigh] = useState(8);
  const [hasOutdoor, setHasOutdoor] = useState(false);
  const [hasMezzanine, setHasMezzanine] = useState(false);
  const [hasDjAdjacent, setHasDjAdjacent] = useState(false);
  const [floorPlanUpload, setFloorPlanUpload] = useState(false);

  // Step 3: Service — Restaurant
  const [seatingCapacity, setSeatingCapacity] = useState("");
  const [maxPartySize, setMaxPartySize] = useState("");
  const [hasPrivateDining, setHasPrivateDining] = useState(false);
  const [privateDiningCapacity, setPrivateDiningCapacity] = useState("");
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [hasPrixFixe, setHasPrixFixe] = useState(false);

  // Step 3: Service — Rooftop
  const [bottleTableCount, setBottleTableCount] = useState("0");
  const [rooftopMinLow, setRooftopMinLow] = useState(1);
  const [rooftopMinHigh, setRooftopMinHigh] = useState(7);
  const [generalSeating, setGeneralSeating] = useState("");
  const [sections, setSections] = useState<string[]>([]);

  // Step 4: Contact
  const [contactName, setContactName] = useState("");
  const [contactRole, setContactRole] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [instagram, setInstagram] = useState("");
  const [notes, setNotes] = useState("");

  const serviceCategory = getServiceCategory(venueType);

  function toggleVibe(v: string) {
    setVibe((prev) => prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]);
  }

  function toggleTimeSlot(s: string) {
    setTimeSlots((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  }

  function toggleSection(s: string) {
    setSections((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  }

  function buildServiceInfo(): ServiceInfo {
    if (serviceCategory === "club") {
      return {
        category: "club",
        vip_tables: parseInt(vipTables) || 0,
        standard_tables: parseInt(standardTables) || 0,
        min_spend_low: SPEND_STOPS[minSpendLow] ?? 0,
        min_spend_high: SPEND_STOPS[minSpendHigh] ?? 0,
        has_outdoor: hasOutdoor,
        has_mezzanine: hasMezzanine,
        has_dj_adjacent: hasDjAdjacent,
        floor_plan_upload: floorPlanUpload,
      };
    }
    if (serviceCategory === "restaurant") {
      return {
        category: "restaurant",
        seating_capacity: parseInt(seatingCapacity) || 0,
        max_party_size: parseInt(maxPartySize) || 0,
        has_private_dining: hasPrivateDining,
        private_dining_capacity: privateDiningCapacity,
        time_slots: timeSlots,
        has_prix_fixe: hasPrixFixe,
      };
    }
    return {
      category: "rooftop",
      bottle_table_count: parseInt(bottleTableCount) || 0,
      min_spend_low: SPEND_STOPS[rooftopMinLow] ?? 0,
      min_spend_high: SPEND_STOPS[rooftopMinHigh] ?? 0,
      general_seating: parseInt(generalSeating) || 0,
      sections,
    };
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
      service_info: buildServiceInfo(),
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

        {step === 2 && serviceCategory === "club" && (
          <div className="flex flex-col gap-6">
            <p className="font-sans text-xs text-nocte-muted leading-relaxed">
              Quick setup for your table service. Our team will handle the detailed floor plan.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <CounterField label="VIP Tables" value={vipTables} onChange={setVipTables} />
              <CounterField label="Standard Tables" value={standardTables} onChange={setStandardTables} />
            </div>

            <div>
              <label className="font-sans text-[10px] text-nocte-muted tracking-[0.2em] uppercase block mb-3">
                Minimum Spend Range
              </label>
              <RangeSlider
                low={minSpendLow}
                high={minSpendHigh}
                stops={SPEND_STOPS}
                onLowChange={setMinSpendLow}
                onHighChange={setMinSpendHigh}
              />
            </div>

            <div>
              <label className="font-sans text-[10px] text-nocte-muted tracking-[0.2em] uppercase block mb-3">Features</label>
              <div className="flex flex-col gap-2">
                <Toggle label="Outdoor section" checked={hasOutdoor} onChange={setHasOutdoor} />
                <Toggle label="Mezzanine / Balcony" checked={hasMezzanine} onChange={setHasMezzanine} />
                <Toggle label="DJ-adjacent tables available" checked={hasDjAdjacent} onChange={setHasDjAdjacent} />
              </div>
            </div>

            <div
              className={`border border-dashed p-5 text-center transition-all duration-200 cursor-pointer ${
                floorPlanUpload
                  ? "border-nocte-gold bg-nocte-gold/5"
                  : "border-nocte-border hover:border-nocte-gold/40"
              }`}
              onClick={() => setFloorPlanUpload(!floorPlanUpload)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`mx-auto mb-2 ${floorPlanUpload ? "text-nocte-gold" : "text-nocte-muted"}`}>
                <rect x="3" y="3" width="18" height="18" rx="0" />
                <path d="M3 16l5-5 4 4 4-6 5 7" />
              </svg>
              <p className={`font-sans text-[10px] tracking-[0.15em] uppercase ${floorPlanUpload ? "text-nocte-gold" : "text-nocte-muted"}`}>
                {floorPlanUpload ? "Floor plan requested" : "Request floor plan setup"}
              </p>
              <p className="font-sans text-[10px] text-nocte-muted/50 mt-1">
                Our team will create your interactive floor plan
              </p>
            </div>
          </div>
        )}

        {step === 2 && serviceCategory === "restaurant" && (
          <div className="flex flex-col gap-6">
            <p className="font-sans text-xs text-nocte-muted leading-relaxed">
              Tell us about your dining setup so we can match guests to the right experience.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Seating Capacity" value={seatingCapacity} onChange={setSeatingCapacity} placeholder="e.g. 120" type="number" />
              <Field label="Largest Party Size" value={maxPartySize} onChange={setMaxPartySize} placeholder="e.g. 12" type="number" />
            </div>

            <div>
              <label className="font-sans text-[10px] text-nocte-muted tracking-[0.2em] uppercase block mb-3">Private Dining</label>
              <Toggle label="Private dining available" checked={hasPrivateDining} onChange={setHasPrivateDining} />
              {hasPrivateDining && (
                <div className="mt-3">
                  <Field label="Private Dining Capacity" value={privateDiningCapacity} onChange={setPrivateDiningCapacity} placeholder="e.g. 20 guests" compact />
                </div>
              )}
            </div>

            <div>
              <label className="font-sans text-[10px] text-nocte-muted tracking-[0.2em] uppercase block mb-3">Reservation Time Slots</label>
              <div className="flex flex-wrap gap-2">
                {["Brunch", "Lunch", "Dinner", "Late Night"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleTimeSlot(s)}
                    className={`font-sans text-[10px] tracking-[0.1em] uppercase border px-4 py-2.5 transition-all duration-200 ${
                      timeSlots.includes(s)
                        ? "border-nocte-gold text-nocte-gold bg-nocte-gold/5"
                        : "border-nocte-border text-nocte-muted hover:border-nocte-gold/40"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <Toggle label="Prix fixe or special menu options" checked={hasPrixFixe} onChange={setHasPrixFixe} />
          </div>
        )}

        {step === 2 && serviceCategory === "rooftop" && (
          <div className="flex flex-col gap-6">
            <p className="font-sans text-xs text-nocte-muted leading-relaxed">
              Set up your bottle service and general seating areas.
            </p>

            <CounterField label="Bottle Service Tables" value={bottleTableCount} onChange={setBottleTableCount} />

            <div>
              <label className="font-sans text-[10px] text-nocte-muted tracking-[0.2em] uppercase block mb-3">
                Bottle Service Min Spend Range
              </label>
              <RangeSlider
                low={rooftopMinLow}
                high={rooftopMinHigh}
                stops={SPEND_STOPS}
                onLowChange={setRooftopMinLow}
                onHighChange={setRooftopMinHigh}
              />
            </div>

            <Field label="General Seating Capacity" value={generalSeating} onChange={setGeneralSeating} placeholder="Non-bottle-service guests" type="number" />

            <div>
              <label className="font-sans text-[10px] text-nocte-muted tracking-[0.2em] uppercase block mb-3">Sections Available</label>
              <div className="flex flex-wrap gap-2">
                {["Rooftop", "Indoor", "Bar Area", "Patio", "Pool Deck", "Lounge", "Garden"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleSection(s)}
                    className={`font-sans text-[10px] tracking-[0.1em] uppercase border px-4 py-2.5 transition-all duration-200 ${
                      sections.includes(s)
                        ? "border-nocte-gold text-nocte-gold bg-nocte-gold/5"
                        : "border-nocte-border text-nocte-muted hover:border-nocte-gold/40"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
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

            <ServiceReview info={buildServiceInfo()} />

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

        {error && (
          <p className="font-sans text-xs text-red-400 mt-4">{error}</p>
        )}

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

function CounterField({ label, value, onChange }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const num = parseInt(value) || 0;
  return (
    <div className="border border-nocte-border p-4" style={{ background: "linear-gradient(135deg, #0e0e0e, #090909)" }}>
      <label className="font-sans text-[9px] text-nocte-muted tracking-[0.2em] uppercase block mb-3">{label}</label>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => onChange(String(Math.max(0, num - 1)))}
          className="w-10 h-10 border border-nocte-border text-nocte-muted font-sans text-lg hover:border-nocte-gold/40 hover:text-nocte-cream transition-all duration-200 flex items-center justify-center"
        >
          −
        </button>
        <span className="font-display text-2xl font-light text-nocte-cream">{num}</span>
        <button
          type="button"
          onClick={() => onChange(String(num + 1))}
          className="w-10 h-10 border border-nocte-border text-nocte-muted font-sans text-lg hover:border-nocte-gold/40 hover:text-nocte-cream transition-all duration-200 flex items-center justify-center"
        >
          +
        </button>
      </div>
    </div>
  );
}

function SpendInput({ value, stops, onChange, align }: {
  value: number;
  stops: number[];
  onChange: (stopIndex: number) => void;
  align: "left" | "right";
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");

  function startEdit() {
    setDraft(String(stops[value]));
    setEditing(true);
  }

  function commit() {
    setEditing(false);
    const num = parseInt(draft.replace(/[^0-9]/g, "")) || 0;
    let closest = 0;
    for (let i = 0; i < stops.length; i++) {
      if (Math.abs(stops[i] - num) < Math.abs(stops[closest] - num)) closest = i;
    }
    onChange(closest);
  }

  if (editing) {
    return (
      <input
        autoFocus
        type="text"
        inputMode="numeric"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => e.key === "Enter" && commit()}
        className={`font-sans text-sm text-nocte-gold bg-nocte-surface border border-nocte-gold px-2 py-1 w-24 focus:outline-none ${align === "right" ? "text-right" : "text-left"}`}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={startEdit}
      className="font-sans text-sm text-nocte-gold border-b border-dashed border-nocte-gold/40 hover:border-nocte-gold transition-colors"
    >
      {formatSpend(stops[value])}
    </button>
  );
}

function RangeSlider({ low, high, stops, onLowChange, onHighChange }: {
  low: number;
  high: number;
  stops: number[];
  onLowChange: (v: number) => void;
  onHighChange: (v: number) => void;
}) {
  const max = stops.length - 1;
  const leftPct = (low / max) * 100;
  const rightPct = (high / max) * 100;
  const midpoint = (low + high) / 2;

  function handleInput(e: React.ChangeEvent<HTMLInputElement>, which: "low" | "high") {
    const v = parseInt(e.target.value);
    if (which === "low") {
      onLowChange(Math.min(v, high));
    } else {
      onHighChange(Math.max(v, low));
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <SpendInput value={low} stops={stops} onChange={(i) => onLowChange(Math.min(i, high))} align="left" />
        <span className="font-sans text-[10px] text-nocte-muted tracking-[0.1em] uppercase">to</span>
        <SpendInput value={high} stops={stops} onChange={(i) => onHighChange(Math.max(i, low))} align="right" />
      </div>
      <div className="relative h-10">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[2px] bg-nocte-border" />
        <div
          className="absolute top-1/2 -translate-y-1/2 h-[2px] bg-nocte-gold"
          style={{ left: `${leftPct}%`, right: `${100 - rightPct}%` }}
        />
        {/* Low handle — clips to left half of range */}
        <input
          type="range"
          min={0}
          max={max}
          value={low}
          onChange={(e) => handleInput(e, "low")}
          className="absolute h-full opacity-0 cursor-pointer"
          style={{ zIndex: 3, left: 0, width: `${((midpoint) / max) * 100}%` }}
        />
        {/* High handle — clips to right half of range */}
        <input
          type="range"
          min={0}
          max={max}
          value={high}
          onChange={(e) => handleInput(e, "high")}
          className="absolute h-full opacity-0 cursor-pointer"
          style={{ zIndex: 3, left: `${((midpoint) / max) * 100}%`, width: `${100 - ((midpoint) / max) * 100}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-nocte-gold bg-nocte-black pointer-events-none"
          style={{ left: `calc(${leftPct}% - 8px)` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-nocte-gold bg-nocte-black pointer-events-none"
          style={{ left: `calc(${rightPct}% - 8px)` }}
        />
      </div>
    </div>
  );
}

function Toggle({ label, checked, onChange }: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex items-center gap-3 border px-4 py-3 transition-all duration-200 text-left ${
        checked
          ? "border-nocte-gold/40 bg-nocte-gold/5"
          : "border-nocte-border hover:border-nocte-gold/20"
      }`}
    >
      <div className={`w-4 h-4 border flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
        checked ? "border-nocte-gold bg-nocte-gold" : "border-nocte-muted"
      }`}>
        {checked && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#050505" strokeWidth="1.5">
            <polyline points="2 5 4.5 7.5 8 3" />
          </svg>
        )}
      </div>
      <span className={`font-sans text-xs ${checked ? "text-nocte-cream" : "text-nocte-muted"}`}>{label}</span>
    </button>
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

function ServiceReview({ info }: { info: ServiceInfo }) {
  if (info.category === "club") {
    const ci = info as ClubServiceInfo;
    const features = [
      ci.has_outdoor && "Outdoor",
      ci.has_mezzanine && "Mezzanine",
      ci.has_dj_adjacent && "DJ-Adjacent",
    ].filter(Boolean);
    return (
      <ReviewSection title="Table Service">
        <ReviewRow label="VIP Tables" value={String(ci.vip_tables)} />
        <ReviewRow label="Standard Tables" value={String(ci.standard_tables)} />
        <ReviewRow label="Min Spend Range" value={`${formatSpend(ci.min_spend_low)} – ${formatSpend(ci.min_spend_high)}`} />
        {features.length > 0 && <ReviewRow label="Features" value={features.join(", ")} />}
        {ci.floor_plan_upload && <ReviewRow label="Floor Plan" value="Setup requested" />}
      </ReviewSection>
    );
  }

  if (info.category === "restaurant") {
    const ri = info as RestaurantServiceInfo;
    return (
      <ReviewSection title="Dining Setup">
        <ReviewRow label="Seating" value={`${ri.seating_capacity} seats`} />
        <ReviewRow label="Max Party" value={`${ri.max_party_size} guests`} />
        <ReviewRow label="Private Dining" value={ri.has_private_dining ? `Yes — ${ri.private_dining_capacity}` : "No"} />
        {ri.time_slots.length > 0 && <ReviewRow label="Time Slots" value={ri.time_slots.join(", ")} />}
        <ReviewRow label="Prix Fixe" value={ri.has_prix_fixe ? "Yes" : "No"} />
      </ReviewSection>
    );
  }

  const rfi = info as RooftopServiceInfo;
  return (
    <ReviewSection title="Service Setup">
      <ReviewRow label="Bottle Tables" value={String(rfi.bottle_table_count)} />
      <ReviewRow label="Min Spend Range" value={`${formatSpend(rfi.min_spend_low)} – ${formatSpend(rfi.min_spend_high)}`} />
      <ReviewRow label="General Seating" value={`${rfi.general_seating} guests`} />
      {rfi.sections.length > 0 && <ReviewRow label="Sections" value={rfi.sections.join(", ")} />}
    </ReviewSection>
  );
}
