import type { Booking } from "./bookings";
import type { VenueSubmission } from "./venue-submissions";

const ADMIN_EMAIL = process.env.NOCTE_ADMIN_EMAIL || "bookings@nocte.app";

function hasResend(): boolean {
  return !!process.env.RESEND_API_KEY;
}

async function getResend() {
  const { Resend } = await import("resend");
  return new Resend(process.env.RESEND_API_KEY);
}

function formatDate(dateStr: string): string {
  return new Date(dateStr + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export async function sendBookingNotifications(booking: Booking) {
  if (!hasResend()) {
    console.log("[email] Resend not configured — skipping notifications");
    console.log("[email] Booking created:", booking.id, booking.venue_name, booking.guest_name);
    return;
  }

  const resend = await getResend();
  const dateLabel = formatDate(booking.date);

  // 1. Notify admin/team about the new booking
  await resend.emails.send({
    from: "Noctē Bookings <bookings@nocte.app>",
    to: ADMIN_EMAIL,
    subject: `New Booking: ${booking.venue_name} — ${booking.guest_name}`,
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 500px; margin: 0 auto; background: #050505; color: #f0ebe0; padding: 32px;">
        <p style="color: #c9a84c; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; margin-bottom: 4px;">New Booking Request</p>
        <h1 style="font-size: 24px; font-weight: 300; margin: 0 0 24px;">${booking.venue_name}</h1>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="color: #6b6358; padding: 8px 0;">Confirmation</td><td style="text-align: right; padding: 8px 0;">${booking.id}</td></tr>
          <tr><td style="color: #6b6358; padding: 8px 0;">Guest</td><td style="text-align: right; padding: 8px 0;">${booking.guest_name}</td></tr>
          <tr><td style="color: #6b6358; padding: 8px 0;">Phone</td><td style="text-align: right; padding: 8px 0;">${booking.guest_phone}</td></tr>
          <tr><td style="color: #6b6358; padding: 8px 0;">Email</td><td style="text-align: right; padding: 8px 0;">${booking.guest_email}</td></tr>
          <tr><td style="color: #6b6358; padding: 8px 0;">Date</td><td style="text-align: right; padding: 8px 0;">${dateLabel}</td></tr>
          <tr><td style="color: #6b6358; padding: 8px 0;">Table</td><td style="text-align: right; padding: 8px 0;">${booking.table_name}</td></tr>
          <tr><td style="color: #6b6358; padding: 8px 0;">Party Size</td><td style="text-align: right; padding: 8px 0;">${booking.party_size} guests</td></tr>
          ${booking.total_minimum > 0 ? `<tr><td style="color: #6b6358; padding: 8px 0; border-top: 1px solid #1e1e1e;">Minimum</td><td style="text-align: right; padding: 8px 0; border-top: 1px solid #1e1e1e; color: #c9a84c;">$${booking.total_minimum.toLocaleString()}</td></tr>` : ""}
          ${booking.special_requests ? `<tr><td style="color: #6b6358; padding: 8px 0;">Requests</td><td style="text-align: right; padding: 8px 0;">${booking.special_requests}</td></tr>` : ""}
        </table>

        <p style="color: #6b6358; font-size: 12px; margin-top: 24px;">Action needed: confirm this reservation with the venue.</p>
      </div>
    `,
  });

  // 2. Send confirmation to the guest
  await resend.emails.send({
    from: "Noctē <concierge@nocte.app>",
    to: booking.guest_email,
    subject: `Your reservation at ${booking.venue_name} — ${dateLabel}`,
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 500px; margin: 0 auto; background: #050505; color: #f0ebe0; padding: 32px;">
        <p style="color: #c9a84c; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; margin-bottom: 4px;">Reservation Received</p>
        <h1 style="font-size: 28px; font-weight: 300; margin: 0 0 8px;">${booking.venue_name}</h1>
        <p style="color: #6b6358; font-size: 14px; margin: 0 0 32px;">${dateLabel}</p>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="color: #6b6358; padding: 8px 0;">Confirmation</td><td style="text-align: right; padding: 8px 0;">${booking.id}</td></tr>
          <tr><td style="color: #6b6358; padding: 8px 0;">Table</td><td style="text-align: right; padding: 8px 0;">${booking.table_name}</td></tr>
          <tr><td style="color: #6b6358; padding: 8px 0;">Party Size</td><td style="text-align: right; padding: 8px 0;">${booking.party_size} guests</td></tr>
          ${booking.total_minimum > 0 ? `<tr><td style="color: #6b6358; padding: 8px 0; border-top: 1px solid #1e1e1e;">Minimum Spend</td><td style="text-align: right; padding: 8px 0; border-top: 1px solid #1e1e1e; color: #c9a84c;">$${booking.total_minimum.toLocaleString()}</td></tr>` : ""}
        </table>

        <p style="color: #f0ebe0; font-size: 14px; margin-top: 32px; line-height: 1.6;">
          Your concierge is now coordinating with ${booking.venue_name} to finalize your reservation. You'll hear from us shortly with confirmation details.
        </p>

        <p style="color: #6b6358; font-size: 12px; margin-top: 24px;">
          Need to make changes? Just reply to this email or open the Noctē app.
        </p>

        <p style="color: #c9a84c; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; margin-top: 32px;">Noctē · Miami Concierge</p>
      </div>
    `,
  });
}

export async function sendOnboardingNotification(submission: VenueSubmission) {
  if (!hasResend()) {
    console.log("[email] Resend not configured — skipping onboarding notification");
    console.log("[email] Venue submission:", submission.id, submission.venue_name, submission.contact_name);
    return;
  }

  const resend = await getResend();
  const tableCount = submission.tables.length;

  await resend.emails.send({
    from: "Noctē Onboarding <concierge@nocte.app>",
    to: ADMIN_EMAIL,
    subject: `New Venue Onboarded: ${submission.venue_name} — ${submission.contact_name}`,
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 500px; margin: 0 auto; background: #050505; color: #f0ebe0; padding: 32px;">
        <p style="color: #c9a84c; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; margin-bottom: 4px;">New Venue Submission</p>
        <h1 style="font-size: 24px; font-weight: 300; margin: 0 0 24px;">${submission.venue_name}</h1>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="color: #6b6358; padding: 8px 0;">ID</td><td style="text-align: right; padding: 8px 0;">${submission.id}</td></tr>
          <tr><td style="color: #6b6358; padding: 8px 0;">Type</td><td style="text-align: right; padding: 8px 0;">${submission.venue_type}</td></tr>
          <tr><td style="color: #6b6358; padding: 8px 0;">Neighborhood</td><td style="text-align: right; padding: 8px 0;">${submission.neighborhood}</td></tr>
          <tr><td style="color: #6b6358; padding: 8px 0;">Address</td><td style="text-align: right; padding: 8px 0;">${submission.address}</td></tr>
          <tr><td style="color: #6b6358; padding: 8px 0;">Capacity</td><td style="text-align: right; padding: 8px 0;">${submission.capacity}</td></tr>
          <tr><td style="color: #6b6358; padding: 8px 0;">Price</td><td style="text-align: right; padding: 8px 0;">${submission.price_range}</td></tr>
          <tr><td style="color: #6b6358; padding: 8px 0;">Tables</td><td style="text-align: right; padding: 8px 0;">${tableCount} configured</td></tr>
          <tr><td style="color: #6b6358; padding: 8px 0; border-top: 1px solid #1e1e1e;">Contact</td><td style="text-align: right; padding: 8px 0; border-top: 1px solid #1e1e1e;">${submission.contact_name} (${submission.contact_role})</td></tr>
          <tr><td style="color: #6b6358; padding: 8px 0;">Email</td><td style="text-align: right; padding: 8px 0;">${submission.contact_email}</td></tr>
          <tr><td style="color: #6b6358; padding: 8px 0;">Phone</td><td style="text-align: right; padding: 8px 0;">${submission.contact_phone}</td></tr>
        </table>

        <p style="color: #6b6358; font-size: 12px; margin-top: 24px;">Review this submission in the admin dashboard.</p>
      </div>
    `,
  });
}
