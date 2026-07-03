import type { CommonContentTypeFields } from "~~/lib/types/Contentstack";
import type { ElementsRef } from "~~/lib/types/Contentstack/GlobalFields";

export type ProductSubType = CommonContentTypeFields & {
  elements_ref: ElementsRef;
};
