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
};

export const VENUES: Venue[] = [
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
  },
];

export function getVenueById(id: string): Venue | undefined {
  return VENUES.find((v) => v.id === id);
}

export function getVenuesByNeighborhood(neighborhood: string): Venue[] {
  return VENUES.filter((v) =>
    v.neighborhood.toLowerCase().includes(neighborhood.toLowerCase())
  );
}

export function getVenuesByCategory(category: Venue["category"]): Venue[] {
  return VENUES.filter((v) => v.category === category);
}

export function formatVenuesForPrompt(): string {
  return VENUES.map((v) => {
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
