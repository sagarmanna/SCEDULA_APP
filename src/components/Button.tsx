"use client";

import React from "react";
import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost";
  size?: "md" | "lg";
};

export default function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-xl font-medium transition focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-sky-500 text-white hover:bg-sky-600",
    outline: "border bg-white hover:bg-slate-50",
    ghost: "hover:bg-slate-100",
  };

  const sizes = {
    md: "h-11 px-4 text-sm",
    lg: "h-12 px-5 text-sm",
  };

  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props} />
  );
}