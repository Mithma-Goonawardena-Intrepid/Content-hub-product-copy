import type { Product, DestinationMonths } from "~~/lib/types/Contentstack";

export type publishDetails = {
  environment: string;
  locale: string;
  time: string;
  user: string;
};

export type CommonContentTypeFields = {
  uid: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
  publish_details: publishDetails;
  type_of_page?: string;
  locale: string;
  title: string;
  _content_type_uid?: string;
  content_type?: {
    uid: string;
  };
};

export type CommonSiteMapContentTypeFields = {
  uid?: string;
  url: string;
  publish_details: publishDetails;
  destination_months?: DestinationMonths;
  next_season?: Product[] | undefined;
  previous_season?: Product[] | undefined;
  default_trip?: boolean;
};
