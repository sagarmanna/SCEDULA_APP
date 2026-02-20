"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/Button";
import OtpInput from "@/components/OtpInput";

export default function OtpClient() {
  const router = useRouter();
  const params = useSearchParams();

  const to = useMemo(() => params.get("to") || "+91 111 ****** 99", [params]);

  const [otp, setOtp] = useState("");

  return (
    <div className="bg-white border rounded-2xl shadow-sm p-6">
      <button onClick={() => router.back()} className="text-sm text-slate-600 hover:underline">
        ← Back
      </button>

      <h2 className="text-lg font-semibold mt-3">OTP Code Verification</h2>
      <p className="text-sm text-slate-500 mt-2">
        Code has been sent to <span className="font-medium">{to}</span>
      </p>

      <div className="mt-6">
        <OtpInput value={otp} onChange={setOtp} length={4} />
      </div>

      <div className="mt-3 text-sm text-slate-500">
        Resend code in <span className="text-sky-600 font-medium">55 s</span>
      </div>

      <Button
        className="w-full mt-6"
        onClick={() => {
          // mock verify success
          router.push("/home");
        }}
        disabled={otp.length < 4}
      >
        Verify
      </Button>
    </div>
  );
}