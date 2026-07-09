import { getManagementStack, runtimeConfig } from "./Client";

export const PRODUCT_CONTENT_TYPE_UID = "product";
export const PRODUCT_PAGE_SIZE = 100;

export const PRODUCT_REFERENCE_FIELDS = [
  "lead_info.hero_image",
  "countries_visited",
  "main_country",
  "map",
  "style",
  "theme",
  "product_information",
  "product_images",
  "product_itinerary",
] as const;

const normalizeManagementHost = (host?: string): string =>
  (host || "api.contentstack.io")
    .replace(/^cdn\./, "api.")
    .replace(/^eu-cdn\./, "eu-api.");

export const getProductManagementHost = (): string =>
  normalizeManagementHost(runtimeConfig.runtimeHost);

export const getProductManagementStack = () =>
  getManagementStack(runtimeConfig.branchAlias || undefined);

export const getLocaleQueryParam = (localeIso: string): string | undefined => {
  const normalized = localeIso.trim().toLowerCase();

  // Delivery API with includeFallback is usually tolerant for "en".
  // On management API, forcing locale="en" can hide entries in master locale (often en-us).
  if (!normalized || normalized === "en") {
    return undefined;
  }

  return localeIso;
};
