import type {
  LeadInfo,
  Parent,
  FeaturedTrips,
  JsonRte,
  BannerCarouselSection,
} from "../GlobalFields";
import type { Engagement } from "./Engagement";
import type { Deal } from "./Deal";
import type { PromotedDestinations } from "./PromotedDestinations";
import type {
  CommonContentTypeFields,
  SEO,
  Banner,
  Theme,
  UniqueSellingPoint,
  Link,
} from "~~/lib/types/Contentstack";
import type { Picture } from "./Picture";

export type HomePromotions = Engagement[] | [];

export type HomeUSPs = {
  usps?: UniqueSellingPoint[];
  media?: unknown[];
};

export type HomePurposeSection = {
  short_description?: JsonRte;
  long_description?: JsonRte;
  picture: Picture[];
  cta: Link;
};

export type Home = CommonContentTypeFields & {
  url: string;
  lead_info: LeadInfo & Banner;
  banner_carousel_section?: BannerCarouselSection[];
  seo: SEO;
  published_url: boolean;
  parent: Parent;
  featured_themes?: Theme[];
  featured_trips_panel: FeaturedTrips[];
  promo: HomePromotions;
  usp_section: HomeUSPs;
  popular_destinations: PromotedDestinations;
  purpose_intro_section: HomePurposeSection;
  promoted_deal: Deal[];
};
