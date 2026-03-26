"use client";

import { useState, useCallback } from "react";
import SearchBar from "./SearchBar";
import VenueCard from "./VenueCard";
import type { Venue, VenueType, Neighborhood, PriceTier, Vibe } from "@/lib/mock-data";
import { VENUE_TYPES, NEIGHBORHOODS, PRICE_TIERS, VIBES } from "@/lib/mock-data";

interface DiscoverViewProps {
  venues: Venue[];
}

type FilterType =
  | { kind: "type"; value: VenueType }
  | { kind: "neighborhood"; value: Neighborhood }
  | { kind: "price"; value: PriceTier }
  | { kind: "vibe"; value: Vibe };

function filterKey(f: FilterType): string {
  return `${f.kind}:${f.value}`;
}

export default function DiscoverView({ venues }: DiscoverViewProps) {
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<FilterType[]>([]);

  const handleSearchChange = useCallback((val: string) => {
    setSearch(val);
  }, []);

  function toggleFilter(filter: FilterType) {
    setActiveFilters((prev) => {
      const key = filterKey(filter);
      const exists = prev.some((f) => filterKey(f) === key);
      if (exists) return prev.filter((f) => filterKey(f) !== key);
      return [...prev, filter];
    });
  }

  function isActive(filter: FilterType): boolean {
    return activeFilters.some((f) => filterKey(f) === filterKey(filter));
  }

  function clearAll() {
    setActiveFilters([]);
    setSearch("");
  }

  const filtered = venues.filter((venue) => {
    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      const matches =
        venue.name.toLowerCase().includes(q) ||
        venue.neighborhood.toLowerCase().includes(q) ||
        venue.type.toLowerCase().includes(q) ||
        venue.tags.some((t) => t.toLowerCase().includes(q)) ||
        venue.vibes.some((v) => v.toLowerCase().includes(q));
      if (!matches) return false;
    }

    // Active filters
    for (const f of activeFilters) {
      if (f.kind === "type" && venue.type !== f.value) return false;
      if (f.kind === "neighborhood" && venue.neighborhood !== f.value)
        return false;
      if (f.kind === "price" && venue.priceTier !== f.value) return false;
      if (f.kind === "vibe" && !venue.vibes.includes(f.value)) return false;
    }

    return true;
  });

  const hasFilters = activeFilters.length > 0 || search.trim().length > 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Search bar */}
      <SearchBar
        venues={venues}
        value={search}
        onChange={handleSearchChange}
      />

      {/* Filter pills — horizontal scroll */}
      <div className="flex flex-col gap-3">
        {/* Type filters */}
        <FilterRow label="Type">
          {VENUE_TYPES.map((type) => (
            <FilterPill
              key={type}
              label={type}
              active={isActive({ kind: "type", value: type })}
              onClick={() => toggleFilter({ kind: "type", value: type })}
            />
          ))}
        </FilterRow>

        {/* Neighborhood filters */}
        <FilterRow label="Area">
          {NEIGHBORHOODS.map((n) => (
            <FilterPill
              key={n}
              label={n}
              active={isActive({ kind: "neighborhood", value: n })}
              onClick={() => toggleFilter({ kind: "neighborhood", value: n })}
            />
          ))}
        </FilterRow>

        {/* Price filters */}
        <FilterRow label="Price">
          {PRICE_TIERS.map((p) => (
            <FilterPill
              key={p}
              label={p}
              active={isActive({ kind: "price", value: p })}
              onClick={() => toggleFilter({ kind: "price", value: p })}
            />
          ))}
        </FilterRow>

        {/* Vibe filters */}
        <FilterRow label="Vibe">
          {VIBES.map((v) => (
            <FilterPill
              key={v}
              label={v}
              active={isActive({ kind: "vibe", value: v })}
              onClick={() => toggleFilter({ kind: "vibe", value: v })}
            />
          ))}
        </FilterRow>
      </div>

      {/* Results header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-white/50">
          {filtered.length} {filtered.length === 1 ? "venue" : "venues"}
          {hasFilters && " found"}
        </p>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-[#c9a84c] transition-opacity hover:opacity-70"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Venue grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
          <p className="font-display text-2xl text-white/30">No venues found</p>
          <p className="text-sm text-white/20">
            Try adjusting your filters or search
          </p>
          <button
            onClick={clearAll}
            className="mt-2 rounded-full border border-[#c9a84c]/30 px-5 py-2 text-sm text-[#c9a84c] transition-colors hover:border-[#c9a84c]/60 hover:bg-[#c9a84c]/5"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

function FilterRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-12 shrink-0 text-xs uppercase tracking-widest text-white/30">
        {label}
      </span>
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {children}
      </div>
    </div>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs capitalize transition-all ${
        active
          ? "border-[#c9a84c] bg-[#c9a84c]/10 text-[#c9a84c]"
          : "border-white/10 text-white/50 hover:border-white/25 hover:text-white/80"
      }`}
    >
      {label}
    </button>
  );
}
