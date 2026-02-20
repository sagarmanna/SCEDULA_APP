"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/Button";

export default function UnablePage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => router.back()} className="text-slate-600 hover:underline">
          ← Back
        </button>
        <h1 className="text-xl font-semibold">Unable to Book</h1>
      </div>

      <div className="bg-white border rounded-2xl shadow-sm p-6">
        <div className="rounded-2xl bg-pink-50 border border-pink-100 p-4 text-sm text-slate-700">
          Sorry Apt slot/consulting time is over. Would you like to make appointment with the next Available slot?
        </div>

        <Button className="w-full mt-6" onClick={() => router.push("/home")}>
          Yes
        </Button>
      </div>
    </div>
  );
}