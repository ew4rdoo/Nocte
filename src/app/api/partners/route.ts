import { createPartnerApplication, listPartnerApplications } from "@/lib/partners";
import type { PartnerApplicationStatus } from "@/lib/partners";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const status = url.searchParams.get("status") as PartnerApplicationStatus | null;

  const applications = await listPartnerApplications({
    status: status ?? undefined,
  });

  return Response.json({ applications });
}

export async function POST(request: Request) {
  const body = await request.json();
  const {
    venueName, contactName, contactRole, contactEmail, contactPhone,
    venueType, venueAddress, neighborhood, capacity,
    currentBookingMethod, website, instagram, notes,
  } = body;

  if (!venueName || !contactName || !contactRole || !contactEmail || !contactPhone || !venueType || !venueAddress) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const application = await createPartnerApplication({
      venue_name: venueName,
      contact_name: contactName,
      contact_role: contactRole,
      contact_email: contactEmail,
      contact_phone: contactPhone,
      venue_type: venueType,
      venue_address: venueAddress,
      neighborhood: neighborhood || undefined,
      capacity: capacity || undefined,
      current_booking_method: currentBookingMethod || undefined,
      website: website || undefined,
      instagram: instagram || undefined,
      notes: notes || undefined,
    });

    return Response.json({ application }, { status: 201 });
  } catch (err) {
    console.error("Partner application error:", err);
    return Response.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
