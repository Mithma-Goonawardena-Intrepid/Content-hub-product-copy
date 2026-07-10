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
  destination_months?: unknown;
  next_season?: unknown[] | undefined;
  previous_season?: unknown[] | undefined;
  default_trip?: boolean;
};
