import type { Destination, Style, Theme } from "../ContentTypes";
import type { ProductCode } from "../ContentTypes/ProductCode";

export type ReviewPanel = {
  main_country: Destination[];
  destinations_visited: Destination[];
  theme_style: Theme[];
  style: Style[];
  product_code: ProductCode[];
};

export type ReviewPanelWithAdditionalContent = {
  reviewAggregate: unknown;
  reviews: unknown;
};
