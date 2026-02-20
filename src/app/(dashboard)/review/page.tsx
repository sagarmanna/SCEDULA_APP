"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/Button";
import { doctors } from "@/data/doctors";

function formatDate(iso: string) {
  // iso = YYYY-MM-DD
  // Use local time to avoid timezone shifting
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    weekday: "short",
  });
}

export default function ReviewPage() {
  const router = useRouter();
  const params = useSearchParams();

  const doctorId = params.get("doctor") || "2";
  const dateISO = params.get("date") || ""; // ✅ from booking
  const slot = params.get("slot") || ""; // ✅ from booking

  const doctor = useMemo(() => doctors.find((d) => d.id === doctorId), [doctorId]);

  // Cancel popup
  const [openCancel, setOpenCancel] = useState(false);
  const [status, setStatus] = useState<"Active" | "Cancelled">("Active");

  const reportingTime =
    dateISO && slot ? `${formatDate(dateISO)} • ${decodeURIComponent(slot)}` : "—";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => router.back()} className="text-slate-600 hover:underline">
          ← Back
        </button>
        <h1 className="text-xl font-semibold">Appointment Scheduled</h1>
      </div>

      <div className="bg-white border rounded-2xl shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-4">
          <img
            src={doctor?.avatarUrl}
            alt={doctor?.name}
            className="h-16 w-16 rounded-2xl border object-cover"
          />
          <div className="flex-1">
            <div className="font-semibold">{doctor?.name ?? "Doctor"}</div>
            <div className="text-sm text-slate-600">
              {doctor?.specialty ?? "Specialist"} - {doctor?.location ?? "Location"}
            </div>
            <div className="text-xs text-slate-500 mt-1">MBBS, MD (Internal Medicine)</div>
          </div>

          {/* ✅ Cancel button disappears after cancel */}
          {status === "Active" && (
            <Button variant="outline" onClick={() => setOpenCancel(true)}>
              Cancel Appointment
            </Button>
          )}
        </div>

        <div className="rounded-2xl border p-4 bg-slate-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Info k="Appointment Number" v="#34" />
            <Info
              k="Status"
              v={status}
              accent={status === "Active" ? "text-emerald-700" : "text-rose-600"}
            />
            <Info k="Reporting Time" v={reportingTime} />
          </div>

          <Button variant="outline" className="mt-4">
            Add to calendar
          </Button>
        </div>

        <div className="rounded-2xl border p-4">
          <div className="text-sm font-semibold">Add Patient Details</div>
          <Button variant="outline" className="mt-3">
            + Add Patient Details
          </Button>
        </div>

        <Button className="w-full" onClick={() => router.push("/home")}>
          View My Appointment
        </Button>
      </div>

      {/* Cancel Modal */}
      {openCancel && (
        <div className="fixed inset-0 bg-black/40 grid place-items-center p-4 z-50">
          <div className="w-full max-w-md bg-white rounded-2xl border shadow-lg p-5">
            <h2 className="text-lg font-semibold">Cancel appointment?</h2>
            <p className="text-sm text-slate-600 mt-1">
              Are you sure you want to cancel this appointment?
            </p>

            <div className="mt-5 flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setOpenCancel(false)}>
                No, keep it
              </Button>

              <Button
                className="bg-rose-600 hover:bg-rose-700"
                onClick={() => {
                  setStatus("Cancelled"); // ✅ hides cancel button
                  setOpenCancel(false);
                }}
              >
                Yes, cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Info({ k, v, accent }: { k: string; v: string; accent?: string }) {
  return (
    <div>
      <div className="text-xs text-slate-500">{k}</div>
      <div className={`text-sm font-semibold mt-1 ${accent ?? ""}`}>{v}</div>
    </div>
  );
}