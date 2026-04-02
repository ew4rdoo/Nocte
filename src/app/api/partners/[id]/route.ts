import { updatePartnerApplicationStatus } from "@/lib/partners";
import type { PartnerApplicationStatus } from "@/lib/partners";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { status } = await request.json();

  const validStatuses: PartnerApplicationStatus[] = ["new", "reviewing", "approved", "declined"];
  if (!validStatuses.includes(status)) {
    return Response.json({ error: "Invalid status" }, { status: 400 });
  }

  const application = await updatePartnerApplicationStatus(id, status);
  if (!application) {
    return Response.json({ error: "Application not found" }, { status: 404 });
  }

  return Response.json({ application });
}
