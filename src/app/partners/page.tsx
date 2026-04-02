"use client";

import { useState } from "react";
import Link from "next/link";

const VENUE_TYPES = [
  "Nightclub",
  "Ultra Lounge",
  "Lounge",
  "Restaurant & Bar",
  "Rooftop Bar",
  "Beach Club",
  "Cocktail Bar",
  "Steakhouse",
  "Fine Dining",
  "Other",
];

const BENEFITS = [
  {
    title: "Concierge-Filtered Clientele",
    description: "Every guest is vetted through our AI concierge. No random walk-ins — only guests who match your venue's caliber.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Zero Effort on Your End",
    description: "We handle the guest communication, confirmations, and special requests. You just prepare the table.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Higher-Value Bookings",
    description: "Our guests are planning premium experiences. Average table spend through Noctē exceeds walk-in minimums by 40%.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Real-Time Visibility",
    description: "See every booking as it comes in. Confirm, adjust, or communicate through our partner dashboard.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 9h18M9 3v18" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Apply", description: "Fill out the form below. We review every venue personally." },
  { step: "02", title: "Onboard", description: "We set up your listing — tables, pricing, photos, hours. Takes 10 minutes." },
  { step: "03", title: "Receive Bookings", description: "Guests discover you through the concierge. You get notified instantly." },
  { step: "04", title: "Get Paid", description: "We never touch your revenue. Guests pay you directly. No commissions on walk-ins." },
];

export default function PartnersPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    venueName: "",
    contactName: "",
    contactRole: "",
    contactEmail: "",
    contactPhone: "",
    venueType: "",
    venueAddress: "",
    neighborhood: "",
    capacity: "",
    currentBookingMethod: "",
    website: "",
    instagram: "",
    notes: "",
  });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const canSubmit = form.venueName && form.contactName && form.contactRole && form.contactEmail && form.contactPhone && form.venueType && form.venueAddress;

  return (
    <div className="min-h-screen bg-nocte-black text-nocte-cream">
      {/* Hero */}
      <section className="relative px-6 pt-20 pb-16 border-b border-nocte-border">
        <Link
          href="/"
          className="font-display text-sm font-light text-nocte-gold tracking-[0.3em] mb-12 block"
        >
          NOCTĒ
        </Link>

        <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-4">
          Venue Partners
        </p>
        <h1
          className="font-display font-light text-nocte-cream leading-[1.1] mb-6"
          style={{ fontSize: "clamp(2.5rem, 10vw, 4rem)" }}
        >
          Fill your best tables<br />
          with your best guests.
        </h1>
        <p className="font-sans text-sm text-nocte-muted leading-relaxed max-w-md mb-10">
          Noctē is Miami&apos;s AI-powered nightlife concierge. We connect premium guests with premium venues — no noise, no low-quality leads, no wasted tables.
        </p>

        <a
          href="#apply"
          className="inline-flex items-center gap-3 bg-nocte-gold text-nocte-black font-sans text-[11px] tracking-[0.25em] uppercase px-8 py-4 hover:bg-nocte-gold-light transition-all duration-300"
        >
          Become a Partner
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </section>

      {/* Benefits */}
      <section className="px-6 py-16 border-b border-nocte-border">
        <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-8">
          Why Partner with Noctē
        </p>
        <div className="grid grid-cols-1 gap-6">
          {BENEFITS.map((b) => (
            <div key={b.title} className="flex gap-4">
              <div className="w-10 h-10 border border-nocte-gold/20 flex items-center justify-center flex-shrink-0 text-nocte-gold">
                {b.icon}
              </div>
              <div>
                <p className="font-sans text-sm text-nocte-cream mb-1">{b.title}</p>
                <p className="font-sans text-xs text-nocte-muted leading-relaxed">{b.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-16 border-b border-nocte-border">
        <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-8">
          How It Works
        </p>
        <div className="flex flex-col gap-8">
          {HOW_IT_WORKS.map((s) => (
            <div key={s.step} className="flex gap-5">
              <span className="font-display text-2xl font-light text-nocte-gold/30 flex-shrink-0 w-8">
                {s.step}
              </span>
              <div>
                <p className="font-sans text-sm text-nocte-cream mb-1">{s.title}</p>
                <p className="font-sans text-xs text-nocte-muted leading-relaxed">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Social proof */}
      <section className="px-6 py-16 border-b border-nocte-border">
        <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-6">
          Currently Available In
        </p>
        <p className="font-display text-3xl font-light text-nocte-cream tracking-[0.15em] mb-3">
          Miami
        </p>
        <p className="font-sans text-xs text-nocte-muted leading-relaxed">
          South Beach · Brickell · Wynwood · Design District · Downtown · Miami River
        </p>
        <div className="flex gap-8 mt-8">
          <div>
            <p className="font-display text-2xl font-light text-nocte-gold">16+</p>
            <p className="font-sans text-[10px] text-nocte-muted tracking-[0.15em] uppercase mt-1">Venues</p>
          </div>
          <div>
            <p className="font-display text-2xl font-light text-nocte-gold">24/7</p>
            <p className="font-sans text-[10px] text-nocte-muted tracking-[0.15em] uppercase mt-1">AI Concierge</p>
          </div>
          <div>
            <p className="font-display text-2xl font-light text-nocte-gold">$0</p>
            <p className="font-sans text-[10px] text-nocte-muted tracking-[0.15em] uppercase mt-1">To Join</p>
          </div>
        </div>
      </section>

      {/* Application form */}
      <section id="apply" className="px-6 py-16">
        {submitted ? (
          <div className="text-center py-12">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 border border-nocte-gold/30 flex items-center justify-center animate-gold-glow-in">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-nocte-gold">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-2">
              Application Received
            </p>
            <p className="font-display text-2xl font-light text-nocte-cream tracking-[0.15em] mb-4">
              We&apos;ll be in touch.
            </p>
            <p className="font-sans text-xs text-nocte-muted leading-relaxed max-w-sm mx-auto">
              Our team reviews every application personally. Expect to hear from us within 48 hours.
            </p>
          </div>
        ) : (
          <>
            <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-2">
              Apply Now
            </p>
            <h2 className="font-display text-3xl font-light text-nocte-cream tracking-[0.1em] mb-2">
              Partner with Noctē
            </h2>
            <p className="font-sans text-xs text-nocte-muted leading-relaxed mb-8">
              Tell us about your venue. We&apos;ll handle the rest.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Venue info */}
              <div>
                <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-3">
                  Your Venue
                </p>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Venue name *"
                    value={form.venueName}
                    onChange={(e) => update("venueName", e.target.value)}
                    className="w-full border border-nocte-border bg-nocte-surface px-4 py-3.5 font-sans text-sm text-nocte-cream placeholder-nocte-muted/40 outline-none focus:border-nocte-gold/40 transition-colors"
                    required
                  />
                  <select
                    value={form.venueType}
                    onChange={(e) => update("venueType", e.target.value)}
                    className="w-full border border-nocte-border bg-nocte-surface px-4 py-3.5 font-sans text-sm text-nocte-cream outline-none focus:border-nocte-gold/40 transition-colors appearance-none"
                    required
                  >
                    <option value="" disabled className="bg-nocte-surface text-nocte-muted">Venue type *</option>
                    {VENUE_TYPES.map((t) => (
                      <option key={t} value={t} className="bg-nocte-surface">{t}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Full address *"
                    value={form.venueAddress}
                    onChange={(e) => update("venueAddress", e.target.value)}
                    className="w-full border border-nocte-border bg-nocte-surface px-4 py-3.5 font-sans text-sm text-nocte-cream placeholder-nocte-muted/40 outline-none focus:border-nocte-gold/40 transition-colors"
                    required
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Neighborhood"
                      value={form.neighborhood}
                      onChange={(e) => update("neighborhood", e.target.value)}
                      className="w-full border border-nocte-border bg-nocte-surface px-4 py-3.5 font-sans text-sm text-nocte-cream placeholder-nocte-muted/40 outline-none focus:border-nocte-gold/40 transition-colors"
                    />
                    <input
                      type="text"
                      placeholder="Capacity"
                      value={form.capacity}
                      onChange={(e) => update("capacity", e.target.value)}
                      className="w-full border border-nocte-border bg-nocte-surface px-4 py-3.5 font-sans text-sm text-nocte-cream placeholder-nocte-muted/40 outline-none focus:border-nocte-gold/40 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Contact info */}
              <div>
                <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-3">
                  Your Contact
                </p>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your name *"
                    value={form.contactName}
                    onChange={(e) => update("contactName", e.target.value)}
                    className="w-full border border-nocte-border bg-nocte-surface px-4 py-3.5 font-sans text-sm text-nocte-cream placeholder-nocte-muted/40 outline-none focus:border-nocte-gold/40 transition-colors"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Your role (e.g., GM, Owner, Promotions) *"
                    value={form.contactRole}
                    onChange={(e) => update("contactRole", e.target.value)}
                    className="w-full border border-nocte-border bg-nocte-surface px-4 py-3.5 font-sans text-sm text-nocte-cream placeholder-nocte-muted/40 outline-none focus:border-nocte-gold/40 transition-colors"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email *"
                    value={form.contactEmail}
                    onChange={(e) => update("contactEmail", e.target.value)}
                    className="w-full border border-nocte-border bg-nocte-surface px-4 py-3.5 font-sans text-sm text-nocte-cream placeholder-nocte-muted/40 outline-none focus:border-nocte-gold/40 transition-colors"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone *"
                    value={form.contactPhone}
                    onChange={(e) => update("contactPhone", e.target.value)}
                    className="w-full border border-nocte-border bg-nocte-surface px-4 py-3.5 font-sans text-sm text-nocte-cream placeholder-nocte-muted/40 outline-none focus:border-nocte-gold/40 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Optional */}
              <div>
                <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-3">
                  Optional
                </p>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="How do you currently handle bookings?"
                    value={form.currentBookingMethod}
                    onChange={(e) => update("currentBookingMethod", e.target.value)}
                    className="w-full border border-nocte-border bg-nocte-surface px-4 py-3.5 font-sans text-sm text-nocte-cream placeholder-nocte-muted/40 outline-none focus:border-nocte-gold/40 transition-colors"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Website"
                      value={form.website}
                      onChange={(e) => update("website", e.target.value)}
                      className="w-full border border-nocte-border bg-nocte-surface px-4 py-3.5 font-sans text-sm text-nocte-cream placeholder-nocte-muted/40 outline-none focus:border-nocte-gold/40 transition-colors"
                    />
                    <input
                      type="text"
                      placeholder="Instagram handle"
                      value={form.instagram}
                      onChange={(e) => update("instagram", e.target.value)}
                      className="w-full border border-nocte-border bg-nocte-surface px-4 py-3.5 font-sans text-sm text-nocte-cream placeholder-nocte-muted/40 outline-none focus:border-nocte-gold/40 transition-colors"
                    />
                  </div>
                  <textarea
                    placeholder="Anything else we should know?"
                    value={form.notes}
                    onChange={(e) => update("notes", e.target.value)}
                    rows={3}
                    className="w-full border border-nocte-border bg-nocte-surface px-4 py-3.5 font-sans text-sm text-nocte-cream placeholder-nocte-muted/40 outline-none focus:border-nocte-gold/40 transition-colors resize-none"
                  />
                </div>
              </div>

              {error && (
                <p className="font-sans text-xs text-red-400">{error}</p>
              )}

              <button
                type="submit"
                disabled={!canSubmit || submitting}
                className="w-full bg-nocte-gold text-nocte-black font-sans text-[11px] tracking-[0.25em] uppercase px-6 py-4 hover:bg-nocte-gold-light transition-all duration-300 disabled:opacity-30"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-nocte-black/60 animate-bounce [animation-delay:0ms]" />
                    <span className="w-1 h-1 rounded-full bg-nocte-black/60 animate-bounce [animation-delay:150ms]" />
                    <span className="w-1 h-1 rounded-full bg-nocte-black/60 animate-bounce [animation-delay:300ms]" />
                  </span>
                ) : (
                  "Submit Application"
                )}
              </button>

              <p className="font-sans text-[9px] text-nocte-muted/50 text-center tracking-[0.1em]">
                No fees to join. No contracts. Cancel anytime.
              </p>
            </form>
          </>
        )}
      </section>

      {/* Footer */}
      <div className="px-6 py-8 border-t border-nocte-border text-center">
        <p className="font-sans text-[9px] text-nocte-muted/40 tracking-[0.15em] uppercase">
          Noctē · Miami Concierge · Venue Partners
        </p>
      </div>
    </div>
  );
}
