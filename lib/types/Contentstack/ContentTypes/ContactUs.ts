import type { LeadInfo } from "../GlobalFields";
import type {
  SEO,
  Banner,
  CommonContentTypeFields,
} from "~~/lib/types/Contentstack";

export type ContactUs = CommonContentTypeFields & {
  title: string;
  url: string;
  lead_info: Banner & LeadInfo;
  seo: SEO;
};
