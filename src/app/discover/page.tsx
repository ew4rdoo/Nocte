import { venues } from "@/lib/mock-data";
import DiscoverView from "@/components/discover/DiscoverView";

export const metadata = {
  title: "Discover — Noctē",
  description: "Explore Miami's most exclusive venues, curated by Noctē.",
};

export default function DiscoverPage() {
  return (
    <main className="min-h-screen bg-[#050505]">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#050505]/80 px-5 py-6 backdrop-blur-sm sm:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="mb-1 text-xs uppercase tracking-[0.2em] text-[#c9a84c]">
            Miami
          </p>
          <h1 className="font-display text-3xl font-light tracking-wide text-[#f5f0e8] sm:text-4xl">
            Discover
          </h1>
          <p className="mt-1 text-sm text-white/40">
            Hand-picked venues for every mood
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
        <DiscoverView venues={venues} />
      </div>
    </main>
  );
}
