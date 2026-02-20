"use client";

import React from "react";
import { cn } from "@/lib/utils";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
};

export default function TextInput({ label, hint, className, ...props }: Props) {
  return (
    <label className="block">
      {label ? <div className="text-sm font-medium mb-1">{label}</div> : null}
      <input
        className={cn(
          "w-full h-11 rounded-xl border bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-sky-400",
          className
        )}
        {...props}
      />
      {hint ? <div className="mt-1 text-xs text-slate-500">{hint}</div> : null}
    </label>
  );
}