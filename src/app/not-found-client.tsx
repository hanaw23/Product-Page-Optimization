"use client";

import { useSearchParams } from "next/navigation";

export default function NotFoundClient() {
  const searchParams = useSearchParams();
  const msg = searchParams.get("msg");

  return (
    <div className="text-center py-20">
      <h1 className="text-2xl font-bold text-red-500">404 | Not Found</h1>
      {msg && <p className="mt-4 text-gray-600">{msg}</p>}
    </div>
  );
}
