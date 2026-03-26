import Link from "next/link";
import type { Venue } from "@/lib/mock-data";

interface VenueCardProps {
  venue: Venue;
}

export default function VenueCard({ venue }: VenueCardProps) {
  return (
    <Link
      href={`/venues/${venue.id}`}
      className="group relative flex h-64 flex-col justify-end overflow-hidden rounded-2xl border border-white/8 transition-transform duration-300 hover:-translate-y-1 hover:border-[#c9a84c]/30"
    >
      {/* Gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${venue.gradient} opacity-80`}
      />

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Content */}
      <div className="relative p-5">
        {/* Venue type pill */}
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full border border-[#c9a84c]/40 px-2.5 py-0.5 text-xs capitalize text-[#c9a84c]">
            {venue.type}
          </span>
          <span className="text-xs text-white/50">{venue.neighborhood}</span>
        </div>

        {/* Name */}
        <h3 className="font-display text-xl font-semibold leading-tight text-white">
          {venue.name}
        </h3>

        {/* Short description */}
        <p className="mt-1 text-xs leading-relaxed text-white/60 line-clamp-2">
          {venue.shortDescription}
        </p>

        {/* Footer */}
        <div className="mt-3 flex items-center justify-between">
          {/* Rating */}
          <div className="flex items-center gap-1">
            <svg
              className="h-3 w-3 text-[#c9a84c]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs text-white/70">{venue.rating}</span>
          </div>

          {/* Price tier */}
          <span className="text-xs font-medium text-[#c9a84c]">
            {venue.priceTier}
          </span>
        </div>
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 40px ${venue.heroColor}20` }}
      />
    </Link>
  );
}
