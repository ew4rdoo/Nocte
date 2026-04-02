import Anthropic from "@anthropic-ai/sdk";
import { formatVenuesForPrompt, VENUES, getVenueById } from "@/lib/venues";
import type { MessageParam, Tool, ToolResultBlockParam } from "@anthropic-ai/sdk/resources/messages";

const TOOLS: Tool[] = [
  {
    name: "search_venues",
    description:
      "Search for venues matching specific criteria. Use this when a user describes what they're looking for (vibe, neighborhood, group size, budget, type of experience). Returns matching venues with details.",
    input_schema: {
      type: "object" as const,
      properties: {
        vibe: {
          type: "string",
          description: "Desired vibe or mood (e.g., 'wild', 'intimate', 'upscale', 'chill')",
        },
        neighborhood: {
          type: "string",
          description: "Preferred area (e.g., 'South Beach', 'Brickell', 'Downtown', 'Wynwood', 'Design District')",
        },
        category: {
          type: "string",
          enum: ["club", "lounge", "rooftop", "dining", "beach", "bar"],
          description: "Type of venue",
        },
        max_price: {
          type: "string",
          enum: ["$", "$$", "$$$", "$$$$"],
          description: "Maximum price range",
        },
        party_size: {
          type: "number",
          description: "Number of guests in the party",
        },
      },
      required: [],
    },
  },
  {
    name: "get_venue_tables",
    description:
      "Get available table options for a specific venue. Use this when a user wants to book or asks about table options, minimums, or capacity at a specific venue.",
    input_schema: {
      type: "object" as const,
      properties: {
        venue_id: {
          type: "string",
          description: "The venue ID to look up tables for",
        },
      },
      required: ["venue_id"],
    },
  },
  {
    name: "create_booking_link",
    description:
      "Generate a direct booking link for a venue. Use this when a user is ready to book or when you want to make it easy for them to reserve. This creates a link they can tap to start the booking flow.",
    input_schema: {
      type: "object" as const,
      properties: {
        venue_id: {
          type: "string",
          description: "The venue to create a booking link for",
        },
      },
      required: ["venue_id"],
    },
  },
];

function executeSearchVenues(input: {
  vibe?: string;
  neighborhood?: string;
  category?: string;
  max_price?: string;
  party_size?: number;
}) {
  const priceOrder = ["$", "$$", "$$$", "$$$$"];
  const maxPriceIndex = input.max_price ? priceOrder.indexOf(input.max_price) : 3;

  const results = VENUES.filter((v) => {
    if (input.neighborhood && !v.neighborhood.toLowerCase().includes(input.neighborhood.toLowerCase())) return false;
    if (input.category && v.category !== input.category) return false;
    if (input.max_price && priceOrder.indexOf(v.priceRange) > maxPriceIndex) return false;
    if (input.vibe) {
      const vibeMatch = v.vibe.some((vb) => vb.toLowerCase().includes(input.vibe!.toLowerCase())) ||
        (v.bestFor || []).some((bf) => bf.toLowerCase().includes(input.vibe!.toLowerCase()));
      if (!vibeMatch) return false;
    }
    if (input.party_size && v.tables) {
      const hasTable = v.tables.some((t) => input.party_size! >= t.capacity.min && input.party_size! <= t.capacity.max);
      if (!hasTable) return false;
    }
    return true;
  });

  return results.map((v) => ({
    id: v.id,
    name: v.name,
    type: v.type,
    neighborhood: v.neighborhood,
    priceRange: v.priceRange,
    vibe: v.vibe,
    description: v.description,
    hours: v.hours,
    hot: v.hot,
    hasTableBooking: (v.tables?.length ?? 0) > 0,
    bottleMin: v.bottleMin,
  }));
}

function executeGetVenueTables(input: { venue_id: string }) {
  const venue = getVenueById(input.venue_id);
  if (!venue) return { error: "Venue not found" };

  return {
    venue: venue.name,
    venueId: venue.id,
    tables: (venue.tables ?? []).map((t) => ({
      id: t.id,
      name: t.name,
      description: t.description,
      location: t.location,
      capacity: `${t.capacity.min}–${t.capacity.max} guests`,
      minimumSpend: t.minimumSpend > 0 ? `$${t.minimumSpend.toLocaleString()}` : "No minimum",
      available: t.available,
    })),
    dressCode: venue.dressCode,
    hours: venue.hours,
  };
}

function executeCreateBookingLink(input: { venue_id: string }) {
  const venue = getVenueById(input.venue_id);
  if (!venue) return { error: "Venue not found" };

  const hasTables = venue.tables && venue.tables.length > 0;
  return {
    venue_name: venue.name,
    venue_id: venue.id,
    booking_url: hasTables ? `/venues/${venue.id}/book` : null,
    message: hasTables
      ? `Booking link ready for ${venue.name}. The guest can tap it to pick their date, table, and complete the reservation.`
      : `${venue.name} doesn't have direct table booking yet. The concierge can handle this reservation personally.`,
  };
}

function executeTool(name: string, input: Record<string, unknown>) {
  switch (name) {
    case "search_venues":
      return executeSearchVenues(input as Parameters<typeof executeSearchVenues>[0]);
    case "get_venue_tables":
      return executeGetVenueTables(input as Parameters<typeof executeGetVenueTables>[0]);
    case "create_booking_link":
      return executeCreateBookingLink(input as Parameters<typeof executeCreateBookingLink>[0]);
    default:
      return { error: "Unknown tool" };
  }
}

