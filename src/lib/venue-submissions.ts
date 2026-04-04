export type VenueSubmissionStatus = "new" | "reviewing" | "approved" | "declined";

export type SubmittedTable = {
  name: string;
  location: string;
  description: string;
  capacity_min: number;
  capacity_max: number;
  minimum_spend: number;
};

export type VenueSubmission = {
  id: string;
  // Venue basics
  venue_name: string;
  venue_type: string;
  neighborhood: string;
  address: string;
  capacity: string;
  // Atmosphere
  description: string;
  vibe: string[];
  price_range: "$" | "$$" | "$$$" | "$$$$";
  hours: string;
  dress_code: string;
  // Tables
  tables: SubmittedTable[];
  // Contact
  contact_name: string;
  contact_role: string;
  contact_email: string;
  contact_phone: string;
  website?: string;
  instagram?: string;
  notes?: string;
  // Meta
  status: VenueSubmissionStatus;
  created_at: string;
};

function generateId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "VNU-";
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

const memoryStore = new Map<string, VenueSubmission>();

export async function createVenueSubmission(
  data: Omit<VenueSubmission, "id" | "status" | "created_at">
): Promise<VenueSubmission> {
  const submission: VenueSubmission = {
    ...data,
    id: generateId(),
    status: "new",
    created_at: new Date().toISOString(),
  };

  if (hasSupabase()) {
    const supabase = await getSupabase();
    const { error } = await supabase.from("venue_submissions").insert({
      ...submission,
      vibe: JSON.stringify(submission.vibe),
      tables: JSON.stringify(submission.tables),
    });
    if (error) throw new Error(`Failed to create submission: ${error.message}`);
  } else {
    memoryStore.set(submission.id, submission);
  }

  return submission;
}

export async function listVenueSubmissions(filters?: {
  status?: VenueSubmissionStatus;
}): Promise<VenueSubmission[]> {
  if (hasSupabase()) {
    const supabase = await getSupabase();
    let query = supabase
      .from("venue_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (filters?.status) query = query.eq("status", filters.status);

    const { data, error } = await query;
    if (error) throw new Error(`Failed to list submissions: ${error.message}`);
    return ((data ?? []) as Record<string, unknown>[]).map((row) => ({
      ...row,
      vibe: typeof row.vibe === "string" ? JSON.parse(row.vibe as string) : row.vibe,
      tables: typeof row.tables === "string" ? JSON.parse(row.tables as string) : row.tables,
    })) as VenueSubmission[];
  }

  const all = Array.from(memoryStore.values()).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  if (filters?.status) return all.filter((s) => s.status === filters.status);
  return all;
}

export async function getVenueSubmission(id: string): Promise<VenueSubmission | null> {
  if (hasSupabase()) {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from("venue_submissions")
      .select("*")
      .eq("id", id)
      .single();
    if (error || !data) return null;
    const row = data as Record<string, unknown>;
    return {
      ...row,
      vibe: typeof row.vibe === "string" ? JSON.parse(row.vibe as string) : row.vibe,
      tables: typeof row.tables === "string" ? JSON.parse(row.tables as string) : row.tables,
    } as VenueSubmission;
  }

  return memoryStore.get(id) ?? null;
}

export async function updateVenueSubmissionStatus(
  id: string,
  status: VenueSubmissionStatus
): Promise<VenueSubmission | null> {
  if (hasSupabase()) {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from("venue_submissions")
      .update({ status })
      .eq("id", id)
      .select()
      .single();
    if (error || !data) return null;
    const row = data as Record<string, unknown>;
    return {
      ...row,
      vibe: typeof row.vibe === "string" ? JSON.parse(row.vibe as string) : row.vibe,
      tables: typeof row.tables === "string" ? JSON.parse(row.tables as string) : row.tables,
    } as VenueSubmission;
  }

  const sub = memoryStore.get(id);
  if (!sub) return null;
  sub.status = status;
  return sub;
}
