"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Button from "@/components/Button";
import { doctors } from "@/data/doctors";

type DayItem = {
  date: Date;
  iso: string; // YYYY-MM-DD
  dayNum: string; // 20
  week: string; // FRI
};

function toISODate(d: Date) {
  // local date -> YYYY-MM-DD
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function getNextDays(count: number): DayItem[] {
  const today = new Date();
  const out: DayItem[] = [];

  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);

    out.push({
      date: d,
      iso: toISODate(d),
      dayNum: String(d.getDate()),
      week: d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
    });
  }
  return out;
}

const morningSlots = [
  "09:30 AM - 09:45 AM",
  "10:00 AM - 10:15 AM",
  "10:30 AM - 10:45 AM",
  "11:00 AM - 11:15 AM",
  "11:30 AM - 11:45 AM",
  "12:00 PM - 12:15 PM",
];

const eveningSlots = [
  "01:00 PM - 01:15 PM",
  "01:30 PM - 01:45 PM",
  "02:00 PM - 02:15 PM",
];

export default function BookingPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const doctor = useMemo(() => doctors.find((d) => d.id === params.id), [params.id]);

  const days = useMemo(() => getNextDays(5), []);
  const [activeISO, setActiveISO] = useState(days[0]?.iso ?? toISODate(new Date()));
  const [slot, setSlot] = useState("");

  if (!doctor) return <div className="bg-white border rounded-2xl p-6">Doctor not found</div>;

  const activeDate = useMemo(() => {
    const found = days.find((x) => x.iso === activeISO);
    return found?.date ?? new Date();
  }, [activeISO, days]);

  const monthLabel = activeDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const canBook = Boolean(slot);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => router.back()} className="text-slate-600 hover:underline">
          ← Back
        </button>
        <h1 className="text-xl font-semibold">Book Appointment</h1>
      </div>

      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 flex items-center gap-4 border-b">
          <img
            src={doctor.avatarUrl}
            className="h-16 w-16 rounded-2xl border object-cover"
            alt={doctor.name}
          />
          <div className="flex-1">
            <div className="font-semibold">{doctor.name}</div>
            <div className="text-sm text-slate-600">
              {doctor.specialty} • {doctor.location}
            </div>
            <div className="text-xs text-slate-500 mt-1">MBBS, MD (Internal Medicine)</div>
          </div>

          <div className="text-sm text-slate-600">
            Fee: <span className="font-semibold">₹{doctor.fee ?? 500}</span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* ✅ REAL Month + Dates */}
          <div>
            <div className="text-sm font-semibold mb-3">{monthLabel}</div>

            <div className="flex flex-wrap gap-3">
              {days.map((x) => (
                <button
                  key={x.iso}
                  onClick={() => {
                    setActiveISO(x.iso);
                    setSlot(""); // reset slot when date changes
                  }}
                  className={[
                    "w-20 rounded-2xl border p-3 text-center",
                    activeISO === x.iso
                      ? "bg-sky-500 text-white border-sky-500"
                      : "bg-white hover:bg-slate-50",
                  ].join(" ")}
                >
                  <div className="text-lg font-semibold">{x.dayNum}</div>
                  <div className="text-xs opacity-90">{x.week}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Slots */}
          <div>
            <div className="text-sm font-semibold mb-3">Select slot</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {morningSlots.map((s) => (
                <Slot key={s} active={slot === s} onClick={() => setSlot(s)} label={s} />
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold mb-3">Evening Slot</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {eveningSlots.map((s) => (
                <Slot key={s} active={slot === s} onClick={() => setSlot(s)} label={s} />
              ))}
            </div>
          </div>

          <Button
            className="w-full"
            disabled={!canBook}
            onClick={() => {
              // ✅ send REAL selected date + slot to review page
              router.push(
                `/review?doctor=${doctor.id}&date=${encodeURIComponent(activeISO)}&slot=${encodeURIComponent(slot)}`
              );
            }}
          >
            Book appointment
          </Button>
        </div>
      </div>
    </div>
  );
}

function Slot({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "rounded-2xl border px-4 py-3 text-sm text-left",
        active ? "border-sky-500 bg-sky-50" : "bg-white hover:bg-slate-50",
      ].join(" ")}
    >
      {label}
    </button>
  );
}