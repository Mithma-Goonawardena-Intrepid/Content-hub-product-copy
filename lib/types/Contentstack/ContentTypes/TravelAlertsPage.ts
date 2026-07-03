import type { LeadInfo, Parent } from "../GlobalFields";
import type {
  CommonContentTypeFields,
  SEO,
  Headline,
  Panel,
} from "~~/lib/types/Contentstack";

export type TravelAlertsPage = CommonContentTypeFields & {
  url: string;
  lead_info: LeadInfo;
  seo?: SEO;
  headline: Headline;
  panels: Panel[];
  parent: Parent;
};
