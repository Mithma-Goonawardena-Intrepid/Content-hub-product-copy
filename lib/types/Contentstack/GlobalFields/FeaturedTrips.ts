import type { FeaturedTripsHighlight, Product, Link } from "~~/lib/types/Contentstack";
import type { ProductCode } from "../ContentTypes/ProductCode";

export type FeaturedTrips = {
  display_name: string;
  cta?: Link;
  hide_highlight_text?: boolean;
  reference?: ProductCode[] | FeaturedTripsHighlight[];

  experiences?: FeaturedTripsHighlight[];
  product_codes?: ProductCode[];
  products?: Product[];
};

export type FeaturedTripsWithExperiences = {
  display_name: string;
  experiences?: FeaturedTripsHighlight[];
  product_codes?: ProductCode[];
  cta?: Link;
  hide_highlight_text?: boolean;
};
