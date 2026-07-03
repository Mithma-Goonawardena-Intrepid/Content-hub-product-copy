import type { JsonRte } from "../GlobalFields/JsonRte";
import type { Picture } from "./Picture";

export const validDestinationInformationTypes = [
  "Best time to visit",
  "Culture and customs",
  "Eating and drinking",
  "Festival and events",
  "Food and drink",
  "Further reading",
  "Geography and environment",
  "History and government",
  "Shopping",
  "Top picks",
  "Other",
] as const;

export type DestinationInformationItem = {
  display_name: string;
  type: (typeof validDestinationInformationTypes)[number];
  description: JsonRte;
  image: Picture[];
};

export type DestinationInformation = DestinationInformationItem[];
