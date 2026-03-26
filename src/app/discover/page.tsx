"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { VENUES } from "@/lib/venues";
import VenueCardSkeleton from "@/app/_components/VenueCardSkeleton";

const TYPE_FILTERS = ["All", "Nightclub", "Lounge", "Restaurant & Bar", "Ultra Lounge", "Omakase", "Steakhouse", "Bar"];
const VIBE_FILTERS = ["All", "Wild", "Electric", "Upscale", "Intimate", "Chill", "Trendy", "Celebrity", "24-Hour"];
const PRICE_FILTERS = ["All", "$", "$$", "$$$", "$$$$"];
const NEIGHBORHOOD_FILTERS = ["All", "South Beach", "Brickell", "Wynwood", "Design District", "Downtown"];

const SKELETON_COUNT = 6;

export default function DiscoverPage() {
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState("All");
  const [activeVibe, setActiveVibe] = useState("All");
  const [activePrice, setActivePrice] = useState("All");
  const [activeNeighborhood, setActiveNeighborhood] = useState("All");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);


  const filtered = VENUES.filter((v) => {
    if (activeType !== "All" && v.type !== activeType) return false;
    if (activeVibe !== "All" && !v.vibe.includes(activeVibe)) return false;
    if (activePrice !== "All" && v.priceRange !== activePrice) return false;
    if (activeNeighborhood !== "All" && v.neighborhood !== activeNeighborhood) return false;
    return true;
  });

  return (
    <div
      className="min-h-screen bg-nocte-black text-nocte-cream"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 64px)" }}
    >
      {/* Header */}
      <div className="px-6 pt-16 pb-6 border-b border-nocte-border">
        <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-2">
          Browse
        </p>
        <h1 className="font-display text-4xl font-light text-nocte-cream">
          Discover
        </h1>
      </div>

      {/* Search bar */}
      <div className="px-6 pt-6 pb-4">
        <div className="border border-nocte-border flex items-center gap-3 px-4 py-3.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-nocte-muted flex-shrink-0">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="font-sans text-sm text-nocte-muted tracking-wide">
            Search venues, neighborhoods…
          </span>
        </div>
      </div>

      {/* Filter rows */}
      <div className="flex flex-col gap-2 pb-5">
        <FilterRow
          label="Type"
          items={TYPE_FILTERS}
          active={activeType}
          onChange={setActiveType}
        />
        <FilterRow
          label="Vibe"
          items={VIBE_FILTERS}
          active={activeVibe}
          onChange={setActiveVibe}
        />
        <FilterRow
          label="Price"
          items={PRICE_FILTERS}
          active={activePrice}
          onChange={setActivePrice}
        />
        <FilterRow
          label="Area"
          items={NEIGHBORHOOD_FILTERS}
          active={activeNeighborhood}
          onChange={setActiveNeighborhood}
        />
      </div>

      {/* Results count */}
      {!loading && (
        <div className="px-6 mb-4 flex items-center justify-between">
          <p className="font-sans text-[10px] text-nocte-muted tracking-[0.2em] uppercase">
            {filtered.length} venue{filtered.length !== 1 ? "s" : ""}
          </p>
          {(activeType !== "All" || activeVibe !== "All" || activePrice !== "All" || activeNeighborhood !== "All") && (
            <button
              onClick={() => {
                setActiveType("All");
                setActiveVibe("All");
                setActivePrice("All");
                setActiveNeighborhood("All");
              }}
              className="font-sans text-[10px] tracking-[0.2em] uppercase text-nocte-gold"
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      {/* Venue grid — skeleton or real cards */}
      {loading ? (
        <div className="grid grid-cols-2 gap-px mx-6">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <VenueCardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
          <p className="font-display text-2xl font-light text-nocte-cream italic mb-3">
            No venues match.
          </p>
          <p className="font-sans text-xs text-nocte-muted leading-relaxed max-w-[240px]">
            Try adjusting your filters to find your perfect night.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-px mx-6">
          {filtered.map((venue) => (
            <Link key={venue.id} href={`/venues/${venue.id}`}>
              <div
                className="relative overflow-hidden group cursor-pointer"
                style={{
                  background: venue.gradient,
                  aspectRatio: "3/4",
                }}
              >
                {/* Grid texture */}
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-nocte-gold/0 group-hover:bg-nocte-gold/5 transition-colors duration-300" />
                {/* Bottom vignette */}
                <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/70 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-between p-4">
                  <div className="flex items-start justify-between">
                    {venue.hot ? (
                      <span className="font-sans text-[9px] tracking-[0.2em] text-nocte-gold uppercase">
                        Hot
                      </span>
                    ) : (
                      <span />
                    )}
                    <span className="font-sans text-[9px] text-nocte-muted">
                      {venue.priceRange}
                    </span>
                  </div>

                  <div>
                    <h3
                      className="font-display font-light text-nocte-cream tracking-[0.15em] mb-0.5 leading-none"
                      style={{ fontSize: "clamp(1.3rem, 6vw, 1.5rem)" }}
                    >
                      {venue.name}
                    </h3>
                    <p className="font-sans text-[10px] text-nocte-muted mb-2">
                      {venue.type}
                    </p>
                    <p className="font-sans text-[9px] text-nocte-muted/70 tracking-[0.1em] uppercase">
                      {venue.neighborhood}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterRow({
  label,
  items,
  active,
  onChange,
}: {
  label: string;
  items: string[];
  active: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="flex items-center gap-0 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
      <span className="flex-shrink-0 font-sans text-[9px] text-nocte-muted tracking-[0.2em] uppercase pl-6 pr-3">
        {label}
      </span>
      <div className="flex gap-2 overflow-x-auto pr-6" style={{ scrollbarWidth: "none" }}>
        {items.map((item) => {
          const isActive = active === item;
          return (
            <button
              key={item}
              onClick={() => onChange(item)}
              className={`flex-shrink-0 font-sans text-[10px] tracking-[0.15em] uppercase border px-3 py-2 transition-all duration-200 ${
                isActive
                  ? "border-nocte-gold text-nocte-gold"
                  : "border-nocte-border text-nocte-muted hover:border-nocte-gold/40 hover:text-nocte-cream"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}
