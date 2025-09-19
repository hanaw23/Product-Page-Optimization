"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { page_names } from "@product-page-opt/constants";

const RootPage = () => {
  useEffect(() => {
    redirect(page_names.products_page);
  }, []);
};

export default RootPage;
