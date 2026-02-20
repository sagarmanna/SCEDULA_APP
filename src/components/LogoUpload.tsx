"use client";

import { useEffect, useRef, useState } from "react";

const KEY = "schedula_logo_dataurl";

export default function LogoUpload() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dataUrl, setDataUrl] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (saved) setDataUrl(saved);
  }, []);

  function onPick() {
    inputRef.current?.click();
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // allow only image
    if (!file.type.startsWith("image/")) return;

    // max 2MB (optional safety)
    if (file.size > 2 * 1024 * 1024) {
      alert("Image too large. Please select under 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const url = String(reader.result || "");
      setDataUrl(url);
      localStorage.setItem(KEY, url);
    };
    reader.readAsDataURL(file);
  }

  function clearLogo() {
    setDataUrl("");
    localStorage.removeItem(KEY);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="flex flex-col items-center">
      <div
        className="h-28 w-60 rounded-3xl bg-slate-50 border shadow-sm overflow-hidden grid place-items-center cursor-pointer hover:bg-slate-100 transition"
        onClick={onPick}
        title="Click to upload logo"
      >
        {dataUrl ? (
          <img
            src={dataUrl}
            alt="Logo"
            className="h-full w-full object-contain p-3"
          />
        ) : (
          <div className="text-sm font-semibold text-slate-800">Your Logo</div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={onPick}
          className="text-xs px-3 py-2 rounded-xl border bg-white hover:bg-slate-50"
        >
          Upload
        </button>
        {dataUrl ? (
          <button
            type="button"
            onClick={clearLogo}
            className="text-xs px-3 py-2 rounded-xl border bg-white hover:bg-slate-50"
          >
            Remove
          </button>
        ) : null}
      </div>

      <p className="mt-2 text-xs text-slate-500">
        PNG/JPG recommended • max 2MB
      </p>
    </div>
  );
}