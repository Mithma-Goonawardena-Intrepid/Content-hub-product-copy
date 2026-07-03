import type { LeadInfo, Parent } from "../GlobalFields";
import type { CommonContentTypeFields } from "./Common";
import type { UniqueSellingPoint } from "./UniqueSellingPoint";
import type { SEO, Panels, ElementsRef } from "~~/lib/types/Contentstack";

export type Style = CommonContentTypeFields & {
  title?: string;
  lead_info: LeadInfo;
  url: string;
  elements_ref?: ElementsRef;
  inclusions?: string[];
  style_inclusions?: {
    accommodation?: string;
    leader?: string;
    stays?: string;
    experience?: string;
  };
  illustration?: {
    illustration?: string;
  };
  seo?: SEO;
  product_usp?: UniqueSellingPoint[];
  parent: Parent;
  panels: Panels;
};
