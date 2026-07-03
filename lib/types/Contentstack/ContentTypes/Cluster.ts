import type { Parent } from "../GlobalFields";
import type {
  CommonContentTypeFields,
  LeadInfo,
  SEO,
  Banner,
  Panels,
} from "~~/lib/types/Contentstack";

export type Cluster = CommonContentTypeFields & {
  published_url: boolean;
  url: string;
  lead_info: Banner & LeadInfo;
  seo: SEO;
  panels?: Panels;
  parent: Parent;
};
