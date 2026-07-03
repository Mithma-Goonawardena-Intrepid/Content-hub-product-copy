import type {
  CommonContentTypeFields,
  LeadInfo,
} from "~~/lib/types/Contentstack";

export type UniqueSellingPoint = CommonContentTypeFields & {
  lead_info: LeadInfo;
  illustration: {
    illustration: string;
  };
  weighting?: number;
  product_usp_description?: string;
};
