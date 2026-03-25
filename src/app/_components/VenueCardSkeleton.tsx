export default function VenueCardSkeleton() {
  return (
    <div
      className="relative overflow-hidden bg-nocte-surface animate-pulse"
      style={{ aspectRatio: "3/4" }}
    >
      {/* Top row: optional badge placeholder + price placeholder */}
      <div className="absolute inset-0 flex flex-col justify-between p-4">
        <div className="flex items-start justify-between">
          {/* Badge placeholder (mimics "Hot" label) */}
          <div className="h-2.5 w-6 bg-nocte-surface-2" />
          {/* Price placeholder */}
          <div className="h-2.5 w-7 bg-nocte-surface-2" />
        </div>

        {/* Bottom content area */}
        <div className="flex flex-col gap-1.5">
          {/* Venue name placeholder */}
          <div className="h-6 w-4/5 bg-nocte-surface-2" />
          {/* Type placeholder */}
          <div className="h-2.5 w-2/5 bg-nocte-surface-2" />
          {/* Neighborhood placeholder */}
          <div className="h-2 w-1/3 bg-nocte-surface-2 mt-1" />
        </div>
      </div>
    </div>
  );
}
