import type { LeadInfo } from "../GlobalFields";
import type {
  CommonContentTypeFields,
  SEO,
  Headline,
} from "~~/lib/types/Contentstack";

export type VisaEntryRequirementsPage = CommonContentTypeFields & {
  url: string;
  lead_info?: LeadInfo;
  seo?: SEO;
  headline: Headline;
};
