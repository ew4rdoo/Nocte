export type PartnerApplicationStatus = "new" | "reviewing" | "approved" | "declined";

export type PartnerApplication = {
  id: string;
  venue_name: string;
  contact_name: string;
  contact_role: string;
  contact_email: string;
  contact_phone: string;
  venue_type: string;
  venue_address: string;
  neighborhood?: string;
  capacity?: string;
  current_booking_method?: string;
  website?: string;
  instagram?: string;
  notes?: string;
  status: PartnerApplicationStatus;
  created_at: string;
};

function generateId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "PTR-";
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

const memoryStore = new Map<string, PartnerApplication>();

export async function createPartnerApplication(
  data: Omit<PartnerApplication, "id" | "status" | "created_at">
): Promise<PartnerApplication> {
  const app: PartnerApplication = {
    ...data,
    id: generateId(),
    status: "new",
    created_at: new Date().toISOString(),
  };

  if (hasSupabase()) {
    const supabase = await getSupabase();
    const { error } = await supabase.from("partner_applications").insert(app);
    if (error) throw new Error(`Failed to create application: ${error.message}`);
  } else {
    memoryStore.set(app.id, app);
  }

  return app;
}

export async function listPartnerApplications(filters?: {
  status?: PartnerApplicationStatus;
}): Promise<PartnerApplication[]> {
  if (hasSupabase()) {
    const supabase = await getSupabase();
    let query = supabase
      .from("partner_applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (filters?.status) query = query.eq("status", filters.status);

    const { data, error } = await query;
    if (error) throw new Error(`Failed to list applications: ${error.message}`);
    return (data ?? []) as PartnerApplication[];
  }

  const all = Array.from(memoryStore.values()).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  if (filters?.status) return all.filter((a) => a.status === filters.status);
  return all;
}

export async function updatePartnerApplicationStatus(
  id: string,
  status: PartnerApplicationStatus
): Promise<PartnerApplication | null> {
  if (hasSupabase()) {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from("partner_applications")
      .update({ status })
      .eq("id", id)
      .select()
      .single();
    if (error || !data) return null;
    return data as PartnerApplication;
  }

  const app = memoryStore.get(id);
  if (!app) return null;
  app.status = status;
  return app;
}
