import type { IHtmlToJsonElementTagsAttributes } from "@contentstack/json-rte-serializer";
import type { ThumbnailImage } from "~~/lib/types/Contentstack/GlobalFields/LeadInfo";

export type Profile = {
  first_name: string;
  last_name?: string;
  profile_picture: Array<ThumbnailImage>;
  role: string;
  description: IHtmlToJsonElementTagsAttributes;
};

export type ProfileSection = {
  display_name: string;
  description: IHtmlToJsonElementTagsAttributes;
  profiles: Profile[];
};
