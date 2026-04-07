export type TableOption = {
  id: string;
  name: string;
  description: string;
  location: string;
  capacity: { min: number; max: number };
  minimumSpend: number;
  available: boolean;
};

export type Venue = {
  id: string;
  name: string;
  category?: "club" | "lounge" | "rooftop" | "dining" | "beach" | "bar";
  type: string;
  neighborhood: string;
  address: string;
  gradient: string;
  description: string;
  vibe: string[];
  priceRange: "$" | "$$" | "$$$" | "$$$$";
  hours: string;
  dressCode?: string;
  minimums?: string;
  bottleServiceRange?: string;
  bestFor?: string[];
  notes?: string;
  bottleMin: number;
  tableCapacity: string;
  phone: string;
  reviews: { author: string; text: string; rating: number }[];
  hot?: boolean;
  tables?: TableOption[];
  imageUrl?: string;
};

const VENUES_FALLBACK: Venue[] = [
  {
    id: "liv",
    name: "LIV",
    category: "club",
    type: "Nightclub",
    neighborhood: "South Beach",
    gradient: "linear-gradient(160deg, #2d0a1a 0%, #0a0506 100%)",
    address: "4441 Collins Ave, Miami Beach, FL 33140",
    description:
      "Miami's flagship nightclub inside the Fontainebleau. World-class DJ residencies, massive production, and the most recognizable room in the city.",
    vibe: ["Wild", "Electric", "Celebrity"],
    priceRange: "$$$$",
    hours: "Fri–Sat 11pm–5am",
    dressCode: "Strict — upscale attire required, no athletic wear",
    minimums: "Tables from $2,000",
    bottleServiceRange: "$500–$50,000+",
    bestFor: ["special occasions", "big groups", "first-time visitors wanting the full Miami experience"],
    notes: "Book tables 2+ weeks in advance for weekends. Guest list fills fast — request early.",
    bottleMin: 2500,
    tableCapacity: "4–10 guests",
    phone: "+1 (305) 674-4680",
    reviews: [
      {
        author: "Marcus T.",
        text: "Nothing else compares. The energy is on another level.",
        rating: 5,
      },
      {
        author: "Sofia R.",
        text: "Saw three celebs in one night. Worth every penny.",
        rating: 5,
      },
      {
        author: "James K.",
        text: "Production quality is insane. The light shows are art.",
        rating: 4,
      },
    ],
    hot: true,
    imageUrl: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&q=80",
    tables: [
      { id: "liv-vip-main", name: "VIP Table", description: "Main floor VIP with direct DJ view", location: "Main Floor", capacity: { min: 4, max: 8 }, minimumSpend: 2500, available: true },
      { id: "liv-vip-mezzanine", name: "Mezzanine VIP", description: "Elevated mezzanine overlooking the dance floor", location: "Mezzanine", capacity: { min: 4, max: 10 }, minimumSpend: 3500, available: true },
      { id: "liv-dance-floor", name: "Dance Floor Table", description: "Front row — you're part of the show", location: "Dance Floor", capacity: { min: 6, max: 10 }, minimumSpend: 5000, available: true },
      { id: "liv-owners", name: "Owner's Table", description: "The best table in the house. Private area, dedicated staff", location: "Private Section", capacity: { min: 8, max: 15 }, minimumSpend: 10000, available: true },
    ],
  },
  {
    id: "e11even",
    name: "E11EVEN",
    category: "club",
    type: "Ultra Lounge",
    neighborhood: "Downtown",
    gradient: "linear-gradient(160deg, #0a1020 0%, #050508 100%)",
    address: "29 NE 11th St, Miami, FL 33132",
    description:
      "The only 24-hour ultra lounge in Miami. Theatrical performances, multiple floors, and an energy that peaks at sunrise. Truly one of a kind.",
    vibe: ["24-Hour", "Electric", "Wild"],
    priceRange: "$$$$",
    hours: "24 hours, peaks Fri–Sat midnight–6am",
    dressCode: "Upscale — fashion-forward encouraged",
    minimums: "Tables from $1,500",
    bottleServiceRange: "$400–$30,000+",
    bestFor: ["late-night continuation", "groups who want to go all night", "unique experiences"],
    notes: "Best after 2am when the energy shifts. Performers and acrobatics throughout the night.",
    bottleMin: 1500,
    tableCapacity: "4–8 guests",
    phone: "+1 (305) 829-2911",
    reviews: [
      {
        author: "Diego M.",
        text: "Stayed until 8am. Zero regrets.",
        rating: 5,
      },
      {
        author: "Priya L.",
        text: "The aerial performers are unreal. A true spectacle.",
        rating: 5,
      },
    ],
    hot: true,
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
    tables: [
      { id: "e11-main-vip", name: "Main Room VIP", description: "Ground level with stage views and full bottle service", location: "Main Room", capacity: { min: 4, max: 8 }, minimumSpend: 1500, available: true },
      { id: "e11-skybox", name: "Skybox", description: "Second-floor private booth overlooking the stage", location: "Upper Level", capacity: { min: 4, max: 6 }, minimumSpend: 2500, available: true },
      { id: "e11-rooftop", name: "Rooftop Table", description: "Open-air rooftop with city skyline views", location: "Rooftop", capacity: { min: 4, max: 10 }, minimumSpend: 3000, available: true },
    ],
  },
  {
    id: "club-space",
    name: "Club Space",
    category: "club",
    type: "Nightclub",
    neighborhood: "Downtown",
    gradient: "",
    address: "34 NE 11th St, Miami",
    description:
      "Miami's underground institution. Serious electronic music, legendary terrace, and a crowd that lives for the music. Starts at 2am and goes until noon.",
    vibe: ["underground", "music-focused", "late-night"],
    priceRange: "$$$",
    hours: "Fri–Sun 2am–12pm",
    dressCode: "Casual but no athletic wear — comfort over fashion",
    minimums: "Tables from $1,000",
    bottleServiceRange: "$300–$10,000",
    bestFor: ["electronic music lovers", "late-late night", "locals"],
    notes: "Terrace is the crown jewel — sunrise sessions are legendary. No attitude, music is everything.",
    bottleMin: 1000,
    tableCapacity: "4–8 guests",
    phone: "",
    reviews: [],
    imageUrl: "https://images.unsplash.com/photo-1545128485-c400e7702796?w=800&q=80",
    tables: [
      { id: "cs-terrace", name: "Terrace Table", description: "The legendary terrace — sunrise sessions happen here", location: "Terrace", capacity: { min: 4, max: 8 }, minimumSpend: 1000, available: true },
      { id: "cs-main", name: "Main Room Table", description: "Inside the main room near the booth", location: "Main Room", capacity: { min: 4, max: 6 }, minimumSpend: 1500, available: true },
    ],
  },
  {
    id: "komodo",
    name: "KOMODO",
    category: "dining",
    type: "Japanese-Latin Fusion",
    neighborhood: "Brickell",
    gradient: "linear-gradient(160deg, #1a0b2e 0%, #0d0614 45%, #050505 100%)",
    address: "801 Brickell Ave, Miami, FL 33131",
    description:
      "Three floors of Japanese-Latin fusion in the heart of Brickell. The biggest scene in the city on weekend nights — equal parts restaurant and nightlife destination.",
    vibe: ["Upscale", "Social", "Trendy"],
    priceRange: "$$$",
    hours: "Mon–Sun 5pm–2am",
    dressCode: "Smart casual to upscale",
    minimums: "None for dining; bar area is walk-in",
    bestFor: ["groups of 4–8", "pre-club dinner", "birthday dinners"],
    notes: "Weekend waits can be 2 hours without a reservation. Book online or through us. DJ starts at 10pm.",
    bottleMin: 800,
    tableCapacity: "2–12 guests",
    phone: "+1 (305) 534-2211",
    reviews: [
      {
        author: "Alexandra V.",
        text: "The wagyu tacos are worth flying to Miami for.",
        rating: 5,
      },
      {
        author: "Ryan C.",
        text: "Atmosphere is unmatched. Come for dinner, stay till 2.",
        rating: 4,
      },
    ],
    hot: false,
    imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    tables: [
      { id: "komodo-dining", name: "Dining Table", description: "Main dining room with views of the open kitchen", location: "Dining Room", capacity: { min: 2, max: 6 }, minimumSpend: 0, available: true },
      { id: "komodo-rooftop", name: "Rooftop Table", description: "Third-floor open-air rooftop — the scene on weekends", location: "Rooftop", capacity: { min: 4, max: 8 }, minimumSpend: 800, available: true },
      { id: "komodo-vip", name: "VIP Section", description: "Semi-private area with dedicated server", location: "Second Floor", capacity: { min: 6, max: 12 }, minimumSpend: 1500, available: true },
    ],
  },
  {
    id: "gekko",
    name: "Gekko",
    category: "dining",
    type: "Steakhouse",
    neighborhood: "Brickell",
    gradient: "",
    address: "801 Brickell Ave, Miami",
    description:
      "Bad Bunny's upscale steakhouse in Brickell. Notoriously hard to get into, impeccable food, and one of the most talked-about reservations in Miami.",
    vibe: ["exclusive", "celebrity", "intimate"],
    priceRange: "$$$$",
    hours: "Tue–Sun 6pm–midnight",
    dressCode: "Upscale — no casual attire",
    bestFor: ["special occasions", "impressive dates", "food-first experiences"],
    notes:
      "Reservations released 30 days out and gone in minutes. We can sometimes access walk-in availability — ask.",
    bottleMin: 0,
    tableCapacity: "",
    phone: "",
    reviews: [],
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
  },
  {
    id: "swan",
    name: "SWAN",
    category: "dining",
    type: "Restaurant & Bar",
    neighborhood: "Design District",
    gradient: "linear-gradient(160deg, #1a0a0a 0%, #080404 100%)",
    address: "90 NE 39th St, Miami, FL 33137",
    description:
      "Pharrell Williams' Design District restaurant. Beautiful crowd, eclectic menu, and an energy that bridges dinner and nightlife. Celebrities are a regular sighting.",
    vibe: ["Trendy", "Social", "Fashionable"],
    priceRange: "$$$",
    hours: "Mon–Sun 6pm–1am",
    dressCode: "Fashion-forward, creative encouraged",
    bestFor: ["creative crowd", "Design District evening", "pre-Wynwood night"],
    notes: "The bar area often turns into a full party by 11pm. Great outdoor seating.",
    bottleMin: 500,
    tableCapacity: "2–8 guests",
    phone: "+1 (305) 942-7926",
    reviews: [
      {
        author: "Isabella R.",
        text: "Pharrell's touch is everywhere. A truly beautiful space.",
        rating: 5,
      },
      {
        author: "Tyler N.",
        text: "The cocktail program is top tier. Order the rose spritz.",
        rating: 4,
      },
    ],
    hot: true,
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    tables: [
      { id: "swan-indoor", name: "Indoor Table", description: "Main dining room surrounded by Pharrell's art curation", location: "Dining Room", capacity: { min: 2, max: 6 }, minimumSpend: 0, available: true },
      { id: "swan-patio", name: "Patio Table", description: "Outdoor patio in the Design District courtyard", location: "Patio", capacity: { min: 2, max: 8 }, minimumSpend: 500, available: true },
      { id: "swan-bar", name: "Bar Area", description: "Walk-in bar area — turns into a party after 11pm", location: "Bar", capacity: { min: 2, max: 4 }, minimumSpend: 0, available: true },
    ],
  },
  {
    id: "sugar",
    name: "Sugar",
    category: "rooftop",
    type: "Rooftop Bar",
    neighborhood: "Brickell",
    gradient: "",
    address: "788 Brickell Plaza (EAST Hotel), Miami",
    description:
      "40th-floor rooftop bar at the EAST Hotel with panoramic city views. The best rooftop in Brickell — Asian-inspired bites, excellent cocktails, and a crowd that appreciates the finer things.",
    vibe: ["sophisticated", "views", "cocktail-focused"],
    priceRange: "$$$",
    hours: "Mon–Sun 4pm–1am",
    dressCode: "Smart casual",
    bestFor: ["first drinks of the night", "dates", "out-of-town guests", "pre-dinner drinks"],
    notes:
      "Gets crowded by 9pm on weekends. Arrive by 8pm for the best experience. Spectacular at sunset.",
    bottleMin: 0,
    tableCapacity: "",
    phone: "",
    reviews: [],
    imageUrl: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80",
  },
  {
    id: "juvia",
    name: "Juvia",
    category: "rooftop",
    type: "Rooftop Restaurant",
    neighborhood: "South Beach",
    gradient: "",
    address: "1111 Lincoln Rd, Miami Beach",
    description:
      "Rooftop restaurant on Lincoln Road with ocean and city views. French-Peruvian-Japanese menu and one of the most scenic outdoor spaces in South Beach.",
    vibe: ["romantic", "scenic", "dinner-forward"],
    priceRange: "$$$",
    hours: "Mon–Sun 12pm–midnight",
    dressCode: "Resort chic to upscale",
    bestFor: ["romantic dinners", "visitors wanting views", "Sunday brunch"],
    notes: "Ocean views from the terrace are stunning at sunset. Reservations essential.",
    bottleMin: 0,
    tableCapacity: "",
    phone: "",
    reviews: [],
    imageUrl: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",
  },
  {
    id: "kiki-on-the-river",
    name: "Kiki on the River",
    category: "dining",
    type: "Mediterranean",
    neighborhood: "Miami River",
    gradient: "",
    address: "450 NW North River Dr, Miami",
    description:
      "Mediterranean restaurant on the Miami River where boats pull up to dock. A one-of-a-kind waterfront experience that feels like the Greek islands — by way of Miami.",
    vibe: ["waterfront", "festive", "Mediterranean"],
    priceRange: "$$$",
    hours: "Mon–Sun 12pm–midnight",
    dressCode: "Resort casual",
    bestFor: ["groups", "out-of-town guests", "unique Miami experience", "Sunday funday"],
    notes:
      "Greek plates, dancing, and incredible vibes. Can arrive by boat. Weekend afternoons get festive with live music.",
    bottleMin: 0,
    tableCapacity: "",
    phone: "",
    reviews: [],
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
  },
  {
    id: "nikki-beach",
    name: "Nikki Beach",
    category: "beach",
    type: "Beach Club",
    neighborhood: "South Beach",
    gradient: "",
    address: "1 Ocean Dr, Miami Beach",
    description:
      "The original luxury beach club. Sunday brunch is a Miami institution — international crowd, daybeds, champagne, and DJs from noon until sunset.",
    vibe: ["daytime", "beach", "international"],
    priceRange: "$$$",
    hours: "Sun 11am–9pm (Sunday Brunch); special events throughout the week",
    dressCode: "Beach chic",
    minimums: "Daybed minimums vary",
    bestFor: ["Sunday brunch", "daytime events", "visiting internationals"],
    notes:
      "Sunday World Brunch is the flagship event. Booking daybeds in advance is essential in season.",
    bottleMin: 0,
    tableCapacity: "",
    phone: "",
    reviews: [],
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  },
  {
    id: "the-broken-shaker",
    name: "The Broken Shaker",
    category: "bar",
    type: "Cocktail Bar",
    neighborhood: "Wynwood",
    gradient: "",
    address: "2727 Indian Creek Dr, Miami Beach (Freehand Miami)",
    description:
      "Award-winning craft cocktail bar at the Freehand hotel. Lush outdoor garden, inventive seasonal cocktails, and an artsy, unpretentious crowd.",
    vibe: ["craft cocktails", "artsy", "low-key"],
    priceRange: "$$",
    hours: "Mon–Sun 5pm–2am",
    dressCode: "Come as you are",
    bestFor: ["craft cocktail lovers", "pre-Wynwood drinks", "smaller groups", "creative types"],
    notes:
      "Named one of the best bars in the US multiple times. The garden patio is the spot. Cash tips appreciated.",
    bottleMin: 0,
    tableCapacity: "",
    phone: "",
    reviews: [],
    imageUrl: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80",
  },
  {
    id: "mynt-lounge",
    name: "MYNT",
    category: "lounge",
    type: "Lounge",
    neighborhood: "South Beach",
    gradient: "linear-gradient(160deg, #0a200f 0%, #050a06 100%)",
    address: "1921 Collins Ave, Miami Beach, FL 33139",
    description:
      "Intimate South Beach lounge with a celebrity-heavy guest list. More exclusive and controlled than the mega-clubs — knows how to curate a room.",
    vibe: ["Intimate", "Celebrity", "Upscale"],
    priceRange: "$$$",
    hours: "Thu–Sat 11pm–5am",
    dressCode: "Upscale — strictly enforced",
    minimums: "Tables from $1,000",
    bestFor: ["smaller VIP groups", "celebrity sightings", "more intimate than LIV"],
    notes: "Guest list is selective. Table reservations give the most reliable entry.",
    bottleMin: 1200,
    tableCapacity: "4–6 guests",
    phone: "+1 (305) 532-0727",
    reviews: [
      {
        author: "Natalie S.",
        text: "The crowd here is insane. Everyone knows everyone.",
        rating: 5,
      },
      {
        author: "Chris D.",
        text: "Smaller than I expected but that's what makes it special.",
        rating: 4,
      },
    ],
    hot: false,
    imageUrl: "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=800&q=80",
    tables: [
      { id: "mynt-vip", name: "VIP Booth", description: "Intimate booth in the main room", location: "Main Room", capacity: { min: 4, max: 6 }, minimumSpend: 1200, available: true },
      { id: "mynt-premium", name: "Premium Table", description: "Best sightlines in the house — center of the action", location: "Center Floor", capacity: { min: 4, max: 8 }, minimumSpend: 2000, available: true },
    ],
  },
  {
    id: "zuma",
    name: "Zuma",
    category: "dining",
    type: "Japanese",
    neighborhood: "Brickell",
    gradient: "",
    address: "270 Biscayne Blvd Way, Miami",
    description:
      "Contemporary Japanese robata restaurant on the waterfront. Excellent for groups — sharing plates, impressive sake list, and consistent quality.",
    vibe: ["upscale", "group-friendly", "waterfront"],
    priceRange: "$$$",
    hours: "Mon–Sun 12pm–midnight",
    dressCode: "Smart casual",
    bestFor: ["group dinners", "business dinners", "sushi lovers"],
    notes: "The robata grill items are exceptional. Ask for the river-view seating.",
    bottleMin: 0,
    tableCapacity: "",
    phone: "",
    reviews: [],
    imageUrl: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=800&q=80",
  },
  {
    id: "naoe",
    name: "NAOE",
    category: "dining",
    type: "Omakase",
    neighborhood: "Brickell",
    gradient: "linear-gradient(160deg, #1e1005 0%, #080504 100%)",
    address: "661 Brickell Key Dr, Miami, FL 33131",
    description:
      "Miami's most intimate omakase experience — 8 seats, Chef Kevin Cory, and a meal that requires weeks of patience to book. Truly exceptional.",
    vibe: ["Quiet", "Refined", "Intimate"],
    priceRange: "$$$$",
    hours: "Wed–Sat, seatings at 6pm and 8:30pm",
    dressCode: "Business casual to upscale",
    bestFor: ["serious food occasions", "proposals", "milestone dinners", "omakase lovers"],
    notes:
      "Only 8 seats. Reservation waitlist opens 6–8 weeks in advance. Considered one of the best restaurants in Florida.",
    bottleMin: 0,
    tableCapacity: "Up to 8 guests",
    phone: "+1 (305) 947-6263",
    reviews: [
      {
        author: "Chen W.",
        text: "The best omakase outside of Tokyo. Transcendent.",
        rating: 5,
      },
      {
        author: "Elena M.",
        text: "Book months in advance. Worth every effort.",
        rating: 5,
      },
    ],
    hot: false,
    imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&q=80",
    tables: [
      { id: "naoe-counter", name: "Omakase Counter", description: "8-seat counter — the full experience", location: "Counter", capacity: { min: 1, max: 2 }, minimumSpend: 0, available: true },
      { id: "naoe-private", name: "Private Room", description: "Intimate private dining for special occasions", location: "Private Room", capacity: { min: 4, max: 8 }, minimumSpend: 0, available: true },
    ],
  },
  {
    id: "papi-steak",
    name: "PAPI STEAK",
    category: "dining",
    type: "Steakhouse",
    neighborhood: "South Beach",
    gradient: "linear-gradient(160deg, #200808 0%, #090303 100%)",
    priceRange: "$$$$",
    vibe: ["Upscale", "Social", "Electric"],
    hours: "6pm – 2am (Daily)",
    description:
      "Where Art Basel energy meets prime cut perfection. Papi Steak has redefined the Miami steakhouse — theatrical tableside presentations, impossibly tender wagyu, and a room that buzzes with the city's movers and shakers.",
    bestFor: [],
    bottleMin: 1000,
    tableCapacity: "2–10 guests",
    phone: "+1 (305) 763-8272",
    address: "736 1st St, Miami Beach, FL 33139",
    reviews: [
      {
        author: "Marco A.",
        text: "The A5 wagyu is life-changing. No exaggeration.",
        rating: 5,
      },
      {
        author: "Bianca F.",
        text: "Most fun dinner I've had in Miami. The service is a performance.",
        rating: 5,
      },
    ],
    hot: true,
    imageUrl: "https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80",
    tables: [
      { id: "papi-dining", name: "Dining Table", description: "Main room table — theatrical wagyu presentations", location: "Main Dining", capacity: { min: 2, max: 6 }, minimumSpend: 0, available: true },
      { id: "papi-vip", name: "VIP Booth", description: "Private booth with dedicated sommelier service", location: "VIP Section", capacity: { min: 4, max: 10 }, minimumSpend: 1000, available: true },
      { id: "papi-chefs", name: "Chef's Table", description: "Front-row seat to the kitchen — limited availability", location: "Kitchen View", capacity: { min: 2, max: 4 }, minimumSpend: 1500, available: true },
    ],
  },
  {
    id: "floyd",
    name: "FLOYD",
    category: "bar",
    type: "Bar",
    neighborhood: "Downtown",
    gradient: "linear-gradient(160deg, #080c1a 0%, #030508 100%)",
    priceRange: "$$",
    vibe: ["Chill", "Intimate", "Local"],
    hours: "6pm – 3am (Daily)",
    description:
      "Downtown's best-kept secret. Floyd is an intimate dive bar elevated — exceptional natural wines, craft cocktails, and a sound system playing vinyl that reminds you music is still sacred. No velvet ropes, no pretense.",
    bestFor: [],
    bottleMin: 0,
    tableCapacity: "Walk-in",
    phone: "+1 (786) 618-4373",
    address: "34 NE 11th St, Miami, FL 33132",
    reviews: [
      {
        author: "Sam O.",
        text: "Finally a great bar in Downtown. The wine list is incredible.",
        rating: 5,
      },
      {
        author: "Kim L.",
        text: "Low-key heaven. Go on a Tuesday.",
        rating: 4,
      },
    ],
    hot: false,
    imageUrl: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800&q=80",
  },
];

