"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import LogoUpload from "@/components/LogoUpload"; // ✅ add this

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [remember, setRemember] = useState(true);

  return (
    <div className="bg-white border rounded-2xl shadow-sm p-6">

      {/* ✅ Logo Upload Section */}
      <div className="mb-8 flex justify-center">
        <LogoUpload />
      </div>

      {/* Login Title */}
      <h2 className="text-lg font-semibold">Login</h2>
      <p className="text-sm text-slate-500 mt-1">
        Use mobile number or email
      </p>

      <div className="mt-5 space-y-4">
        <TextInput
          label="Mobile / Email"
          placeholder="login with Mobile or Email"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4"
            />
            Remember Me
          </label>

          <button className="text-sm text-pink-500 hover:underline">
            Forgot Password
          </button>
        </div>

        <Button
          className="w-full"
          onClick={() => {
            router.push(
              `/otp?to=${encodeURIComponent(
                identifier || "+91 111 ****** 99"
              )}`
            );
          }}
        >
          Login
        </Button>

        <div className="flex items-center gap-3 my-2">
          <div className="h-px bg-slate-200 flex-1" />
          <div className="text-xs text-slate-500">Or login With</div>
          <div className="h-px bg-slate-200 flex-1" />
        </div>

        <Button variant="outline" className="w-full">
          <span className="mr-2">G</span> Continue with Google
        </Button>

        <p className="text-sm text-slate-600 text-center mt-4">
          Don&apos;t have an account?{" "}
          <Link className="text-sky-600 hover:underline" href="/signup">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}