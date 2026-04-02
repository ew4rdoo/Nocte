"use client";

import { useState } from "react";
import Link from "next/link";
import type { Venue, TableOption } from "@/lib/venues";

type Step = "date" | "table" | "details" | "confirm";

type BookingData = {
  date: string;
  tableId: string;
  partySize: number;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  specialRequests: string;
};

type BookingResult = {
  id: string;
  venue_name: string;
  table_name: string;
  date: string;
  party_size: number;
  guest_name: string;
  total_minimum: number;
};

export default function BookingFlow({ venue }: { venue: Venue }) {
  const [step, setStep] = useState<Step>("date");
  const [data, setData] = useState<BookingData>({
    date: "",
    tableId: "",
    partySize: 2,
    guestName: "",
    guestPhone: "",
    guestEmail: "",
    specialRequests: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<BookingResult | null>(null);
  const [error, setError] = useState("");

  const tables = venue.tables ?? [];
  const selectedTable = tables.find((t) => t.id === data.tableId);

  async function handleSubmit() {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          venueId: venue.id,
          tableId: data.tableId,
          date: data.date,
          partySize: data.partySize,
          guestName: data.guestName,
          guestPhone: data.guestPhone,
          guestEmail: data.guestEmail,
          specialRequests: data.specialRequests || undefined,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Something went wrong");
        return;
      }
      setResult(json.booking);
      setStep("confirm");
    } catch {
      setError("Failed to create booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="min-h-screen bg-nocte-black text-nocte-cream"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 64px)" }}
    >
      {/* Header */}
      <div className="px-6 pt-16 pb-5 border-b border-nocte-border">
        <Link
          href={`/venues/${venue.id}`}
          className="flex items-center gap-2 font-sans text-[10px] tracking-[0.2em] uppercase text-nocte-muted hover:text-nocte-cream transition-colors duration-200 mb-4"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {venue.name}
        </Link>
        <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-1">
          {step === "confirm" ? "Confirmed" : "Reserve"}
        </p>
        <h1 className="font-display text-3xl font-light text-nocte-cream tracking-[0.15em]">
          {step === "confirm" ? "You're All Set" : venue.name}
        </h1>
      </div>

      {/* Progress */}
      {step !== "confirm" && (
        <div className="px-6 py-4 flex gap-1">
          {(["date", "table", "details"] as const).map((s, i) => (
            <div
              key={s}
              className={`h-0.5 flex-1 transition-colors duration-300 ${
                i <= ["date", "table", "details"].indexOf(step)
                  ? "bg-nocte-gold"
                  : "bg-nocte-border"
              }`}
            />
          ))}
        </div>
      )}

      {/* Steps */}
      <div className="px-6 py-6">
        {step === "date" && (
          <DateStep
            value={data.date}
            onChange={(date) => setData({ ...data, date })}
            onNext={() => setStep("table")}
          />
        )}
        {step === "table" && (
          <TableStep
            tables={tables}
            selectedId={data.tableId}
            partySize={data.partySize}
            onSelectTable={(tableId) => setData({ ...data, tableId })}
            onPartySize={(partySize) => setData({ ...data, partySize })}
            onNext={() => setStep("details")}
            onBack={() => setStep("date")}
          />
        )}
        {step === "details" && (
          <DetailsStep
            data={data}
            selectedTable={selectedTable!}
            venue={venue}
            onChange={(updates) => setData({ ...data, ...updates })}
            onSubmit={handleSubmit}
            onBack={() => setStep("table")}
            submitting={submitting}
            error={error}
          />
        )}
        {step === "confirm" && result && (
          <ConfirmStep result={result} venueId={venue.id} />
        )}
      </div>
    </div>
  );
}

