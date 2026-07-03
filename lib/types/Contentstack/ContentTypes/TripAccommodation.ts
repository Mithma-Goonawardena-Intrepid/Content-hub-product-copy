import type { JsonRte } from "../GlobalFields/JsonRte";
import type { CommonContentTypeFields } from "./Common";
import type { Picture } from "./Picture";

export type Accommodation = CommonContentTypeFields & {
  name: string;
  description?: JsonRte;
  gallery: Picture[];
};

export type TripAccommodation = {
  accommodation?: Accommodation[];
  itinerary_start_day?: number | null;
  itinerary_end_day?: number | null;
};