// Backward-compatible export
export const VENUES: Venue[] = VENUES_FALLBACK;

// Sync helpers (kept for backward compatibility)
export function getVenueById(id: string): Venue | undefined {
  return VENUES_FALLBACK.find((v) => v.id === id);
}

export function getVenuesByNeighborhood(neighborhood: string): Venue[] {
  return VENUES_FALLBACK.filter((v) =>
    v.neighborhood.toLowerCase().includes(neighborhood.toLowerCase())
  );
}

export function getVenuesByCategory(category: Venue["category"]): Venue[] {
  return VENUES_FALLBACK.filter((v) => v.category === category);
}

export function getTablesForVenue(venueId: string): TableOption[] {
  const venue = getVenueById(venueId);
  return venue?.tables ?? [];
}

export function formatVenuesForPrompt(): string {
  return VENUES_FALLBACK.map((v) => {
    const lines = [
      `### ${v.name} (${v.id})`,
      `Category: ${v.category} | Neighborhood: ${v.neighborhood} | Price: ${v.priceRange}`,
      `Address: ${v.address}`,
      `Hours: ${v.hours}`,
      `Description: ${v.description}`,
      `Vibe: ${v.vibe.join(", ")}`,
      `Best for: ${(v.bestFor || []).join(", ")}`,
    ];
    if (v.dressCode) lines.push(`Dress code: ${v.dressCode}`);
    if (v.minimums) lines.push(`Minimums: ${v.minimums}`);
    if (v.bottleServiceRange) lines.push(`Bottle service: ${v.bottleServiceRange}`);
    if (v.notes) lines.push(`Notes: ${v.notes}`);
    return lines.join("\n");
  }).join("\n\n");
}

