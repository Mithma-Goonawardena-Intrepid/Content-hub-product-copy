import type { Link } from "~~/lib/types/Contentstack";
type OptionalCTA = {
  title: string;
  href?: string;
};

export type TextBlock = {
  title: string;
  description: string;
  main_link: OptionalCTA;
  sub_link?: Link;
  include_in_sub_nav?: boolean;
  sub_nav_display_name?: string;
  read_story_button_link?: {
    href: string;
  };
};
