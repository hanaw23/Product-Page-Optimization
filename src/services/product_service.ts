import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api_url } from "@product-page-opt/constants";

const { PRODUCT_URL_PATH, BASE_URL } = api_url;

export const productService = createApi({
  reducerPath: "productService",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<ProductListResponse, { limit?: number; skip?: number; select?: string }>({
      query: ({ limit, skip }) => {
        const params = new URLSearchParams();

        if (limit !== undefined) params.append("limit", limit.toString());
        if (skip !== undefined) params.append("skip", skip.toString());

        return `${PRODUCT_URL_PATH.list_products}?${params.toString()}`;
      },
    }),
    getSearchAllProducts: builder.query<ProductListResponse, { search: string; select?: string }>({
      query: ({ search }) => {
        const params = new URLSearchParams();

        if (search) params.append("q", search);

        return `${PRODUCT_URL_PATH.list_products}/search?${params.toString()}`;
      },
    }),
    getAllProductCategories: builder.query<Array<string>, void>({
      query: () => PRODUCT_URL_PATH.list_products_category,
    }),
    getDetailProductById: builder.query<ProductDetailResponse, number>({
      query: (id: number) => PRODUCT_URL_PATH.detail_product(id),
    }),
    getListProductsByCategories: builder.query<ProductListResponse, string>({
      query: (tag: string) => PRODUCT_URL_PATH.list_products_by_category(tag),
    }),
  }),
});

export const { useGetAllProductsQuery, useLazyGetAllProductsQuery, useLazyGetAllProductCategoriesQuery, useLazyGetListProductsByCategoriesQuery, useLazyGetDetailProductByIdQuery, useLazyGetSearchAllProductsQuery } = productService;
