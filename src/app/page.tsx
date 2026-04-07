import Link from "next/link";
import { getActiveVenues, getHotVenues } from "@/lib/venues";

export default async function HomePage() {
  const [allVenues, hotVenues] = await Promise.all([
    getActiveVenues(),
    getHotVenues(),
  ]);

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
      {/* Hero — typographic, no image */}
      <section className="px-6 pt-24 pb-16 border-b border-nocte-border">
        <p className="font-sans text-[10px] text-nocte-gold tracking-[0.4em] uppercase mb-6">
          Miami Concierge
        </p>
        <h1
          className="font-display font-light text-nocte-cream tracking-[0.2em] leading-[0.9] mb-6"
          style={{ fontSize: "clamp(3.5rem, 16vw, 6rem)" }}
        >
          NOCT&#274;
        </h1>
        <p className="font-sans text-base text-nocte-muted leading-relaxed max-w-[340px] mb-10">
          Reservations, tables, and guest lists at Miami&apos;s best venues — handled through one conversation.
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
      </section>

      {/* Services — minimal text links */}
      <section className="px-6 py-8 border-b border-nocte-border">
        <div className="grid grid-cols-2 gap-4">
          <ServiceCard
            title="Dinner Reservations"
            subtitle="Hard-to-get tables"
            href="/concierge?message=I%20need%20a%20reservation%20at%20a%20top%20Miami%20restaurant"
          />
          <ServiceCard
            title="VIP Tables"
            subtitle="Bottle service & booths"
            href="/concierge?message=I%20want%20VIP%20tables%20and%20bottle%20service%20tonight"
          />
          <ServiceCard
            title="Guest Lists"
            subtitle="Skip the line"
            href="/concierge?message=Can%20you%20get%20me%20on%20the%20guest%20list%20tonight"
          />
          <ServiceCard
            title="Group Nights"
            subtitle="We plan everything"
            href="/concierge?message=I%27m%20planning%20a%20group%20night%20out%20in%20Miami"
          />
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
                  height: "220px",
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
                      style={{ fontSize: "clamp(1.1rem, 5vw, 1.3rem)" }}
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
          className="border border-nocte-border p-8 text-center"
          style={{ background: "linear-gradient(160deg, #0e0e0e 0%, #080808 100%)" }}
        >
          <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-3">
            Your Night Starts Here
          </p>
          <h2 className="font-display text-3xl font-light text-nocte-cream tracking-[0.15em] mb-3">
            Ask the Concierge
          </h2>
          <p className="font-sans text-xs text-nocte-muted leading-relaxed mb-6 max-w-[280px] mx-auto">
            Tell us what you&apos;re looking for. We&apos;ll handle the rest.
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

function ServiceCard({ title, subtitle, href }: { title: string; subtitle: string; href: string }) {
  return (
    <Link href={href}>
      <div className="border border-nocte-border p-5 hover:border-nocte-gold/30 transition-all duration-300 bg-nocte-surface group">
        <h3 className="font-display text-base font-light text-nocte-cream tracking-[0.05em] mb-1 group-hover:text-nocte-gold transition-colors">
          {title}
        </h3>
        <p className="font-sans text-[10px] text-nocte-muted tracking-wide">
          {subtitle}
        </p>
      </div>
    </Link>
  );
}
