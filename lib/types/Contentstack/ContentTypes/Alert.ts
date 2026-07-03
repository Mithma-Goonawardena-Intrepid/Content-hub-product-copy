import type { IHtmlToJsonElementTagsAttributes } from "@contentstack/json-rte-serializer";
import type { CommonContentTypeFields } from "~~/lib/types/Contentstack";

type AlertEntry = {
  updated_date: string;
  description: IHtmlToJsonElementTagsAttributes;
};

type AlertDescription = {
  display_name: string;
  update_entry: AlertEntry[];
};

type AlertBar = {
  name: string;
  message: string;
  impacted_destination?: [];
  push_to_destination: boolean;
  push_to_product: boolean;
  push_to_homepage: boolean;
};

export type Alert = CommonContentTypeFields & {
  alert_description: AlertDescription;
  alert_bar: AlertBar;
};
