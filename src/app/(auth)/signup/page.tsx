"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  return (
    <div className="bg-white border rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold">Create account</h2>
      <p className="text-sm text-slate-500 mt-1">Sign up to book appointments</p>

      <div className="mt-5 space-y-4">
        <TextInput label="Full Name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
        <TextInput
          label="Mobile"
          placeholder="+91 XXXXX XXXXX"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <Button
          className="w-full"
          onClick={() => {
            router.push(`/otp?to=${encodeURIComponent(mobile || "+91 111 ****** 99")}&name=${encodeURIComponent(name)}`);
          }}
        >
          Sign Up
        </Button>

        <p className="text-sm text-slate-600 text-center">
          Already have an account?{" "}
          <Link className="text-sky-600 hover:underline" href="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}