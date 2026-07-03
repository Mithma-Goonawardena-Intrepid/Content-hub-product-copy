import type {
  Picture,
  Quote,
  TextBlock,
  Video,
} from "~~/lib/types/Contentstack";

type CTA = {
  title: string;
  href: string;
};

export type EditorialScrollBlockPanel = {
  template_type: "templateOne" | "templateTwo" | "templateThree";
  background_position?: "left" | "right";
  media: {
    image_one: Picture[];
    image_two: Picture[];
    image_three: Picture[];
    video?: Video;
    video_image?: Picture[];
  };
  text_block: TextBlock;
  quote: Quote;
  end_link: CTA;
  show_quote: boolean;
};
