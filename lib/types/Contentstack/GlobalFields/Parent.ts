import type {
  ModularPage,
  Destination,
  ContactUs,
  Theme,
  Style,
} from "~~/lib/types/Contentstack";

export type Parent = {
  parent: Destination[] | ContactUs[] | Theme[] | Style[] | ModularPage[];
};
