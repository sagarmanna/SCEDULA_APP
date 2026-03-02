"use client";

import React from "react";

type Color =
  | "blue"
  | "green"
  | "purple"
  | "orange"
  | "red"
  | "yellow";

const accentMap: Record<Color, string> = {
  blue: "border-l-blue-500",
  green: "border-l-green-500",
  purple: "border-l-purple-500",
  orange: "border-l-orange-500",
  red: "border-l-red-500",
  yellow: "border-l-yellow-500",
};

export function InfoCard({
  title,
  children,
  color = "blue",
}: {
  title: string;
  children: React.ReactNode;
  color?: Color;
}) {
  return (
    <div
      className={`
        relative rounded-xl border border-slate-200 bg-white
        p-5 shadow-sm transition
        hover:shadow-md
        border-l-4 ${accentMap[color]}
      `}
    >
      <h3 className="mb-4 text-sm font-semibold tracking-wide text-slate-700">
        {title}
      </h3>

      <div className="space-y-3 text-sm text-slate-600">
        {children}
      </div>
    </div>
  );
}