// ─── Supabase helpers ───

function hasSupabase(): boolean {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

async function getSupabase() {
  const { supabase } = await import("./supabase");
  return supabase;
}

type VenueRow = {
  id: string;
  name: string;
  category: string | null;
  type: string;
  neighborhood: string;
  address: string;
  gradient: string;
  description: string;
  vibe: string;
  price_range: string;
  hours: string;
  dress_code: string | null;
  minimums: string | null;
  bottle_service_range: string | null;
  best_for: string;
  notes: string | null;
  bottle_min: number;
  table_capacity: string;
  phone: string;
  reviews: string;
  hot: boolean;
  active: boolean;
  submission_id: string | null;
  image_url: string | null;
};

type TableRow = {
  id: string;
  venue_id: string;
  name: string;
  description: string;
  location: string;
  capacity_min: number;
  capacity_max: number;
  minimum_spend: number;
  available: boolean;
  sort_order: number;
};

function parseJsonField<T>(value: unknown, fallback: T): T {
  if (typeof value === "string") {
    try { return JSON.parse(value); } catch { return fallback; }
  }
  if (Array.isArray(value)) return value as T;
  return fallback;
}

function tableRowToOption(row: TableRow): TableOption {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    location: row.location,
    capacity: { min: row.capacity_min, max: row.capacity_max },
    minimumSpend: row.minimum_spend,
    available: row.available,
  };
}

