import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api_url } from "@product-page-opt/constants";

const { PRODUCT_URL_PATH, BASE_URL } = api_url;

export const productService = createApi({
  reducerPath: "productService",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getAllProduct: builder.query<RecipeListResponse, { limit?: number; skip?: number; select?: string }>({
      query: ({ limit, skip, select }) => {
        const params = new URLSearchParams();

        if (limit !== undefined) params.append("limit", limit.toString());
        if (skip !== undefined) params.append("skip", skip.toString());
        if (select) params.append("select", select);

        return `${PRODUCT_URL_PATH.list_recipes}?${params.toString()}`;
      },
    }),
    getSearchAllProduct: builder.query<RecipeListResponse, { search: string; select?: string }>({
      query: ({ search, select }) => {
        const params = new URLSearchParams();

        if (search) params.append("q", search);
        if (select) params.append("select", select);

        return `${PRODUCT_URL_PATH.list_recipes}/search?${params.toString()}`;
      },
    }),
    getAllProductTags: builder.query<Array<string>, void>({
      query: () => PRODUCT_URL_PATH.list_recipe_tags,
    }),
    getDetailProductById: builder.query<RecipeDetailResponse, number>({
      query: (id: number) => PRODUCT_URL_PATH.detail_recipes(id),
    }),
    getListProductByTags: builder.query<RecipeListResponse, string>({
      query: (tag: string) => PRODUCT_URL_PATH.list_recipes_by_tags(tag),
    }),
  }),
});

export const { useGetAllRecipesQuery, useLazyGetAllRecipesQuery, useLazyGetAllRecipeTagsQuery, useLazyGetListRecipesByTagsQuery, useLazyGetDetailRecipeByIdQuery, useLazyGetSearchAllRecipesQuery } = recipeService;
