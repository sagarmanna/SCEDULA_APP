"use client";

import React, { useMemo, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  length?: number;
  value: string;
  onChange: (v: string) => void;
};

export default function OtpInput({ length = 4, value, onChange }: Props) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  const digits = useMemo(() => {
    const arr = value.split("").slice(0, length);
    while (arr.length < length) arr.push("");
    return arr;
  }, [value, length]);

  function setAt(i: number, d: string) {
    const next = digits.slice();
    next[i] = d;
    onChange(next.join(""));
  }

  return (
    <div className="flex gap-3 justify-center">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          inputMode="numeric"
          maxLength={1}
          value={d}
          onChange={(e) => {
            const v = e.target.value.replace(/\D/g, "");
            setAt(i, v);
            if (v && refs.current[i + 1]) refs.current[i + 1]?.focus();
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !digits[i] && refs.current[i - 1]) {
              refs.current[i - 1]?.focus();
            }
          }}
          className={cn(
            "h-12 w-12 text-center text-lg rounded-xl border bg-white outline-none",
            "focus:ring-2 focus:ring-sky-400"
          )}
        />
      ))}
    </div>
  );
}