import Link from "next/link";
import { getActiveVenues, getHotVenues } from "@/lib/venues";
import { ConciergePrompt } from "./_components/ConciergePrompt";

export default async function HomePage() {
  const [allVenues, hotVenues] = await Promise.all([
    getActiveVenues(),
    getHotVenues(),
  ]);

  const trendingVenues = hotVenues.slice(0, 6);

  return (
    <div
      className="min-h-screen bg-nocte-black text-nocte-cream"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 64px)" }}
    >
      {/* Hero — concierge-first */}
      <section className="px-6 pt-20 pb-10 border-b border-nocte-border">
        <div className="flex items-center gap-2 mb-8">
          <h1 className="font-display text-2xl font-light text-nocte-cream tracking-[0.2em]">
            NOCT&#274;
          </h1>
          <span className="font-sans text-[9px] text-nocte-muted tracking-[0.2em] uppercase mt-1">Miami</span>
        </div>

        <p className="font-display text-3xl font-light text-nocte-cream leading-snug tracking-wide mb-8 max-w-[360px]">
          Where are you going tonight?
        </p>

        <ConciergePrompt />

        {/* Quick picks */}
        <div className="flex gap-2 mt-5 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {[
            { label: "Tonight", message: "What's the best spot to go out tonight?" },
            { label: "Dinner for two", message: "I need a dinner reservation for two tonight" },
            { label: "Group night out", message: "Planning a group night out this weekend, 8 people" },
            { label: "VIP tables", message: "I want a VIP table with bottle service tonight" },
            { label: "Date night", message: "Plan the perfect date night in Miami" },
          ].map((pick) => (
            <Link
              key={pick.label}
              href={`/concierge?message=${encodeURIComponent(pick.message)}`}
              className="flex-shrink-0 font-sans text-[10px] tracking-[0.1em] border border-nocte-border text-nocte-muted px-4 py-2.5 hover:border-nocte-gold/40 hover:text-nocte-cream transition-all duration-200"
            >
              {pick.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="px-6 py-8">
        <div className="mb-5 flex items-end justify-between">
          <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase">
            Trending in Miami
          </p>
          <Link
            href="/discover"
            className="font-sans text-[10px] text-nocte-muted tracking-[0.15em] uppercase hover:text-nocte-gold transition-colors duration-200"
          >
            See all
          </Link>
        </div>

        {/* Featured venue — large card */}
        {trendingVenues[0] && (
          <Link href={`/venues/${trendingVenues[0].id}`}>
            <div
              className="relative overflow-hidden group cursor-pointer mb-px"
              style={{
                background: trendingVenues[0].gradient || "linear-gradient(160deg, #0e0e0e 0%, #050505 100%)",
                height: "200px",
              }}
            >
              {trendingVenues[0].imageUrl && (
                <div
                  className="absolute inset-0 group-hover:scale-105 transition-transform duration-500"
                  style={{
                    backgroundImage: `url(${trendingVenues[0].imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                <div>
                  <h3 className="font-display text-2xl font-light text-nocte-cream tracking-[0.15em] leading-none mb-1">
                    {trendingVenues[0].name}
                  </h3>
                  <p className="font-sans text-[10px] text-nocte-muted">
                    {trendingVenues[0].type} · {trendingVenues[0].neighborhood}
                  </p>
                </div>
                <span className="font-sans text-[9px] text-nocte-gold tracking-[0.2em] uppercase">Hot</span>
              </div>
            </div>
          </Link>
        )}

        {/* Remaining trending — 2-col grid */}
        <div className="grid grid-cols-2 gap-px">
          {trendingVenues.slice(1).map((venue) => (
            <Link key={venue.id} href={`/venues/${venue.id}`}>
              <div
                className="relative overflow-hidden group cursor-pointer"
                style={{
                  background: venue.gradient || "linear-gradient(160deg, #0e0e0e 0%, #050505 100%)",
                  height: "180px",
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
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="font-display font-light text-nocte-cream tracking-[0.1em] leading-none mb-0.5 text-base">
                    {venue.name}
                  </h3>
                  <p className="font-sans text-[9px] text-nocte-muted">{venue.type}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Browse all */}
        <Link
          href="/discover"
          className="flex items-center justify-center gap-3 border border-nocte-border text-nocte-cream font-sans text-[10px] tracking-[0.2em] uppercase py-3.5 mt-4 hover:border-nocte-gold/40 transition-all duration-200 w-full"
        >
          Browse All {allVenues.length} Venues
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </section>

      {/* How it works — concierge value prop */}
      <section className="px-6 py-8 border-t border-nocte-border">
        <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-6">
          How It Works
        </p>
        <div className="flex flex-col gap-6">
          <div className="flex gap-4 items-start">
            <span className="font-display text-2xl font-light text-nocte-gold/40 leading-none mt-0.5">1</span>
            <div>
              <p className="font-sans text-sm text-nocte-cream mb-1">Tell us what you want</p>
              <p className="font-sans text-xs text-nocte-muted leading-relaxed">Dinner for 4? VIP table? A full night planned? Just say it.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <span className="font-display text-2xl font-light text-nocte-gold/40 leading-none mt-0.5">2</span>
            <div>
              <p className="font-sans text-sm text-nocte-cream mb-1">We handle everything</p>
              <p className="font-sans text-xs text-nocte-muted leading-relaxed">Your AI concierge finds the best options, makes reservations, and gets you in.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <span className="font-display text-2xl font-light text-nocte-gold/40 leading-none mt-0.5">3</span>
            <div>
              <p className="font-sans text-sm text-nocte-cream mb-1">Show up and enjoy</p>
              <p className="font-sans text-xs text-nocte-muted leading-relaxed">No calls, no waiting, no stress. Your table is ready.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
