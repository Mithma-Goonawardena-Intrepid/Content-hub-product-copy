import type { LeadInfo } from "../GlobalFields";
import type { CommonContentTypeFields, SEO } from "~~/lib/types/Contentstack";

export type Headline = {
  headline: string;
  sub_heading: string;
};

export type WildlandtrekkingRegistrationPage = CommonContentTypeFields & {
  url: string;
  lead_info?: LeadInfo;
  seo?: SEO;
  headline: Headline;
};
