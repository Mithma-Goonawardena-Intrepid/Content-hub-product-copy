import type {
  CommonContentTypeFields,
  Picture,
} from "~~/lib/types/Contentstack";

export type SalesRegion = CommonContentTypeFields & {
  direct_phone_number?: string;
  region_code?: string;
  currency_code?: string;
  gsa_logo?: Array<Picture>;
  overseas_phone_number?: string;
  tailor_made_phone_number?: string;
  address?: string;
  display_name?: string;
};
