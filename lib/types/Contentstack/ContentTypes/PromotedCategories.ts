import type { LeadInfo } from "~~/lib/types/Contentstack/GlobalFields";

export type PromotedCategory = {
  url: string;
  lead_info: LeadInfo;
};

export type PromotedCategorySection = {
  display_name: string;
  categories: PromotedCategory[];
};
