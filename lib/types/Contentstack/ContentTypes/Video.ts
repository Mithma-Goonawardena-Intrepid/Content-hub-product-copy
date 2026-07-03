import type { CommonContentTypeFields } from "./Common";

export type Video = CommonContentTypeFields & {
  url: string;
};
