import type { LeadInfo, Parent } from "../GlobalFields";
import type {
  SEO,
  Panels,
  Banner,
  CommonContentTypeFields,
} from "~~/lib/types/Contentstack";

export type ModularPage = CommonContentTypeFields & {
  url: string;
  lead_info: Banner & LeadInfo;
  panels?: Panels;
  seo?: SEO;
  parent: Parent;
};
