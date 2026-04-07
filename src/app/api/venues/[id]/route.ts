import { getVenueByIdAsync, updateVenue, deleteVenue } from "@/lib/venues";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const venue = await getVenueByIdAsync(id);

  if (!venue) {
    return Response.json({ error: "Venue not found" }, { status: 404 });
  }

  return Response.json({ venue });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const updates = await request.json();

  const venue = await updateVenue(id, updates);
  if (!venue) {
    return Response.json({ error: "Venue not found or update failed" }, { status: 404 });
  }

  return Response.json({ venue });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const success = await deleteVenue(id);

  if (!success) {
    return Response.json({ error: "Venue not found or delete failed" }, { status: 404 });
  }

  return Response.json({ success: true });
}
