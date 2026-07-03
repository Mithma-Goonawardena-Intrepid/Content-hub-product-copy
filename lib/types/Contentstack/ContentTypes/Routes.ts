import type { JsonRte } from "../GlobalFields/JsonRte";
import type { Picture } from "./Picture";

export type RouteOption = {
  option_display_name: string;
  description: JsonRte;
  cta_link?: string;
};

export type Route = {
  display_name?: string;
  classification?: Picture[];
  option?: RouteOption[];
};
