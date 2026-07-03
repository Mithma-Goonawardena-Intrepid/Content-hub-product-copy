import type { LeadInfo } from "../GlobalFields";
import type {
  SEO,
  Banner,
  CommonContentTypeFields,
  Panels,
} from "~~/lib/types/Contentstack";

export type Editorial = CommonContentTypeFields & {
  url: string;
  published_url: boolean;
  lead_info: Banner & LeadInfo;
  seo: SEO;
  panels?: Panels;
};
