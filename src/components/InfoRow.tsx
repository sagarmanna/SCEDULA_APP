"use client";

export function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-2 last:border-b-0">
      
      {/* Label */}
      <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </span>

      {/* Value */}
      <span className="max-w-[60%] text-right text-sm font-semibold text-slate-800">
        {value || "—"}
      </span>
    </div>
  );
}