"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(false);
  const [fallbackConfirmation] = useState(
    () => "NCT-" + Date.now().toString(36).slice(-6).toUpperCase(),
  );

  const venue = searchParams.get("venue") ?? "Swan Club";
  const date = searchParams.get("date") ?? "Saturday, April 5, 2026";
  const time = searchParams.get("time") ?? "11:00 PM";
  const guests = searchParams.get("guests") ?? "4";
  const confirmation = searchParams.get("confirmation") ?? fallbackConfirmation;

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <main
      className="flex flex-col items-center min-h-screen px-6 pt-16"
      style={{
        paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 64px)",
      }}
    >
      {/* Gold check mark with pulse rings */}
      <div className="relative flex items-center justify-center mt-12 mb-10">
        <span
          className="absolute block rounded-full border border-nocte-gold/30 w-24 h-24 animate-gold-pulse-ring"
          style={{ animationDelay: "0s" }}
        />
        <span
          className="absolute block rounded-full border border-nocte-gold/20 w-24 h-24 animate-gold-pulse-ring"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className={`relative z-10 flex items-center justify-center w-20 h-20 border border-nocte-gold/50 bg-nocte-surface-2 transition-all duration-700 ${
            visible ? "animate-gold-glow-in" : "opacity-0"
          }`}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            className="text-nocte-gold"
          >
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Heading */}
      <div
        className={`text-center mb-10 ${visible ? "animate-fade-up" : "opacity-0"}`}
        style={{ animationDelay: "0.15s" }}
      >
        <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-nocte-gold mb-3">
          Reservation Confirmed
        </p>
        <h1 className="font-display font-light text-4xl text-nocte-cream tracking-[0.08em]">
          {venue}
        </h1>
      </div>

      {/* Details card */}
      <div
        className={`w-full max-w-sm border border-nocte-border bg-nocte-surface mb-8 ${visible ? "animate-fade-up" : "opacity-0"}`}
        style={{ animationDelay: "0.25s" }}
      >
        <div className="divide-y divide-nocte-border">
          <DetailRow label="Date" value={date} />
          <DetailRow label="Time" value={time} />
          <DetailRow
            label="Guests"
            value={`${guests} ${Number(guests) === 1 ? "guest" : "guests"}`}
          />
          <div className="flex items-center justify-between px-6 py-4">
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-nocte-muted">
              Confirmation
            </span>
            <span className="font-sans text-xs tracking-[0.15em] text-nocte-gold">
              {confirmation}
            </span>
          </div>
        </div>
      </div>

      {/* Note */}
      <p
        className={`font-sans text-xs text-nocte-muted text-center leading-relaxed max-w-xs mb-10 ${visible ? "animate-fade-up" : "opacity-0"}`}
        style={{ animationDelay: "0.35s" }}
      >
        Your concierge will reach out shortly to confirm final details and any
        special requests.
      </p>

      {/* CTAs */}
      <div
        className={`flex flex-col gap-3 w-full max-w-sm ${visible ? "animate-fade-up" : "opacity-0"}`}
        style={{ animationDelay: "0.45s" }}
      >
        <Link
          href="/concierge"
          className="flex items-center justify-center h-12 bg-nocte-gold text-nocte-black font-sans text-xs tracking-[0.2em] uppercase transition-colors hover:bg-nocte-gold-light"
        >
          Message Concierge
        </Link>
        <Link
          href="/discover"
          className="flex items-center justify-center h-12 border border-nocte-border text-nocte-cream font-sans text-xs tracking-[0.2em] uppercase transition-colors hover:border-nocte-gold/40"
        >
          Explore More Venues
        </Link>
      </div>
    </main>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-6 py-4">
      <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-nocte-muted">
        {label}
      </span>
      <span className="font-sans text-sm text-nocte-cream">{value}</span>
    </div>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense>
      <ConfirmationContent />
    </Suspense>
  );
}
