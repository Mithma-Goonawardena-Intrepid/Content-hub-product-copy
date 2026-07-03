import type {
  CommonContentTypeFields,
  BannerImage,
  DestinationMonth,
} from "~~/lib/types/Contentstack";

export type DestinationMonthFields = {
  january: DestinationMonth;
  february: DestinationMonth;
  march: DestinationMonth;
  april: DestinationMonth;
  may: DestinationMonth;
  june: DestinationMonth;
  july: DestinationMonth;
  august: DestinationMonth;
  september: DestinationMonth;
  october: DestinationMonth;
  november: DestinationMonth;
  december: DestinationMonth;
};

export type DestinationMonths = CommonContentTypeFields &
  DestinationMonthFields & {
    title: string;
    hero_image?: BannerImage[];
  };
