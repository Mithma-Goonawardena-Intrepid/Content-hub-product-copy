import type { LeadInfo } from "../GlobalFields";
import type { Panels } from "../Blocks/Panels";
import type { CommonContentTypeFields } from "./Common";
import type { UniqueSellingPoint } from "./UniqueSellingPoint";
import type { SEO, ElementsRef } from "~~/lib/types/Contentstack";

type Illustration = {
  illustration: string;
};

export type Theme = CommonContentTypeFields & {
  title?: string;
  lead_info: LeadInfo;
  url: string;
  illustration: Illustration;
  elements_ref?: ElementsRef;
  product_messaging?: string;
  product_usp?: UniqueSellingPoint[];
  seo: SEO;
  panels?: Panels;
};
