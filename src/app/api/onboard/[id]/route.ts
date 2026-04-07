import { updateVenueSubmissionStatus, getVenueSubmission } from "@/lib/venue-submissions";
import { createVenue } from "@/lib/venues";
import type { TableOption } from "@/lib/venues";

const DEFAULT_GRADIENTS: Record<string, string> = {
  club: "linear-gradient(160deg, #1a0b2e 0%, #0d0614 45%, #050505 100%)",
  lounge: "linear-gradient(160deg, #0a200f 0%, #050a06 100%)",
  rooftop: "linear-gradient(160deg, #0a1020 0%, #050508 100%)",
  restaurant: "linear-gradient(160deg, #1e1005 0%, #080504 100%)",
  dining: "linear-gradient(160deg, #1e1005 0%, #080504 100%)",
  bar: "linear-gradient(160deg, #080c1a 0%, #030508 100%)",
  beach: "linear-gradient(160deg, #0a1a1a 0%, #050a0a 100%)",
};

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function generateTablesFromSubmission(
  venueId: string,
  serviceInfo: Record<string, unknown>
): TableOption[] {
  const tables: TableOption[] = [];
  const category = serviceInfo.category as string;

  if (category === "club") {
    const vipCount = (serviceInfo.vip_tables as number) || 2;
    const standardCount = (serviceInfo.standard_tables as number) || 2;
    const minSpendLow = (serviceInfo.min_spend_low as number) || 1000;
    const minSpendHigh = (serviceInfo.min_spend_high as number) || 3000;

    for (let i = 0; i < vipCount; i++) {
      tables.push({
        id: `${venueId}-vip-${i + 1}`,
        name: vipCount === 1 ? "VIP Table" : `VIP Table ${i + 1}`,
        description: "Premium VIP table with bottle service",
        location: "VIP Section",
        capacity: { min: 4, max: 10 },
        minimumSpend: minSpendHigh,
        available: true,
      });
    }

    for (let i = 0; i < standardCount; i++) {
      tables.push({
        id: `${venueId}-standard-${i + 1}`,
        name: standardCount === 1 ? "Standard Table" : `Standard Table ${i + 1}`,
        description: "Standard table with bottle service",
        location: "Main Floor",
        capacity: { min: 4, max: 8 },
        minimumSpend: minSpendLow,
        available: true,
      });
    }
  } else if (category === "restaurant") {
    const maxParty = (serviceInfo.max_party_size as number) || 8;
    tables.push({
      id: `${venueId}-dining`,
      name: "Dining Table",
      description: "Main dining room table",
      location: "Dining Room",
      capacity: { min: 2, max: Math.min(maxParty, 8) },
      minimumSpend: 0,
      available: true,
    });

    if (serviceInfo.has_private_dining) {
      const privateCap = (serviceInfo.private_dining_capacity as string) || "8";
      const maxCap = parseInt(privateCap) || 8;
      tables.push({
        id: `${venueId}-private`,
        name: "Private Dining",
        description: "Private dining room for special occasions",
        location: "Private Room",
        capacity: { min: 4, max: maxCap },
        minimumSpend: 0,
        available: true,
      });
    }
  } else if (category === "rooftop") {
    const bottleCount = (serviceInfo.bottle_table_count as number) || 2;
    const minSpendLow = (serviceInfo.min_spend_low as number) || 500;

    for (let i = 0; i < bottleCount; i++) {
      tables.push({
        id: `${venueId}-bottle-${i + 1}`,
        name: bottleCount === 1 ? "Bottle Service Table" : `Bottle Service Table ${i + 1}`,
        description: "Bottle service table with premium views",
        location: "Terrace",
        capacity: { min: 4, max: 8 },
        minimumSpend: minSpendLow,
        available: true,
      });
    }

    tables.push({
      id: `${venueId}-general`,
      name: "General Seating",
      description: "Open seating area",
      location: "Main Area",
      capacity: { min: 2, max: 6 },
      minimumSpend: 0,
      available: true,
    });
  }

  return tables;
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { status } = await req.json();

  const valid = ["new", "reviewing", "approved", "declined"];
  if (!valid.includes(status)) {
    return Response.json({ error: "Invalid status" }, { status: 400 });
  }

  const updated = await updateVenueSubmissionStatus(id, status);
  if (!updated) {
    return Response.json({ error: "Submission not found" }, { status: 404 });
  }

  if (status === "approved") {
    const submission = await getVenueSubmission(id);
    if (submission) {
      const venueId = slugify(submission.venue_name);
      const category = submission.service_info.category === "restaurant" ? "dining" : submission.service_info.category;
      const gradient = DEFAULT_GRADIENTS[category] || DEFAULT_GRADIENTS.bar;
      const tables = generateTablesFromSubmission(venueId, submission.service_info as unknown as Record<string, unknown>);

      try {
        await createVenue({
          id: venueId,
          name: submission.venue_name,
          category: category as "club" | "lounge" | "rooftop" | "dining" | "beach" | "bar",
          type: submission.venue_type,
          neighborhood: submission.neighborhood,
          address: submission.address,
          gradient,
          description: submission.description,
          vibe: submission.vibe,
          priceRange: submission.price_range as "$" | "$$" | "$$$" | "$$$$",
          hours: submission.hours,
          dressCode: submission.dress_code,
          bestFor: [],
          bottleMin: 0,
          tableCapacity: submission.capacity,
          phone: submission.contact_phone,
          reviews: [],
          hot: false,
          tables,
        });
      } catch (err) {
        console.error("Failed to create venue from submission:", err);
      }
    }
  }

  return Response.json({ submission: updated });
}
