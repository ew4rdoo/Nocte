export type VenueType =
  | "club"
  | "lounge"
  | "rooftop"
  | "beach club"
  | "speakeasy"
  | "restaurant";

export type Neighborhood =
  | "South Beach"
  | "Brickell"
  | "Wynwood"
  | "Design District"
  | "Coconut Grove";

export type PriceTier = "$" | "$$" | "$$$" | "$$$$";

export type Vibe =
  | "electric"
  | "intimate"
  | "scenic"
  | "exclusive"
  | "underground"
  | "refined";

export interface Venue {
  id: string;
  name: string;
  type: VenueType;
  neighborhood: Neighborhood;
  priceTier: PriceTier;
  vibes: Vibe[];
  description: string;
  shortDescription: string;
  hours: { open: string; close: string };
  tableServiceMin: number | null;
  gradient: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  heroColor: string;
}

export const venues: Venue[] = [
  {
    id: "liv-miami",
    name: "LIV Miami",
    type: "club",
    neighborhood: "South Beach",
    priceTier: "$$$$",
    vibes: ["electric", "exclusive"],
    description:
      "The crown jewel of South Beach nightlife. LIV commands the Fontainebleau Hotel with world-class DJ residencies, A-list celebrity sightings, and a production that rivals any stage in the world. This is where Miami nights become legend.",
    shortDescription: "World-class club at the Fontainebleau Hotel",
    hours: { open: "11:00 PM", close: "5:00 AM" },
    tableServiceMin: 1500,
    gradient: "from-violet-900 via-purple-800 to-indigo-900",
    rating: 4.8,
    reviewCount: 2341,
    tags: ["celebrity", "bottle service", "DJ residency"],
    heroColor: "#4c1d95",
  },
  {
    id: "e11even",
    name: "E11EVEN Miami",
    type: "club",
    neighborhood: "Brickell",
    priceTier: "$$$$",
    vibes: ["electric", "exclusive"],
    description:
      "Miami's premier 24-hour ultraclub — a truly non-stop experience that blurs the line between nightclub, cabaret, and luxury entertainment complex. When the sun rises, E11EVEN doesn't slow down.",
    shortDescription: "Miami's legendary 24-hour ultraclub",
    hours: { open: "10:00 PM", close: "24 hours" },
    tableServiceMin: 2000,
    gradient: "from-amber-800 via-orange-700 to-red-800",
    rating: 4.7,
    reviewCount: 1892,
    tags: ["24-hour", "ultraclub", "cabaret"],
    heroColor: "#92400e",
  },
  {
    id: "komodo-lounge",
    name: "Komodo",
    type: "lounge",
    neighborhood: "Brickell",
    priceTier: "$$$",
    vibes: ["refined", "intimate", "exclusive"],
    description:
      "David Grutman's Brickell landmark seamlessly blends a world-class restaurant, rooftop lounge, and intimate nightclub under one roof. Come for dinner, stay until dawn.",
    shortDescription: "Grutman's iconic multi-level Brickell destination",
    hours: { open: "5:00 PM", close: "3:00 AM" },
    tableServiceMin: 500,
    gradient: "from-emerald-900 via-teal-800 to-cyan-900",
    rating: 4.6,
    reviewCount: 3104,
    tags: ["restaurant", "rooftop", "multi-level"],
    heroColor: "#064e3b",
  },
  {
    id: "swan-bar",
    name: "Swan",
    type: "restaurant",
    neighborhood: "Design District",
    priceTier: "$$$",
    vibes: ["refined", "intimate"],
    description:
      "Pharrell Williams' Design District gem exudes the creative energy of the neighborhood. Expect inspired cocktails, a carefully curated crowd, and a vibe that feels like a members-only secret you've finally been let into.",
    shortDescription: "Pharrell's Design District hotspot",
    hours: { open: "6:00 PM", close: "2:00 AM" },
    tableServiceMin: null,
    gradient: "from-rose-900 via-pink-800 to-fuchsia-900",
    rating: 4.5,
    reviewCount: 1456,
    tags: ["celebrity-owned", "cocktails", "creative crowd"],
    heroColor: "#881337",
  },
  {
    id: "loba-wynwood",
    name: "Loba",
    type: "speakeasy",
    neighborhood: "Wynwood",
    priceTier: "$$",
    vibes: ["underground", "intimate"],
    description:
      "Hidden behind an unmarked door in Wynwood, Loba is Miami's worst-kept secret among those in the know. Master mixologists craft cocktails that tell stories, while a hand-picked playlist guides the mood.",
    shortDescription: "Wynwood's most coveted speakeasy",
    hours: { open: "8:00 PM", close: "3:00 AM" },
    tableServiceMin: null,
    gradient: "from-zinc-800 via-stone-700 to-neutral-800",
    rating: 4.9,
    reviewCount: 634,
    tags: ["speakeasy", "craft cocktails", "hidden"],
    heroColor: "#27272a",
  },
  {
    id: "kiki-on-the-river",
    name: "Kiki on the River",
    type: "restaurant",
    neighborhood: "Wynwood",
    priceTier: "$$$",
    vibes: ["scenic", "electric"],
    description:
      "A Greek island fantasy on the Miami River. White-washed walls, azure accents, and weekend parties that give Mykonos a run for its money. The Sunday pool party is a Miami institution.",
    shortDescription: "Greek-inspired riverside destination",
    hours: { open: "12:00 PM", close: "2:00 AM" },
    tableServiceMin: 200,
    gradient: "from-sky-800 via-blue-700 to-indigo-800",
    rating: 4.7,
    reviewCount: 2876,
    tags: ["waterfront", "Greek", "Sunday party"],
    heroColor: "#075985",
  },
  {
    id: "sugar-brickell",
    name: "SUGAR",
    type: "rooftop",
    neighborhood: "Brickell",
    priceTier: "$$$",
    vibes: ["scenic", "intimate", "refined"],
    description:
      "Forty floors above Brickell, SUGAR offers the most spectacular skyline views in Miami. Asia-inspired cocktails, lush tropical greenery, and a serene atmosphere that makes the city's chaos feel impossibly far away.",
    shortDescription: "40-floor rooftop bar above Brickell",
    hours: { open: "5:00 PM", close: "1:00 AM" },
    tableServiceMin: null,
    gradient: "from-lime-900 via-green-800 to-emerald-900",
    rating: 4.6,
    reviewCount: 1788,
    tags: ["rooftop", "skyline views", "Asian-inspired"],
    heroColor: "#14532d",
  },
  {
    id: "nautilus-pool",
    name: "Nautilus Pool & Bar",
    type: "beach club",
    neighborhood: "South Beach",
    priceTier: "$$$",
    vibes: ["scenic", "electric", "exclusive"],
    description:
      "The historic Nautilus Hotel's pool scene is South Beach's best-kept afternoon secret. By night, it transforms into an intimate outdoor lounge with the energy of a club and the feel of a private estate.",
    shortDescription: "South Beach's iconic poolside experience",
    hours: { open: "12:00 PM", close: "2:00 AM" },
    tableServiceMin: 300,
    gradient: "from-cyan-900 via-teal-700 to-blue-900",
    rating: 4.4,
    reviewCount: 912,
    tags: ["pool", "hotel", "outdoor"],
    heroColor: "#164e63",
  },
  {
    id: "grove-bay-bistro",
    name: "Grove Bay Bistro",
    type: "restaurant",
    neighborhood: "Coconut Grove",
    priceTier: "$$",
    vibes: ["scenic", "intimate", "refined"],
    description:
      "Nestled on the waterfront in Coconut Grove, this intimate bistro captures the neighborhood's bohemian elegance. Chef-driven cocktails, fresh seafood, and bay views that make every evening feel like a private escape.",
    shortDescription: "Waterfront bistro in Coconut Grove",
    hours: { open: "5:00 PM", close: "11:00 PM" },
    tableServiceMin: null,
    gradient: "from-orange-900 via-amber-700 to-yellow-800",
    rating: 4.5,
    reviewCount: 445,
    tags: ["waterfront", "seafood", "chef-driven"],
    heroColor: "#7c2d12",
  },
  {
    id: "beachcraft",
    name: "Beachcraft",
    type: "beach club",
    neighborhood: "South Beach",
    priceTier: "$$$$",
    vibes: ["exclusive", "refined", "scenic"],
    description:
      "Tom Colicchio's acclaimed oceanfront restaurant at the 1 Hotel South Beach. Locally-sourced menus, direct beach access, and a sunset-to-night progression that remains unmatched on the strip.",
    shortDescription: "Tom Colicchio's oceanfront South Beach gem",
    hours: { open: "7:00 AM", close: "11:00 PM" },
    tableServiceMin: null,
    gradient: "from-amber-700 via-yellow-600 to-orange-700",
    rating: 4.8,
    reviewCount: 1234,
    tags: ["farm-to-table", "oceanfront", "celebrity chef"],
    heroColor: "#b45309",
  },
  {
    id: "wynwood-arcade",
    name: "Wynwood Arcade",
    type: "lounge",
    neighborhood: "Wynwood",
    priceTier: "$$",
    vibes: ["underground", "electric"],
    description:
      "Where Wynwood's creative underground converges. Vintage arcade games, local DJs, and an industrial-chic aesthetic that refuses to take itself too seriously. The antidote to Miami's VIP culture.",
    shortDescription: "Wynwood's underground creative playground",
    hours: { open: "7:00 PM", close: "3:00 AM" },
    tableServiceMin: null,
    gradient: "from-purple-900 via-violet-700 to-indigo-800",
    rating: 4.3,
    reviewCount: 782,
    tags: ["arcade", "local DJs", "casual"],
    heroColor: "#3b0764",
  },
  {
    id: "coyo-taco-bar",
    name: "Coyo Taco Bar",
    type: "lounge",
    neighborhood: "Wynwood",
    priceTier: "$",
    vibes: ["electric", "intimate"],
    description:
      "Wynwood's most beloved late-night spot blends exceptional tacos with a full craft cocktail program and DJ-driven energy until 5AM. Proof that the best nights don't require a dress code.",
    shortDescription: "Late-night tacos and cocktails until 5AM",
    hours: { open: "11:30 AM", close: "5:00 AM" },
    tableServiceMin: null,
    gradient: "from-red-900 via-rose-700 to-pink-800",
    rating: 4.6,
    reviewCount: 4521,
    tags: ["late night", "tacos", "casual"],
    heroColor: "#7f1d1d",
  },
];

export const VENUE_TYPES: VenueType[] = [
  "club",
  "lounge",
  "rooftop",
  "beach club",
  "speakeasy",
  "restaurant",
];

export const NEIGHBORHOODS: Neighborhood[] = [
  "South Beach",
  "Brickell",
  "Wynwood",
  "Design District",
  "Coconut Grove",
];

export const PRICE_TIERS: PriceTier[] = ["$", "$$", "$$$", "$$$$"];

export const VIBES: Vibe[] = [
  "electric",
  "intimate",
  "scenic",
  "exclusive",
  "underground",
  "refined",
];
