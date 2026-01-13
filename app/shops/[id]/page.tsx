import Link from "next/link";

type Shop = {
  id: string;
  name: string;
  category: "Food" | "Massage";
  area: string;
  address: string;
  priceRange: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  images: string[];
  description: string;
  menu: { title: string; price: string }[];
  reviews: { user: string; score: number; text: string }[];
};

const mockShops: Shop[] = [
  {
    id: "saigon-bowl",
    name: "Saigon Bowl",
    category: "Food",
    area: "District 1",
    address: "12 Nguyen Hue, District 1, Ho Chi Minh City",
    priceRange: "$$",
    rating: 4.6,
    reviewCount: 128,
    tags: ["Vietnamese", "Pho", "Popular"],
    images: [
      "/images/SaigonBowl-food_1.png",
      "/images/SaigonBowl-food_2.png",
      "/images/SaigonBowl-interior.png",
    ],
    description:
      "Classic Vietnamese bowls and pho. Great for lunch and quick dinner.",
    menu: [
      { title: "Pho Bo", price: "80,000 VND" },
      { title: "Bun Cha", price: "75,000 VND" },
      { title: "Iced Coffee", price: "30,000 VND" },
    ],
    reviews: [
      { user: "Minh", score: 5, text: "Best pho in D1. Quick service!" },
      { user: "Aya", score: 4, text: "Tasty and clean. A bit crowded at noon." },
    ],
  },
  {
    id: "riverfront-grill",
    name: "Riverfront Grill",
    category: "Food",
    area: "District 3",
    address: "88 Vo Van Tan, District 3, Ho Chi Minh City",
    priceRange: "$$$",
    rating: 4.4,
    reviewCount: 76,
    tags: ["Steak", "Dinner", "Cozy"],
    images: [
      "/images/Riverfront Grill-food1.png",
      "/images/Riverfront Grill-food2.png",
      "/images/Riverfront Grill-interior.png",
    ],
    description:
      "Cozy dinner spot with steaks and wine. Great for business dinners.",
    menu: [
      { title: "Sirloin Steak", price: "320,000 VND" },
      { title: "Pasta", price: "180,000 VND" },
      { title: "House Wine", price: "120,000 VND" },
    ],
    reviews: [
      { user: "Khanh", score: 5, text: "Perfect atmosphere for a date." },
      { user: "Ryo", score: 4, text: "Steak is solid. Price is on the higher side." },
    ],
  },
  {
    id: "lotus-spa",
    name: "Lotus Spa",
    category: "Massage",
    area: "District 1",
    address: "25 Le Loi, District 1, Ho Chi Minh City",
    priceRange: "$$",
    rating: 4.7,
    reviewCount: 212,
    tags: ["Aroma", "Couple", "Quiet"],
    // ✅ 追加：LotusSpa-1 / LotusSpa-2
    images: ["/images/LotusSpa-1.png", "/images/LotusSpa-2.png"],
    description:
      "Quiet spa offering aroma and couple packages. Reservation recommended.",
    menu: [
      { title: "Aroma Massage (60 min)", price: "450,000 VND" },
      { title: "Foot Massage (45 min)", price: "280,000 VND" },
      { title: "Couple Room (90 min)", price: "1,200,000 VND" },
    ],
    reviews: [
      { user: "Linh", score: 5, text: "So relaxing. Staff are professional." },
      { user: "Ken", score: 5, text: "Couple room was excellent." },
    ],
  },
  {
    id: "zen-foot-care",
    name: "Zen Foot Care",
    category: "Massage",
    area: "Binh Thanh",
    address: "10 Dien Bien Phu, Binh Thanh, Ho Chi Minh City",
    priceRange: "$",
    rating: 4.3,
    reviewCount: 54,
    tags: ["Foot", "Quick", "Budget"],
    // ✅ 追加：Zen Foot Care-1 / Zen Foot Care-2
    images: ["/images/Zen Foot Care-1.png", "/images/Zen Foot Care-2.png"],
    description:
      "Budget-friendly foot care. Quick walk-ins available most days.",
    menu: [
      { title: "Foot Massage (30 min)", price: "160,000 VND" },
      { title: "Foot Massage (60 min)", price: "260,000 VND" },
      { title: "Neck & Shoulder (30 min)", price: "180,000 VND" },
    ],
    reviews: [
      { user: "Hana", score: 4, text: "Great value. Easy to drop by." },
      { user: "Duc", score: 4, text: "Simple but good for quick refresh." },
    ],
  },
];

const mockSlots = [
  { date: "Today", times: ["10:00", "11:30", "14:00", "16:30"] },
  { date: "Tomorrow", times: ["09:30", "12:00", "15:00", "18:00"] },
];

