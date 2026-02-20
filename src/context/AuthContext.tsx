"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Role = "patient" | "doctor" | "admin";

type AuthState = {
  isAuthed: boolean;
  role: Role;
  userName: string;
};

type AuthCtx = AuthState & {
  login: (payload: { userName: string; role?: Role }) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthCtx | null>(null);

const STORAGE_KEY = "schedula_auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    isAuthed: false,
    role: "patient",
    userName: "Priya",
  });

  useEffect(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as AuthState;
      setState(parsed);
    } catch {}
  }, []);

  function login(payload: { userName: string; role?: Role }) {
    const next: AuthState = {
      isAuthed: true,
      role: payload.role ?? "patient",
      userName: payload.userName || "Priya",
    };
    setState(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function logout() {
    const next: AuthState = { isAuthed: false, role: "patient", userName: "Priya" };
    setState(next);
    localStorage.removeItem(STORAGE_KEY);
  }

  const value = useMemo<AuthCtx>(() => ({ ...state, login, logout }), [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}