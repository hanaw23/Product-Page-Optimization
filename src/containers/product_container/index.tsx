"use client";

import { useEffect, useState, useRef, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { HeadNavigationContext } from "@product-page-opt/context";
import { ProductCardComponent, InfiniteScrollListComponent, LoadingSpinnerComponent } from "@product-page-opt/components";
import { page_names } from "@product-page-opt/constants";
import { debounce } from "@product-page-opt/utils";
import { useLazyGetAllProductsQuery, useLazyGetListProductsByCategoriesQuery } from "@product-page-opt/services/product_service";

const ProductListContainer = () => {
  const router = useRouter();
  const filterContext = useContext(HeadNavigationContext);
  const { tagFilter } = filterContext;
  const searchParams = useSearchParams();
  const filterName = searchParams.get("filter") || "";

  const paramSelect = "name,image,rating,cookTimeMinutes,servings,caloriesPerServing";
  const [productTrigger, { isLoading: loadingAllProduct, error }] = useLazyGetAllProductsQuery();
  const [productsByCategoriesTrigger, { data: productsByCategoryData, isLoading: productsByCategoryisLoading }] = useLazyGetListProductsByCategoriesQuery();

  const isFilteredData = productsByCategoryData && filterName && tagFilter;
  const isLoadingData = isFilteredData ? productsByCategoryisLoading : loadingAllProduct;

  const [products, setProducts] = useState<ProductData[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const fetchedPages = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (!isLoadingData) {
      setInitialLoading(false);
    }
  }, [isLoadingData]);

  const debouncedSetProducts = useRef(
    debounce((newProducts: ProductData[]) => {
      setProducts((prev) => [...(prev ?? []), ...newProducts]);
    }, 300)
  ).current;

  const fetchListProducts = async (page: number) => {
    if (fetchedPages.current.has(page)) return;

    fetchedPages.current.add(page);

    try {
      const response = await productTrigger({
        limit: 20,
        skip: page * 20,
        select: paramSelect,
      }).unwrap();

      debouncedSetProducts(response.products);

      if (response.products.length < 10) {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchListProducts(page);
  }, [page]);

  useEffect(() => {
    if (filterName && tagFilter) {
      productsByCategoriesTrigger(tagFilter);
    }
  }, [filterName, tagFilter]);

  const navigatePage = (id: number, title: string) => {
    router.push(`/${page_names.product_detail_page}?id=${id}&title=${title}`);
  };

  return (
    <>
      {initialLoading ? (
        <LoadingSpinnerComponent height={50} width={50} className="py-20" />
      ) : (
        <div className="max-w-screen overflow-x-hidden">
          <div className="sm:my-10 sm:py-4">
            <div className="mb-2 sm:mb-10">
              <h2 className="font-bold text-2xl sm:text-4xl flex flex-col sm:flex-row sm:justify-center text-center sm:gap-2 sm:mb-6">
                Explore All<p className={`text-[#f2683a]`}>{tagFilter ? `${tagFilter} Products` : "Products"}</p>
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-10 py-3 sm:py-6">
              {isFilteredData ? (
                <>
                  {productsByCategoryData?.products?.map((product, index) => {
                    return (
                      <div key={index} onClick={() => navigatePage(product.id, product.title)} className="cursor-pointer">
                        <ProductCardComponent key={index} data={product} onNavigate={navigatePage} />
                      </div>
                    );
                  })}
                </>
              ) : (
                <InfiniteScrollListComponent data={products} page={page} setPage={setPage} hasMore={hasMore} isLoading={initialLoading} error={error}>
                  {(product, index) => (
                    <div key={index} onClick={() => navigatePage(product.id, product.title)} className="cursor-pointer">
                      <ProductCardComponent key={index} data={product as ProductData} onNavigate={() => navigatePage(product.id, product.title)} />
                    </div>
                  )}
                </InfiniteScrollListComponent>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductListContainer;
