import Link from "next/link";

type Shop = {
  id: string;
  name: string;
  category: "Food" | "Massage";
  area: string;
  priceRange: string;
  rating: number;
  reviewCount: number;
  tags: string[];
};

const mockShops: Shop[] = [
  {
    id: "saigon-bowl",
    name: "Saigon Bowl",
    category: "Food",
    area: "District 1",
    priceRange: "$$",
    rating: 4.6,
    reviewCount: 128,
    tags: ["Vietnamese", "Pho", "Popular"],
  },
  {
    id: "riverfront-grill",
    name: "Riverfront Grill",
    category: "Food",
    area: "District 3",
    priceRange: "$$$",
    rating: 4.4,
    reviewCount: 76,
    tags: ["Steak", "Dinner", "Cozy"],
  },
  {
    id: "lotus-spa",
    name: "Lotus Spa",
    category: "Massage",
    area: "District 1",
    priceRange: "$$",
    rating: 4.7,
    reviewCount: 212,
    tags: ["Aroma", "Couple", "Quiet"],
  },
  {
    id: "zen-foot-care",
    name: "Zen Foot Care",
    category: "Massage",
    area: "Binh Thanh",
    priceRange: "$",
    rating: 4.3,
    reviewCount: 54,
    tags: ["Foot", "Quick", "Budget"],
  },
];

export default function ShopsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 flex justify-center">
      <main className="w-full max-w-sm bg-white px-4 py-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-semibold">Shops</h1>
          <Link href="/" className="text-sm underline text-zinc-700">
            Back
          </Link>
        </div>

        {/* Simple filter chips (display only for now) */}
        <div className="flex gap-2 mb-4">
          <span className="text-xs rounded-full border px-3 py-1">All</span>
          <span className="text-xs rounded-full border px-3 py-1">Food</span>
          <span className="text-xs rounded-full border px-3 py-1">Massage</span>
        </div>

        {/* List */}
        <div className="space-y-3">
          {mockShops.map((s) => (
            <Link
              key={s.id}
              href={`/shops/${s.id}`}
              className="block rounded-lg border bg-white p-4 active:scale-[0.99]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-sm font-semibold truncate">{s.name}</div>
                  <div className="mt-1 text-xs text-zinc-600">
                    {s.category} • {s.area} • {s.priceRange}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-sm font-semibold">
                    {s.rating.toFixed(1)}
                  </div>
                  <div className="text-[11px] text-zinc-500">
                    ({s.reviewCount})
                  </div>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {s.tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="text-[11px] rounded-full bg-zinc-100 px-2 py-1 text-zinc-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom spacer */}
        <div className="h-6" />
      </main>
    </div>
  );
}
