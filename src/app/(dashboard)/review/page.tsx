"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import Button from "@/components/Button";
import { doctors } from "@/data/doctors";

function formatDate(iso: string) {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export default function ReviewPage() {
  const router = useRouter();
  const params = useSearchParams();

  const doctorId = params.get("doctor") || "2";
  const dateISO = params.get("date") || "";
  const slot = params.get("slot") || "";

  const doctor = useMemo(
    () => doctors.find((d) => d.id === doctorId),
    [doctorId]
  );

  const [openCancel, setOpenCancel] = useState(false);
  const [status, setStatus] = useState<"Active" | "Cancelled">("Active");

  const reportingTime =
    dateISO && slot
      ? `${formatDate(dateISO)} • ${decodeURIComponent(slot)}`
      : "—";

  // ✅ QR DATA (relative link inside app)
  const qrData = `/schedule/sagar-manna`;
const handleAddToGoogleCalendar = () => {
  if (!dateISO || !slot) return;

  const start = new Date(`${dateISO}T10:00:00`);
  const end = new Date(start.getTime() + 30 * 60000);

  const format = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const url =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    `&text=${encodeURIComponent("Doctor Appointment")}` +
    `&dates=${format(start)}/${format(end)}` +
    `&details=${encodeURIComponent(
      `Appointment with ${doctor?.name}`
    )}` +
    `&location=${encodeURIComponent(
      doctor?.location ?? "Clinic"
    )}`;

  window.open(url, "_blank");
};

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="text-slate-600 hover:underline"
        >
          ← Back
        </button>
        <h1 className="text-xl font-semibold">Appointment Scheduled</h1>
      </div>

      {/* CARD */}
      <div className="bg-white border rounded-2xl shadow-sm p-6 space-y-6">
        {/* DOCTOR */}
        <div className="flex items-center gap-4">
          <img
            src={doctor?.avatarUrl}
            alt={doctor?.name}
            className="h-16 w-16 rounded-2xl border object-cover"
          />
          <div className="flex-1">
            <div className="font-semibold">{doctor?.name}</div>
            <div className="text-sm text-slate-600">
              {doctor?.specialty} • {doctor?.location}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              MBBS, MD (Internal Medicine)
            </div>
          </div>

          {status === "Active" && (
            <Button variant="outline" onClick={() => setOpenCancel(true)}>
              Cancel Appointment
            </Button>
          )}
        </div>

        {/* INFO */}
        <div className="rounded-2xl border p-4 bg-slate-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Info k="Appointment No" v="#34" />
            <Info
              k="Status"
              v={status}
              accent={
                status === "Active"
                  ? "text-emerald-700"
                  : "text-rose-600"
              }
            />
            <Info k="Reporting Time" v={reportingTime} />
          </div>

       <Button
  variant="outline"
  className="mt-4"
  onClick={handleAddToGoogleCalendar}
>
  Add to Google Calendar
</Button>
        </div>

        {/* QR CODE */}
        <div className="rounded-2xl border p-4 flex items-center gap-6">
          <div>
            <div className="font-semibold text-sm">Appointment QR</div>
            <div className="text-xs text-slate-500 mt-1">
              Scan at clinic
            </div>
          </div>

          <QRCodeCanvas
            value={qrData}
            size={110}
            bgColor="#ffffff"
            fgColor="#000000"
            level="H"
          />
        </div>

        <Button className="w-full" onClick={() => router.push("/home")}>
          View My Appointments
        </Button>
      </div>

      {/* CANCEL MODAL */}
      {openCancel && (
        <div className="fixed inset-0 bg-black/40 grid place-items-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h2 className="text-lg font-semibold">
              Cancel appointment?
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              This action cannot be undone.
            </p>

            <div className="mt-5 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setOpenCancel(false)}
              >
                Keep
              </Button>
              <Button
                className="bg-rose-600 hover:bg-rose-700"
                onClick={() => {
                  setStatus("Cancelled");
                  setOpenCancel(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Info({
  k,
  v,
  accent,
}: {
  k: string;
  v: string;
  accent?: string;
}) {
  return (
    <div>
      <div className="text-xs text-slate-500">{k}</div>
      <div className={`text-sm font-semibold mt-1 ${accent ?? ""}`}>
        {v}
      </div>
    </div>
  );
}