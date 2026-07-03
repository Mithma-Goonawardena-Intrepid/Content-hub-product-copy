import type { IHtmlToJsonElementTagsAttributes } from "@contentstack/json-rte-serializer";
import type { HayabusaTopDeal } from "../../Hayabusa/TopDeal";
import type { Product } from "./Product";
import type { DestinationInformation } from "./DestinationInformation";
import type { PromotedDestinations } from "./PromotedDestinations";
import type { PromotedCategorySection } from "./PromotedCategories";
import type {
  SEO,
  CommonContentTypeFields,
  Banner,
  LeadInfo,
  FaqPage,
  Video,
  Picture,
  DestinationFacts,
  UniqueSellingPoint,
  Route,
  BoatSection,
  DestinationMonths,
  Cluster,
  Link,
} from "~~/lib/types/Contentstack";
import type { DeparturesByMonth } from "~~/lib/types/Contentstack/ContentTypes/DeparturesByMonth";
import type { Highlight } from "~~/lib/types/Contentstack/ContentTypes/Highlight";
import type { ProfileSection } from "~~/lib/types/Contentstack/ContentTypes/Profile";
import type { ProductCode } from "./ProductCode";
import type { CustomReview } from "./CustomReview";

export const validDestinationTypeUTagPageType = {
  Country: "country",
  Region: "region",
  State: "state",
  Location: "location",
  "Tourist Region": "tourist region",
} as const;

export type FeaturedContent = {
  title: string;
  description: string;
  media: Array<Picture>;
  cta: Link;
  second_cta?: Link;
};

export type Destination = CommonContentTypeFields & {
  code?: string;
  destination_type?: string;
  destination_facts?: DestinationFacts;
  destination_highlights?: Highlight[];
  destination_information?: DestinationInformation;
  departures_by_month: {
    link: DeparturesByMonth[];
  };
  faqs: FaqPage[];
  lead_info: LeadInfo & Banner;
  products: Product[];
  parent_destination: Destination[];
  promoted_destinations?: PromotedDestinations[];
  additional_promoted_destinations?: PromotedDestinations[];
  destination_usps?: UniqueSellingPoint[];
  seo: SEO;
  tailor_made_itineraries?: boolean;
  tailorMadeTripCard?: Picture;
  topDeals: {
    products: Product[];
    deals: HayabusaTopDeal[];
  };
  url: string;
  video: Video[];
  elements_ref?: {
    elements_id: number;
    last_updated: string;
  };
  _in_progress?: boolean;
  promoted_profiles?: ProfileSection;
  promoted_categories?: PromotedCategorySection[];
  destination_routes?: Route[];
  promoted_boats?: BoatSection;
  product_start_finish_destination?: {
    show_products_by_start_finish_destination: boolean;
    finish_description?: IHtmlToJsonElementTagsAttributes;
    start_description?: IHtmlToJsonElementTagsAttributes;
  };
  destination_months?: DestinationMonths[];
  destination_seasons?: {
    display_name: string;
    seasons: Cluster[];
  };
  feature_trips?: {
    display_name: string;
    reference: ProductCode[];
  };
  custom_review_content?: CustomReview;
  show_featured_content?: boolean;
  featured_content_entry?: FeaturedContent[];
};
