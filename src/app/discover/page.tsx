"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import VenueCardSkeleton from "@/app/_components/VenueCardSkeleton";
import type { Venue } from "@/lib/venues";

const TYPE_OPTIONS = ["All", "Nightclub", "Lounge", "Restaurant & Bar", "Ultra Lounge", "Omakase", "Steakhouse", "Bar"];
const VIBE_OPTIONS = ["All", "Wild", "Electric", "Upscale", "Intimate", "Chill", "Trendy", "Celebrity", "24-Hour"];
const PRICE_OPTIONS = ["All", "$", "$$", "$$$", "$$$$"];
const NEIGHBORHOOD_OPTIONS = ["All", "South Beach", "Brickell", "Wynwood", "Design District", "Downtown", "Miami River"];

const SKELETON_COUNT = 6;

export default function DiscoverPage() {
  const [loading, setLoading] = useState(true);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("All");
  const [activeVibe, setActiveVibe] = useState("All");
  const [activePrice, setActivePrice] = useState("All");
  const [activeNeighborhood, setActiveNeighborhood] = useState("All");

  useEffect(() => {
    fetch("/api/venues")
      .then((res) => res.json())
      .then((data) => {
        setVenues(data.venues || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const hasFilters = activeType !== "All" || activeVibe !== "All" || activePrice !== "All" || activeNeighborhood !== "All" || search.length > 0;

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return venues.filter((v) => {
      if (q && !v.name.toLowerCase().includes(q) && !v.neighborhood.toLowerCase().includes(q) && !v.type.toLowerCase().includes(q)) return false;
      if (activeType !== "All" && v.type !== activeType) return false;
      if (activeVibe !== "All" && !v.vibe.includes(activeVibe)) return false;
      if (activePrice !== "All" && v.priceRange !== activePrice) return false;
      if (activeNeighborhood !== "All" && v.neighborhood !== activeNeighborhood) return false;
      return true;
    });
  }, [venues, search, activeType, activeVibe, activePrice, activeNeighborhood]);

  function clearAll() {
    setSearch("");
    setActiveType("All");
    setActiveVibe("All");
    setActivePrice("All");
    setActiveNeighborhood("All");
  }

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
      <div className="px-6 pt-5 pb-4">
        <div className="border border-nocte-border flex items-center gap-3 px-4 py-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-nocte-muted flex-shrink-0">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search venues, neighborhoods…"
            className="flex-1 bg-transparent font-sans text-sm text-nocte-cream placeholder:text-nocte-muted/50 focus:outline-none"
          />
          {search && (
            <button onClick={() => setSearch("")} className="text-nocte-muted hover:text-nocte-cream transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Filters — compact dropdowns */}
      <div className="px-6 pb-4 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        <FilterDropdown label="Type" value={activeType} options={TYPE_OPTIONS} onChange={setActiveType} />
        <FilterDropdown label="Vibe" value={activeVibe} options={VIBE_OPTIONS} onChange={setActiveVibe} />
        <FilterDropdown label="Price" value={activePrice} options={PRICE_OPTIONS} onChange={setActivePrice} />
        <FilterDropdown label="Area" value={activeNeighborhood} options={NEIGHBORHOOD_OPTIONS} onChange={setActiveNeighborhood} />
      </div>

      {/* Results count */}
      {!loading && (
        <div className="px-6 mb-4 flex items-center justify-between">
          <p className="font-sans text-[10px] text-nocte-muted tracking-[0.2em] uppercase">
            {filtered.length} venue{filtered.length !== 1 ? "s" : ""}
          </p>
          {hasFilters && (
            <button
              onClick={clearAll}
              className="font-sans text-[10px] tracking-[0.2em] uppercase text-nocte-gold"
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      {/* Venue grid */}
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
                  background: venue.gradient || "linear-gradient(160deg, #0e0e0e 0%, #050505 100%)",
                  height: "280px",
                }}
              >
                {venue.imageUrl && (
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${venue.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
                <div className="absolute inset-0 bg-nocte-gold/0 group-hover:bg-nocte-gold/5 transition-colors duration-300" />

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

function FilterDropdown({ label, value, options, onChange }: {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
}) {
  const isActive = value !== "All";
  return (
    <div className="relative flex-shrink-0">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`appearance-none font-sans text-[10px] tracking-[0.15em] uppercase border pl-3 pr-7 py-2 bg-transparent cursor-pointer focus:outline-none transition-all duration-200 ${
          isActive
            ? "border-nocte-gold text-nocte-gold"
            : "border-nocte-border text-nocte-muted hover:border-nocte-gold/40"
        }`}
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-nocte-black text-nocte-cream">
            {o === "All" ? label : o}
          </option>
        ))}
      </select>
      <svg
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="none"
        className={`absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none ${isActive ? "text-nocte-gold" : "text-nocte-muted"}`}
      >
        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
