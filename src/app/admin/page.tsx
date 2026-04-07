"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/app/_components/AuthProvider";
import { useRouter } from "next/navigation";

const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || "edwardboss454@gmail.com").split(",").map((e) => e.trim().toLowerCase());

type Booking = {
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
  status: string;
  total_minimum: number;
  created_at: string;
};

type PartnerApp = {
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
  status: string;
  created_at: string;
};

type ServiceInfo =
  | { category: "club"; vip_tables: number; standard_tables: number; min_spend_low: number; min_spend_high: number; has_outdoor: boolean; has_mezzanine: boolean; has_dj_adjacent: boolean; floor_plan_upload: boolean }
  | { category: "restaurant"; seating_capacity: number; max_party_size: number; has_private_dining: boolean; private_dining_capacity: string; time_slots: string[]; has_prix_fixe: boolean }
  | { category: "rooftop"; bottle_table_count: number; min_spend_low: number; min_spend_high: number; general_seating: number; sections: string[] };

type VenueSubmission = {
  id: string;
  venue_name: string;
  venue_type: string;
  neighborhood: string;
  address: string;
  capacity: string;
  description: string;
  vibe: string[];
  price_range: string;
  hours: string;
  dress_code: string;
  service_info: ServiceInfo;
  contact_name: string;
  contact_role: string;
  contact_email: string;
  contact_phone: string;
  website?: string;
  instagram?: string;
  notes?: string;
  status: string;
  created_at: string;
};

type AdminVenue = {
  id: string;
  name: string;
  type: string;
  neighborhood: string;
  category?: string;
  hot?: boolean;
  active?: boolean;
  priceRange: string;
};

type Tab = "bookings" | "partners" | "onboarding" | "venues";

