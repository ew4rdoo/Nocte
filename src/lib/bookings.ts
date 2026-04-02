export type BookingStatus = "pending" | "confirmed" | "cancelled";

export type Booking = {
  id: string;
  venueId: string;
  venueName: string;
  tableId: string;
  tableName: string;
  date: string;
  partySize: number;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  specialRequests?: string;
  status: BookingStatus;
  totalMinimum: number;
  createdAt: string;
};

const bookings = new Map<string, Booking>();

function generateId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "NCT-";
  for (let i = 0; i < 6; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

export function createBooking(
  data: Omit<Booking, "id" | "status" | "createdAt">
): Booking {
  const booking: Booking = {
    ...data,
    id: generateId(),
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };
  bookings.set(booking.id, booking);
  return booking;
}

export function getBooking(id: string): Booking | undefined {
  return bookings.get(id);
}

export function listBookings(): Booking[] {
  return Array.from(bookings.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
