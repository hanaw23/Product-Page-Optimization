const BASE_URL = "https://dummyjson.com/";

const PRODUCT_URL_PATH = {
  list_products: `products`,
  detail_product: (id: number) => `products/${id}`,
  list_products_category: () => `products/category-list`,
  list_products_by_category: (category: string) => `products/category/${category}`,
};

export { PRODUCT_URL_PATH, BASE_URL };
