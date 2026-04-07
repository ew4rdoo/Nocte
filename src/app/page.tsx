import Link from "next/link";
import { getActiveVenues, getHotVenues } from "@/lib/venues";

const SERVICES = [
  {
    id: "dining",
    name: "Dinner Reservations",
    tagline: "Hard-to-Get Tables",
    description:
      "Last-minute tables at Carbone, Komodo, Le Jardinier, and every other place that's technically fully booked. We have the relationships.",
    gradient: "linear-gradient(160deg, #1e1005 0%, #0a0603 55%, #050505 100%)",
    inquireMessage:
      "I need a reservation at a top Miami restaurant, ideally tonight or this week. Can you help me get a table?",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-nocte-gold/70">
        <path d="M18 8h1a4 4 0 010 8h-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 1v3M10 1v3M14 1v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "vip",
    name: "VIP Nightlife",
    tagline: "Tables · Guest Lists · Bottle Service",
    description:
      "Skip the line and get the best tables at LIV, E11EVEN, MYNT, and every club in the city. Your concierge handles everything.",
    gradient: "linear-gradient(160deg, #1a0b2e 0%, #0d0614 55%, #050505 100%)",
    inquireMessage:
      "I want to plan a VIP night out in Miami. Can you help me get tables and guest list access?",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-nocte-gold/70">
        <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M19 16l.75 2.25L22 19l-2.25.75L19 22l-.75-2.25L16 19l2.25-.75L19 16z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "yacht",
    name: "Yacht Charters",
    tagline: "Private Day & Sunset Cruises",
    description:
      "Set sail on Biscayne Bay or the open Atlantic aboard a private yacht. From intimate sunset cruises to full-day adventures with crew.",
    gradient: "linear-gradient(160deg, #0a1020 0%, #06080f 55%, #050505 100%)",
    inquireMessage:
      "I'd like to inquire about a private yacht charter in Miami. Can you help me plan something?",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-nocte-gold/70">
        <path d="M3 17c2.5-4 5-6 9-6s6.5 2 9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 11V5l5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 20h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "hotel",
    name: "Hotel Suites",
    tagline: "Penthouses & Private Villas",
    description:
      "From oceanfront penthouses at the Faena to private villas on Star Island. Access to rooms that aren't available to the public.",
    gradient: "linear-gradient(160deg, #1a0a10 0%, #0a0506 55%, #050505 100%)",
    inquireMessage:
      "I'm looking for a luxury hotel suite or villa in Miami. Can you find me something exceptional?",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-nocte-gold/70">
        <path d="M3 21V8l9-5 9 5v13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 21v-6h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 11h.01M15 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "car",
    name: "Luxury Cars",
    tagline: "Lamborghini · Ferrari · Rolls-Royce",
    description:
      "Arrive the way Miami demands. Exotic and ultra-luxury vehicles available by the hour, day, or weekend with concierge delivery.",
    gradient: "linear-gradient(160deg, #0a1a10 0%, #050a06 55%, #050505 100%)",
    inquireMessage:
      "I'd like to arrange a luxury or exotic car rental in Miami. What do you have available?",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-nocte-gold/70">
        <path d="M5 17H3v-5l2-5h14l2 5v5h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="7.5" cy="17" r="1.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16.5" cy="17" r="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5.5 12h13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "jet",
    name: "Private Jets",
    tagline: "On-Demand Air Travel",
    description:
      "Door-to-door private aviation with no queues, no crowds. Light jets to heavy cabins — wherever the night takes you.",
    gradient: "linear-gradient(160deg, #14100a 0%, #0a0806 55%, #050505 100%)",
    inquireMessage:
      "I need to arrange a private jet. Can you help me with routing, availability, and pricing?",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-nocte-gold/70">
        <path d="M21 7l-7 5-8-4-4 2 6 5-2 4 3-1 2-4 8 3 2-3-6-4 4-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default async function HomePage() {
  const [allVenues, hotVenues] = await Promise.all([
    getActiveVenues(),
    getHotVenues(),
  ]);

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
      {/* Hero + Concierge prompt */}
      <section className="relative px-6 pt-20 pb-12 overflow-hidden">
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
            className="font-display font-light text-nocte-cream tracking-[0.25em] leading-none mb-4"
            style={{ fontSize: "clamp(3.5rem, 18vw, 5.5rem)" }}
          >
            NOCT&#274;
          </h1>
          <p className="font-sans text-sm text-nocte-muted leading-relaxed max-w-[320px] mb-8">
            Dinner reservations, tables, guest lists, and luxury services — all through one conversation.
          </p>

          {/* Concierge prompt */}
          <Link
            href="/concierge"
            className="flex items-center gap-3 border border-nocte-border bg-nocte-surface px-4 py-3.5 hover:border-nocte-gold/40 transition-colors duration-200 group"
          >
            <div
              className="w-8 h-8 flex-shrink-0 flex items-center justify-center border border-nocte-gold/25"
              style={{ background: "linear-gradient(135deg, #1a1205, #050505)" }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-nocte-gold">
                <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-sans text-sm text-nocte-muted/50 group-hover:text-nocte-muted transition-colors">
              What are you planning tonight?
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-nocte-gold/40 ml-auto flex-shrink-0">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Services */}
      <section className="px-6 mb-12">
        <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-4">
          Services
        </p>
        <div className="space-y-3">
          {SERVICES.map((service) => (
            <Link
              key={service.id}
              href={`/concierge?message=${encodeURIComponent(service.inquireMessage)}`}
            >
              <div
                className="relative overflow-hidden border border-nocte-border hover:border-nocte-gold/30 transition-colors duration-300"
                style={{ background: service.gradient }}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(255,255,255,0.015) 24px, rgba(255,255,255,0.015) 25px), repeating-linear-gradient(90deg, transparent, transparent 24px, rgba(255,255,255,0.015) 24px, rgba(255,255,255,0.015) 25px)",
                    opacity: 0.04,
                  }}
                />
                <div className="relative flex items-center gap-4 p-5">
                  <div
                    className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-nocte-gold/15"
                    style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.08), rgba(5,5,5,0.8))" }}
                  >
                    {service.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-[9px] text-nocte-gold tracking-[0.2em] uppercase mb-0.5">
                      {service.tagline}
                    </p>
                    <h2 className="font-display text-lg font-light text-nocte-cream tracking-[0.05em]">
                      {service.name}
                    </h2>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-nocte-gold/30 flex-shrink-0">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
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
                  height: "280px",
                }}
              >
                {/* Venue image */}
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
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
                <div className="absolute inset-0 bg-nocte-gold/0 group-hover:bg-nocte-gold/5 transition-colors duration-300" />
                <div className="absolute inset-0 flex flex-col justify-between p-4">
                  <div className="flex items-start justify-between">
                    <span className="font-sans text-[9px] tracking-[0.2em] text-nocte-gold uppercase">Hot</span>
                    <span className="font-sans text-[9px] text-nocte-muted">{venue.priceRange}</span>
                  </div>
                  <div>
                    <h3
                      className="font-display font-light text-nocte-cream tracking-[0.15em] mb-0.5 leading-none"
                      style={{ fontSize: "clamp(1.3rem, 6vw, 1.5rem)" }}
                    >
                      {venue.name}
                    </h3>
                    <p className="font-sans text-[10px] text-nocte-muted mb-2">{venue.type}</p>
                    <p className="font-sans text-[9px] text-nocte-muted/70 tracking-[0.1em] uppercase">{venue.neighborhood}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="mb-12">
        <div className="px-6 mb-4 flex items-end justify-between">
          <div>
            <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-2">Explore</p>
            <h2 className="font-display text-2xl font-light text-nocte-cream tracking-[0.1em]">Neighborhoods</h2>
          </div>
          <Link href="/discover" className="font-sans text-[10px] text-nocte-muted tracking-[0.15em] uppercase hover:text-nocte-gold transition-colors duration-200">
            View all
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto px-6" style={{ scrollbarWidth: "none" }}>
          {NEIGHBORHOODS.map((hood) => (
            <Link key={hood.name} href="/discover">
              <div className="flex-shrink-0 w-[160px] border border-nocte-border p-4 hover:border-nocte-gold/30 transition-colors duration-300 bg-nocte-surface">
                <h3 className="font-display text-lg font-light text-nocte-cream tracking-[0.1em] mb-1">{hood.name}</h3>
                <p className="font-sans text-[10px] text-nocte-muted tracking-wide mb-3">{hood.tagline}</p>
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
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
