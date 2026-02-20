import { Suspense } from "react";
import OtpClient from "./OtpClient";

export default function OtpPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-white border rounded-2xl shadow-sm p-6">
          Loading...
        </div>
      }
    >
      <OtpClient />
    </Suspense>
  );
}