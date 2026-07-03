import type { JsonRte, Parent } from "../GlobalFields";
import type {
  CommonContentTypeFields,
  SalesRegion,
  LeadInfo,
  SEO,
  Panels,
  TermsAndConditions,
} from "~~/lib/types/Contentstack";

export type Engagement = CommonContentTypeFields & {
  engagement_details?: {
    sales_regions?: SalesRegion[];
    start?: string;
    end?: string;
    exclusive?: boolean;
    terms_and_conditions: TermsAndConditions[];
  };
  published_url?: boolean;
  promotion_settings?: {
    headline?: string;
    description?: JsonRte;
    call_to_action_text?: string;
  };
  external_url?: string;
  lead_info: LeadInfo;
  seo: SEO;
  url: string;
  panels?: Panels;
  parent?: Parent;
};