function DateStep({
  value,
  onChange,
  onNext,
}: {
  value: string;
  onChange: (d: string) => void;
  onNext: () => void;
}) {
  const today = new Date();
  const dates: { label: string; sublabel: string; value: string }[] = [];
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
    const monthDay = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const iso = d.toISOString().split("T")[0];
    dates.push({
      label: i === 0 ? "Tonight" : i === 1 ? "Tomorrow" : dayName,
      sublabel: monthDay,
      value: iso,
    });
  }

  return (
    <div>
      <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-6">
        When are you going out?
      </p>
      <div className="grid grid-cols-3 gap-2">
        {dates.map((d) => (
          <button
            key={d.value}
            onClick={() => onChange(d.value)}
            className={`border px-3 py-4 text-center transition-all duration-200 ${
              value === d.value
                ? "border-nocte-gold bg-nocte-gold/5"
                : "border-nocte-border hover:border-nocte-gold/40"
            }`}
          >
            <p className={`font-sans text-sm ${value === d.value ? "text-nocte-gold" : "text-nocte-cream"}`}>
              {d.label}
            </p>
            <p className="font-sans text-[10px] text-nocte-muted mt-0.5">{d.sublabel}</p>
          </button>
        ))}
      </div>
      <button
        onClick={onNext}
        disabled={!value}
        className="mt-8 w-full border border-nocte-gold text-nocte-gold font-sans text-[11px] tracking-[0.25em] uppercase px-6 py-4 hover:bg-nocte-gold hover:text-nocte-black transition-all duration-300 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-nocte-gold"
      >
        Choose Table
      </button>
    </div>
  );
}

