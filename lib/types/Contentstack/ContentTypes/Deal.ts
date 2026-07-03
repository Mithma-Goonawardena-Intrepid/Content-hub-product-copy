import type {
  SEO,
  Banner,
  SalesRegion,
  LeadInfo,
  CommonContentTypeFields,
  JsonRte,
  Panels,
  TermsAndConditions,
  Product,
  Picture,
  Destination,
  ProductCodeContent,
  FeaturedTrips,
} from "~~/lib/types/Contentstack";

export type Deal = CommonContentTypeFields & {
  deal_settings: {
    short_tagline: string;
    long_tagline: string;
    colour: "sandPlumDark" | "plumDarkSand" | "drakeWhite" | "santoriniWhite";
    type: string;
    headline: string;
    description: JsonRte;
    call_to_action_text?: string;
    deal_thumbnail?: Picture[];
    applies_to_destination: Destination[];
    excluded_product_codes?: ProductCodeContent[];
  };
  url: string;
  published_url: boolean;
  lead_info: Banner & LeadInfo;
  panels?: Panels;
  seo: SEO;
  deal_details: {
    sales_regions: SalesRegion[];
    terms_and_conditions: TermsAndConditions[];
    start: string;
    weighting: number;
    end: string;
    exclusive?: boolean;
  };
  promoted_trips?: Product[];
  featured_trips_panel: FeaturedTrips[];
  dealProducts?: unknown[];
  popular_destinations?: unknown;
  search_configuration?: {
    filter_label: string;
    promotion_numbers: string[];
    enable_filter: boolean;
  };
  dealTrips?: unknown;
};
