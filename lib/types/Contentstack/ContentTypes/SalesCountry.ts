import type { CommonContentTypeFields } from "~~/lib/types/Contentstack";

export type SalesCountry = CommonContentTypeFields & {
  country_code?: string;
  phone_number?: string;
};