function rowToVenue(row: VenueRow, tableRows: TableRow[]): Venue {
  return {
    id: row.id,
    name: row.name,
    category: (row.category || undefined) as Venue["category"],
    type: row.type,
    neighborhood: row.neighborhood,
    address: row.address,
    gradient: row.gradient,
    description: row.description,
    vibe: parseJsonField<string[]>(row.vibe, []),
    priceRange: row.price_range as Venue["priceRange"],
    hours: row.hours,
    dressCode: row.dress_code || undefined,
    minimums: row.minimums || undefined,
    bottleServiceRange: row.bottle_service_range || undefined,
    bestFor: parseJsonField<string[]>(row.best_for, []),
    notes: row.notes || undefined,
    bottleMin: row.bottle_min,
    tableCapacity: row.table_capacity,
    phone: row.phone,
    reviews: parseJsonField<{ author: string; text: string; rating: number }[]>(row.reviews, []),
    hot: row.hot,
    imageUrl: row.image_url || undefined,
    tables: tableRows
      .filter((t) => t.venue_id === row.id)
      .sort((a, b) => a.sort_order - b.sort_order)
      .map(tableRowToOption),
  };
}

// ─── Async data functions ───

export async function getActiveVenues(): Promise<Venue[]> {
  if (!hasSupabase()) return VENUES_FALLBACK;

  const supabase = await getSupabase();
  const { data: venueRows, error } = await supabase
    .from("venues")
    .select("*")
    .eq("active", true)
    .order("name");

  if (error || !venueRows) return VENUES_FALLBACK;

  const venueIds = venueRows.map((v: VenueRow) => v.id);
  const { data: tableRows } = await supabase
    .from("venue_tables")
    .select("*")
    .in("venue_id", venueIds)
    .order("sort_order");

  return venueRows.map((row: VenueRow) =>
    rowToVenue(row, (tableRows ?? []) as TableRow[])
  );
}

