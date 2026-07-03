import type {
  ThumbnailImage,
  Destination,
  Style,
  Engagement,
  Deal,
  Theme,
  Home,
  Deals,
  Product,
} from "~~/lib/types/Contentstack";

export type SubscriptionPopup = {
  popup_details: {
    weighting: number;
    image?: Array<ThumbnailImage>;
    tagline?: string;
    headline: string;
    cta?: string;
  };
  settings: {
    urls: {
      included_page_types?: string[];
      included_urls?: string[];
      excluded_urls?: [
        | Destination
        | Style
        | Engagement
        | Deal
        | Theme
        | Home
        | Deals
        | Product,
      ];
    };
    scroll_percentage: string;
    show_on_timer: boolean;
    screen_options: {
      show_on_mobile: boolean;
      show_on_desktop: boolean;
    };
  };
  salesforce_tagging: {
    source_type_intrepid?: string;
    intrepid_source?: string;
  };
};
