"use client";

import { Suspense } from "react";
import { Provider } from "react-redux";
import { HeadNavigationProvider } from "@product-page-opt/context";
import { store } from "@product-page-opt/stores/index";
import { LoadingSpinnerComponent } from "@product-page-opt/components";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <Suspense fallback={<LoadingSpinnerComponent height={50} width={50} className="py-20" />}>
        <HeadNavigationProvider>{children}</HeadNavigationProvider>
      </Suspense>
    </Provider>
  );
};

export default Providers;
