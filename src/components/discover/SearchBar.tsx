"use client";

import { useEffect, useRef, useState } from "react";
import type { Venue } from "@/lib/mock-data";

interface SearchBarProps {
  venues: Venue[];
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ venues, value, onChange }: SearchBarProps) {
  const [open, setOpen] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounce: propagate to parent 300ms after last keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(debouncedValue);
    }, 300);
    return () => clearTimeout(timer);
  }, [debouncedValue, onChange]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const suggestions =
    debouncedValue.trim().length >= 1
      ? venues
          .filter((v) =>
            v.name.toLowerCase().includes(debouncedValue.toLowerCase())
          )
          .slice(0, 6)
      : [];

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDebouncedValue(e.target.value);
    setOpen(true);
  }

  function handleSelect(venue: Venue) {
    setDebouncedValue(venue.name);
    onChange(venue.name);
    setOpen(false);
    inputRef.current?.blur();
  }

  function handleClear() {
    setDebouncedValue("");
    onChange("");
    setOpen(false);
    inputRef.current?.focus();
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative flex items-center">
        {/* Search icon */}
        <svg
          className="absolute left-4 h-4 w-4 text-[#c9a84c] pointer-events-none"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>

        <input
          ref={inputRef}
          type="text"
          value={debouncedValue}
          onChange={handleInputChange}
          onFocus={() => debouncedValue.trim().length >= 1 && setOpen(true)}
          placeholder="Search venues, neighborhoods, vibes…"
          className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-10 text-sm text-[#f5f0e8] placeholder-white/30 outline-none transition-all focus:border-[#c9a84c]/50 focus:bg-white/8 focus:ring-1 focus:ring-[#c9a84c]/20"
        />

        {debouncedValue.length > 0 && (
          <button
            onClick={handleClear}
            className="absolute right-3 flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-white/50 transition-colors hover:bg-white/20 hover:text-white"
            aria-label="Clear search"
          >
            <svg
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Autocomplete dropdown */}
      {open && suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-xl border border-white/10 bg-[#0f0f0f] shadow-2xl shadow-black/60">
          {suggestions.map((venue) => (
            <li key={venue.id}>
              <button
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelect(venue);
                }}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-white/5"
              >
                {/* Color dot */}
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: venue.heroColor }}
                />
                <span className="flex-1 text-sm text-[#f5f0e8]">
                  {venue.name}
                </span>
                <span className="text-xs capitalize text-white/40">
                  {venue.neighborhood}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* No results hint */}
      {open && debouncedValue.trim().length >= 1 && suggestions.length === 0 && (
        <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 rounded-xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-sm text-white/40 shadow-2xl shadow-black/60">
          No venues match &ldquo;{debouncedValue}&rdquo;
        </div>
      )}
    </div>
  );
}
