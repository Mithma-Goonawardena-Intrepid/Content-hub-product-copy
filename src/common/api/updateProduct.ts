import type { ProductInformation, ProductItinerary, Picture } from "../../../lib/types/Contentstack";

type UpdateProductFields = {
  product_information?: ProductInformation[];
  marketing_rating?: number;
  product_images?: Picture[];
  product_itinerary?: ProductItinerary[];
};

type UpdateProductApiResponse = {
  error?: string;
};

const buildUpdateProductUrl = (uid: string, locale: string): string =>
  `/api/products/${encodeURIComponent(uid)}?locale=${encodeURIComponent(locale)}`;

const parseUpdateProductPayload = async (
  response: Response,
): Promise<UpdateProductApiResponse> => {
  const contentType = response.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    const responseText = await response.text();
    throw new Error(
      `Update product API returned a non-JSON response (${response.status}). ${responseText.slice(0, 120)}`,
    );
  }

  return (await response.json()) as UpdateProductApiResponse;
};

export const updateProduct = async (
  uid: string,
  fields: UpdateProductFields,
  locale = "en",
): Promise<void> => {
  const response = await fetch(buildUpdateProductUrl(uid, locale), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fields),
  });

  const payload = await parseUpdateProductPayload(response);

  if (!response.ok) {
    throw new Error(payload.error || `Failed to update product: ${response.status}`);
  }
};
