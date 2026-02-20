"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Sidebar({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  const path = usePathname();

  const item = (href: string, label: string) => {
    const active = path === href || (href !== "/home" && path.startsWith(href));
    return (
      <Link
        href={href}
        className={cn(
          "flex items-center gap-3 rounded-xl px-3 py-2 text-sm",
          active ? "bg-sky-50 text-sky-700 border border-sky-100" : "text-slate-700 hover:bg-slate-100"
        )}
      >
        <span className={cn("h-2 w-2 rounded-full", active ? "bg-sky-500" : "bg-slate-300")} />
        <span className={cn(!open && "hidden")}>{label}</span>
      </Link>
    );
  };

  return (
    <aside className={cn("border-r bg-white min-h-screen transition-all", open ? "w-64" : "w-20")}>
      <div className="h-16 flex items-center justify-between px-4 border-b">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-sky-500 text-white grid place-items-center font-bold">S</div>
          {open ? <div className="font-semibold">Schedula</div> : null}
        </div>
        <button onClick={onToggle} className="text-slate-500 hover:text-slate-900">
          {open ? "⟨" : "⟩"}
        </button>
      </div>

      <nav className="p-3 space-y-2">
        {item("/home", "Find a Doctor")}
        {item("/review", "Records")}
        {item("/profile", "Profile")}
      </nav>

      <div className="p-3 mt-auto">
        <div className={cn("rounded-xl bg-slate-50 border p-3 text-xs text-slate-600", !open && "hidden")}>
          Tip: Use search to quickly find doctors.
        </div>
      </div>
    </aside>
  );
}