import Link from "next/link";
import { VENUES } from "@/lib/venues";

const NEIGHBORHOODS = [
  { name: "South Beach", tagline: "The iconic strip", count: VENUES.filter((v) => v.neighborhood === "South Beach").length },
  { name: "Brickell", tagline: "The power district", count: VENUES.filter((v) => v.neighborhood === "Brickell").length },
  { name: "Downtown", tagline: "After hours capital", count: VENUES.filter((v) => v.neighborhood === "Downtown").length },
  { name: "Design District", tagline: "Where culture meets nightlife", count: VENUES.filter((v) => v.neighborhood === "Design District").length },
  { name: "Wynwood", tagline: "Art & cocktails", count: VENUES.filter((v) => v.neighborhood === "Wynwood").length },
];

const FEED_PREVIEW = [
  { venue: "E11EVEN", caption: "Saturday was something else.", time: "Last night", likes: 842 },
  { venue: "LIV", caption: "The only way to do a Friday.", time: "2 days ago", likes: 1204 },
  { venue: "KOMODO", caption: "Dinner turned into a night.", time: "3 days ago", likes: 617 },
];

const hotVenues = VENUES.filter((v) => v.hot);
const featured = VENUES.find((v) => v.id === "liv")!;

export default function HomePage() {
  return (
    <div
      className="min-h-screen bg-nocte-black text-nocte-cream"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 64px)" }}
    >
      {/* Hero */}
      <section className="relative px-6 pt-20 pb-16 overflow-hidden">
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 20%, rgba(201,168,76,0.06) 0%, transparent 60%)",
          }}
        />

        <div className="relative">
          <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-4">
            Miami&apos;s Luxury Concierge
          </p>
          <h1
            className="font-display font-light text-nocte-cream tracking-[0.25em] leading-none mb-6"
            style={{ fontSize: "clamp(3.5rem, 18vw, 5.5rem)" }}
          >
            NOCT&#274;
          </h1>
          <p className="font-sans text-sm text-nocte-muted leading-relaxed max-w-[320px] mb-8">
            Your personal connection to the best of Miami nightlife. Tables, guest lists, and luxury services — all through one conversation.
          </p>
          <Link
            href="/concierge"
            className="inline-flex items-center gap-3 border border-nocte-gold text-nocte-gold font-sans text-[11px] tracking-[0.25em] uppercase px-7 py-4 hover:bg-nocte-gold hover:text-nocte-black transition-all duration-300"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            Start a Conversation
          </Link>
        </div>
      </section>

      {/* Featured Venue */}
      <section className="px-6 mb-12">
        <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-4">
          Featured Tonight
        </p>
        <Link href={`/venues/${featured.id}`}>
          <div
            className="relative overflow-hidden group cursor-pointer border border-nocte-border hover:border-nocte-gold/30 transition-colors duration-300"
            style={{ background: featured.gradient, aspectRatio: "16/9" }}
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
            <div className="absolute inset-0 bg-nocte-gold/0 group-hover:bg-nocte-gold/5 transition-colors duration-300" />
            <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-black/80 to-transparent" />

            {/* Hot badge */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-nocte-gold animate-pulse" />
              <span className="font-sans text-[9px] tracking-[0.2em] text-nocte-gold uppercase">
                Hot Tonight
              </span>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="font-sans text-[9px] text-nocte-gold/80 tracking-[0.2em] uppercase mb-1">
                {featured.type} &middot; {featured.neighborhood}
              </p>
              <h2
                className="font-display font-light text-nocte-cream tracking-[0.2em] leading-none mb-2"
                style={{ fontSize: "clamp(2rem, 10vw, 3rem)" }}
              >
                {featured.name}
              </h2>
              <p className="font-sans text-xs text-nocte-muted line-clamp-2">
                {featured.description}
              </p>
            </div>
          </div>
        </Link>
      </section>

      {/* Neighborhoods */}
      <section className="mb-12">
        <div className="px-6 mb-4 flex items-end justify-between">
          <div>
            <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-2">
              Explore
            </p>
            <h2 className="font-display text-2xl font-light text-nocte-cream tracking-[0.1em]">
              Neighborhoods
            </h2>
          </div>
          <Link
            href="/discover"
            className="font-sans text-[10px] text-nocte-muted tracking-[0.15em] uppercase hover:text-nocte-gold transition-colors duration-200"
          >
            View all
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto px-6" style={{ scrollbarWidth: "none" }}>
          {NEIGHBORHOODS.map((hood) => (
            <Link key={hood.name} href={`/discover`}>
              <div className="flex-shrink-0 w-[160px] border border-nocte-border p-4 hover:border-nocte-gold/30 transition-colors duration-300 bg-nocte-surface">
                <h3 className="font-display text-lg font-light text-nocte-cream tracking-[0.1em] mb-1">
                  {hood.name}
                </h3>
                <p className="font-sans text-[10px] text-nocte-muted tracking-wide mb-3">
                  {hood.tagline}
                </p>
                <p className="font-sans text-[9px] text-nocte-gold tracking-[0.2em] uppercase">
                  {hood.count} venue{hood.count !== 1 ? "s" : ""}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="px-6 mb-12">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-2">
              What&apos;s Hot
            </p>
            <h2 className="font-display text-2xl font-light text-nocte-cream tracking-[0.1em]">
              Trending Now
            </h2>
          </div>
          <Link
            href="/discover"
            className="font-sans text-[10px] text-nocte-muted tracking-[0.15em] uppercase hover:text-nocte-gold transition-colors duration-200"
          >
            See all
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-px">
          {hotVenues.slice(0, 4).map((venue) => (
            <Link key={venue.id} href={`/venues/${venue.id}`}>
              <div
                className="relative overflow-hidden group cursor-pointer"
                style={{
                  background: venue.gradient || "linear-gradient(160deg, #0e0e0e 0%, #050505 100%)",
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
                <div className="absolute inset-0 bg-nocte-gold/0 group-hover:bg-nocte-gold/5 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/70 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-between p-4">
                  <div className="flex items-start justify-between">
                    <span className="font-sans text-[9px] tracking-[0.2em] text-nocte-gold uppercase">
                      Hot
                    </span>
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
      </section>

      {/* Feed Preview */}
      <section className="px-6 mb-12">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-2">
              Real Nights
            </p>
            <h2 className="font-display text-2xl font-light text-nocte-cream tracking-[0.1em]">
              From the Feed
            </h2>
          </div>
          <Link
            href="/feed"
            className="font-sans text-[10px] text-nocte-muted tracking-[0.15em] uppercase hover:text-nocte-gold transition-colors duration-200"
          >
            View all
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          {FEED_PREVIEW.map((post, i) => (
            <Link key={i} href="/feed">
              <div className="border border-nocte-border bg-nocte-surface p-4 hover:border-nocte-gold/30 transition-colors duration-300">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-display text-base font-light text-nocte-cream tracking-[0.1em]">
                    {post.venue}
                  </p>
                  <p className="font-sans text-[9px] text-nocte-muted tracking-wide">
                    {post.time}
                  </p>
                </div>
                <p className="font-sans text-xs text-nocte-muted leading-relaxed italic mb-2">
                  &ldquo;{post.caption}&rdquo;
                </p>
                <div className="flex items-center gap-1.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-nocte-gold/60">
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="font-sans text-[9px] text-nocte-muted/70">
                    {post.likes.toLocaleString()}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 pb-10">
        <div
          className="relative overflow-hidden border border-nocte-border p-8 text-center"
          style={{ background: "linear-gradient(160deg, #1a0b2e 0%, #0d0614 45%, #050505 100%)" }}
        >
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="relative">
            <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-3">
              Your Night Starts Here
            </p>
            <h2 className="font-display text-3xl font-light text-nocte-cream tracking-[0.15em] mb-3">
              Ask the Concierge
            </h2>
            <p className="font-sans text-xs text-nocte-muted leading-relaxed mb-6 max-w-[280px] mx-auto">
              Tables, guest lists, restaurants, yachts — whatever you need, one conversation away.
            </p>
            <Link
              href="/concierge"
              className="inline-flex items-center gap-3 bg-nocte-gold text-nocte-black font-sans text-[11px] tracking-[0.25em] uppercase px-7 py-4 hover:bg-nocte-gold-light transition-all duration-300"
            >
              Start Planning
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
