import type { Destination } from "~~/lib/types/Contentstack";
export type ProductPoint = {
  name: string;
  address: string;
  phone: string;
  fax: string;
  destination: Destination[];
  details: string;
  description: string;
  instructions: string;
};
