import type { CommonContentTypeFields } from "./Common";
import type { Picture } from "./Picture";
import type { ProductInformation } from "./ProductInformation";
import type { ProductItinerary } from "./ProductItinerary";
import type { ElementsRef } from "../GlobalFields/ElementsRef";

export type Product = CommonContentTypeFields & {
  elements_ref?: ElementsRef;
  effective_from?: string;
  effective_to?: string;
  marketing_rating?: number;
  published_to_web?: boolean;
  default_trip?: boolean;
  product_information?: ProductInformation[];
  product_itinerary?: ProductItinerary[];
  product_images?: Picture[];
  url?: string;
};
