import { getActiveVenues, getVenuesByCategoryAsync, getVenuesByNeighborhoodAsync, getAllVenuesAdmin } from "@/lib/venues";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  const neighborhood = url.searchParams.get("neighborhood");
  const admin = url.searchParams.get("admin");

  if (admin === "true") {
    const venues = await getAllVenuesAdmin();
    return Response.json({ venues });
  }

  if (category) {
    const venues = await getVenuesByCategoryAsync(category);
    return Response.json({ venues });
  }

  if (neighborhood) {
    const venues = await getVenuesByNeighborhoodAsync(neighborhood);
    return Response.json({ venues });
  }

  const venues = await getActiveVenues();
  return Response.json({ venues });
}
