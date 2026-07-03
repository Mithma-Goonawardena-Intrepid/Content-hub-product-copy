import type { IHtmlToJsonElementTagsAttributes } from "@contentstack/json-rte-serializer";
import type { Banner } from "./Banner";
import type { PictureAsset } from "~~/lib/types/Contentstack";

export type ThumbnailImage = {
  picture: PictureAsset;
  alt_text: string;
};

type Introduction = {
  tagline?: string;
  long_description?: IHtmlToJsonElementTagsAttributes;
  thumbnail_image: Array<ThumbnailImage>;
  short_description?: IHtmlToJsonElementTagsAttributes;
};

export type LeadInfo = Introduction & Banner;
