"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type SlotDay = { date: string; times: string[] };

const mockSlots: SlotDay[] = [
  { date: "Today", times: ["10:00", "11:30", "14:00", "16:30"] },
  { date: "Tomorrow", times: ["09:30", "12:00", "15:00", "18:00"] },
];

const BOOKING_KEY = "vn_portal_bookings";
const BOOKED_SLOTS_KEY = "vn_portal_bookedSlots";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export default function BookingPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const shopId = params?.id ?? "";

  const [selectedDate, setSelectedDate] = useState<string>(mockSlots[0].date);
  const [selectedTime, setSelectedTime] = useState<string>(mockSlots[0].times[0]);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");

  const timesForDate = useMemo(() => {
    const d = mockSlots.find((x) => x.date === selectedDate);
    return d?.times ?? [];
  }, [selectedDate]);

  const isBooked = (date: string, time: string) => {
    const booked = readJson<Record<string, Record<string, string[]>>>(
      BOOKED_SLOTS_KEY,
      {}
    );
    return Boolean(booked?.[shopId]?.[date]?.includes(time));
  };

  const canSubmit =
    shopId && selectedDate && selectedTime && fullName.trim() && phone.trim() && !isBooked(selectedDate, selectedTime);

  const handleSubmit = () => {
    if (!canSubmit) return;

    // 1) bookings に追加
    const bookings = readJson<any[]>(BOOKING_KEY, []);
    const newBooking = {
      id: `${Date.now()}`,
      shopId,
      date: selectedDate,
      time: selectedTime,
      fullName: fullName.trim(),
      phone: phone.trim(),
      note: note.trim(),
      createdAt: new Date().toISOString(),
    };
    writeJson(BOOKING_KEY, [newBooking, ...bookings]);

    // 2) 予約枠を埋める（簡易）
    const booked = readJson<Record<string, Record<string, string[]>>>(
      BOOKED_SLOTS_KEY,
      {}
    );
    const shopBooked = booked[shopId] ?? {};
    const dayBooked = shopBooked[selectedDate] ?? [];
    if (!dayBooked.includes(selectedTime)) dayBooked.push(selectedTime);
    shopBooked[selectedDate] = dayBooked;
    booked[shopId] = shopBooked;
    writeJson(BOOKED_SLOTS_KEY, booked);

    // 3) 完了画面へ
    router.push(
      `/done?shopId=${encodeURIComponent(shopId)}&date=${encodeURIComponent(
        selectedDate
      )}&time=${encodeURIComponent(selectedTime)}`
    );
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex justify-center">
      <main className="w-full max-w-sm bg-white px-4 py-5 pb-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-semibold">Booking</h1>
          <Link href={`/shops/${shopId}`} className="text-sm underline text-zinc-700">
            Back
          </Link>
        </div>

        {/* Slot selection */}
        <div className="rounded-xl border p-4">
          <div className="text-sm font-semibold mb-3">Select time</div>

          <label className="block text-xs text-zinc-600 mb-1">Date</label>
          <select
            className="w-full rounded-md border px-3 py-2 text-sm mb-3"
            value={selectedDate}
            onChange={(e) => {
              const nextDate = e.target.value;
              setSelectedDate(nextDate);
              const nextTimes =
                mockSlots.find((x) => x.date === nextDate)?.times ?? [];
              setSelectedTime(nextTimes[0] ?? "");
            }}
          >
            {mockSlots.map((s) => (
              <option key={s.date} value={s.date}>
                {s.date}
              </option>
            ))}
          </select>

          <label className="block text-xs text-zinc-600 mb-1">Time</label>
          <div className="flex flex-wrap gap-2">
            {timesForDate.map((t) => {
              const booked = isBooked(selectedDate, t);
              const active = selectedTime === t;
              return (
                <button
                  key={t}
                  type="button"
                  disabled={booked}
                  onClick={() => setSelectedTime(t)}
                  className={[
                    "text-xs rounded-full border px-3 py-2",
                    active ? "bg-black text-white border-black" : "bg-white",
                    booked ? "opacity-40 cursor-not-allowed line-through" : "",
                  ].join(" ")}
                >
                  {t}
                </button>
              );
            })}
          </div>

          {isBooked(selectedDate, selectedTime) && (
            <p className="mt-3 text-xs text-red-600">
              This slot is already booked. Please choose another time.
            </p>
          )}
        </div>

        {/* Form */}
        <div className="mt-4 rounded-xl border p-4 space-y-3">
          <div className="text-sm font-semibold">Your info</div>

          <div>
            <label className="block text-xs text-zinc-600 mb-1">Full name</label>
            <input
              className="w-full rounded-md border px-3 py-2 text-sm"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs text-zinc-600 mb-1">Phone</label>
            <input
              className="w-full rounded-md border px-3 py-2 text-sm"
              placeholder="+84 90 123 4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs text-zinc-600 mb-1">Note (optional)</label>
            <textarea
              className="w-full rounded-md border px-3 py-2 text-sm"
              rows={3}
              placeholder="Any request..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={[
            "mt-5 w-full rounded-md py-3 text-sm font-medium",
            canSubmit ? "bg-black text-white" : "bg-zinc-200 text-zinc-500",
          ].join(" ")}
        >
          Confirm booking
        </button>

        <p className="mt-3 text-center text-[11px] text-zinc-500">
          Demo only (saved in this device)
        </p>
      </main>
    </div>
  );
}
