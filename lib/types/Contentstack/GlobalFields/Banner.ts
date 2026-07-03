import type {
  Deal,
  Editorial,
  Engagement,
  Picture,
  PictureAsset,
  Video,
} from "~~/lib/types/Contentstack";

export type BannerImage = {
  picture?: PictureAsset;
  alt_text?: string;
};

export type BannerType = "desktop" | "mobile";

export type Banner = {
  display_name: string;
  hero_image: BannerImage[];
  mobile_hero_image?: BannerImage[];
  tagline?: string;
  headline?: string;
  sub_heading?: string;
  hero_video?: {
    url: string;
  };
  mobile_hero_video?: {
    url: string;
  };
  is_black_title?: boolean;
};

export type BannerCarouselSection = {
  slot_toggle: boolean;
  slot_reference?: Deal[] | Engagement[] | Editorial[];
  slot_banner_video?: Video;
  slot_banner_heading?: string;
  slot_desktop_image?: Picture[];
  slot_tablet_image?: Picture[];
  slot_mobile_image?: Picture[];
};
