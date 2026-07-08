import type { JsonRte } from "~~/lib/types/Contentstack";

export type CallToAction = {
  display_name?: string;
  description?: JsonRte;
  action: {
    title: string;
    href: string;
    class?: string;
    routerLink?: boolean;
  };
  secondary_action: {
    title: string;
    href: string;
    class?: string;
    routerLink?: boolean;
  };
};
