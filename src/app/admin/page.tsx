"use client";

import { useState, useEffect, useCallback } from "react";

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

const STATUS_COLORS: Record<string, string> = {
  pending: "text-yellow-400 border-yellow-400/30",
  confirmed: "text-nocte-gold border-nocte-gold/30",
  completed: "text-green-400 border-green-400/30",
  cancelled: "text-red-400 border-red-400/30",
};

const STATUSES = ["all", "pending", "confirmed", "completed", "cancelled"];

export default function AdminPage() {
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
    <div
      className="min-h-screen bg-nocte-black text-nocte-cream"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 64px)" }}
    >
      {/* Header */}
      <div className="px-6 pt-16 pb-6 border-b border-nocte-border">
        <p className="font-sans text-[10px] text-nocte-gold tracking-[0.3em] uppercase mb-2">
          Management
        </p>
        <h1 className="font-display text-4xl font-light text-nocte-cream">
          Bookings
        </h1>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {STATUSES.map((s) => (
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

      {/* Count */}
      <div className="px-6 pb-4">
        <p className="font-sans text-[10px] text-nocte-muted tracking-[0.2em] uppercase">
          {loading ? "Loading…" : `${bookings.length} booking${bookings.length !== 1 ? "s" : ""}`}
        </p>
      </div>

      {/* Booking list */}
      {!loading && bookings.length === 0 ? (
        <div className="px-6 py-20 text-center">
          <p className="font-display text-2xl font-light text-nocte-cream italic mb-2">
            No bookings yet
          </p>
          <p className="font-sans text-xs text-nocte-muted">
            Bookings will appear here as guests reserve tables.
          </p>
        </div>
      ) : (
        <div className="px-6 flex flex-col gap-3">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="border border-nocte-border p-5"
              style={{ background: "linear-gradient(135deg, #0e0e0e, #090909)" }}
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-display text-lg font-light text-nocte-cream tracking-wide">
                    {b.venue_name}
                  </p>
                  <p className="font-sans text-[10px] text-nocte-muted tracking-[0.1em] uppercase">
                    {b.table_name} · {formatDate(b.date)}
                  </p>
                </div>
                <span
                  className={`font-sans text-[9px] tracking-[0.2em] uppercase border px-2 py-1 ${
                    STATUS_COLORS[b.status] || "text-nocte-muted border-nocte-border"
                  }`}
                >
                  {b.status}
                </span>
              </div>

              {/* Details */}
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

              {/* Action buttons */}
              <div className="flex gap-2 pt-2 border-t border-nocte-border">
                {b.status === "pending" && (
                  <>
                    <button
                      onClick={() => updateStatus(b.id, "confirmed")}
                      disabled={updating === b.id}
                      className="flex-1 border border-nocte-gold text-nocte-gold font-sans text-[10px] tracking-[0.2em] uppercase py-2 hover:bg-nocte-gold hover:text-nocte-black transition-all duration-200 disabled:opacity-40"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => updateStatus(b.id, "cancelled")}
                      disabled={updating === b.id}
                      className="flex-1 border border-nocte-border text-nocte-muted font-sans text-[10px] tracking-[0.2em] uppercase py-2 hover:border-red-400/40 hover:text-red-400 transition-all duration-200 disabled:opacity-40"
                    >
                      Cancel
                    </button>
                  </>
                )}
                {b.status === "confirmed" && (
                  <>
                    <button
                      onClick={() => updateStatus(b.id, "completed")}
                      disabled={updating === b.id}
                      className="flex-1 border border-green-400/40 text-green-400 font-sans text-[10px] tracking-[0.2em] uppercase py-2 hover:bg-green-400/10 transition-all duration-200 disabled:opacity-40"
                    >
                      Complete
                    </button>
                    <button
                      onClick={() => updateStatus(b.id, "cancelled")}
                      disabled={updating === b.id}
                      className="flex-1 border border-nocte-border text-nocte-muted font-sans text-[10px] tracking-[0.2em] uppercase py-2 hover:border-red-400/40 hover:text-red-400 transition-all duration-200 disabled:opacity-40"
                    >
                      Cancel
                    </button>
                  </>
                )}
                {(b.status === "completed" || b.status === "cancelled") && (
                  <p className="font-sans text-[10px] text-nocte-muted/50 tracking-[0.1em] uppercase py-2">
                    {b.status === "completed" ? "Night complete" : "Booking cancelled"}
                  </p>
                )}
              </div>

              {/* Booking ID */}
              <p className="font-sans text-[9px] text-nocte-muted/40 mt-3 tracking-[0.1em]">
                {b.id}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
