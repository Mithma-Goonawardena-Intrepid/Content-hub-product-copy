import type { NotReferencedField } from "~~/lib/types/Contentstack/Fields/NotReferencedField";

export type WebhookPayloadData = {
  locale?: string;
  entry: {
    search_configuration?: {
      filter_label: string;
      promotion_numbers: string[];
      enable_filter: boolean;
    };
    uid: string;
    url?: string;
    deal_details?: {
      sales_regions: NotReferencedField[];
    };
    deal_settings?: {
      push_to_homepage?: boolean;
      applies_to_destination?: NotReferencedField[];
      push_to_destination?: boolean;
    };
  };
  content_type: {
    uid: string;
  };
};

export type ContentstackWebhookPayload = {
  data: WebhookPayloadData;
};
