import type { IHtmlToJsonElementTagsAttributes } from "@contentstack/json-rte-serializer";
import type { ProductCode } from "./ProductCode";

export type CustomReview = {
  product_code: ProductCode[];
  reviewer_name: string;
  review_content: IHtmlToJsonElementTagsAttributes;
};
