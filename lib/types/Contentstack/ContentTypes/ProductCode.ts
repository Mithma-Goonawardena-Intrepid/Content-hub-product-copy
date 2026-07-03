import type {
  CommonContentTypeFields,
  Product,
} from "~~/lib/types/Contentstack";

export type Products = {
  products: Product[];
  default_trip: boolean;
};

export type ProductCode = CommonContentTypeFields & {
  products: Products[];
  product_code: string;
};
