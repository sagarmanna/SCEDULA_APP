"use client";

import { useState } from "react";
import AuthGuard from "@/components/AuthGuard";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function WebShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-slate-50">
        <div className="flex">
          <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen((v) => !v)} />
          <div className="flex-1 min-w-0">
            <Topbar onToggleSidebar={() => setSidebarOpen((v) => !v)} />
            <main className="p-6">{children}</main>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}