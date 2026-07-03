import type { Video, Picture, Quote, TextBlock } from "~~/lib/types/Contentstack";

export type EditorialCarouselPanel = {
  background_position?: "left" | "right";
  media_position: "left" | "right";
  media: {
    video?: Video[];
    images?: Picture[];
  }
  text_block: TextBlock;
  show_quote: boolean;
  quote?: Quote;
};
