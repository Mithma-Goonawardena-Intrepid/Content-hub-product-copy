import type { ProductInformation } from "./ProductInformation";
import type { ProductSubType } from "./ProductSubType";
import type {
  CommonContentTypeFields,
  LeadInfo,
  Destination,
  SalesRegion,
  Price,
  PriceDate,
  Picture,
  Style,
  ProductItinerary,
  Theme,
  Boat,
  ProductCodeContent,
  ProductCampaign,
  TripAccommodation,
} from "~~/lib/types/Contentstack";
import type { ElementsRef } from "~~/lib/types/Contentstack/GlobalFields";
import type { Image } from "~~/lib/types/Image.ts";

type ProductSeasonalContent = {
  trip_accommodation?: TripAccommodation[];
  trip_upsell?: Product[];
};

export type Product = CommonContentTypeFields & {
  countries_visited: Destination[];
  duration?: number;
  elements_ref: ElementsRef;
  lead_info: LeadInfo;
  effective_from?: string;
  effective_to?: string;
  excluded_sale_region: SalesRegion[];
  non_refundable_deposit: boolean;
  finish_location: Destination[];
  from_price_discount?: Price;
  from_price_original?: Price;
  main_country: Destination[];
  marketing_rating?: number;
  map: Picture[];
  product_code: string;
  default_trip: boolean;
  published_to_web: boolean;
  start_location: Destination[];
  next_season: Product[] | undefined;
  previous_season: Product[] | undefined;
  product_information: ProductInformation[];
  product_itinerary: ProductItinerary[];
  style: Style[];
  theme: Theme[];
  url?: string;
  start_country?: Destination[];
  finish_country?: Destination[];
  minimum_age?: number;
  maximum_age?: number;
  minimum_group_size?: number;
  maximum_group_size?: number;
  physical_rating?: number;
  accommodations?: string[];
  transport?: string[];
  breakfast?: number;
  lunch?: number;
  dinner?: number;
  review_rating?: number;
  review_count?: number;
  product_images?: Picture[];
  carbon_calculation?: number;
  boat: Boat[];
  runs_in_reverse?: Product[];
  product_sub_type?: ProductSubType[];
  product_code_seo: ProductCodeContent[];
  deposit_from?: Price;
  deposit_to?: Price;
  deposit_pay_in_full_days?: number;
  tourist_regions_visited: Destination[];
  new_trip?: boolean;
  campaign: ProductCampaign;
  partner_product_type?: string;
  deals?: string[];
  promotion_name?: string;
  promotion_priority?: string;
  lowest_price_date?: PriceDate | string;
  lowest_child_price?: number | null;
  lowest_child_discounted_price?: number | null;
  number_of_deals?: number;
  product_seasonal_content?: ProductSeasonalContent[];
  highlightText?: string;
  highlightImage?: Image;
};
