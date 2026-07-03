import type { Destination, Product, Style, Theme } from "../ContentTypes";
import type { ProductCode } from "../ContentTypes/ProductCode";

export type ProductPanel = {
  main_country: Destination[];
  destinations_visited: Destination[];
  theme_style: Theme[];
  style: Style[];
  product_code: ProductCode[];
  tailor_made_itineraries: boolean;
  enable_filter: boolean;
  show_only_discounted_trips: boolean;
  _metadata: {
    uid: string;
  };
};

export type TripPanel = {
  isTailorMadeTripCardVisible: boolean;
  products: Product[];
  isEnableFilter: boolean;
  showOnlyDiscountedTrips: boolean;
  uid?: string;
  tailorMadeContent?: unknown;
};
