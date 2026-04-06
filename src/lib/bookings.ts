export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export type Booking = {
  id: string;
  venue_id: string;
  venue_name: string;
  table_id: string;
  table_name: string;
  date: string;
  party_size: number;
  guest_name: string;
  guest_phone: string;
  guest_email: string;
  special_requests?: string;
  status: BookingStatus;
  total_minimum: number;
  created_at: string;
};

function generateId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "NCT-";
  for (let i = 0; i < 6; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

function hasSupabase(): boolean {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

async function getSupabase() {
  const { supabase } = await import("./supabase");
  return supabase;
}

// In-memory fallback for local dev without Supabase
const memoryStore = new Map<string, Booking>();

export async function createBooking(
  data: Omit<Booking, "id" | "status" | "created_at">
): Promise<Booking> {
  const booking: Booking = {
    ...data,
    id: generateId(),
    status: "pending",
    created_at: new Date().toISOString(),
  };

  if (hasSupabase()) {
    const supabase = await getSupabase();
    const { error } = await supabase.from("bookings").insert(booking);
    if (error) throw new Error(`Failed to create booking: ${error.message}`);
  } else {
    memoryStore.set(booking.id, booking);
  }

  return booking;
}

export async function getBooking(id: string): Promise<Booking | null> {
  if (hasSupabase()) {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", id)
      .single();
    if (error || !data) return null;
    return data as Booking;
  }
  return memoryStore.get(id) ?? null;
}

export async function listBookings(filters?: {
  status?: BookingStatus;
  date?: string;
}): Promise<Booking[]> {
  if (hasSupabase()) {
    const supabase = await getSupabase();
    let query = supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (filters?.status) query = query.eq("status", filters.status);
    if (filters?.date) query = query.eq("date", filters.date);

    const { data, error } = await query;
    if (error) throw new Error(`Failed to list bookings: ${error.message}`);
    return (data ?? []) as Booking[];
  }

  const all = Array.from(memoryStore.values()).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  if (filters?.status) return all.filter((b) => b.status === filters.status);
  if (filters?.date) return all.filter((b) => b.date === filters.date);
  return all;
}

export async function updateBookingStatus(
  id: string,
  status: BookingStatus
): Promise<Booking | null> {
  if (hasSupabase()) {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id)
      .select()
      .single();
    if (error || !data) return null;
    return data as Booking;
  }

  const booking = memoryStore.get(id);
  if (!booking) return null;
  booking.status = status;
  return booking;
}

export async function deleteBooking(id: string): Promise<boolean> {
  if (hasSupabase()) {
    const supabase = await getSupabase();
    const { error } = await supabase.from("bookings").delete().eq("id", id);
    return !error;
  }
  return memoryStore.delete(id);
}
