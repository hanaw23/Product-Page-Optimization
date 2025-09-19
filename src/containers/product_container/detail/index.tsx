"use client";

import Image from "next/image";
import { useEffect, useContext, useState } from "react";
import { HeadNavigationContext, ModalImageContext } from "@product-page-opt/context";
import { useSearchParams, useRouter } from "next/navigation";
import { useLazyGetDetailProductByIdQuery } from "@product-page-opt/services/product_service";
import { LoadingSpinnerComponent } from "@product-page-opt/components";
import { page_names } from "@product-page-opt/constants";

const ProductDetailContainer = () => {
  const router = useRouter();
  const filterContext = useContext(HeadNavigationContext);
  const modalImageContext = useContext(ModalImageContext);
  const { setCategoryFilter } = filterContext;
  const { setImageModal, setOpenModalImage } = modalImageContext;
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const [productDetailTrigger, { data, isLoading }] = useLazyGetDetailProductByIdQuery();

  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (productId) {
      productDetailTrigger(Number(productId));
    }
  }, [productId]);

  useEffect(() => {
    if (!isLoading) {
      setInitialLoading(false);
    }
  }, [isLoading]);

  const handleNavigateCategoryFilter = (categoryName: string) => {
    router.push(`${page_names.product_page}?filter=${categoryName}`);
    setCategoryFilter(categoryName);
  };

  const handleOpenImageModalPreview = () => {
    setOpenModalImage(true);
    setImageModal(data?.images[0] ?? "");
  };

  return (
    <>
      {initialLoading ? (
        <LoadingSpinnerComponent height={50} width={50} className="py-20" />
      ) : (
        <div className="w-full max-w-[100vw] overflow-x-hidden">
          <div className="px-4 sm:px-6 md:px-8">
            {/* Main Content */}
            <div className="flex flex-col-reverse lg:flex-row justify-between mb-6 gap-6">
              {/* Product Info */}
              <div className="w-full lg:w-[750px]">
                <h1 className="font-bold text-2xl sm:text-3xl mb-6 mx-1">{data?.title}</h1>
                <h1 className="font-semibold text-sm mb-3 mx-1">{data?.description}</h1>
                <h1 className="text-sm mb-3 mx-1">USD {data?.price}</h1>

                <div className="py-2 border border-transparent rounded-b-xl text-xs sm:text-sm mb-4">
                  {/* Categorys */}
                  <div className="my-3">
                    <div className="flex flex-wrap gap-2">
                      {data?.tags?.map((item, index) => (
                        <div key={index} className="bg-slate-100 p-2 rounded-xl shadow-sm text-xs hover:bg-[#f2683a] hover:text-white transition cursor-pointer" onClick={() => handleNavigateCategoryFilter(item)}>
                          #{item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 my-4" />
              </div>

              {/* Image */}
              <div className="relative w-full lg:w-auto cursor-pointer group" onClick={handleOpenImageModalPreview}>
                <Image src={data?.images[0] ?? ""} alt="Pict of meal" className="w-full h-[200px] sm:h-[300px] lg:h-[500px] object-cover rounded-2xl transition duration-300" width={500} height={500} priority />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300">
                  <span className="text-white text-base sm:text-lg font-semibold">Preview</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetailContainer;
