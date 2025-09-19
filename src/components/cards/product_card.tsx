"use client";

import Image from "next/image";
import { CustomButtonComponent } from "@product-page-opt/components";

interface ProductCardProps {
  data: ProductData;
  onNavigate?: (index: number, name: string) => void;
}

const ProductCard = (props: ProductCardProps) => {
  const data = props?.data as ProductData;

  const handleOnClick = () => {
    if (props?.onNavigate) {
      props?.onNavigate(data?.id, data?.name);
    }
  };

  return (
    <div className="rounded-lg shadow-xl shadow-black/30 transform transition-all duration-300 ease-in-out hover:scale-105 hover:z-40 hover:shadow-2xl bg-slate-50 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-4">
      {/* Title */}
      <div className="">
        <div className="font-bold text-base sm:text-2xl text-center truncate mb-4">{data?.title}</div>
        <div className="my-6">
          <p className="text-sm sm:text-sm font-semibold truncate mb-4">{data?.description}</p>
          <p className="text-sm sm:text-base font-semibold">USD {data?.price}</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative w-full">
            {/* Rating badge */}
            <div className="absolute top-2 right-2 px-2 py-1 flex items-center gap-1 z-10 border border-transparent bg-slate-50/90 rounded-2xl">
              <div className="flex">
                <p className="text-sm sm:text-base font-semibold">{data?.rating}</p>
                <p className="text-xs sm:text-sm pt-1 ml-1">/ 5</p>
              </div>
            </div>

            {/* Image */}
            <Image src={data?.images[0] ?? ""} width={450} height={450} alt="Pict of meal" className="rounded-2xl w-full h-auto object-cover" priority />

            {/* Bottom Info */}
            <div className="absolute bottom-0 left-0 right-0 px-3 py-1  sm:px-4 sm:py-2 z-10 border border-transparent bg-slate-50/70 rounded-b-xl text-[10px] sm:text-sm w-full"></div>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="mt-4">
        <CustomButtonComponent
          title="See Full Product"
          className="w-full p-3 bg-slate-900 text-white font-semibold rounded-xl cursor-pointer transition hover:bg-white hover:text-slate-900 hover:border hover:border-slate-900"
          onClick={handleOnClick}
        />
      </div>
    </div>
  );
};

export default ProductCard;
