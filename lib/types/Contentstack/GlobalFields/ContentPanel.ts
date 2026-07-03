import type { Link } from "~~/lib/types/Contentstack";
import type {
  Boat,
  Destination,
  ModularPage,
  Picture,
  VisaEntryRequirementsPage,
} from "../ContentTypes";
import type { WildlandtrekkingRegistrationPage } from "../ContentTypes/WildlandtrekkingRegistrationPage";
import type { JsonRte } from "./JsonRte";

export enum ContentPanelColumns {
  One = "1 column",
  Two = "2 columns",
  Three = "3 columns",
}

export enum ContentPanelApplyCarouselOn {
  NoCarousel = "No Carousel",
  Mobile = "Mobile",
  TabletMobile = "Tablet, Mobile",
  DesktopTabletMobile = "Desktop, Tablet, Mobile",
}

export enum ContentPanelCardDisplayType {
  Vertical = "Card Vertical",
  VerticalCompact = "Card Vertical Compact",
  Horizontal = "Card Horizontal",
}

export type ContentPanelReferenceContent = {
  reference:
    | ModularPage[]
    | VisaEntryRequirementsPage[]
    | WildlandtrekkingRegistrationPage[]
    | Boat[]
    | Destination[];
  override_display_name?: string;
  override_description?: JsonRte;
  cta_title?: string;
};

export type ContentPanelCustomContent = {
  display_name: string;
  picture?: Picture[];
  description?: JsonRte;
  cta?: Link;
};

export type ContentPanelContent =
  | {
      reference: ContentPanelReferenceContent;
    }
  | {
      custom: ContentPanelCustomContent;
    };

export type ContentPanel = {
  display_desktop: ContentPanelColumns;
  display_tablet: Exclude<ContentPanelColumns, ContentPanelColumns.Three>;
  apply_carousel_on: ContentPanelApplyCarouselOn;
  display_type: ContentPanelCardDisplayType;
  content: ContentPanelContent[];
};
