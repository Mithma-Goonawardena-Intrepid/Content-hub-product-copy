type PhoenixImage = {
  [key: string]: unknown;
};

type PhoenixProfilePicture = {
  [key: string]: unknown;
};

export enum BackgroundColor {
  Map = "#b4d6f4",
}

export type Image = (PhoenixProfilePicture | PhoenixImage) & {
  title?: string;
  backgroundColor?: BackgroundColor;
  link?: string;
  url?: string;
};

export type BannerAspectRatio = "8:11" | "4:3" | "7:3" | "96:25";

export type ImageCropInfo = {
  offset:
    | "center"
    | {
        xPercentage: number;
        yPercentage: number;
      };
  byAspectRatio: {
    xs: BannerAspectRatio;
    sm: BannerAspectRatio;
    md: BannerAspectRatio;
    lg: BannerAspectRatio;
    xl: BannerAspectRatio;
  };
};
