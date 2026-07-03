export type TripItineraryDay = {
  first_day_number: number;
  last_day_number: number;
  day_title: string;
  description?: string;
  special_information?: string;
  breakfast?: number;
  lunch?: number;
  dinner?: number;
  accommodation_name?: string;
  accommodation_type?: string;
  accommodation_nights: number;
  included_activities?: string[];
  optional_activities?: string[];
};