export async function getVenueByIdAsync(id: string): Promise<Venue | undefined> {
  if (!hasSupabase()) return VENUES_FALLBACK.find((v) => v.id === id);

  const supabase = await getSupabase();
  const { data: row, error } = await supabase
    .from("venues")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !row) return VENUES_FALLBACK.find((v) => v.id === id);

  const { data: tableRows } = await supabase
    .from("venue_tables")
    .select("*")
    .eq("venue_id", id)
    .order("sort_order");

  return rowToVenue(row as VenueRow, (tableRows ?? []) as TableRow[]);
}

export async function getHotVenues(): Promise<Venue[]> {
  if (!hasSupabase()) return VENUES_FALLBACK.filter((v) => v.hot);

  const supabase = await getSupabase();
  const { data: venueRows, error } = await supabase
    .from("venues")
    .select("*")
    .eq("active", true)
    .eq("hot", true)
    .order("name");

  if (error || !venueRows) return VENUES_FALLBACK.filter((v) => v.hot);

  const venueIds = venueRows.map((v: VenueRow) => v.id);
  const { data: tableRows } = await supabase
    .from("venue_tables")
    .select("*")
    .in("venue_id", venueIds)
    .order("sort_order");

  return venueRows.map((row: VenueRow) =>
    rowToVenue(row, (tableRows ?? []) as TableRow[])
  );
}

