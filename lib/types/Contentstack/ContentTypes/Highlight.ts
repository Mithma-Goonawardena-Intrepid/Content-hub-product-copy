import type { LeadInfo } from "~~/lib/types/Contentstack/GlobalFields/LeadInfo";
import type { ProductCode } from "~~/lib/types/Contentstack/ContentTypes/ProductCode";
import type { CommonContentTypeFields } from "./Common";

export type HighlightProduct = {
  products: {
    products: {
      effective_to: string;
      published_to_web: string;
      lead_info: {
        display_name: string;
      };
      url: string;
    }[];
    default_trip: boolean;
  }[];
};

export type Highlight = {
  lead_info: LeadInfo;
  product_codes: HighlightProduct[];
};

export type FeaturedTripsHighlight = CommonContentTypeFields & {
  lead_info: LeadInfo;
  product_codes: ProductCode[];
};
