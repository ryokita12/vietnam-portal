"use client";

import { useState } from "react";
import Link from "next/link";

const KEYS = [
  "vn_portal_bookings",
  "vn_portal_bookedSlots",
];

export default function ResetDemoPage() {
  const [done, setDone] = useState(false);

  const handleReset = () => {
    if (typeof window === "undefined") return;
    KEYS.forEach((k) => localStorage.removeItem(k));
    setDone(true);
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex justify-center">
      <main className="w-full max-w-sm bg-white px-4 py-6">
        <h1 className="text-lg font-semibold text-center">Demo Reset</h1>
        <p className="mt-2 text-center text-sm text-zinc-600">
          Clear demo data stored on this device.
        </p>

        <div className="mt-6 rounded-xl border p-4 space-y-3">
          <ul className="text-sm text-zinc-700 list-disc pl-5">
            <li>Bookings</li>
            <li>Booked time slots</li>
          </ul>

          <button
            onClick={handleReset}
            className="mt-4 w-full rounded-md bg-red-600 py-3 text-sm font-medium text-white"
          >
            Reset demo data
          </button>

          {done && (
            <p className="text-center text-xs text-green-600">
              Demo data has been reset.
            </p>
          )}
        </div>

        <div className="mt-6 space-y-3">
          <Link
            href="/"
            className="block w-full rounded-md border py-3 text-center text-sm font-medium"
          >
            Back to home
          </Link>
          <Link
            href="/shops"
            className="block w-full rounded-md border py-3 text-center text-sm font-medium"
          >
            Go to shops
          </Link>
        </div>

        <p className="mt-6 text-center text-[11px] text-zinc-500">
          Demo utility page. Keep this URL private.
        </p>
      </main>
    </div>
  );
}
