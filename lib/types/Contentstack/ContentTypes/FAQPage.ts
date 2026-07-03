import type { LeadInfo, Parent } from "../GlobalFields";
import type {
  CommonContentTypeFields,
  SEO,
  Panels,
  Banner,
  JsonRte,
} from "~~/lib/types/Contentstack";

export type FaqPage = CommonContentTypeFields & {
  url: string;
  lead_info: LeadInfo & Banner;
  panels?: Panels;
  seo?: SEO;
  published_url: boolean;
  parent: Parent;
  question?: string;
  answer?: JsonRte;
  call_to_action_text?: string;
};
