import type { Picture } from "../ContentTypes";
import type { TextBlock } from "~~/lib/types/Contentstack/GlobalFields/TextBlock";

export type BannerBlockPanel = {
  layout: "Fullwidth" | "Left" | "Right";
  text_block: TextBlock;
  media: {
    image?: Picture[];
    video?: {
      url: string;
    };
  };
};
