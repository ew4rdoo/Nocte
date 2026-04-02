import { createBooking } from "@/lib/bookings";
import { getVenueById } from "@/lib/venues";

export async function POST(request: Request) {
  const body = await request.json();
  const { venueId, tableId, date, partySize, guestName, guestPhone, guestEmail, specialRequests } = body;

  if (!venueId || !tableId || !date || !partySize || !guestName || !guestPhone || !guestEmail) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  const venue = getVenueById(venueId);
  if (!venue) {
    return Response.json({ error: "Venue not found" }, { status: 404 });
  }

  const table = venue.tables?.find((t) => t.id === tableId);
  if (!table) {
    return Response.json({ error: "Table option not found" }, { status: 404 });
  }

  if (partySize < table.capacity.min || partySize > table.capacity.max) {
    return Response.json(
      { error: `Party size must be between ${table.capacity.min} and ${table.capacity.max}` },
      { status: 400 }
    );
  }

  const booking = createBooking({
    venueId,
    venueName: venue.name,
    tableId,
    tableName: table.name,
    date,
    partySize,
    guestName,
    guestPhone,
    guestEmail,
    specialRequests,
    totalMinimum: table.minimumSpend,
  });

  return Response.json({ booking }, { status: 201 });
}
