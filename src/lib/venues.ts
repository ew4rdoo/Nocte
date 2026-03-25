export type Venue = {
  id: string;
  name: string;
  type: string;
  neighborhood: string;
  gradient: string;
  priceRange: "$" | "$$" | "$$$" | "$$$$";
  vibe: string[];
  hours: string;
  description: string;
  bottleMin: number;
  tableCapacity: string;
  phone: string;
  address: string;
  reviews: { author: string; text: string; rating: number }[];
  hot?: boolean;
};

export const VENUES: Venue[] = [
  {
    id: "liv",
    name: "LIV",
    type: "Nightclub",
    neighborhood: "South Beach",
    gradient: "linear-gradient(160deg, #2d0a1a 0%, #0a0506 100%)",
    priceRange: "$$$$",
    vibe: ["Wild", "Electric", "Celebrity"],
    hours: "11pm – 6am (Fri–Sun)",
    description:
      "The undisputed king of Miami nightlife. LIV at Fontainebleau is where the world's biggest DJs and A-list celebrities collide in a 18,000 sq ft temple of sound and light. Getting in requires connections — or a concierge who has them.",
    bottleMin: 2500,
    tableCapacity: "4–10 guests",
    phone: "+1 (305) 674-4680",
    address: "4441 Collins Ave, Miami Beach, FL 33140",
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
    type: "Ultra Lounge",
    neighborhood: "Downtown",
    gradient: "linear-gradient(160deg, #0a1020 0%, #050508 100%)",
    priceRange: "$$$$",
    vibe: ["24-Hour", "Electric", "Wild"],
    hours: "24 hours, 7 days",
    description:
      "Miami's only 24-hour ultraclub. E11EVEN blurs the line between nightclub, cabaret, and live performance venue. When the sun rises, the party is just getting started.",
    bottleMin: 1500,
    tableCapacity: "4–8 guests",
    phone: "+1 (305) 829-2911",
    address: "29 NE 11th St, Miami, FL 33132",
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
    id: "komodo",
    name: "KOMODO",
    type: "Japanese-Latin Fusion",
    neighborhood: "Brickell",
    gradient: "linear-gradient(160deg, #1a0b2e 0%, #0d0614 45%, #050505 100%)",
    priceRange: "$$$",
    vibe: ["Upscale", "Social", "Trendy"],
    hours: "6pm – 2am (Daily)",
    description:
      "Brickell's most glamorous multi-level dining and nightlife destination. Three floors of Japanese-Latin fusion cuisine flow into one of the city's most electric bar scenes. The rooftop is where deals are made and memories are forged.",
    bottleMin: 800,
    tableCapacity: "2–12 guests",
    phone: "+1 (305) 534-2211",
    address: "801 Brickell Ave, Miami, FL 33131",
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
    id: "mynt",
    name: "MYNT",
    type: "Lounge",
    neighborhood: "South Beach",
    gradient: "linear-gradient(160deg, #0a200f 0%, #050a06 100%)",
    priceRange: "$$$",
    vibe: ["Intimate", "Celebrity", "Upscale"],
    hours: "11pm – 5am (Thu–Sun)",
    description:
      "An intimate celebrity hideaway on South Beach. MYNT's legendary Thursday nights have launched careers and sparked legends. Discrete, exclusive, and impossibly cool.",
    bottleMin: 1200,
    tableCapacity: "4–6 guests",
    phone: "+1 (305) 532-0727",
    address: "1921 Collins Ave, Miami Beach, FL 33139",
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
    id: "naoe",
    name: "NAOE",
    type: "Omakase",
    neighborhood: "Brickell",
    gradient: "linear-gradient(160deg, #1e1005 0%, #080504 100%)",
    priceRange: "$$$$",
    vibe: ["Quiet", "Refined", "Intimate"],
    hours: "6pm – 10pm (Tue–Sat)",
    description:
      "Eight seats. One chef. Miami's most coveted dinner reservation. NAOE is the anti-club — a sanctuary of restraint and mastery where the fish arrives daily from Japan and the sake list is longer than most restaurants' menus.",
    bottleMin: 0,
    tableCapacity: "Up to 8 guests",
    phone: "+1 (305) 947-6263",
    address: "661 Brickell Key Dr, Miami, FL 33131",
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
    id: "swan",
    name: "SWAN",
    type: "Restaurant & Bar",
    neighborhood: "Design District",
    gradient: "linear-gradient(160deg, #1a0a0a 0%, #080404 100%)",
    priceRange: "$$$",
    vibe: ["Trendy", "Social", "Fashionable"],
    hours: "6pm – 2am (Daily)",
    description:
      "The Design District's glamour epicenter. SWAN by Pharrell Williams is where Miami's fashion crowd convenes over European-inspired cuisine and artful cocktails. The people-watching alone is worth the reservation.",
    bottleMin: 500,
    tableCapacity: "2–8 guests",
    phone: "+1 (305) 942-7926",
    address: "90 NE 39th St, Miami, FL 33137",
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
    id: "papi-steak",
    name: "PAPI STEAK",
    type: "Steakhouse",
    neighborhood: "South Beach",
    gradient: "linear-gradient(160deg, #200808 0%, #090303 100%)",
    priceRange: "$$$$",
    vibe: ["Upscale", "Social", "Electric"],
    hours: "6pm – 2am (Daily)",
    description:
      "Where Art Basel energy meets prime cut perfection. Papi Steak has redefined the Miami steakhouse — theatrical tableside presentations, impossibly tender wagyu, and a room that buzzes with the city's movers and shakers.",
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
    type: "Bar",
    neighborhood: "Downtown",
    gradient: "linear-gradient(160deg, #080c1a 0%, #030508 100%)",
    priceRange: "$$",
    vibe: ["Chill", "Intimate", "Local"],
    hours: "6pm – 3am (Daily)",
    description:
      "Downtown's best-kept secret. Floyd is an intimate dive bar elevated — exceptional natural wines, craft cocktails, and a sound system playing vinyl that reminds you music is still sacred. No velvet ropes, no pretense.",
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
