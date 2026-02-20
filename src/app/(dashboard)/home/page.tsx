"use client";

import { useMemo, useState } from "react";
import DoctorCard from "@/components/DoctorCard";
import { doctors } from "@/data/doctors";

export default function HomePage() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return doctors;
    return doctors.filter((d) => {
      const hay = `${d.name} ${d.specialty} ${d.location}`.toLowerCase();
      return hay.includes(s);
    });
  }, [q]);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Find a Doctor</h1>
        <div className="text-sm text-slate-500">Search & book appointments</div>
      </div>

      <div className="bg-white rounded-2xl border p-3 shadow-sm">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full outline-none text-sm px-2 py-2"
          placeholder="Search Doctors (name / specialty / location)"
        />
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((d) => (
          <DoctorCard key={d.id} doctor={d} />
        ))}
      </div>
    </div>
  );
}