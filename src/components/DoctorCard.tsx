"use client";

import Link from "next/link";
import { Doctor } from "@/data/doctors";

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <div className="bg-white border rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition">
      <div className="p-4 flex gap-4">
        <img
          src={doctor.avatarUrl}
          alt={doctor.name}
          className="h-20 w-20 rounded-2xl object-cover border"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="font-semibold truncate">{doctor.name}</div>
              <div className="text-sm text-sky-700">{doctor.specialty}</div>
              <div className="text-xs text-slate-500 mt-1">{doctor.location}</div>
            </div>

            <button className="h-9 w-9 rounded-xl border bg-white hover:bg-slate-50">♡</button>
          </div>

          <div className="mt-2">
            {doctor.availableToday ? (
              <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-1 text-xs">
                Available today
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-slate-50 text-slate-600 border px-2 py-1 text-xs">
                Next available soon
              </span>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="text-xs text-slate-500">
              ⭐ {doctor.rating} • {doctor.reviews.toLocaleString()} reviews
            </div>
            <Link
              href={`/doctor/${doctor.id}`}
              className="text-sm font-medium text-sky-700 hover:underline"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}