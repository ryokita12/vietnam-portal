"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-zinc-50 flex justify-center">
      <main className="w-full max-w-sm bg-white px-4 py-6 relative">
        {/* ヘッダー（ロゴ） */}
        <div className="flex justify-center mb-6">
          <img
            src="/VietnumPortal_Logo2.png"
            alt="Vietnam Local Guide"
            className="h-28 object-contain"
          />
        </div>

        {/* 検索フォーム（ダミー） */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Search by keyword"
            className="w-full rounded-md border px-3 py-2 text-sm"
          />

          <select className="w-full rounded-md border px-3 py-2 text-sm">
            <option value="">Select category</option>
            <option value="food">Food</option>
            <option value="massage">Massage</option>
          </select>

          <button
            onClick={() => router.push("/shops")}
            className="w-full rounded-md bg-black py-3 text-sm font-medium text-white"
          >
            Search
          </button>
        </div>

        {/* 補足テキスト */}
        <p className="mt-6 text-center text-xs text-zinc-500">
          Discover restaurants and wellness spots in Vietnam
        </p>

        {/* デモ初期化（目立たせない） */}
        <div className="mt-8 text-center">
          <Link
            href="/admin/reset"
            className="text-[11px] text-zinc-400 underline"
          >
            Reset demo
          </Link>
        </div>
      </main>
    </div>
  );
}
