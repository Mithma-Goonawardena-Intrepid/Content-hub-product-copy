import type { ProductInformation, ProductItinerary, Picture } from "../../../../lib/types/Contentstack";
import { runtimeConfig } from "../Client";
import { PRODUCT_CONTENT_TYPE_UID, getProductManagementHost } from "./../ManagementConfig";

type UpdateProductFields = {
  product_information?: ProductInformation[];
  marketing_rating?: number;
  product_images?: Picture[];
  product_itinerary?: ProductItinerary[];
};

type UpdateProductErrorResponse = {
  errors?: Record<string, string[]>;
  error_message?: string;
};

const getErrorDetail = (
  payload: UpdateProductErrorResponse | undefined,
  fallback: string,
): string => {
  if (!payload) {
    return fallback;
  }

  if (payload.errors) {
    return JSON.stringify(payload.errors);
  }

  return payload.error_message ?? fallback;
};

export const updateProduct = async (
  uid: string,
  fields: UpdateProductFields,
  localeIso = "en",
): Promise<void> => {
  const managementHost = getProductManagementHost();

  const url = `https://${managementHost}/v3/content_types/${PRODUCT_CONTENT_TYPE_UID}/entries/${uid}?locale=${encodeURIComponent(localeIso)}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      api_key: runtimeConfig.apiKey,
      authorization: runtimeConfig.managementToken,
      ...(runtimeConfig.branchAlias ? { branch: runtimeConfig.branchAlias } : {}),
    },
    body: JSON.stringify({ entry: fields }),
  });

  const contentType = response.headers.get("content-type") ?? "";
  const payload = contentType.includes("application/json")
    ? ((await response.json()) as UpdateProductErrorResponse)
    : undefined;

  if (!response.ok) {
    const detail = getErrorDetail(payload, response.statusText);
    throw new Error(`Failed to update product entry ${uid}: ${detail}`);
  }
};
