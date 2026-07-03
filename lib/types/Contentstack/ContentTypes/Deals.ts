import type { LeadInfo } from "../GlobalFields";
import type {
  SEO,
  Banner,
  CommonContentTypeFields,
  USP,
  PromotedDestinations,
} from "~~/lib/types/Contentstack";

export type Deals = CommonContentTypeFields & {
  url: string;
  lead_info: Banner & LeadInfo;
  seo: SEO;
  popular_destinations: PromotedDestinations;
  usp_panel: USP;
};
