import { FeedPost } from "./_components/FeedPost";

const FEED_POSTS = [
  {
    venue: "E11EVEN",
    neighborhood: "Downtown",
    caption: "Saturday was something else. The kind of night you don't plan, you just find yourself in.",
    gradient: "linear-gradient(160deg, #1a0d2e 0%, #0d0614 45%, #050505 100%)",
    time: "Last night",
    likes: 842,
  },
  {
    venue: "LIV",
    neighborhood: "South Beach",
    caption: "The only way to do a Friday. Everyone showed up. No one left early.",
    gradient: "linear-gradient(160deg, #2d0a14 0%, #0a0506 100%)",
    time: "2 days ago",
    likes: 1204,
  },
  {
    venue: "KOMODO",
    neighborhood: "Brickell",
    caption: "Dinner turned into a night. The way it always should.",
    gradient: "linear-gradient(160deg, #1e0f05 0%, #080504 100%)",
    time: "3 days ago",
    likes: 617,
  },
  {
    venue: "MYNT",
    neighborhood: "South Beach",
    caption: "Miami doesn't sleep. Neither did we.",
    gradient: "linear-gradient(160deg, #061a0d 0%, #030805 100%)",
    time: "4 days ago",
    likes: 389,
  },
  {
    venue: "NAOE",
    neighborhood: "Brickell",
    caption: "Omakase then the rooftop. The perfect sequence.",
    gradient: "linear-gradient(160deg, #1e1005 0%, #070504 100%)",
    time: "5 days ago",
    likes: 501,
  },
  {
    venue: "SWAN",
    neighborhood: "Design District",
    caption: "The vibe was immaculate. Some nights just align.",
    gradient: "linear-gradient(160deg, #0a1020 0%, #050508 100%)",
    time: "6 days ago",
    likes: 723,
  },
];

export default function FeedPage() {
  return (
    <div
      className="min-h-screen bg-nocte-black text-nocte-cream"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 64px)" }}
    >
      {/* Header */}
      <div className="px-6 pt-16 pb-6 border-b border-nocte-border">
        <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-2">
          Real Nights
        </p>
        <h1 className="font-display text-4xl font-light text-nocte-cream">
          The Feed
        </h1>
      </div>

      {/* Feed */}
      <div>
        {FEED_POSTS.map((post, i) => (
          <FeedPost key={i} {...post} />
        ))}
      </div>

      {/* Footer */}
      <div className="px-6 py-10 text-center">
        <p className="font-display text-xl font-light text-nocte-muted italic">
          More nights, always.
        </p>
      </div>
    </div>
  );
}
