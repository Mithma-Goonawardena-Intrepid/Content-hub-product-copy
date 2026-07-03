import type { LeadInfo, Parent } from "../GlobalFields";
import type {
  CommonContentTypeFields,
  SEO,
  Banner,
  Destination,
  Video,
  BoatSection,
  FaqPage,
} from "~~/lib/types/Contentstack";
import type { Highlight } from "~~/lib/types/Contentstack/ContentTypes/Highlight";
import type { UniqueSellingPoint } from "~~/lib/types/Contentstack/ContentTypes/UniqueSellingPoint";
import type { PromotedCategorySection } from "~~/lib/types/Contentstack/ContentTypes/PromotedCategories";

export type Categories = {
  destinations_visited: Destination[];
  start_destination: Destination[];
  finish_destination: Destination[];
  theme: Destination[];
};

export type Category = CommonContentTypeFields & {
  url: string;
  lead_info: LeadInfo & Banner;
  seo?: SEO;
  published_url: boolean;
  parent: Parent;
  highlights?: Highlight[];
  boats?: BoatSection;
  categories?: Categories;
  tailor_made_itineraries?: boolean;
  video?: Video[];
  faqs?: FaqPage[];
  product_display_name: string;
  usps?: UniqueSellingPoint[];
  promoted_categories?: PromotedCategorySection[];
};