export async function getVenuesByNeighborhoodAsync(neighborhood: string): Promise<Venue[]> {
  if (!hasSupabase()) {
    return VENUES_FALLBACK.filter((v) =>
      v.neighborhood.toLowerCase().includes(neighborhood.toLowerCase())
    );
  }

  const supabase = await getSupabase();
  const { data: venueRows, error } = await supabase
    .from("venues")
    .select("*")
    .eq("active", true)
    .ilike("neighborhood", `%${neighborhood}%`)
    .order("name");

  if (error || !venueRows) {
    return VENUES_FALLBACK.filter((v) =>
      v.neighborhood.toLowerCase().includes(neighborhood.toLowerCase())
    );
  }

  const venueIds = venueRows.map((v: VenueRow) => v.id);
  const { data: tableRows } = await supabase
    .from("venue_tables")
    .select("*")
    .in("venue_id", venueIds)
    .order("sort_order");

  return venueRows.map((row: VenueRow) =>
    rowToVenue(row, (tableRows ?? []) as TableRow[])
  );
}

export async function getVenuesByCategoryAsync(category: string): Promise<Venue[]> {
  if (!hasSupabase()) return VENUES_FALLBACK.filter((v) => v.category === category);

  const supabase = await getSupabase();
  const { data: venueRows, error } = await supabase
    .from("venues")
    .select("*")
    .eq("active", true)
    .eq("category", category)
    .order("name");

  if (error || !venueRows) return VENUES_FALLBACK.filter((v) => v.category === category);

  const venueIds = venueRows.map((v: VenueRow) => v.id);
  const { data: tableRows } = await supabase
    .from("venue_tables")
    .select("*")
    .in("venue_id", venueIds)
    .order("sort_order");

  return venueRows.map((row: VenueRow) =>
    rowToVenue(row, (tableRows ?? []) as TableRow[])
  );
}

