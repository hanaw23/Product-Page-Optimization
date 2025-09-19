"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { page_names } from "@product-page-opt/constants";
import { debounce } from "@product-page-opt/utils";
import { ClearIcon } from "@product-page-opt/icons";
import { LoadingSpinnerComponent } from "@product-page-opt/components";
import { useLazyGetSearchAllProductsQuery } from "@product-page-opt/services/product_service";

interface ProductData {
  id: number;
  name: string;
}

interface SearchTextInputProps {
  icon?: React.ReactNode | string;
  onSearch?: () => void;
  prefix?: string | React.ReactNode;
  suffix?: string | React.ReactNode;
  placeholder?: string;
  className?: string;
  isShowFilter?: boolean;
  dataFilter?: Array<string>;
  setFilter?: React.Dispatch<React.SetStateAction<string>>;
  selectedFilter?: string;
  loadingFilter?: boolean;
  clearFilter?: () => void;
}

const SearchTextInput = (props: SearchTextInputProps) => {
  const router = useRouter();
  const [trigger] = useLazyGetSearchAllProductsQuery();
  const [value, setValue] = useState<string>("");
  const [data, setData] = useState<ProductData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const debouncedFetchRef = useRef<((query: string) => void) | null>(null);

  useEffect(() => {
    debouncedFetchRef.current = debounce(async (query: string) => {
      if (!query.trim()) {
        setData([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = (await trigger({ search: query, select: "title" }).unwrap()) as ProductListResponse;
        setData(response?.products);
      } catch (error) {
        console.error("Search error:", error);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);
  }, [trigger]);

  useEffect(() => {
    debouncedFetchRef.current?.(value);
  }, [value]);

  const navigatePage = (id?: number, title?: string) => {
    router.push(`/${page_names.product_detail_page}?id=${id}&title=${title}`);
  };

  const renderOptionsDataSearch = useMemo(() => {
    if (!value) return null;

    const showResults = data?.length > 0 && !isLoading;
    const showNoResults = !isLoading && value && data?.length === 0;

    return (
      <div className="absolute top-full left-0 w-full mt-1 z-[999]">
        <div className="bg-white shadow-xl rounded-b-2xl overflow-y-auto max-h-[300px] py-2">
          {isLoading ? (
            <LoadingSpinnerComponent height={25} width={25} />
          ) : showResults ? (
            data.map((item) => (
              <div key={item?.id} className="py-2 px-4 cursor-pointer hover:bg-[#f2683a] hover:text-white" onClick={() => navigatePage(item?.id, item?.title)}>
                <p className="text-sm">{item?.title}</p>
              </div>
            ))
          ) : showNoResults ? (
            <p className="text-sm text-center py-4">No products...</p>
          ) : null}
        </div>
      </div>
    );
  }, [data, value, isLoading]);

  const renderOptionsFilter = useMemo(() => {
    const showResults = props?.dataFilter && props?.dataFilter?.length > 0 && !props?.loadingFilter;
    const showNoResults = !props?.loadingFilter && props?.dataFilter && props?.dataFilter?.length === 0;

    const handleSelectedFilter = (item: string) => {
      if (props?.setFilter) {
        props?.setFilter(item);
      }
      setOpenFilter(false);
    };

    return (
      <div className="absolute top-full left-0 w-full mt-1 z-[999]">
        <div className="bg-white shadow-xl rounded-b-2xl overflow-y-auto max-h-[300px] py-2 px-3">
          {props?.loadingFilter ? (
            <div className="flex justify-center py-4">
              <LoadingSpinnerComponent height={25} width={25} />
            </div>
          ) : showResults ? (
            <div className="flex flex-wrap gap-2 sm:grid sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 sm:gap-4 p-2 sm:p-4">
              {props?.dataFilter?.map((item, index) => (
                <div
                  key={index}
                  className={` px-3 py-2 rounded-xl shadow-sm text-center text-xs hover:bg-[#f2683a] hover:text-white transition cursor-pointer whitespace-nowrap ${
                    item === props?.selectedFilter ? "bg-[#f2683a] font-semibold text-white" : "bg-slate-100"
                  }`}
                  onClick={() => handleSelectedFilter(item)}
                >
                  {item}
                </div>
              ))}
            </div>
          ) : showNoResults ? (
            <p className="text-sm text-center py-4">No tags...</p>
          ) : null}
        </div>
        {}
      </div>
    );
  }, [props]);

  return (
    <div className={`relative w-full ${props.className}`}>
      {/* Input container */}
      <div className={` bg-slate-50 ${props?.prefix || props?.suffix ? "flex justify-between " : ""} border border-slate-300 bg-white rounded-2xl`}>
        {props?.selectedFilter ? (
          <div className="bg-[#f2683a] mx-4 my-2 px-3 py-1 rounded-xl w-fit shadow-sm text-center sm:text-xs text-white cursor-pointer whitespace-nowrap flex justify-between gap-2 text-[12px] font-semibold" onClick={props?.clearFilter}>
            {props?.selectedFilter}
            <ClearIcon fill="#0000" className="text-white" width={18} height={18} />
          </div>
        ) : (
          <>
            {props.prefix && <div className="m-3">{props.prefix}</div>}
            <input
              value={value}
              name="input_text"
              className="w-full bg-transparent border-none outline-none sm:py-3 sm:px-1 text-md placeholder:text-sm sm:placeholder:text-md placeholder:text-slate-500 rounded-2xl"
              placeholder={props.placeholder}
              onChange={(e) => {
                setValue(e.target.value);
                if (props?.setFilter) {
                  props?.setFilter("");
                }
                setOpenFilter(false);
              }}
            />
          </>
        )}
        {props.suffix && (
          <div
            className={`m-3 ${props?.isShowFilter ? "cursor-pointer" : ""}`}
            onClick={() => {
              setOpenFilter(!openFilter);
              setValue("");
            }}
          >
            {props.suffix}
          </div>
        )}
      </div>

      {/* Dropdown Option Search*/}
      {renderOptionsDataSearch}

      {/* Filter */}
      {openFilter && <>{renderOptionsFilter}</>}
    </div>
  );
};

export default SearchTextInput;
