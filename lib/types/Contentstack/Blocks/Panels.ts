import type {
  ReviewReferencePanel,
  ReviewReferencePanelWithAdditionalContent,
} from "../GlobalFields/ReviewReferencePanel";
import type {
  RichText,
  CallToAction,
  FormPanel,
  ContentPanel,
  UniqueSellingPoint,
  Heading,
  SectionBreak,
  ProductReference,
  MediaPanel,
  ProductPanel,
  TripPanel,
  ReviewPanel,
  ReviewPanelWithAdditionalContent,
  BlogPanel,
  Video,
  FaqPage,
  CustomContentPanel,
  ModularPage,
  Deal,
  Engagement,
  Cluster,
  Style,
  Theme,
  Editorial,
  EditorialScrollBlockPanel,
  EditorialCarouselPanel,
  Link,
} from "~~/lib/types/Contentstack";


export type PanelRichText = {
  rich_text_panel: RichText;
};

export type PanelCallToAction = {
  call_to_action_panel: CallToAction;
};

export type PanelFormPanel = {
  form_panel: FormPanel;
};

export type PanelContent = {
  content_panel: ContentPanel;
};

export type USP = {
  fill_background?: boolean;
  usp: UniqueSellingPoint[];
  heading?: {
    headline: string;
  };
  description?: string;
  cta?: Link;
  display_type: string;
};

export type UniqueSellingPointPanel = {
  usp_panel: USP;
};

export type PanelHeading = {
  heading: Heading;
};

export type SectionBreakPanel = {
  section_break: SectionBreak;
};

export type VisaPanel = {
  visa_panel: {
    visa_widget_enabled: boolean;
  };
};

export type ProductReferencePanel = {
  product_reference_panel: ProductReference;
};

export type ProductReferencePanelWithAdditionalContent = {
  trips: unknown[];
};

export type PanelMedia = {
  media_panel: MediaPanel;
};

export type PanelCustomContent = {
  custom_content_panel: CustomContentPanel;
};

export type PanelBlogPanel = {
  blog_panel: BlogPanel;
};

export type PanelProduct<T> = {
  product_panel: T;
};

export type PanelReview<T> = {
  review_panel: T;
};

export type PanelReviewReference<T> = {
  review_reference_panel: T;
};

export type VideoPanel = {
  video_panel: {
    video: Video[];
  };
};

export type FAQsPanel = {
  faq_panel: {
    faq: FaqPage[];
  };
};

export type KeyMarketingPanel = {
  messages: UniqueSellingPoint[];
};

export type ProductExperiencePanel = {
  featured_trips_group: {
    featured_trips: unknown[];
  };
};

type CommonPanelTypes =
  | PanelRichText
  | PanelCallToAction
  | PanelFormPanel
  | PanelContent
  | UniqueSellingPointPanel
  | PanelHeading
  | SectionBreakPanel
  | PanelMedia
  | PanelBlogPanel
  | VideoPanel
  | VisaPanel
  | PanelProduct<ProductPanel>
  | ProductReferencePanel
  | ProductReferencePanelWithAdditionalContent
  | FAQsPanel
  | PanelCustomContent
  | KeyMarketingPanel;

// Default Panel type, without additional content
export type Panel =
  | CommonPanelTypes
  | PanelProduct<ProductPanel>
  | PanelReview<ReviewPanel>
  | PanelReviewReference<ReviewReferencePanel>;

export type Panels = Panel[];

export type PanelWithAdditionalContent =
  | PanelRichText
  | PanelCallToAction
  | PanelFormPanel
  | UniqueSellingPointPanel
  | PanelHeading
  | SectionBreakPanel
  | ProductReferencePanel
  | ProductReferencePanelWithAdditionalContent
  | PanelContent
  | VideoPanel
  | FAQsPanel
  | CommonPanelTypes
  | PanelProduct<TripPanel>
  | PanelReview<ReviewPanelWithAdditionalContent>
  | PanelReviewReference<ReviewReferencePanelWithAdditionalContent>
  | ProductExperiencePanel
  | EditorialScrollBlockPanel
  | EditorialCarouselPanel;

export type PanelEnabledPages =
  | ModularPage
  | FaqPage
  | Deal
  | Engagement
  | Style
  | Theme
  | Cluster
  | Editorial;