export async function getTablesForVenueAsync(venueId: string): Promise<TableOption[]> {
  if (!hasSupabase()) {
    const venue = VENUES_FALLBACK.find((v) => v.id === venueId);
    return venue?.tables ?? [];
  }

  const supabase = await getSupabase();
  const { data: tableRows, error } = await supabase
    .from("venue_tables")
    .select("*")
    .eq("venue_id", venueId)
    .order("sort_order");

  if (error || !tableRows) {
    const venue = VENUES_FALLBACK.find((v) => v.id === venueId);
    return venue?.tables ?? [];
  }

  return (tableRows as TableRow[]).map(tableRowToOption);
}

export async function formatVenuesForPromptAsync(): Promise<string> {
  const venues = await getActiveVenues();
  return venues.map((v) => {
    const lines = [
      `### ${v.name} (${v.id})`,
      `Category: ${v.category} | Neighborhood: ${v.neighborhood} | Price: ${v.priceRange}`,
      `Address: ${v.address}`,
      `Hours: ${v.hours}`,
      `Description: ${v.description}`,
      `Vibe: ${v.vibe.join(", ")}`,
      `Best for: ${(v.bestFor || []).join(", ")}`,
    ];
    if (v.dressCode) lines.push(`Dress code: ${v.dressCode}`);
    if (v.minimums) lines.push(`Minimums: ${v.minimums}`);
    if (v.bottleServiceRange) lines.push(`Bottle service: ${v.bottleServiceRange}`);
    if (v.notes) lines.push(`Notes: ${v.notes}`);
    return lines.join("\n");
  }).join("\n\n");
}

export async function createVenue(
  data: Omit<Venue, "tables"> & { tables?: TableOption[] }
): Promise<Venue> {
  const tables = data.tables ?? [];

  if (hasSupabase()) {
    const supabase = await getSupabase();
    const { error } = await supabase.from("venues").insert({
      id: data.id,
      name: data.name,
      category: data.category || null,
      type: data.type,
      neighborhood: data.neighborhood,
      address: data.address,
      gradient: data.gradient,
      description: data.description,
      vibe: JSON.stringify(data.vibe),
      price_range: data.priceRange,
      hours: data.hours,
      dress_code: data.dressCode || null,
      minimums: data.minimums || null,
      bottle_service_range: data.bottleServiceRange || null,
      best_for: JSON.stringify(data.bestFor || []),
      notes: data.notes || null,
      bottle_min: data.bottleMin,
      table_capacity: data.tableCapacity,
      phone: data.phone,
      reviews: JSON.stringify(data.reviews),
      hot: data.hot || false,
      active: true,
      submission_id: null,
      image_url: data.imageUrl || null,
    });
    if (error) throw new Error(`Failed to create venue: ${error.message}`);

    if (tables.length > 0) {
      const tableInserts = tables.map((t, i) => ({
        id: t.id,
        venue_id: data.id,
        name: t.name,
        description: t.description,
        location: t.location,
        capacity_min: t.capacity.min,
        capacity_max: t.capacity.max,
        minimum_spend: t.minimumSpend,
        available: t.available,
        sort_order: i,
      }));
      const { error: tableError } = await supabase.from("venue_tables").insert(tableInserts);
      if (tableError) throw new Error(`Failed to create venue tables: ${tableError.message}`);
    }
  }

  return { ...data, tables };
}

