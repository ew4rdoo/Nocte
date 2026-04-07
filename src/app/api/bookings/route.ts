import { createBooking, listBookings } from "@/lib/bookings";
import { getVenueByIdAsync } from "@/lib/venues";
import { sendBookingNotifications } from "@/lib/email";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const status = url.searchParams.get("status") as "pending" | "confirmed" | "completed" | "cancelled" | null;
  const date = url.searchParams.get("date");

  const bookings = await listBookings({
    status: status ?? undefined,
    date: date ?? undefined,
  });

  return Response.json({ bookings });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { venueId, tableId, date, partySize, guestName, guestPhone, guestEmail, specialRequests } = body;

  if (!venueId || !tableId || !date || !partySize || !guestName || !guestPhone || !guestEmail) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  const venue = await getVenueByIdAsync(venueId);
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

  try {
    const booking = await createBooking({
      venue_id: venueId,
      venue_name: venue.name,
      table_id: tableId,
      table_name: table.name,
      date,
      party_size: partySize,
      guest_name: guestName,
      guest_phone: guestPhone,
      guest_email: guestEmail,
      special_requests: specialRequests,
      total_minimum: table.minimumSpend,
    });

    // Send notifications (fire and forget — don't block the response)
    sendBookingNotifications(booking).catch((err) =>
      console.error("Email notification error:", err)
    );

    return Response.json({ booking }, { status: 201 });
  } catch (err) {
    console.error("Booking creation error:", err);
    return Response.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
