import type {
  CommonContentTypeFields,
  TripItineraryDay,
} from "~~/lib/types/Contentstack";

export type ProductItinerary = CommonContentTypeFields & {
  itinerary_day: TripItineraryDay[];
};
