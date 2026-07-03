import type { PictureAsset } from "~~/lib/types/Contentstack";

export type SEO = {
  meta_title?: string;
  description?: string;
  display_name_append_text?: string;
  open_graph: {
    og_type?: string;
    og_description?: string;
    og_title?: string;
    sharing_image?: PictureAsset;
  };
  no_index?: boolean;
};
