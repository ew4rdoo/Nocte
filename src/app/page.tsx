import Link from "next/link";
import { getActiveVenues, getHotVenues } from "@/lib/venues";

const SERVICES = [
  { id: "dining", name: "Dining", icon: "🍽", href: "/concierge?message=I%20need%20a%20reservation%20at%20a%20top%20Miami%20restaurant" },
  { id: "vip", name: "VIP Tables", icon: "✦", href: "/concierge?message=I%20want%20VIP%20tables%20and%20bottle%20service%20tonight" },
  { id: "guestlist", name: "Guest Lists", icon: "📋", href: "/concierge?message=Can%20you%20get%20me%20on%20the%20guest%20list%20tonight" },
  { id: "group", name: "Group Plans", icon: "👥", href: "/concierge?message=I%27m%20planning%20a%20group%20night%20out%20in%20Miami" },
];

export default async function HomePage() {
  const [allVenues, hotVenues] = await Promise.all([
    getActiveVenues(),
    getHotVenues(),
  ]);

  const featuredVenue = hotVenues[0] || allVenues[0];
  const trendingVenues = hotVenues.slice(0, 4);

  const NEIGHBORHOODS = [
    { name: "South Beach", tagline: "The iconic strip", count: allVenues.filter((v) => v.neighborhood === "South Beach").length },
    { name: "Brickell", tagline: "The power district", count: allVenues.filter((v) => v.neighborhood === "Brickell").length },
    { name: "Downtown", tagline: "After hours capital", count: allVenues.filter((v) => v.neighborhood === "Downtown").length },
    { name: "Design District", tagline: "Where culture meets nightlife", count: allVenues.filter((v) => v.neighborhood === "Design District").length },
    { name: "Wynwood", tagline: "Art & cocktails", count: allVenues.filter((v) => v.neighborhood === "Wynwood").length },
  ];

  return (
    <div
      className="min-h-screen bg-nocte-black text-nocte-cream"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 64px)" }}
    >
      {/* Hero — full bleed image */}
      <section className="relative overflow-hidden" style={{ height: "85vh", minHeight: "600px" }}>
        {featuredVenue?.imageUrl && (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${featuredVenue.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-nocte-black via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

        <div className="relative h-full flex flex-col justify-between px-6 pt-20 pb-8">
          {/* Top — Logo */}
          <div>
            <h1
              className="font-display font-light text-nocte-cream tracking-[0.3em] leading-none"
              style={{ fontSize: "clamp(3rem, 14vw, 5rem)" }}
            >
              NOCT&#274;
            </h1>
            <p className="font-sans text-[10px] text-nocte-gold/80 tracking-[0.3em] uppercase mt-2">
              Miami&apos;s Luxury Concierge
            </p>
          </div>

          {/* Bottom — CTA */}
          <div>
            <p className="font-display text-2xl font-light text-nocte-cream tracking-wide leading-snug mb-6 max-w-[300px]">
              Your night, handled.
            </p>
            <Link
              href="/concierge"
              className="inline-flex items-center gap-3 bg-nocte-gold text-nocte-black font-sans text-[11px] tracking-[0.25em] uppercase px-8 py-4 hover:bg-nocte-gold-light transition-all duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
              Talk to the Concierge
            </Link>
            <p className="font-sans text-[10px] text-nocte-muted/60 mt-3 tracking-wide">
              Tables, guest lists, restaurants — one conversation.
            </p>
          </div>
        </div>
      </section>

      {/* Services — horizontal scroll */}
      <section className="py-8 border-b border-nocte-border">
        <div className="flex gap-0 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {SERVICES.map((s) => (
            <Link key={s.id} href={s.href} className="flex-shrink-0 flex flex-col items-center gap-2 px-6 py-2 group">
              <span className="text-2xl group-hover:scale-110 transition-transform duration-200">{s.icon}</span>
              <span className="font-sans text-[9px] text-nocte-muted tracking-[0.15em] uppercase group-hover:text-nocte-cream transition-colors">{s.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="px-6 py-10">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-1">
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
          {trendingVenues.map((venue) => (
            <Link key={venue.id} href={`/venues/${venue.id}`}>
              <div
                className="relative overflow-hidden group cursor-pointer"
                style={{
                  background: venue.gradient || "linear-gradient(160deg, #0e0e0e 0%, #050505 100%)",
                  height: "240px",
                }}
              >
                {venue.imageUrl && (
                  <div
                    className="absolute inset-0 group-hover:scale-105 transition-transform duration-500"
                    style={{
                      backgroundImage: `url(${venue.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-between p-4">
                  <div className="flex items-start justify-between">
                    <span className="font-sans text-[9px] tracking-[0.2em] text-nocte-gold uppercase">Hot</span>
                    <span className="font-sans text-[9px] text-nocte-muted">{venue.priceRange}</span>
                  </div>
                  <div>
                    <h3
                      className="font-display font-light text-nocte-cream tracking-[0.15em] mb-0.5 leading-none"
                      style={{ fontSize: "clamp(1.2rem, 5vw, 1.4rem)" }}
                    >
                      {venue.name}
                    </h3>
                    <p className="font-sans text-[10px] text-nocte-muted">{venue.type}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Browse All */}
      <section className="px-6 pb-8">
        <Link
          href="/discover"
          className="flex items-center justify-center gap-3 border border-nocte-border text-nocte-cream font-sans text-[10px] tracking-[0.2em] uppercase py-4 hover:border-nocte-gold/40 transition-all duration-200 w-full"
        >
          Browse All {allVenues.length} Venues
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </section>

      {/* Neighborhoods */}
      <section className="pb-10">
        <div className="px-6 mb-4">
          <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-1">Explore</p>
          <h2 className="font-display text-2xl font-light text-nocte-cream tracking-[0.1em]">Neighborhoods</h2>
        </div>
        <div className="flex gap-3 overflow-x-auto px-6" style={{ scrollbarWidth: "none" }}>
          {NEIGHBORHOODS.map((hood) => (
            <Link key={hood.name} href="/discover">
              <div className="flex-shrink-0 w-[150px] border border-nocte-border p-4 hover:border-nocte-gold/30 transition-colors duration-300 bg-nocte-surface">
                <h3 className="font-display text-base font-light text-nocte-cream tracking-[0.1em] mb-1">{hood.name}</h3>
                <p className="font-sans text-[9px] text-nocte-muted tracking-wide mb-2">{hood.tagline}</p>
                <p className="font-sans text-[9px] text-nocte-gold tracking-[0.2em] uppercase">{hood.count} venue{hood.count !== 1 ? "s" : ""}</p>
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
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
