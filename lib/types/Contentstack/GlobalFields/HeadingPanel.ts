export enum HeadingTypes {
  H2 = "H2",
  H3 = "H3",
  H4 = "H4",
  H5 = "H5",
  H6 = "H6",
}

export type Heading = {
  heading_name: string;
  heading_type: HeadingTypes;
  include_in_sub_nav: boolean;
  sub_nav_display_name?: string;
};
