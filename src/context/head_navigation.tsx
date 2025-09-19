"use client";

import { createContext, useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { page_names } from "@product-page-opt/constants";
import { SearchIcon, NextIcon, BackIcon, FilterIcon } from "@product-page-opt/icons";
import { SearchTextInputComponent } from "@product-page-opt/components";
import { useIsMobile } from "@product-page-opt/hook";
import { useLazyGetAllProductCategoriesQuery } from "@product-page-opt/services/product_service";

interface HeadNavigationContextType {
  data: string[] | undefined;
  isLoading: boolean;
  categoryFilter: string;
  setCategoryFilter: React.Dispatch<React.SetStateAction<string>>;
}

export const HeadNavigationContext = createContext<HeadNavigationContextType>({} as HeadNavigationContextType);

export const HeadNavigationProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathName = usePathname();
  const isMobile = useIsMobile();
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "";
  const filterName = searchParams.get("filter") || "";
  const sizeBackIcon = isMobile ? 15 : 30;
  const isProductPage = pathName === `/${page_names.product_detail_page}`;
  const isHomePage = pathName === `/${page_names.products_page}`;
  const showBackButton = (isMobile && isProductPage) || !isHomePage;
  const showSearchInput = isProductPage || isHomePage;
  const [productCategoriesTrigger, { data, isLoading }] = useLazyGetAllProductCategoriesQuery();
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  useEffect(() => {
    productCategoriesTrigger();
  }, []);

  const navigatePage = (action: "products" | "prev" | "product") => {
    switch (action) {
      case "products":
        router.push(`/${page_names.products_page}`);
        break;
      case "prev":
        router.back();
        break;
      case "product":
      default:
        router.push(`/${page_names.product_detail_page}`);
        break;
    }
  };

  useEffect(() => {
    if (categoryFilter) {
      router.push(`/${page_names.product_page}?filter=${categoryFilter}`);
    }
  }, [categoryFilter]);

  const handleClearFilter = () => {
    setCategoryFilter("");
    navigatePage("products");
  };

  useEffect(() => {
    if (!filterName) {
      setCategoryFilter("");
    } else {
      setCategoryFilter(filterName);
    }
  }, [filterName]);

  return (
    <HeadNavigationContext.Provider value={{ data, isLoading, categoryFilter, setCategoryFilter }}>
      <div className="fixed z-[999] bg-white w-full top-0 shadow-lg shadow-slate-600/10 px-6">
        <div className="flex items-center gap-4 flex-row">
          <div className="flex items-center">
            {showBackButton && (
              <div
                onClick={() => {
                  navigatePage("prev");
                }}
              >
                <BackIcon fill={"#1B1C1B"} className="cursor-pointer text-slate-300 my-1" width={sizeBackIcon} height={sizeBackIcon} />
              </div>
            )}
            <div className="w-[60px] h-[60px] sm:w-[100px] sm:h-[100px]" />
          </div>

          {showSearchInput ? (
            <div className="w-full sm:ml-4">
              <SearchTextInputComponent
                placeholder="Search for Products..."
                prefix={<SearchIcon fill="#0000" className="text-slate-800" width={20} height={20} />}
                suffix={<>{<FilterIcon fill="#0000" className="text-slate-500" width={20} height={20} />}</>}
                isShowFilter
                dataFilter={data}
                loadingFilter={isLoading}
                setFilter={setCategoryFilter}
                selectedFilter={categoryFilter}
                clearFilter={handleClearFilter}
              />
            </div>
          ) : !isMobile ? (
            <div className="flex gap-2 text-sm sm:text-base mx-3 items-center">
              <span
                className="text-[#f2683a] cursor-pointer"
                onClick={() => {
                  navigatePage("product");
                }}
              >
                Products
              </span>
              <NextIcon fill="#D3D3D3" className="text-slate-300 my-1" width={15} height={15} />
              <span>Detail</span>
              <NextIcon fill="#D3D3D3" className="text-slate-300 my-1" width={15} height={15} />
              <span>{name}</span>
            </div>
          ) : null}
        </div>
      </div>

      {children}
    </HeadNavigationContext.Provider>
  );
};
