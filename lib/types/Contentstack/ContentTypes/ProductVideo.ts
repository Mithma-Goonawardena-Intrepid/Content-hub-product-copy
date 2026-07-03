import type { CommonContentTypeFields } from "./Common";

export type ProductVideo = CommonContentTypeFields & {
  preview_video?: string;
  full_video?: string;
};
