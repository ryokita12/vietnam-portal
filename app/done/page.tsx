"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

export default function DonePage() {
  const sp = useSearchParams();

  const shopId = sp.get("shopId") ?? "";
  const date = sp.get("date") ?? "";
  const time = sp.get("time") ?? "";

  const receiptNo = useMemo(() => {
    // デモ用：URLパラメータからそれっぽい控え番号を生成
    const base = `${shopId}|${date}|${time}`;
    let hash = 0;
    for (let i = 0; i < base.length; i++) {
      hash = (hash * 31 + base.charCodeAt(i)) >>> 0;
    }
    return `VN-${String(hash).slice(0, 8).padStart(8, "0")}`;
  }, [shopId, date, time]);

  return (
    <div className="min-h-screen bg-zinc-50 flex justify-center">
      <main className="w-full max-w-sm bg-white px-4 py-6">
        <h1 className="text-xl font-semibold text-center">Booked!</h1>
        <p className="mt-2 text-center text-sm text-zinc-600">
          Your reservation is confirmed (demo).
        </p>

        <div className="mt-6 rounded-xl border p-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-600">Receipt</span>
            <span className="font-semibold">{receiptNo}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-600">Shop</span>
            <span className="font-medium">{shopId || "-"}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-600">Date</span>
            <span className="font-medium">{date || "-"}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-600">Time</span>
            <span className="font-medium">{time || "-"}</span>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <Link
            href="/shops"
            className="block w-full rounded-md bg-black py-3 text-center text-sm font-medium text-white"
          >
            Back to shops
          </Link>

          {shopId ? (
            <Link
              href={`/shops/${shopId}`}
              className="block w-full rounded-md border py-3 text-center text-sm font-medium"
            >
              View shop
            </Link>
          ) : (
            <Link
              href="/"
              className="block w-full rounded-md border py-3 text-center text-sm font-medium"
            >
              Back to home
            </Link>
          )}
        </div>

        <p className="mt-6 text-center text-[11px] text-zinc-500">
          Demo only. No real booking is sent.
        </p>
      </main>
    </div>
  );
}
