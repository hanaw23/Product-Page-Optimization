interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface Dimension {
  width: number;
  height: number;
  depth: number;
}

interface ProductData {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  tags: Array<string>;
  stock: number;
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimension;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Array<Review>;
  returnPolicy: string;
  images: Array<string>;
  minimumOrderQuantity: number;
}

interface ProductListData extends BaseMeta {
  products: Array<ProductData>;
}

type ProductListResponse = ProductListData;
type ProductDetailResponse = ProductData;
