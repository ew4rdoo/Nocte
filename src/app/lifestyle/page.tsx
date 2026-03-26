import Link from "next/link";

const SERVICES = [
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
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        className="text-nocte-gold/70"
      >
        <path
          d="M3 17c2.5-4 5-6 9-6s6.5 2 9 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M12 11V5l5 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 20h20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
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
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        className="text-nocte-gold/70"
      >
        <path
          d="M21 7l-7 5-8-4-4 2 6 5-2 4 3-1 2-4 8 3 2-3-6-4 4-3z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
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
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        className="text-nocte-gold/70"
      >
        <path
          d="M5 17H3v-5l2-5h14l2 5v5h-2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="7.5" cy="17" r="1.5" stroke="currentColor" strokeWidth="1.5" />
        <circle
          cx="16.5"
          cy="17"
          r="1.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M5.5 12h13"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
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
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        className="text-nocte-gold/70"
      >
        <path
          d="M3 21V8l9-5 9 5v13"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 21v-6h6v6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 11h.01M15 11h.01"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "vip",
    name: "VIP Experiences",
    tagline: "Curated, One-of-a-Kind Nights",
    description:
      "Art Basel access, private dining at impossible tables, exclusive events before they're public. Reserved for those who know to ask.",
    gradient: "linear-gradient(160deg, #1a0b2e 0%, #0d0614 55%, #050505 100%)",
    inquireMessage:
      "I'm looking for a truly unique VIP experience in Miami. Something you can't normally book. What can you arrange?",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        className="text-nocte-gold/70"
      >
        <path
          d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M19 16l.75 2.25L22 19l-2.25.75L19 22l-.75-2.25L16 19l2.25-.75L19 16z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "dining",
    name: "Restaurant Reservations",
    tagline: "Hard-to-Get Tables",
    description:
      "Last-minute tables at Carbone, Komodo, Le Jardinier, and every other place that's technically fully booked. We have the relationships.",
    gradient: "linear-gradient(160deg, #1e1005 0%, #0a0603 55%, #050505 100%)",
    inquireMessage:
      "I need a reservation at a top Miami restaurant, ideally tonight or this week. Can you help me get a table?",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        className="text-nocte-gold/70"
      >
        <path
          d="M18 8h1a4 4 0 010 8h-1"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 1v3M10 1v3M14 1v3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function LifestylePage() {
  return (
    <div
      className="min-h-screen bg-nocte-black text-nocte-cream"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 64px)" }}
    >
      {/* Header */}
      <div className="px-6 pt-16 pb-8 border-b border-nocte-border">
        <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-2">
          Beyond Nightlife
        </p>
        <h1 className="font-display text-4xl font-light text-nocte-cream">
          Lifestyle
        </h1>
        <p className="font-sans text-xs text-nocte-muted mt-2 leading-relaxed">
          Every luxury, arranged through your concierge.
        </p>
      </div>

      {/* Service cards */}
      <div className="px-6 pt-6 space-y-3">
        {SERVICES.map((service) => (
          <div
            key={service.id}
            className="relative overflow-hidden border border-nocte-border hover:border-nocte-gold/30 transition-colors duration-300"
            style={{ background: service.gradient }}
          >
            {/* Subtle grid texture */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(255,255,255,0.015) 24px, rgba(255,255,255,0.015) 25px), repeating-linear-gradient(90deg, transparent, transparent 24px, rgba(255,255,255,0.015) 24px, rgba(255,255,255,0.015) 25px)",
                opacity: 0.04,
              }}
            />

            <div className="relative flex items-start gap-4 p-5">
              {/* Icon */}
              <div
                className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-nocte-gold/15"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(201,168,76,0.08), rgba(5,5,5,0.8))",
                }}
              >
                {service.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="font-sans text-[9px] text-nocte-gold tracking-[0.2em] uppercase mb-0.5">
                  {service.tagline}
                </p>
                <h2 className="font-display text-xl font-light text-nocte-cream mb-1.5 tracking-[0.05em]">
                  {service.name}
                </h2>
                <p className="font-sans text-xs text-nocte-muted leading-relaxed mb-4">
                  {service.description}
                </p>

                <Link
                  href={`/concierge?message=${encodeURIComponent(service.inquireMessage)}`}
                  className="inline-flex items-center gap-2 border border-nocte-gold/40 px-4 py-2 font-sans text-[10px] text-nocte-gold tracking-[0.2em] uppercase hover:bg-nocte-gold/10 hover:border-nocte-gold/70 transition-all duration-200"
                >
                  Inquire
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="px-6 py-10 text-center">
        <p className="font-sans text-[10px] text-nocte-muted/50 tracking-[0.15em] uppercase">
          All services arranged personally by your Noctē concierge
        </p>
      </div>
    </div>
  );
}