function buildGoogleMapsUrl(address: string) {
  const q = encodeURIComponent(address);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

export default async function ShopDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const shop = mockShops.find((s) => s.id === id);

  if (!shop) {
    return (
      <div className="min-h-screen bg-zinc-50 flex justify-center">
        <main className="w-full max-w-sm bg-white px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg font-semibold">Shop</h1>
            <Link href="/shops" className="text-sm underline text-zinc-700">
              Back
            </Link>
          </div>
          <p className="text-sm text-zinc-700">Shop not found.</p>
        </main>
      </div>
    );
  }

  const mapsUrl = buildGoogleMapsUrl(shop.address);

  return (
    <div className="min-h-screen bg-zinc-50 flex justify-center">
      <main className="w-full max-w-sm bg-white px-4 py-5 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-semibold truncate">{shop.name}</h1>
          <Link href="/shops" className="text-sm underline text-zinc-700">
            Back
          </Link>
        </div>

        {/* Photos (simple "slide" via horizontal scroll) */}
        <div className="-mx-4 px-4">
          <div className="flex gap-3 overflow-x-auto pb-1 snap-x snap-mandatory">
            {shop.images.map((src, idx) => (
              <div key={`${src}-${idx}`} className="min-w-[85%] snap-start">
                <img
                  src={src}
                  alt={`${shop.name} photo ${idx + 1}`}
                  className="h-44 w-full rounded-xl border object-cover"
                />
              </div>
            ))}
          </div>
          <div className="mt-2 text-center text-[11px] text-zinc-500">
            Swipe photos
          </div>
        </div>

        {/* Meta */}
        <div className="mt-4">
          <div className="text-xs text-zinc-600">
            {shop.category} • {shop.area} • {shop.priceRange}
          </div>
          <div className="mt-1 flex items-center gap-2">
            <div className="text-sm font-semibold">{shop.rating.toFixed(1)}</div>
            <div className="text-xs text-zinc-500">({shop.reviewCount})</div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {shop.tags.map((t) => (
              <span
                key={t}
                className="text-[11px] rounded-full bg-zinc-100 px-2 py-1 text-zinc-700"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Address + Map */}
        <div className="mt-5 space-y-2">
          <div className="text-sm font-semibold">Address</div>
          <div className="text-sm text-zinc-700">{shop.address}</div>

          {/* Map = Google Maps link card (no embed) */}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl border bg-zinc-50 p-4"
          >
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">Open in Google Maps</div>
              <div className="text-xs text-zinc-600">↗</div>
            </div>
            <div className="mt-1 text-xs text-zinc-600">
              Tap to view route / nearby
            </div>
          </a>
        </div>

        {/* Description */}
        <div className="mt-5">
          <div className="text-sm font-semibold">About</div>
          <p className="mt-2 text-sm text-zinc-700 leading-6">
            {shop.description}
          </p>
        </div>

        {/* Menu / Price */}
        <div className="mt-5">
          <div className="text-sm font-semibold">Menu / Price</div>
          <div className="mt-2 rounded-xl border">
            {shop.menu.map((m, idx) => (
              <div
                key={m.title}
                className={`flex items-center justify-between px-4 py-3 text-sm ${
                  idx === shop.menu.length - 1 ? "" : "border-b"
                }`}
              >
                <div className="text-zinc-800">{m.title}</div>
                <div className="text-zinc-600">{m.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div className="mt-5">
          <div className="text-sm font-semibold">Availability</div>
          <div className="mt-2 space-y-3">
            {mockSlots.map((s) => (
              <div key={s.date} className="rounded-xl border p-3">
                <div className="text-xs text-zinc-600 mb-2">{s.date}</div>
                <div className="flex flex-wrap gap-2">
                  {s.times.map((t) => (
                    <span
                      key={t}
                      className="text-xs rounded-full border px-3 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-5">
          <div className="text-sm font-semibold">Reviews</div>
          <div className="mt-2 space-y-3">
            {shop.reviews.map((r, idx) => (
              <div key={idx} className="rounded-xl border p-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">{r.user}</div>
                  <div className="text-xs text-zinc-600">{r.score.toFixed(1)}</div>
                </div>
                <p className="mt-2 text-sm text-zinc-700 leading-6">{r.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="fixed bottom-0 left-0 right-0 flex justify-center bg-transparent">
          <div className="w-full max-w-sm bg-white border-t px-4 py-3">
            <Link
              href={`/shops/${shop.id}/booking`}
              className="block w-full rounded-md bg-black py-3 text-center text-sm font-medium text-white"
            >
              Book now
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
