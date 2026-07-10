import type { CommonContentTypeFields } from "./Common";
import type { TripItineraryDay } from "./TripItineraryDay";

export type ProductItinerary = CommonContentTypeFields & {
  itinerary_day: TripItineraryDay[];
};
