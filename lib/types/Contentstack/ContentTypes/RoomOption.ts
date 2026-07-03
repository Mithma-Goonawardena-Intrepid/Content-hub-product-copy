import type { Picture } from "~~/lib/types/Contentstack";

export type RoomOption = {
  display_name: string;
  media: Picture[];
  features: string[];
};
