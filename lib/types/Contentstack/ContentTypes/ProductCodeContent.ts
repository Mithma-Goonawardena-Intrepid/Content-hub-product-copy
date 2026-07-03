import type {
  CommonContentTypeFields,
  ElementsRef,
  SEO,
} from "~~/lib/types/Contentstack";
import type { ProductVideo } from "./ProductVideo";

export type ProductCodeContent = CommonContentTypeFields &
  ElementsRef & {
    product_code: string;
    seo?: SEO;
    product_video?: ProductVideo[];
  };
