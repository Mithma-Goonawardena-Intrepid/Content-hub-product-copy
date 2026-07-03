import type { CommonContentTypeFields } from "./Common";

export type PictureAsset = Omit<CommonContentTypeFields, "content_type"> & {
  url: string;
  content_type: string;
  file_size: string;
  filename: string;
  title: string;
  dimension?: {
    width: number;
    height: number;
  };
};

export type Picture = CommonContentTypeFields & {
  picture?: PictureAsset;
  alt_text?: string;
  description?: string;
  picture_density?: string;
  encoding_type?: string;
};
