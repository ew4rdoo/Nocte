import { updateVenueSubmissionStatus } from "@/lib/venue-submissions";

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

  return Response.json({ submission: updated });
}