function buildSystemPrompt(): string {
  return `You are Noctē — the personal concierge for Miami's most discerning nightlife experiences. You are not a chatbot. You are a trusted, well-connected friend who knows every room, every host, and every table in the city.

Your personality:
- Warm and personal, never corporate or transactional
- Confident and decisive — you give real recommendations, not hedged lists
- Attentive: you remember everything shared in the conversation
- Discreet and trustworthy
- Occasionally playful, always tasteful

Your role:
- Help users plan evenings tailored to their vibe, group size, budget, and neighborhood
- Handle table bookings, guest list access, and VIP arrangements
- Extend beyond nightlife: yacht charters, luxury cars, hotel suites, private jets, restaurant reservations
- Plan complete Miami weekends end-to-end when asked
- Be especially attentive to safety and comfort — this is non-negotiable for all guests

## Venue Directory

${formatVenuesForPrompt()}

## Tools

You have tools to search venues, check table availability, and create booking links. USE THEM:
- When a user describes what they want → use search_venues to find matches
- When discussing a specific venue's tables → use get_venue_tables
- When a user is ready to book or you're making a strong recommendation → use create_booking_link to give them a direct link
- After using create_booking_link, tell the user to tap the link to complete their reservation

## Using venue data

- Reference specific details (hours, minimums, dress code, vibe) when relevant — it builds trust
- When recommending, match the venue's "bestFor" and "vibe" fields to what the user is describing
- For booking inquiries, quote the minimums and use get_venue_tables for specific options
- Venue IDs are internal — never show raw IDs to the user

Response style:
- Keep messages conversational and human — 2 to 5 sentences typically
- Ask one clarifying question at a time when you need more info (group size, vibe, neighborhood preference, budget)
- When you have enough to recommend, commit to a specific suggestion with confidence
- For full evening planning, structure it naturally: arrival → dinner → first bar → club if applicable
- Never bullet-point unless listing multiple venue options side by side
- Sign off warmly, not with "Is there anything else I can help you with"

You are Noctē. Respond as Noctē. Never break character or mention AI.`;
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response("Invalid messages", { status: 400 });
    }

    const client = new Anthropic();
    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          let currentMessages: MessageParam[] = [...messages];
          let loops = 0;
          const maxLoops = 5;

          while (loops < maxLoops) {
            loops++;

            const stream = client.messages.stream({
              model: "claude-opus-4-6",
              max_tokens: 1024,
              system: buildSystemPrompt(),
              messages: currentMessages,
              tools: TOOLS,
            });

            let hasToolUse = false;
            const toolUseBlocks: { id: string; name: string; input: string }[] = [];
            let currentToolId = "";
            let currentToolName = "";
            let currentToolInput = "";

            for await (const event of stream) {
              if (event.type === "content_block_start") {
                if (event.content_block.type === "text") {
                  // text block starting
                } else if (event.content_block.type === "tool_use") {
                  hasToolUse = true;
                  currentToolId = event.content_block.id;
                  currentToolName = event.content_block.name;
                  currentToolInput = "";
                }
              } else if (event.type === "content_block_delta") {
                if (event.delta.type === "text_delta") {
                  controller.enqueue(
                    encoder.encode(`data: ${JSON.stringify({ type: "text", content: event.delta.text })}\n\n`)
                  );
                } else if (event.delta.type === "input_json_delta") {
                  currentToolInput += event.delta.partial_json;
                }
              } else if (event.type === "content_block_stop") {
                if (currentToolId && currentToolName) {
                  toolUseBlocks.push({
                    id: currentToolId,
                    name: currentToolName,
                    input: currentToolInput,
                  });
                  currentToolId = "";
                  currentToolName = "";
                  currentToolInput = "";
                }
              }
            }

            if (!hasToolUse) break;

            // Execute tools and build tool results
            const toolResults: ToolResultBlockParam[] = [];
            for (const block of toolUseBlocks) {
              const input = JSON.parse(block.input || "{}");
              const result = executeTool(block.name, input);

              // Send structured data to client for rendering
              if (block.name === "search_venues" && Array.isArray(result)) {
                for (const venue of result.slice(0, 4)) {
                  controller.enqueue(
                    encoder.encode(`data: ${JSON.stringify({ type: "venue_card", venue })}\n\n`)
                  );
                }
              } else if (block.name === "create_booking_link") {
                const linkResult = result as ReturnType<typeof executeCreateBookingLink>;
                if (linkResult.booking_url) {
                  controller.enqueue(
                    encoder.encode(`data: ${JSON.stringify({
                      type: "booking_link",
                      venueId: linkResult.venue_id,
                      venueName: linkResult.venue_name,
                      url: linkResult.booking_url,
                    })}\n\n`)
                  );
                }
              }

              toolResults.push({
                type: "tool_result",
                tool_use_id: block.id,
                content: JSON.stringify(result),
              });
            }

            // Add assistant message with tool use + tool results for next loop
            const finalMessage = await stream.finalMessage();
            currentMessages = [
              ...currentMessages,
              { role: "assistant", content: finalMessage.content },
              { role: "user", content: toolResults },
            ];
          }

          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "done" })}\n\n`));
          controller.close();
        } catch (err) {
          console.error("Stream error:", err);
          controller.error(err);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err) {
    console.error("Concierge API error:", err);
    return new Response("Something went wrong", { status: 500 });
  }
}
