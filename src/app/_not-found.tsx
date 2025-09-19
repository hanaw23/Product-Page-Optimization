import { Suspense } from "react";
import NotFoundClient from "./not-found-client";
import { LoadingSpinnerComponent } from "@product-page-opt/components";

export default function NotFound() {
  return (
    <Suspense fallback={<LoadingSpinnerComponent height={50} width={50} className="py-20" />}>
      <NotFoundClient />
    </Suspense>
  );
}