export async function updateVenue(
  id: string,
  updates: Partial<{
    name: string;
    category: string;
    type: string;
    neighborhood: string;
    address: string;
    gradient: string;
    description: string;
    vibe: string[];
    priceRange: string;
    hours: string;
    dressCode: string;
    minimums: string;
    bottleServiceRange: string;
    bestFor: string[];
    notes: string;
    bottleMin: number;
    tableCapacity: string;
    phone: string;
    reviews: { author: string; text: string; rating: number }[];
    hot: boolean;
    active: boolean;
    imageUrl: string;
  }>
): Promise<Venue | null> {
  if (!hasSupabase()) return null;

  const supabase = await getSupabase();
  const dbUpdates: Record<string, unknown> = {};

  if (updates.name !== undefined) dbUpdates.name = updates.name;
  if (updates.category !== undefined) dbUpdates.category = updates.category;
  if (updates.type !== undefined) dbUpdates.type = updates.type;
  if (updates.neighborhood !== undefined) dbUpdates.neighborhood = updates.neighborhood;
  if (updates.address !== undefined) dbUpdates.address = updates.address;
  if (updates.gradient !== undefined) dbUpdates.gradient = updates.gradient;
  if (updates.description !== undefined) dbUpdates.description = updates.description;
  if (updates.vibe !== undefined) dbUpdates.vibe = JSON.stringify(updates.vibe);
  if (updates.priceRange !== undefined) dbUpdates.price_range = updates.priceRange;
  if (updates.hours !== undefined) dbUpdates.hours = updates.hours;
  if (updates.dressCode !== undefined) dbUpdates.dress_code = updates.dressCode;
  if (updates.minimums !== undefined) dbUpdates.minimums = updates.minimums;
  if (updates.bottleServiceRange !== undefined) dbUpdates.bottle_service_range = updates.bottleServiceRange;
  if (updates.bestFor !== undefined) dbUpdates.best_for = JSON.stringify(updates.bestFor);
  if (updates.notes !== undefined) dbUpdates.notes = updates.notes;
  if (updates.bottleMin !== undefined) dbUpdates.bottle_min = updates.bottleMin;
  if (updates.tableCapacity !== undefined) dbUpdates.table_capacity = updates.tableCapacity;
  if (updates.phone !== undefined) dbUpdates.phone = updates.phone;
  if (updates.reviews !== undefined) dbUpdates.reviews = JSON.stringify(updates.reviews);
  if (updates.hot !== undefined) dbUpdates.hot = updates.hot;
  if (updates.active !== undefined) dbUpdates.active = updates.active;
  if (updates.imageUrl !== undefined) dbUpdates.image_url = updates.imageUrl;

  dbUpdates.updated_at = new Date().toISOString();

  const { data: row, error } = await supabase
    .from("venues")
    .update(dbUpdates)
    .eq("id", id)
    .select()
    .single();

  if (error || !row) return null;

  const { data: tableRows } = await supabase
    .from("venue_tables")
    .select("*")
    .eq("venue_id", id)
    .order("sort_order");

  return rowToVenue(row as VenueRow, (tableRows ?? []) as TableRow[]);
}

export async function deleteVenue(id: string): Promise<boolean> {
  if (!hasSupabase()) return false;

  const supabase = await getSupabase();
  const { error } = await supabase.from("venues").delete().eq("id", id);
  return !error;
}

export async function getAllVenuesAdmin(): Promise<Venue[]> {
  if (!hasSupabase()) return VENUES_FALLBACK;

  const supabase = await getSupabase();
  const { data: venueRows, error } = await supabase
    .from("venues")
    .select("*")
    .order("name");

  if (error || !venueRows) return VENUES_FALLBACK;

  const venueIds = venueRows.map((v: VenueRow) => v.id);
  const { data: tableRows } = await supabase
    .from("venue_tables")
    .select("*")
    .in("venue_id", venueIds)
    .order("sort_order");

  return venueRows.map((row: VenueRow) =>
    rowToVenue(row, (tableRows ?? []) as TableRow[])
  );
}
