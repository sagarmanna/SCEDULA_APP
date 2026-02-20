"use client";

import { useAuth } from "@/context/AuthContext";
import Button from "@/components/Button";

export default function Topbar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const { userName, logout } = useAuth();

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <button onClick={onToggleSidebar} className="text-slate-600 hover:text-slate-900">
          ☰
        </button>
        <div>
          <div className="text-sm font-semibold">Hello, {userName}</div>
          <div className="text-xs text-slate-500">Dombivali, Mumbai</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-slate-100 border grid place-items-center">🔔</div>
        <Button variant="outline" onClick={logout}>
          Logout
        </Button>
      </div>
    </header>
  );
}