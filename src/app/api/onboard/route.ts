import { createVenueSubmission, listVenueSubmissions } from "@/lib/venue-submissions";
import { sendOnboardingNotification } from "@/lib/email";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") as "new" | "reviewing" | "approved" | "declined" | null;

  const submissions = await listVenueSubmissions(status ? { status } : undefined);
  return Response.json({ submissions });
}

export async function POST(req: Request) {
  const body = await req.json();

  const required = ["venue_name", "venue_type", "neighborhood", "address", "capacity", "description", "price_range", "hours", "contact_name", "contact_role", "contact_email", "contact_phone"];
  for (const field of required) {
    if (!body[field]?.trim()) {
      return Response.json({ error: `Missing required field: ${field}` }, { status: 400 });
    }
  }

  const submission = await createVenueSubmission({
    venue_name: body.venue_name.trim(),
    venue_type: body.venue_type.trim(),
    neighborhood: body.neighborhood.trim(),
    address: body.address.trim(),
    capacity: body.capacity.trim(),
    description: body.description.trim(),
    vibe: Array.isArray(body.vibe) ? body.vibe : [],
    price_range: body.price_range,
    hours: body.hours.trim(),
    dress_code: body.dress_code?.trim() || "",
    tables: Array.isArray(body.tables) ? body.tables : [],
    contact_name: body.contact_name.trim(),
    contact_role: body.contact_role.trim(),
    contact_email: body.contact_email.trim(),
    contact_phone: body.contact_phone.trim(),
    website: body.website?.trim() || undefined,
    instagram: body.instagram?.trim() || undefined,
    notes: body.notes?.trim() || undefined,
  });

  sendOnboardingNotification(submission).catch(() => {});

  return Response.json({ submission }, { status: 201 });
}
