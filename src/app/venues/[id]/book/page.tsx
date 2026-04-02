import { notFound } from "next/navigation";
import { getVenueById, VENUES } from "@/lib/venues";
import BookingFlow from "./BookingFlow";

export async function generateStaticParams() {
  return VENUES.filter((v) => v.tables && v.tables.length > 0).map((v) => ({
    id: v.id,
  }));
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const venue = getVenueById(id);

  if (!venue || !venue.tables || venue.tables.length === 0) notFound();

  return <BookingFlow venue={venue} />;
}
