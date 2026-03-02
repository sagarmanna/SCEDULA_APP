"use client";

import jsPDF from "jspdf";
import QRCode from "qrcode";
import { useRouter } from "next/navigation";
import { InfoCard } from "./InfoCard";
import { InfoRow } from "./InfoRow";

export default function MedicalProfile() {
  const router = useRouter();

  // ✅ REALISTIC PDF
  const handleDownloadPDF = async () => {
    const doc = new jsPDF("p", "mm", "a4");

    const primary = "#2563eb";
    const dark = "#111827";
    const gray = "#6b7280";

    /* ---------- HEADER ---------- */
    doc.setFontSize(18);
    doc.setTextColor(primary);
    doc.text("Medical Summary", 20, 22);

    doc.setFontSize(10);
    doc.setTextColor(gray);
    doc.text("Digital Health Record", 20, 28);

    doc.line(20, 32, 190, 32);

    /* ---------- PATIENT CARD ---------- */
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(20, 38, 170, 90, 4, 4, "F");

    let y = 48;

    const row = (label: string, value: string) => {
      doc.setFontSize(11);
      doc.setTextColor(gray);
      doc.text(label, 28, y);

      doc.setTextColor(dark);
      doc.setFont("helvetica", "bold");
      doc.text(value, 95, y);

      doc.setFont("helvetica", "normal");
      y += 9;
    };

    row("Full Name", "Sagar Manna");
    row("Age", "23 Years");
    row("Gender", "Male");
    row("Blood Group", "O+");
    row("Allergies", "Penicillin");
    row("Medical Condition", "Diabetes Type 2");
    row("Insurance", "Star Health (Valid till 2026)");

    /* ---------- QR CODE ---------- */
    const qrData = "https://scedula-app.vercel.app/login";
    const qrImage = await QRCode.toDataURL(qrData);
    doc.addImage(qrImage, "PNG", 145, 50, 30, 30);

    doc.setFontSize(9);
    doc.setTextColor(gray);
    doc.text("Scan for appointments", 138, 86);

    /* ---------- FOOTER ---------- */
    const date = new Date().toLocaleDateString();
    doc.setFontSize(9);
    doc.text(`Generated on: ${date}`, 20, 285);
    doc.text("© Schedula", 145, 285);

    doc.save("medical-summary.pdf");
  };

  return (
    <div className="space-y-6">
      {/* 🔝 TOP ACTION BAR */}
      <div className="sticky top-0 z-20 bg-white pb-4 flex items-center justify-between">
        <button
          onClick={() => router.push("/home")}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700"
        >
          ← Back to Dashboard
        </button>

        <button
          onClick={handleDownloadPDF}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Download Medical Summary 
        </button>
      </div>

      {/* 🧾 MEDICAL INFO CARDS (UNCHANGED) */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <InfoCard title="Personal Information" color="blue">
          <InfoRow label="Full Name" value="Sagar Manna" />
          <InfoRow label="Gender" value="Male" />
          <InfoRow label="Age" value="23 Years" />
          <InfoRow label="Phone" value="+91 8509031202" />
        </InfoCard>

        <InfoCard title="Physical Details" color="green">
          <InfoRow label="Height" value="175 cm" />
          <InfoRow label="Weight" value="72 kg" />
          <InfoRow label="Blood Group" value="A+" />
        </InfoCard>

        <InfoCard title="Lifestyle" color="purple">
          <InfoRow label="Smoking" value="No" />
          <InfoRow label="Alcohol" value="Occasionally" />
          <InfoRow label="Exercise" value="3 times / week" />
        </InfoCard>

        <InfoCard title="Insurance" color="orange">
          <InfoRow label="Provider" value="Star Health" />
          <InfoRow label="Policy No." value="SH-8899123" />
          <InfoRow label="Valid Till" value="Dec 2026" />
        </InfoCard>

        <InfoCard title="Medical Conditions" color="red">
          <InfoRow label="Chronic Disease" value="Diabetes Type 2" />
          <InfoRow label="Blood Pressure" value="Normal" />
        </InfoCard>

        <InfoCard title="Allergies" color="yellow">
          <InfoRow label="Drug Allergy" value="Penicillin" />
          <InfoRow label="Food Allergy" value="None" />
        </InfoCard>
      </div>
    </div>
  );
}