const STATUS_COLORS: Record<string, string> = {
  pending: "text-yellow-400 border-yellow-400/30",
  confirmed: "text-nocte-gold border-nocte-gold/30",
  completed: "text-green-400 border-green-400/30",
  cancelled: "text-red-400 border-red-400/30",
  new: "text-blue-400 border-blue-400/30",
  reviewing: "text-yellow-400 border-yellow-400/30",
  approved: "text-green-400 border-green-400/30",
  declined: "text-red-400 border-red-400/30",
};

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("bookings");
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/sign-in?redirect=/admin");
    }
    if (!loading && user && !ADMIN_EMAILS.includes(user.email?.toLowerCase() || "")) {
      router.push("/");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-nocte-black text-nocte-cream flex items-center justify-center">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-nocte-gold animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 bg-nocte-gold animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 bg-nocte-gold animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    );
  }

  if (!user || !ADMIN_EMAILS.includes(user.email?.toLowerCase() || "")) {
    return null;
  }

  return (
    <div
      className="min-h-screen bg-nocte-black text-nocte-cream"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 64px)" }}
    >
      {/* Header */}
      <div className="px-6 pt-16 pb-4 border-b border-nocte-border">
        <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-2">
          Management
        </p>
        <h1 className="font-display text-4xl font-light text-nocte-cream mb-4">
          Admin
        </h1>
        <div className="flex gap-0">
          {(["bookings", "partners", "onboarding", "venues"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`font-sans text-[10px] tracking-[0.2em] uppercase px-4 py-2.5 border-b-2 transition-all duration-200 ${
                tab === t
                  ? "border-nocte-gold text-nocte-gold"
                  : "border-transparent text-nocte-muted hover:text-nocte-cream"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {tab === "bookings" && <BookingsTab />}
      {tab === "partners" && <PartnersTab />}
      {tab === "onboarding" && <OnboardingTab />}
      {tab === "venues" && <VenuesTab />}
    </div>
  );
}

// ─── Bookings Tab ───

const BOOKING_STATUSES = ["all", "pending", "confirmed", "completed", "cancelled"];

function BookingsTab() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    const params = filter !== "all" ? `?status=${filter}` : "";
    const res = await fetch(`/api/bookings${params}`);
    const data = await res.json();
    setBookings(data.bookings || []);
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  async function updateStatus(id: string, status: string) {
    setUpdating(id);
    await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await fetchBookings();
    setUpdating(null);
  }

  async function deleteBooking(id: string) {
    if (!confirm("Delete this booking permanently?")) return;
    setUpdating(id);
    await fetch(`/api/bookings/${id}`, { method: "DELETE" });
    await fetchBookings();
    setUpdating(null);
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr + "T12:00:00").toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  }

  function formatCreatedAt(iso: string) {
    return new Date(iso).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return (
    <>
      <div className="px-6 py-4 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {BOOKING_STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => { setFilter(s); setLoading(true); }}
            className={`flex-shrink-0 font-sans text-[10px] tracking-[0.15em] uppercase border px-3 py-2 transition-all duration-200 ${
              filter === s
                ? "border-nocte-gold text-nocte-gold"
                : "border-nocte-border text-nocte-muted hover:border-nocte-gold/40"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="px-6 pb-4">
        <p className="font-sans text-[10px] text-nocte-muted tracking-[0.2em] uppercase">
          {loading ? "Loading…" : `${bookings.length} booking${bookings.length !== 1 ? "s" : ""}`}
        </p>
      </div>

      {!loading && bookings.length === 0 ? (
        <div className="px-6 py-20 text-center">
          <p className="font-display text-2xl font-light text-nocte-cream italic mb-2">No bookings yet</p>
          <p className="font-sans text-xs text-nocte-muted">Bookings will appear here as guests reserve tables.</p>
        </div>
      ) : (
        <div className="px-6 flex flex-col gap-3">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="border border-nocte-border p-5"
              style={{ background: "linear-gradient(135deg, #0e0e0e, #090909)" }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-display text-lg font-light text-nocte-cream tracking-wide">{b.venue_name}</p>
                  <p className="font-sans text-[10px] text-nocte-muted tracking-[0.1em] uppercase">{b.table_name} · {formatDate(b.date)}</p>
                </div>
                <span className={`font-sans text-[9px] tracking-[0.2em] uppercase border px-2 py-1 ${STATUS_COLORS[b.status] || "text-nocte-muted border-nocte-border"}`}>
                  {b.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3">
                <div>
                  <p className="font-sans text-[9px] text-nocte-muted tracking-[0.1em] uppercase">Guest</p>
                  <p className="font-sans text-xs text-nocte-cream">{b.guest_name}</p>
                </div>
                <div>
                  <p className="font-sans text-[9px] text-nocte-muted tracking-[0.1em] uppercase">Party</p>
                  <p className="font-sans text-xs text-nocte-cream">{b.party_size} guests</p>
                </div>
                <div>
                  <p className="font-sans text-[9px] text-nocte-muted tracking-[0.1em] uppercase">Phone</p>
                  <p className="font-sans text-xs text-nocte-cream">{b.guest_phone}</p>
                </div>
                <div>
                  <p className="font-sans text-[9px] text-nocte-muted tracking-[0.1em] uppercase">Email</p>
                  <p className="font-sans text-xs text-nocte-cream truncate">{b.guest_email}</p>
                </div>
                {b.total_minimum > 0 && (
                  <div>
                    <p className="font-sans text-[9px] text-nocte-muted tracking-[0.1em] uppercase">Minimum</p>
                    <p className="font-sans text-xs text-nocte-gold">${b.total_minimum.toLocaleString()}</p>
                  </div>
                )}
                <div>
                  <p className="font-sans text-[9px] text-nocte-muted tracking-[0.1em] uppercase">Booked</p>
                  <p className="font-sans text-xs text-nocte-cream">{formatCreatedAt(b.created_at)}</p>
                </div>
              </div>

              {b.special_requests && (
                <div className="mb-3 border-t border-nocte-border pt-3">
                  <p className="font-sans text-[9px] text-nocte-muted tracking-[0.1em] uppercase mb-1">Special Requests</p>
                  <p className="font-sans text-xs text-nocte-cream italic">&ldquo;{b.special_requests}&rdquo;</p>
                </div>
              )}

              <div className="flex gap-2 pt-2 border-t border-nocte-border">
                {b.status === "pending" && (
                  <>
                    <button onClick={() => updateStatus(b.id, "confirmed")} disabled={updating === b.id} className="flex-1 border border-nocte-gold text-nocte-gold font-sans text-[10px] tracking-[0.2em] uppercase py-2 hover:bg-nocte-gold hover:text-nocte-black transition-all duration-200 disabled:opacity-40">Confirm</button>
                    <button onClick={() => updateStatus(b.id, "cancelled")} disabled={updating === b.id} className="flex-1 border border-nocte-border text-nocte-muted font-sans text-[10px] tracking-[0.2em] uppercase py-2 hover:border-red-400/40 hover:text-red-400 transition-all duration-200 disabled:opacity-40">Cancel</button>
                  </>
                )}
                {b.status === "confirmed" && (
                  <>
                    <button onClick={() => updateStatus(b.id, "completed")} disabled={updating === b.id} className="flex-1 border border-green-400/40 text-green-400 font-sans text-[10px] tracking-[0.2em] uppercase py-2 hover:bg-green-400/10 transition-all duration-200 disabled:opacity-40">Complete</button>
                    <button onClick={() => updateStatus(b.id, "cancelled")} disabled={updating === b.id} className="flex-1 border border-nocte-border text-nocte-muted font-sans text-[10px] tracking-[0.2em] uppercase py-2 hover:border-red-400/40 hover:text-red-400 transition-all duration-200 disabled:opacity-40">Cancel</button>
                  </>
                )}
                {(b.status === "completed" || b.status === "cancelled") && (
                  <p className="font-sans text-[10px] text-nocte-muted/50 tracking-[0.1em] uppercase py-2">{b.status === "completed" ? "Night complete" : "Booking cancelled"}</p>
                )}
                <button onClick={() => deleteBooking(b.id)} disabled={updating === b.id} className="border border-nocte-border text-nocte-muted/40 font-sans text-[10px] tracking-[0.2em] uppercase px-3 py-2 hover:border-red-400/40 hover:text-red-400 transition-all duration-200 disabled:opacity-40">Delete</button>
              </div>

              <p className="font-sans text-[9px] text-nocte-muted/40 mt-3 tracking-[0.1em]">{b.id}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

// ─── Partners Tab ───

const PARTNER_STATUSES = ["all", "new", "reviewing", "approved", "declined"];

function PartnersTab() {
  const [apps, setApps] = useState<PartnerApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchApps = useCallback(async () => {
    const params = filter !== "all" ? `?status=${filter}` : "";
    const res = await fetch(`/api/partners${params}`);
    const data = await res.json();
    setApps(data.applications || []);
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    fetchApps();
  }, [fetchApps]);

  async function updateStatus(id: string, status: string) {
    setUpdating(id);
    await fetch(`/api/partners/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await fetchApps();
    setUpdating(null);
  }

  function formatCreatedAt(iso: string) {
    return new Date(iso).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return (
    <>
      <div className="px-6 py-4 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {PARTNER_STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => { setFilter(s); setLoading(true); }}
            className={`flex-shrink-0 font-sans text-[10px] tracking-[0.15em] uppercase border px-3 py-2 transition-all duration-200 ${
              filter === s
                ? "border-nocte-gold text-nocte-gold"
                : "border-nocte-border text-nocte-muted hover:border-nocte-gold/40"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="px-6 pb-4">
        <p className="font-sans text-[10px] text-nocte-muted tracking-[0.2em] uppercase">
          {loading ? "Loading…" : `${apps.length} application${apps.length !== 1 ? "s" : ""}`}
        </p>
      </div>

      {!loading && apps.length === 0 ? (
        <div className="px-6 py-20 text-center">
          <p className="font-display text-2xl font-light text-nocte-cream italic mb-2">No applications yet</p>
          <p className="font-sans text-xs text-nocte-muted">Share your /partners page with venue managers to start receiving applications.</p>
        </div>
      ) : (
        <div className="px-6 flex flex-col gap-3">
          {apps.map((a) => (
            <div
              key={a.id}
              className="border border-nocte-border p-5"
              style={{ background: "linear-gradient(135deg, #0e0e0e, #090909)" }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-display text-lg font-light text-nocte-cream tracking-wide">{a.venue_name}</p>
                  <p className="font-sans text-[10px] text-nocte-muted tracking-[0.1em] uppercase">{a.venue_type}</p>
                </div>
                <span className={`font-sans text-[9px] tracking-[0.2em] uppercase border px-2 py-1 ${STATUS_COLORS[a.status] || "text-nocte-muted border-nocte-border"}`}>
                  {a.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3">
                <div>
                  <p className="font-sans text-[9px] text-nocte-muted tracking-[0.1em] uppercase">Contact</p>
                  <p className="font-sans text-xs text-nocte-cream">{a.contact_name}</p>
                </div>
                <div>
                  <p className="font-sans text-[9px] text-nocte-muted tracking-[0.1em] uppercase">Role</p>
                  <p className="font-sans text-xs text-nocte-cream">{a.contact_role}</p>
                </div>
                <div>
                  <p className="font-sans text-[9px] text-nocte-muted tracking-[0.1em] uppercase">Phone</p>
                  <p className="font-sans text-xs text-nocte-cream">{a.contact_phone}</p>
                </div>
                <div>
                  <p className="font-sans text-[9px] text-nocte-muted tracking-[0.1em] uppercase">Email</p>
                  <p className="font-sans text-xs text-nocte-cream truncate">{a.contact_email}</p>
                </div>
                <div className="col-span-2">
                  <p className="font-sans text-[9px] text-nocte-muted tracking-[0.1em] uppercase">Address</p>
                  <p className="font-sans text-xs text-nocte-cream">{a.venue_address}</p>
                </div>
                {a.neighborhood && (
                  <div>
                    <p className="font-sans text-[9px] text-nocte-muted tracking-[0.1em] uppercase">Neighborhood</p>
                    <p className="font-sans text-xs text-nocte-cream">{a.neighborhood}</p>
                  </div>
                )}
                {a.capacity && (
                  <div>
                    <p className="font-sans text-[9px] text-nocte-muted tracking-[0.1em] uppercase">Capacity</p>
                    <p className="font-sans text-xs text-nocte-cream">{a.capacity}</p>
                  </div>
                )}
                {a.current_booking_method && (
                  <div className="col-span-2">
                    <p className="font-sans text-[9px] text-nocte-muted tracking-[0.1em] uppercase">Current Booking Method</p>
                    <p className="font-sans text-xs text-nocte-cream">{a.current_booking_method}</p>
                  </div>
                )}
                {(a.website || a.instagram) && (
                  <div className="col-span-2 flex gap-4">
                    {a.website && (
                      <div>
                        <p className="font-sans text-[9px] text-nocte-muted tracking-[0.1em] uppercase">Website</p>
                        <p className="font-sans text-xs text-nocte-gold">{a.website}</p>
                      </div>
                    )}
                    {a.instagram && (
                      <div>
                        <p className="font-sans text-[9px] text-nocte-muted tracking-[0.1em] uppercase">Instagram</p>
                        <p className="font-sans text-xs text-nocte-gold">{a.instagram}</p>
                      </div>
                    )}
                  </div>
                )}
                <div>
                  <p className="font-sans text-[9px] text-nocte-muted tracking-[0.1em] uppercase">Applied</p>
                  <p className="font-sans text-xs text-nocte-cream">{formatCreatedAt(a.created_at)}</p>
                </div>
              </div>

              {a.notes && (
                <div className="mb-3 border-t border-nocte-border pt-3">
                  <p className="font-sans text-[9px] text-nocte-muted tracking-[0.1em] uppercase mb-1">Notes</p>
                  <p className="font-sans text-xs text-nocte-cream italic">&ldquo;{a.notes}&rdquo;</p>
                </div>
              )}

              <div className="flex gap-2 pt-2 border-t border-nocte-border">
                {a.status === "new" && (
                  <>
                    <button onClick={() => updateStatus(a.id, "reviewing")} disabled={updating === a.id} className="flex-1 border border-yellow-400/40 text-yellow-400 font-sans text-[10px] tracking-[0.2em] uppercase py-2 hover:bg-yellow-400/10 transition-all duration-200 disabled:opacity-40">Review</button>
                    <button onClick={() => updateStatus(a.id, "approved")} disabled={updating === a.id} className="flex-1 border border-nocte-gold text-nocte-gold font-sans text-[10px] tracking-[0.2em] uppercase py-2 hover:bg-nocte-gold hover:text-nocte-black transition-all duration-200 disabled:opacity-40">Approve</button>
                    <button onClick={() => updateStatus(a.id, "declined")} disabled={updating === a.id} className="flex-1 border border-nocte-border text-nocte-muted font-sans text-[10px] tracking-[0.2em] uppercase py-2 hover:border-red-400/40 hover:text-red-400 transition-all duration-200 disabled:opacity-40">Decline</button>
                  </>
                )}
                {a.status === "reviewing" && (
                  <>
                    <button onClick={() => updateStatus(a.id, "approved")} disabled={updating === a.id} className="flex-1 border border-nocte-gold text-nocte-gold font-sans text-[10px] tracking-[0.2em] uppercase py-2 hover:bg-nocte-gold hover:text-nocte-black transition-all duration-200 disabled:opacity-40">Approve</button>
                    <button onClick={() => updateStatus(a.id, "declined")} disabled={updating === a.id} className="flex-1 border border-nocte-border text-nocte-muted font-sans text-[10px] tracking-[0.2em] uppercase py-2 hover:border-red-400/40 hover:text-red-400 transition-all duration-200 disabled:opacity-40">Decline</button>
                  </>
                )}
                {(a.status === "approved" || a.status === "declined") && (
                  <p className="font-sans text-[10px] text-nocte-muted/50 tracking-[0.1em] uppercase py-2">{a.status === "approved" ? "Partner approved" : "Application declined"}</p>
                )}
              </div>

              <p className="font-sans text-[9px] text-nocte-muted/40 mt-3 tracking-[0.1em]">{a.id}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

// ─── Onboarding Tab ───

const ONBOARDING_STATUSES = ["all", "new", "reviewing", "approved", "declined"];

function OnboardingTab() {
  const [submissions, setSubmissions] = useState<VenueSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [updating, setUpdating] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchSubmissions = useCallback(async () => {
    const params = filter !== "all" ? `?status=${filter}` : "";
    const res = await fetch(`/api/onboard${params}`);
    const data = await res.json();
    setSubmissions(data.submissions || []);
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  async function updateStatus(id: string, status: string) {
    setUpdating(id);
    await fetch(`/api/onboard/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await fetchSubmissions();
    setUpdating(null);
  }

  function formatCreatedAt(iso: string) {
    return new Date(iso).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return (
    <>
      <div className="px-6 py-4 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {ONBOARDING_STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => { setFilter(s); setLoading(true); }}
            className={`flex-shrink-0 font-sans text-[10px] tracking-[0.15em] uppercase border px-3 py-2 transition-all duration-200 ${
              filter === s
                ? "border-nocte-gold text-nocte-gold"
                : "border-nocte-border text-nocte-muted hover:border-nocte-gold/40"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="px-6 pb-4">
        <p className="font-sans text-[10px] text-nocte-muted tracking-[0.2em] uppercase">
          {loading ? "Loading…" : `${submissions.length} submission${submissions.length !== 1 ? "s" : ""}`}
        </p>
      </div>

      {!loading && submissions.length === 0 ? (
        <div className="px-6 py-20 text-center">
          <p className="font-display text-2xl font-light text-nocte-cream italic mb-2">No submissions yet</p>
          <p className="font-sans text-xs text-nocte-muted">Share your /onboard page with venue managers to start receiving submissions.</p>
        </div>
      ) : (
        <div className="px-6 flex flex-col gap-3">
          {submissions.map((s) => (
            <div
              key={s.id}
              className="border border-nocte-border p-5"
              style={{ background: "linear-gradient(135deg, #0e0e0e, #090909)" }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-display text-lg font-light text-nocte-cream tracking-wide">{s.venue_name}</p>
                  <p className="font-sans text-[10px] text-nocte-muted tracking-[0.1em] uppercase">{s.venue_type} · {s.neighborhood} · {s.price_range}</p>
                </div>
                <span className={`font-sans text-[9px] tracking-[0.2em] uppercase border px-2 py-1 ${STATUS_COLORS[s.status] || "text-nocte-muted border-nocte-border"}`}>
                  {s.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3">
                <div>
                  <p className="font-sans text-[9px] text-nocte-muted tracking-[0.1em] uppercase">Contact</p>
                  <p className="font-sans text-xs text-nocte-cream">{s.contact_name}</p>
                </div>
                <div>
                  <p className="font-sans text-[9px] text-nocte-muted tracking-[0.1em] uppercase">Role</p>
                  <p className="font-sans text-xs text-nocte-cream">{s.contact_role}</p>
                </div>
                <div>
                  <p className="font-sans text-[9px] text-nocte-muted tracking-[0.1em] uppercase">Email</p>
                  <p className="font-sans text-xs text-nocte-cream truncate">{s.contact_email}</p>
                </div>
                <div>
                  <p className="font-sans text-[9px] text-nocte-muted tracking-[0.1em] uppercase">Phone</p>
                  <p className="font-sans text-xs text-nocte-cream">{s.contact_phone}</p>
                </div>
                <div>
                  <p className="font-sans text-[9px] text-nocte-muted tracking-[0.1em] uppercase">Capacity</p>
                  <p className="font-sans text-xs text-nocte-cream">{s.capacity}</p>
                </div>
                <div>
                  <p className="font-sans text-[9px] text-nocte-muted tracking-[0.1em] uppercase">Service</p>
                  <p className="font-sans text-xs text-nocte-cream">{formatServiceSummary(s.service_info)}</p>
                </div>
                <div>
                  <p className="font-sans text-[9px] text-nocte-muted tracking-[0.1em] uppercase">Submitted</p>
                  <p className="font-sans text-xs text-nocte-cream">{formatCreatedAt(s.created_at)}</p>
                </div>
              </div>

              {/* Expandable detail */}
              <button
                type="button"
                onClick={() => setExpanded(expanded === s.id ? null : s.id)}
                className="font-sans text-[10px] text-nocte-muted hover:text-nocte-gold tracking-[0.15em] uppercase transition-colors mb-3"
              >
                {expanded === s.id ? "— Less" : "+ Details"}
              </button>

              {expanded === s.id && (
                <div className="border-t border-nocte-border pt-3 mb-3 flex flex-col gap-3">
                  <div>
                    <p className="font-sans text-[9px] text-nocte-muted tracking-[0.1em] uppercase mb-1">Address</p>
                    <p className="font-sans text-xs text-nocte-cream">{s.address}</p>
                  </div>
                  <div>
                    <p className="font-sans text-[9px] text-nocte-muted tracking-[0.1em] uppercase mb-1">Description</p>
                    <p className="font-sans text-xs text-nocte-cream leading-relaxed">{s.description}</p>
                  </div>
                  {s.vibe?.length > 0 && (
                    <div>
                      <p className="font-sans text-[9px] text-nocte-muted tracking-[0.1em] uppercase mb-1">Vibe</p>
                      <div className="flex flex-wrap gap-1">
                        {s.vibe.map((v) => (
                          <span key={v} className="font-sans text-[9px] text-nocte-gold border border-nocte-gold/30 px-2 py-0.5 tracking-[0.1em] uppercase">{v}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="font-sans text-[9px] text-nocte-muted tracking-[0.1em] uppercase">Hours</p>
                      <p className="font-sans text-xs text-nocte-cream">{s.hours}</p>
                    </div>
                    {s.dress_code && (
                      <div>
                        <p className="font-sans text-[9px] text-nocte-muted tracking-[0.1em] uppercase">Dress Code</p>
                        <p className="font-sans text-xs text-nocte-cream">{s.dress_code}</p>
                      </div>
                    )}
                  </div>
                  {(s.website || s.instagram) && (
                    <div className="flex gap-4">
                      {s.website && (
                        <div>
                          <p className="font-sans text-[9px] text-nocte-muted tracking-[0.1em] uppercase">Website</p>
                          <p className="font-sans text-xs text-nocte-gold">{s.website}</p>
                        </div>
                      )}
                      {s.instagram && (
                        <div>
                          <p className="font-sans text-[9px] text-nocte-muted tracking-[0.1em] uppercase">Instagram</p>
                          <p className="font-sans text-xs text-nocte-gold">{s.instagram}</p>
                        </div>
                      )}
                    </div>
                  )}
                  {s.service_info && (
                    <div>
                      <p className="font-sans text-[9px] text-nocte-muted tracking-[0.1em] uppercase mb-2">Service Details</p>
                      <ServiceInfoDetail info={s.service_info} />
                    </div>
                  )}
                  {s.notes && (
                    <div>
                      <p className="font-sans text-[9px] text-nocte-muted tracking-[0.1em] uppercase mb-1">Notes</p>
                      <p className="font-sans text-xs text-nocte-cream italic">&ldquo;{s.notes}&rdquo;</p>
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-2 pt-2 border-t border-nocte-border">
                {s.status === "new" && (
                  <>
                    <button onClick={() => updateStatus(s.id, "reviewing")} disabled={updating === s.id} className="flex-1 border border-yellow-400/40 text-yellow-400 font-sans text-[10px] tracking-[0.2em] uppercase py-2 hover:bg-yellow-400/10 transition-all duration-200 disabled:opacity-40">Review</button>
                    <button onClick={() => updateStatus(s.id, "approved")} disabled={updating === s.id} className="flex-1 border border-nocte-gold text-nocte-gold font-sans text-[10px] tracking-[0.2em] uppercase py-2 hover:bg-nocte-gold hover:text-nocte-black transition-all duration-200 disabled:opacity-40">Approve</button>
                    <button onClick={() => updateStatus(s.id, "declined")} disabled={updating === s.id} className="flex-1 border border-nocte-border text-nocte-muted font-sans text-[10px] tracking-[0.2em] uppercase py-2 hover:border-red-400/40 hover:text-red-400 transition-all duration-200 disabled:opacity-40">Decline</button>
                  </>
                )}
                {s.status === "reviewing" && (
                  <>
                    <button onClick={() => updateStatus(s.id, "approved")} disabled={updating === s.id} className="flex-1 border border-nocte-gold text-nocte-gold font-sans text-[10px] tracking-[0.2em] uppercase py-2 hover:bg-nocte-gold hover:text-nocte-black transition-all duration-200 disabled:opacity-40">Approve</button>
                    <button onClick={() => updateStatus(s.id, "declined")} disabled={updating === s.id} className="flex-1 border border-nocte-border text-nocte-muted font-sans text-[10px] tracking-[0.2em] uppercase py-2 hover:border-red-400/40 hover:text-red-400 transition-all duration-200 disabled:opacity-40">Decline</button>
                  </>
                )}
                {(s.status === "approved" || s.status === "declined") && (
                  <p className="font-sans text-[10px] text-nocte-muted/50 tracking-[0.1em] uppercase py-2">{s.status === "approved" ? "Venue approved" : "Submission declined"}</p>
                )}
              </div>

              <p className="font-sans text-[9px] text-nocte-muted/40 mt-3 tracking-[0.1em]">{s.id}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

// ─── Venues Tab ───

function VenuesTab() {
  const [venues, setVenues] = useState<AdminVenue[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchVenues = useCallback(async () => {
    const res = await fetch("/api/venues?admin=true");
    const data = await res.json();
    setVenues(data.venues || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchVenues();
  }, [fetchVenues]);

  async function toggleActive(id: string, currentActive: boolean) {
    setUpdating(id);
    await fetch(`/api/venues/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !currentActive }),
    });
    await fetchVenues();
    setUpdating(null);
  }

  async function deleteVenue(id: string) {
    if (!confirm("Delete this venue permanently? This cannot be undone.")) return;
    setUpdating(id);
    await fetch(`/api/venues/${id}`, { method: "DELETE" });
    await fetchVenues();
    setUpdating(null);
  }

  return (
    <>
      <div className="px-6 py-4">
        <p className="font-sans text-[10px] text-nocte-muted tracking-[0.2em] uppercase">
          {loading ? "Loading…" : `${venues.length} venue${venues.length !== 1 ? "s" : ""}`}
        </p>
      </div>

      {!loading && venues.length === 0 ? (
        <div className="px-6 py-20 text-center">
          <p className="font-display text-2xl font-light text-nocte-cream italic mb-2">No venues yet</p>
          <p className="font-sans text-xs text-nocte-muted">Venues will appear here once added or approved from submissions.</p>
        </div>
      ) : (
        <div className="px-6 flex flex-col gap-3">
          {venues.map((v) => (
            <div
              key={v.id}
              className="border border-nocte-border p-5"
              style={{ background: "linear-gradient(135deg, #0e0e0e, #090909)" }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-display text-lg font-light text-nocte-cream tracking-wide">{v.name}</p>
                  <p className="font-sans text-[10px] text-nocte-muted tracking-[0.1em] uppercase">{v.type} · {v.neighborhood}</p>
                </div>
                <span className={`font-sans text-[9px] tracking-[0.2em] uppercase border px-2 py-1 ${
                  v.active !== false
                    ? "text-green-400 border-green-400/30"
                    : "text-red-400 border-red-400/30"
                }`}>
                  {v.active !== false ? "active" : "inactive"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3">
                <div>
                  <p className="font-sans text-[9px] text-nocte-muted tracking-[0.1em] uppercase">Category</p>
                  <p className="font-sans text-xs text-nocte-cream">{v.category || "—"}</p>
                </div>
                <div>
                  <p className="font-sans text-[9px] text-nocte-muted tracking-[0.1em] uppercase">Price</p>
                  <p className="font-sans text-xs text-nocte-cream">{v.priceRange}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-nocte-border">
                <button
                  onClick={() => toggleActive(v.id, v.active !== false)}
                  disabled={updating === v.id}
                  className={`flex-1 border font-sans text-[10px] tracking-[0.2em] uppercase py-2 transition-all duration-200 disabled:opacity-40 ${
                    v.active !== false
                      ? "border-nocte-border text-nocte-muted hover:border-red-400/40 hover:text-red-400"
                      : "border-nocte-gold text-nocte-gold hover:bg-nocte-gold hover:text-nocte-black"
                  }`}
                >
                  {v.active !== false ? "Deactivate" : "Activate"}
                </button>
                <button
                  onClick={() => deleteVenue(v.id)}
                  disabled={updating === v.id}
                  className="border border-nocte-border text-nocte-muted/40 font-sans text-[10px] tracking-[0.2em] uppercase px-3 py-2 hover:border-red-400/40 hover:text-red-400 transition-all duration-200 disabled:opacity-40"
                >
                  Delete
                </button>
              </div>

              <p className="font-sans text-[9px] text-nocte-muted/40 mt-3 tracking-[0.1em]">{v.id}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function formatSpend(v: number): string {
  if (v === 0) return "$0";
  if (v >= 1000) return `$${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1)}k`;
  return `$${v}`;
}

function formatServiceSummary(info: ServiceInfo): string {
  if (!info?.category) return "—";
  if (info.category === "club") return `${info.vip_tables} VIP + ${info.standard_tables} standard`;
  if (info.category === "restaurant") return `${info.seating_capacity} seats, max ${info.max_party_size}`;
  return `${info.bottle_table_count} bottle tables, ${info.general_seating} general`;
}

function ServiceInfoDetail({ info }: { info: ServiceInfo }) {
  if (!info?.category) return null;

  if (info.category === "club") {
    const features = [
      info.has_outdoor && "Outdoor",
      info.has_mezzanine && "Mezzanine",
      info.has_dj_adjacent && "DJ-Adjacent",
    ].filter(Boolean);
    return (
      <div className="border border-nocte-border/50 p-3 bg-nocte-black/50 flex flex-col gap-1.5">
        <div className="flex justify-between"><span className="font-sans text-[10px] text-nocte-muted">VIP Tables</span><span className="font-sans text-xs text-nocte-cream">{info.vip_tables}</span></div>
        <div className="flex justify-between"><span className="font-sans text-[10px] text-nocte-muted">Standard Tables</span><span className="font-sans text-xs text-nocte-cream">{info.standard_tables}</span></div>
        <div className="flex justify-between"><span className="font-sans text-[10px] text-nocte-muted">Min Spend</span><span className="font-sans text-xs text-nocte-gold">{formatSpend(info.min_spend_low)} – {formatSpend(info.min_spend_high)}</span></div>
        {features.length > 0 && <div className="flex justify-between"><span className="font-sans text-[10px] text-nocte-muted">Features</span><span className="font-sans text-xs text-nocte-cream">{features.join(", ")}</span></div>}
        {info.floor_plan_upload && <div className="flex justify-between"><span className="font-sans text-[10px] text-nocte-muted">Floor Plan</span><span className="font-sans text-xs text-nocte-gold">Setup requested</span></div>}
      </div>
    );
  }

  if (info.category === "restaurant") {
    return (
      <div className="border border-nocte-border/50 p-3 bg-nocte-black/50 flex flex-col gap-1.5">
        <div className="flex justify-between"><span className="font-sans text-[10px] text-nocte-muted">Seating</span><span className="font-sans text-xs text-nocte-cream">{info.seating_capacity} seats</span></div>
        <div className="flex justify-between"><span className="font-sans text-[10px] text-nocte-muted">Max Party</span><span className="font-sans text-xs text-nocte-cream">{info.max_party_size} guests</span></div>
        <div className="flex justify-between"><span className="font-sans text-[10px] text-nocte-muted">Private Dining</span><span className="font-sans text-xs text-nocte-cream">{info.has_private_dining ? `Yes — ${info.private_dining_capacity}` : "No"}</span></div>
        {info.time_slots.length > 0 && <div className="flex justify-between"><span className="font-sans text-[10px] text-nocte-muted">Slots</span><span className="font-sans text-xs text-nocte-cream">{info.time_slots.join(", ")}</span></div>}
        <div className="flex justify-between"><span className="font-sans text-[10px] text-nocte-muted">Prix Fixe</span><span className="font-sans text-xs text-nocte-cream">{info.has_prix_fixe ? "Yes" : "No"}</span></div>
      </div>
    );
  }

  return (
    <div className="border border-nocte-border/50 p-3 bg-nocte-black/50 flex flex-col gap-1.5">
      <div className="flex justify-between"><span className="font-sans text-[10px] text-nocte-muted">Bottle Tables</span><span className="font-sans text-xs text-nocte-cream">{info.bottle_table_count}</span></div>
      <div className="flex justify-between"><span className="font-sans text-[10px] text-nocte-muted">Min Spend</span><span className="font-sans text-xs text-nocte-gold">{formatSpend(info.min_spend_low)} – {formatSpend(info.min_spend_high)}</span></div>
      <div className="flex justify-between"><span className="font-sans text-[10px] text-nocte-muted">General Seating</span><span className="font-sans text-xs text-nocte-cream">{info.general_seating} guests</span></div>
      {info.sections.length > 0 && <div className="flex justify-between"><span className="font-sans text-[10px] text-nocte-muted">Sections</span><span className="font-sans text-xs text-nocte-cream">{info.sections.join(", ")}</span></div>}
    </div>
  );
}
