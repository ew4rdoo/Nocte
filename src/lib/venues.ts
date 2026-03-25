export type Venue = {
  id: string;
  name: string;
  category: "club" | "lounge" | "rooftop" | "dining" | "beach" | "bar";
  neighborhood: string;
  address: string;
  description: string;
  vibe: string[];
  priceRange: "$" | "$$" | "$$$" | "$$$$";
  hours: string;
  dressCode?: string;
  minimums?: string;
  bottleServiceRange?: string;
  bestFor: string[];
  notes?: string;
};

export const VENUES: Venue[] = [
  {
    id: "liv",
    name: "LIV",
    category: "club",
    neighborhood: "South Beach",
    address: "4441 Collins Ave, Miami Beach",
    description:
      "Miami's flagship nightclub inside the Fontainebleau. World-class DJ residencies, massive production, and the most recognizable room in the city.",
    vibe: ["high-energy", "celebrity", "production"],
    priceRange: "$$$$",
    hours: "Fri–Sat 11pm–5am",
    dressCode: "Strict — upscale attire required, no athletic wear",
    minimums: "Tables from $2,000",
    bottleServiceRange: "$500–$50,000+",
    bestFor: ["special occasions", "big groups", "first-time visitors wanting the full Miami experience"],
    notes: "Book tables 2+ weeks in advance for weekends. Guest list fills fast — request early.",
  },
  {
    id: "e11even",
    name: "E11EVEN",
    category: "club",
    neighborhood: "Downtown",
    address: "29 NE 11th St, Miami",
    description:
      "The only 24-hour ultra lounge in Miami. Theatrical performances, multiple floors, and an energy that peaks at sunrise. Truly one of a kind.",
    vibe: ["theatrical", "non-stop", "eclectic"],
    priceRange: "$$$$",
    hours: "24 hours, peaks Fri–Sat midnight–6am",
    dressCode: "Upscale — fashion-forward encouraged",
    minimums: "Tables from $1,500",
    bottleServiceRange: "$400–$30,000+",
    bestFor: ["late-night continuation", "groups who want to go all night", "unique experiences"],
    notes: "Best after 2am when the energy shifts. Performers and acrobatics throughout the night.",
  },
  {
    id: "club-space",
    name: "Club Space",
    category: "club",
    neighborhood: "Downtown",
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
  },
  {
    id: "komodo",
    name: "Komodo",
    category: "dining",
    neighborhood: "Brickell",
    address: "801 Brickell Ave, Miami",
    description:
      "Three floors of Japanese-Latin fusion in the heart of Brickell. The biggest scene in the city on weekend nights — equal parts restaurant and nightlife destination.",
    vibe: ["see-and-be-seen", "upscale", "social"],
    priceRange: "$$$",
    hours: "Mon–Sun 5pm–2am",
    dressCode: "Smart casual to upscale",
    minimums: "None for dining; bar area is walk-in",
    bestFor: ["groups of 4–8", "pre-club dinner", "birthday dinners"],
    notes: "Weekend waits can be 2 hours without a reservation. Book online or through us. DJ starts at 10pm.",
  },
  {
    id: "gekko",
    name: "Gekko",
    category: "dining",
    neighborhood: "Brickell",
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
  },
  {
    id: "swan",
    name: "Swan",
    category: "dining",
    neighborhood: "Design District",
    address: "90 NE 39th St, Miami",
    description:
      "Pharrell Williams' Design District restaurant. Beautiful crowd, eclectic menu, and an energy that bridges dinner and nightlife. Celebrities are a regular sighting.",
    vibe: ["artsy", "celebrity", "beautiful"],
    priceRange: "$$$",
    hours: "Mon–Sun 6pm–1am",
    dressCode: "Fashion-forward, creative encouraged",
    bestFor: ["creative crowd", "Design District evening", "pre-Wynwood night"],
    notes: "The bar area often turns into a full party by 11pm. Great outdoor seating.",
  },
  {
    id: "sugar",
    name: "Sugar",
    category: "rooftop",
    neighborhood: "Brickell",
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
  },
  {
    id: "juvia",
    name: "Juvia",
    category: "rooftop",
    neighborhood: "South Beach",
    address: "1111 Lincoln Rd, Miami Beach",
    description:
      "Rooftop restaurant on Lincoln Road with ocean and city views. French-Peruvian-Japanese menu and one of the most scenic outdoor spaces in South Beach.",
    vibe: ["romantic", "scenic", "dinner-forward"],
    priceRange: "$$$",
    hours: "Mon–Sun 12pm–midnight",
    dressCode: "Resort chic to upscale",
    bestFor: ["romantic dinners", "visitors wanting views", "Sunday brunch"],
    notes: "Ocean views from the terrace are stunning at sunset. Reservations essential.",
  },
  {
    id: "kiki-on-the-river",
    name: "Kiki on the River",
    category: "dining",
    neighborhood: "Miami River",
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
  },
  {
    id: "nikki-beach",
    name: "Nikki Beach",
    category: "beach",
    neighborhood: "South Beach",
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
  },
  {
    id: "the-broken-shaker",
    name: "The Broken Shaker",
    category: "bar",
    neighborhood: "Wynwood",
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
  },
  {
    id: "mynt-lounge",
    name: "Mynt Lounge",
    category: "lounge",
    neighborhood: "South Beach",
    address: "1921 Collins Ave, Miami Beach",
    description:
      "Intimate South Beach lounge with a celebrity-heavy guest list. More exclusive and controlled than the mega-clubs — knows how to curate a room.",
    vibe: ["intimate", "celebrity", "exclusive"],
    priceRange: "$$$",
    hours: "Thu–Sat 11pm–5am",
    dressCode: "Upscale — strictly enforced",
    minimums: "Tables from $1,000",
    bestFor: ["smaller VIP groups", "celebrity sightings", "more intimate than LIV"],
    notes: "Guest list is selective. Table reservations give the most reliable entry.",
  },
  {
    id: "zuma",
    name: "Zuma",
    category: "dining",
    neighborhood: "Brickell",
    address: "270 Biscayne Blvd Way, Miami",
    description:
      "Contemporary Japanese robata restaurant on the waterfront. Excellent for groups — sharing plates, impressive sake list, and consistent quality.",
    vibe: ["upscale", "group-friendly", "waterfront"],
    priceRange: "$$$",
    hours: "Mon–Sun 12pm–midnight",
    dressCode: "Smart casual",
    bestFor: ["group dinners", "business dinners", "sushi lovers"],
    notes: "The robata grill items are exceptional. Ask for the river-view seating.",
  },
  {
    id: "naoe",
    name: "NAOE",
    category: "dining",
    neighborhood: "Brickell",
    address: "661 Brickell Key Dr, Miami",
    description:
      "Miami's most intimate omakase experience — 8 seats, Chef Kevin Cory, and a meal that requires weeks of patience to book. Truly exceptional.",
    vibe: ["intimate", "chef-driven", "special"],
    priceRange: "$$$$",
    hours: "Wed–Sat, seatings at 6pm and 8:30pm",
    dressCode: "Business casual to upscale",
    bestFor: ["serious food occasions", "proposals", "milestone dinners", "omakase lovers"],
    notes:
      "Only 8 seats. Reservation waitlist opens 6–8 weeks in advance. Considered one of the best restaurants in Florida.",
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
      `Best for: ${v.bestFor.join(", ")}`,
    ];
    if (v.dressCode) lines.push(`Dress code: ${v.dressCode}`);
    if (v.minimums) lines.push(`Minimums: ${v.minimums}`);
    if (v.bottleServiceRange) lines.push(`Bottle service: ${v.bottleServiceRange}`);
    if (v.notes) lines.push(`Notes: ${v.notes}`);
    return lines.join("\n");
  }).join("\n\n");
}
