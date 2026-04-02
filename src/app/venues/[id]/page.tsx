import Link from "next/link";
import { notFound } from "next/navigation";
import { getVenueById, VENUES } from "@/lib/venues";

export async function generateStaticParams() {
  return VENUES.map((v) => ({ id: v.id }));
}

export default async function VenueDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const venue = getVenueById(id);

  if (!venue) notFound();

  const hasTables = venue.tables && venue.tables.length > 0;
  const bookHref = `/venues/${venue.id}/book`;
  const conciergeHref = `/concierge?message=${encodeURIComponent(`I'm interested in ${venue.name}`)}`;

  return (
    <div
      className="min-h-screen bg-nocte-black text-nocte-cream"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 64px)" }}
    >
      {/* Hero */}
      <div
        className="relative overflow-hidden"
        style={{ background: venue.gradient, aspectRatio: "4/5" }}
      >
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Bottom vignette */}
        <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-nocte-black to-transparent" />

        {/* Back button */}
        <Link
          href="/discover"
          className="absolute top-16 left-6 flex items-center gap-2 font-sans text-[10px] tracking-[0.2em] uppercase text-nocte-muted hover:text-nocte-cream transition-colors duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 12H5M11 6l-6 6 6 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Discover
        </Link>

        {/* Live indicator */}
        {venue.hot && (
          <div className="absolute top-16 right-6 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-nocte-gold animate-pulse" />
            <span className="font-sans text-[10px] tracking-[0.2em] text-nocte-muted uppercase">
              Hot Tonight
            </span>
          </div>
        )}

        {/* Venue name */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-2">
            {venue.type}&nbsp;·&nbsp;{venue.neighborhood}
          </p>
          <h1
            className="font-display font-light text-nocte-cream tracking-[0.2em] leading-none mb-2"
            style={{ fontSize: "clamp(3rem, 16vw, 4.5rem)" }}
          >
            {venue.name}
          </h1>
          <p className="font-sans text-sm text-nocte-muted">{venue.hours}</p>
        </div>
      </div>

      {/* Book CTA */}
      <div className="px-6 py-6 border-b border-nocte-border flex flex-col gap-3">
        {hasTables ? (
          <Link
            href={bookHref}
            className="flex items-center justify-center gap-3 bg-nocte-gold text-nocte-black font-sans text-[11px] tracking-[0.25em] uppercase px-6 py-4 hover:bg-nocte-gold-light transition-all duration-300 w-full"
          >
            Reserve a Table
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        ) : (
          <Link
            href={conciergeHref}
            className="flex items-center justify-center gap-3 bg-nocte-gold text-nocte-black font-sans text-[11px] tracking-[0.25em] uppercase px-6 py-4 hover:bg-nocte-gold-light transition-all duration-300 w-full"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
            Inquire with Concierge
          </Link>
        )}
        {hasTables && (
          <Link
            href={conciergeHref}
            className="flex items-center justify-center gap-2 border border-nocte-border text-nocte-muted font-sans text-[10px] tracking-[0.2em] uppercase px-6 py-3 hover:border-nocte-gold/40 hover:text-nocte-cream transition-all duration-300 w-full"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
            Ask the Concierge
          </Link>
        )}
      </div>

      {/* Description */}
      <section className="px-6 py-8 border-b border-nocte-border">
        <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-4">
          About
        </p>
        <p className="font-sans text-sm text-nocte-cream leading-relaxed">
          {venue.description}
        </p>
      </section>

      {/* Details grid */}
      <section className="px-6 py-8 border-b border-nocte-border">
        <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-6">
          Details
        </p>
        <div className="grid grid-cols-2 gap-6">
          <DetailItem label="Hours" value={venue.hours} />
          <DetailItem label="Price Range" value={venue.priceRange} />
          <DetailItem label="Neighborhood" value={venue.neighborhood} />
          <DetailItem label="Vibe" value={venue.vibe.join(", ")} />
        </div>
      </section>

      {/* Bottle service */}
      <section className="px-6 py-8 border-b border-nocte-border">
        <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-6">
          Bottle Service
        </p>
        <div
          className="p-5"
          style={{ background: "linear-gradient(135deg, #0e0e0e, #090909)" }}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="font-display text-2xl font-light text-nocte-cream tracking-wider">
                {venue.bottleMin > 0
                  ? `$${venue.bottleMin.toLocaleString()}`
                  : "N/A"}
              </p>
              {venue.bottleMin > 0 && (
                <p className="font-sans text-[10px] text-nocte-muted tracking-[0.15em] uppercase mt-0.5">
                  Table minimum
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="font-display text-sm font-light text-nocte-cream">
                {venue.tableCapacity}
              </p>
              <p className="font-sans text-[10px] text-nocte-muted tracking-[0.15em] uppercase mt-0.5">
                Capacity
              </p>
            </div>
          </div>
          {venue.bottleMin > 0 ? (
            <p className="font-sans text-[11px] text-nocte-muted leading-relaxed">
              Minimums vary by night and table location. The concierge will
              negotiate the best available terms on your behalf.
            </p>
          ) : (
            <p className="font-sans text-[11px] text-nocte-muted leading-relaxed">
              No bottle service minimum. Walk-ins welcome, though reservations
              are recommended for the best experience.
            </p>
          )}
        </div>
      </section>

      {/* Reviews */}
      <section className="px-6 py-8 border-b border-nocte-border">
        <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-6">
          Reviews
        </p>
        <div className="flex flex-col gap-4">
          {venue.reviews.map((r, i) => (
            <div
              key={i}
              className="p-4 border border-nocte-border"
              style={{ background: "linear-gradient(135deg, #0e0e0e, #080808)" }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-sans text-xs text-nocte-cream tracking-wide">
                  {r.author}
                </p>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <svg
                      key={si}
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 2l2.5 7H22l-6 4.5 2.5 7L12 17l-6.5 3.5L8 13.5 2 9h7.5L12 2z"
                        stroke={si < r.rating ? "#c9a84c" : "#1e1e1e"}
                        fill={si < r.rating ? "#c9a84c" : "none"}
                        strokeWidth="1"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="font-sans text-[11px] text-nocte-muted leading-relaxed italic">
                &ldquo;{r.text}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Map placeholder */}
      <section className="px-6 py-8 border-b border-nocte-border">
        <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-4">
          Location
        </p>
        <div
          className="relative border border-nocte-border overflow-hidden"
          style={{
            aspectRatio: "16/9",
            background: "linear-gradient(160deg, #0d0d0d 0%, #080808 100%)",
          }}
        >
          {/* Grid texture mimicking a map */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-nocte-gold">
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <p className="font-sans text-[10px] text-nocte-muted tracking-[0.2em] uppercase text-center px-4">
              {venue.address}
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="px-6 py-8">
        {hasTables ? (
          <Link
            href={bookHref}
            className="flex items-center justify-center gap-3 bg-nocte-gold text-nocte-black font-sans text-[11px] tracking-[0.25em] uppercase px-6 py-4 hover:bg-nocte-gold-light transition-all duration-300 w-full"
          >
            Reserve a Table
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        ) : (
          <Link
            href={conciergeHref}
            className="flex items-center justify-center gap-3 bg-nocte-gold text-nocte-black font-sans text-[11px] tracking-[0.25em] uppercase px-6 py-4 hover:bg-nocte-gold-light transition-all duration-300 w-full"
          >
            Inquire with Concierge
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        )}
        <p className="font-sans text-[9px] text-nocte-muted text-center mt-3 tracking-[0.15em] uppercase">
          {hasTables ? "Select your date, table, and you're in." : "The concierge handles everything — no calls, no waiting."}
        </p>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-sans text-[9px] text-nocte-muted tracking-[0.2em] uppercase mb-1">
        {label}
      </p>
      <p className="font-sans text-sm text-nocte-cream">{value}</p>
    </div>
  );
}
