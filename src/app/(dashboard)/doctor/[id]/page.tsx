"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Button from "@/components/Button";
import { doctors } from "@/data/doctors";

export default function DoctorDetailsPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const doctor = useMemo(() => doctors.find((d) => d.id === params.id), [params.id]);

  if (!doctor) {
    return (
      <div className="bg-white border rounded-2xl p-6">
        Doctor not found.{" "}
        <button className="text-sky-700 underline" onClick={() => router.push("/home")}>
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => router.back()} className="text-slate-600 hover:underline">
          ← Back
        </button>
        <h1 className="text-xl font-semibold">Book Appointment</h1>
      </div>

      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 flex flex-col lg:flex-row gap-6">
          <div className="flex items-start gap-4 flex-1">
            <img
              src={doctor.avatarUrl}
              alt={doctor.name}
              className="h-24 w-24 rounded-2xl border object-cover"
            />
            <div>
              <div className="text-xl font-semibold">{doctor.name}</div>
              <div className="text-sm text-slate-600">
                {doctor.specialty} • {doctor.location}
              </div>
              <div className="text-sm text-slate-500 mt-1">
                MBBS, MD (Internal Medicine)
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:w-[420px]">
            <Stat label="patients" value={`${doctor.patients.toLocaleString()}+`} />
            <Stat label="years exper." value={`${doctor.experienceYears}+`} />
            <Stat label="rating" value={`${doctor.rating}`} />
            <Stat label="reviews" value={`${doctor.reviews.toLocaleString()}`} />
          </div>
        </div>

        <div className="px-6 pb-6">
          <h3 className="font-semibold">About Doctor</h3>
          <p className="text-sm text-slate-600 mt-2">{doctor.about}</p>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoRow k="Service" v="Medicare" />
            <InfoRow k="Specialization" v={doctor.specialty} />
            <InfoRow k="Availability" v="Monday to Friday" />
            <InfoRow k="Consulting Time" v="10 PM to 5 PM" />
          </div>

          <Button
            className="w-full mt-6"
            onClick={() => router.push(`/booking/${doctor.id}`)}
          >
            Book appointment
          </Button>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border bg-slate-50 p-3 text-center">
      <div className="text-sm font-semibold">{value}</div>
      <div className="text-xs text-slate-500 mt-1">{label}</div>
    </div>
  );
}

function InfoRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-2xl border bg-white p-4">
      <div className="text-xs text-slate-500">{k}</div>
      <div className="text-sm font-medium mt-1">{v}</div>
    </div>
  );
}