function TableStep({
  tables,
  selectedId,
  partySize,
  onSelectTable,
  onPartySize,
  onNext,
  onBack,
}: {
  tables: TableOption[];
  selectedId: string;
  partySize: number;
  onSelectTable: (id: string) => void;
  onPartySize: (n: number) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const selected = tables.find((t) => t.id === selectedId);
  const partySizeValid = selected
    ? partySize >= selected.capacity.min && partySize <= selected.capacity.max
    : false;

  return (
    <div>
      <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-6">
        Select your table
      </p>
      <div className="flex flex-col gap-3">
        {tables.map((table) => (
          <button
            key={table.id}
            onClick={() => {
              onSelectTable(table.id);
              if (partySize < table.capacity.min) onPartySize(table.capacity.min);
              if (partySize > table.capacity.max) onPartySize(table.capacity.max);
            }}
            className={`border p-5 text-left transition-all duration-200 ${
              selectedId === table.id
                ? "border-nocte-gold bg-nocte-gold/5"
                : "border-nocte-border hover:border-nocte-gold/40"
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className={`font-sans text-sm ${selectedId === table.id ? "text-nocte-gold" : "text-nocte-cream"}`}>
                  {table.name}
                </p>
                <p className="font-sans text-[10px] text-nocte-muted tracking-[0.1em] uppercase mt-0.5">
                  {table.location}
                </p>
              </div>
              <div className="text-right">
                <p className="font-display text-lg font-light text-nocte-cream">
                  {table.minimumSpend > 0 ? `$${table.minimumSpend.toLocaleString()}` : "No min"}
                </p>
                {table.minimumSpend > 0 && (
                  <p className="font-sans text-[9px] text-nocte-muted tracking-[0.1em] uppercase">minimum</p>
                )}
              </div>
            </div>
            <p className="font-sans text-xs text-nocte-muted leading-relaxed">
              {table.description}
            </p>
            <p className="font-sans text-[10px] text-nocte-muted/60 mt-2">
              {table.capacity.min}–{table.capacity.max} guests
            </p>
          </button>
        ))}
      </div>

      {/* Party size */}
      {selected && (
        <div className="mt-8">
          <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-4">
            Party size
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onPartySize(Math.max(selected.capacity.min, partySize - 1))}
              className="w-10 h-10 border border-nocte-border text-nocte-cream flex items-center justify-center hover:border-nocte-gold/40 transition-colors"
            >
              -
            </button>
            <span className="font-display text-2xl font-light text-nocte-cream w-8 text-center">
              {partySize}
            </span>
            <button
              onClick={() => onPartySize(Math.min(selected.capacity.max, partySize + 1))}
              className="w-10 h-10 border border-nocte-border text-nocte-cream flex items-center justify-center hover:border-nocte-gold/40 transition-colors"
            >
              +
            </button>
            <span className="font-sans text-[10px] text-nocte-muted tracking-[0.1em]">
              {selected.capacity.min}–{selected.capacity.max} guests
            </span>
          </div>
        </div>
      )}

      <div className="flex gap-3 mt-8">
        <button
          onClick={onBack}
          className="flex-1 border border-nocte-border text-nocte-muted font-sans text-[11px] tracking-[0.25em] uppercase px-6 py-4 hover:border-nocte-gold/40 hover:text-nocte-cream transition-all duration-300"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!selectedId || !partySizeValid}
          className="flex-1 border border-nocte-gold text-nocte-gold font-sans text-[11px] tracking-[0.25em] uppercase px-6 py-4 hover:bg-nocte-gold hover:text-nocte-black transition-all duration-300 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-nocte-gold"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function DetailsStep({
  data,
  selectedTable,
  venue,
  onChange,
  onSubmit,
  onBack,
  submitting,
  error,
}: {
  data: BookingData;
  selectedTable: TableOption;
  venue: Venue;
  onChange: (updates: Partial<BookingData>) => void;
  onSubmit: () => void;
  onBack: () => void;
  submitting: boolean;
  error: string;
}) {
  const dateLabel = new Date(data.date + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const canSubmit = data.guestName.trim() && data.guestPhone.trim() && data.guestEmail.trim();

  return (
    <div>
      {/* Summary */}
      <div className="border border-nocte-border p-5 mb-8" style={{ background: "linear-gradient(135deg, #0e0e0e, #090909)" }}>
        <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-3">
          Booking Summary
        </p>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-sans text-xs text-nocte-muted">Venue</span>
            <span className="font-sans text-xs text-nocte-cream">{venue.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-sans text-xs text-nocte-muted">Table</span>
            <span className="font-sans text-xs text-nocte-cream">{selectedTable.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-sans text-xs text-nocte-muted">Date</span>
            <span className="font-sans text-xs text-nocte-cream">{dateLabel}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-sans text-xs text-nocte-muted">Party</span>
            <span className="font-sans text-xs text-nocte-cream">{data.partySize} guests</span>
          </div>
          {selectedTable.minimumSpend > 0 && (
            <div className="flex justify-between pt-2 border-t border-nocte-border">
              <span className="font-sans text-xs text-nocte-muted">Minimum spend</span>
              <span className="font-display text-sm text-nocte-gold">
                ${selectedTable.minimumSpend.toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Contact info */}
      <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-4">
        Your Details
      </p>
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Full name"
          value={data.guestName}
          onChange={(e) => onChange({ guestName: e.target.value })}
          className="w-full border border-nocte-border bg-nocte-surface px-4 py-3.5 font-sans text-sm text-nocte-cream placeholder-nocte-muted/40 outline-none focus:border-nocte-gold/40 transition-colors"
        />
        <input
          type="tel"
          placeholder="Phone number"
          value={data.guestPhone}
          onChange={(e) => onChange({ guestPhone: e.target.value })}
          className="w-full border border-nocte-border bg-nocte-surface px-4 py-3.5 font-sans text-sm text-nocte-cream placeholder-nocte-muted/40 outline-none focus:border-nocte-gold/40 transition-colors"
        />
        <input
          type="email"
          placeholder="Email address"
          value={data.guestEmail}
          onChange={(e) => onChange({ guestEmail: e.target.value })}
          className="w-full border border-nocte-border bg-nocte-surface px-4 py-3.5 font-sans text-sm text-nocte-cream placeholder-nocte-muted/40 outline-none focus:border-nocte-gold/40 transition-colors"
        />
        <textarea
          placeholder="Special requests (optional)"
          value={data.specialRequests}
          onChange={(e) => onChange({ specialRequests: e.target.value })}
          rows={3}
          className="w-full border border-nocte-border bg-nocte-surface px-4 py-3.5 font-sans text-sm text-nocte-cream placeholder-nocte-muted/40 outline-none focus:border-nocte-gold/40 transition-colors resize-none"
        />
      </div>

      {error && (
        <p className="font-sans text-xs text-red-400 mt-3">{error}</p>
      )}

      <div className="flex gap-3 mt-8">
        <button
          onClick={onBack}
          disabled={submitting}
          className="flex-1 border border-nocte-border text-nocte-muted font-sans text-[11px] tracking-[0.25em] uppercase px-6 py-4 hover:border-nocte-gold/40 hover:text-nocte-cream transition-all duration-300 disabled:opacity-30"
        >
          Back
        </button>
        <button
          onClick={onSubmit}
          disabled={!canSubmit || submitting}
          className="flex-1 bg-nocte-gold text-nocte-black font-sans text-[11px] tracking-[0.25em] uppercase px-6 py-4 hover:bg-nocte-gold-light transition-all duration-300 disabled:opacity-30"
        >
          {submitting ? (
            <span className="flex items-center justify-center gap-1">
              <span className="w-1 h-1 rounded-full bg-nocte-black/60 animate-bounce [animation-delay:0ms]" />
              <span className="w-1 h-1 rounded-full bg-nocte-black/60 animate-bounce [animation-delay:150ms]" />
              <span className="w-1 h-1 rounded-full bg-nocte-black/60 animate-bounce [animation-delay:300ms]" />
            </span>
          ) : (
            "Confirm Booking"
          )}
        </button>
      </div>
    </div>
  );
}

function ConfirmStep({
  result,
  venueId,
}: {
  result: BookingResult;
  venueId: string;
}) {
  const dateLabel = new Date(result.date + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      {/* Confirmation icon */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-16 h-16 border border-nocte-gold/30 flex items-center justify-center animate-gold-glow-in">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-nocte-gold">
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="absolute inset-0 border border-nocte-gold/20 animate-gold-pulse-ring" />
        </div>
      </div>

      <p className="font-sans text-center text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-2">
        Booking Confirmed
      </p>
      <p className="font-display text-center text-2xl font-light text-nocte-cream tracking-[0.15em] mb-1">
        {result.venue_name}
      </p>
      <p className="font-sans text-center text-xs text-nocte-muted mb-8">
        Confirmation #{result.id}
      </p>

      <div className="border border-nocte-border p-5 mb-8" style={{ background: "linear-gradient(135deg, #0e0e0e, #090909)" }}>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="font-sans text-xs text-nocte-muted">Guest</span>
            <span className="font-sans text-xs text-nocte-cream">{result.guest_name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-sans text-xs text-nocte-muted">Date</span>
            <span className="font-sans text-xs text-nocte-cream">{dateLabel}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-sans text-xs text-nocte-muted">Table</span>
            <span className="font-sans text-xs text-nocte-cream">{result.table_name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-sans text-xs text-nocte-muted">Party</span>
            <span className="font-sans text-xs text-nocte-cream">{result.party_size} guests</span>
          </div>
          {result.total_minimum > 0 && (
            <div className="flex justify-between pt-2 border-t border-nocte-border">
              <span className="font-sans text-xs text-nocte-muted">Minimum spend</span>
              <span className="font-display text-sm text-nocte-gold">
                ${result.total_minimum.toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </div>

      <p className="font-sans text-xs text-nocte-muted text-center leading-relaxed mb-8">
        Your concierge will reach out shortly with final details. If you need anything before then, just ask.
      </p>

      <div className="flex flex-col gap-3">
        <Link
          href="/concierge"
          className="w-full border border-nocte-gold text-nocte-gold font-sans text-[11px] tracking-[0.25em] uppercase px-6 py-4 hover:bg-nocte-gold hover:text-nocte-black transition-all duration-300 text-center"
        >
          Ask the Concierge
        </Link>
        <Link
          href={`/venues/${venueId}`}
          className="w-full border border-nocte-border text-nocte-muted font-sans text-[11px] tracking-[0.25em] uppercase px-6 py-4 hover:border-nocte-gold/40 hover:text-nocte-cream transition-all duration-300 text-center"
        >
          Back to Venue
        </Link>
      </div>
    </div>
  );
}
