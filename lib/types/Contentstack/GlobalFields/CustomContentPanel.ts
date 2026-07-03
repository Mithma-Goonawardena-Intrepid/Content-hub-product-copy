import type { JsonRte } from "./JsonRte";
import type { Picture, Video } from "~~/lib/types/Contentstack";

type CTA = {
  title?: string;
  href?: string;
};

export type CustomContentPanel = {
  display_name?: string;
  description?: JsonRte;
  media?: Video[] | Picture[];
  cta?: CTA;
  second_cta?: CTA;
  reverse_layout?: boolean;
  fill_background?: boolean;
};
