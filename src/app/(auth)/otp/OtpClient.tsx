"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import OtpInput from "@/components/OtpInput";
import { useAuth } from "@/context/AuthContext";

export default function OtpClient() {
  const router = useRouter();
  const params = useSearchParams();
  const to = params.get("to") || "+91 111 ****** 99";
  const name = params.get("name") || "USER";

  const { login } = useAuth();

  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] = useState(55);

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-white border rounded-2xl shadow-sm p-6">
      <div className="flex items-center gap-3">
        <button onClick={() => router.back()} className="text-slate-600 hover:underline">
          ←
        </button>
        <h2 className="text-lg font-semibold">OTP Code Verification</h2>
      </div>

      <p className="text-sm text-slate-500 mt-4 text-center">
        Code has been sent to{" "}
        <span className="font-medium text-slate-700">{to}</span>
      </p>

      <div className="mt-5">
        <OtpInput value={otp} onChange={setOtp} length={4} />
        <div className="text-center text-sm text-slate-500 mt-4">
          Resend code in{" "}
          <span className="text-sky-600 font-medium">{seconds}s</span>
        </div>
      </div>

      <Button
        className="w-full mt-6"
        disabled={otp.replace(/\D/g, "").length < 4}
        onClick={() => {
          login({ userName: name, role: "patient" });
          router.push("/home");
        }}
      >
        Verify
      </Button>
    </div>
  );
}