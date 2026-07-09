import type { ProductInformation, ProductItinerary, Picture } from "../../../../lib/types/Contentstack";

type UpdateProductFields = {
  product_information?: ProductInformation[];
  marketing_rating?: number;
  product_images?: Picture[];
  product_itinerary?: ProductItinerary[];
};

const getEnv = (primary: string, fallback: string): string => {
  const val = process.env[primary] ?? process.env[fallback] ?? "";
  return val.trim().replace(/^["']|["']$/g, "");
};

export const updateProduct = async (
  uid: string,
  fields: UpdateProductFields,
  localeIso = "en",
): Promise<void> => {
  // Read env at call time so Vite's loadEnv has already populated process.env.
  const apiKey = getEnv("VITE_CONTENTSTACK_API_KEY", "VITE_CONTENTSTACK_API_KEY");
  const managementToken = getEnv("VITE_CONTENTSTACK_MANAGEMENT_TOKEN", "VITE_CONTENTSTACK_MANAGEMENT_TOKEN");
  const branch = getEnv("VITE_CONTENTSTACK_BRANCH_ALIAS", "VITE_CONTENTSTACK_BRANCH_ALIAS");
  const deliveryHost = getEnv("CONTENTSTACK_RUNTIME_HOST", "VITE_CONTENTSTACK_RUNTIME_HOST") || "api.contentstack.io";
  const managementHost = deliveryHost.replace(/^cdn\./, "api.").replace(/^eu-cdn\./, "eu-api.");

  const url = `https://${managementHost}/v3/content_types/product/entries/${uid}?locale=${encodeURIComponent(localeIso)}`;
  console.log(url)

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "api_key": apiKey,
      "authorization": managementToken,
      ...(branch ? { branch } : {}),
    },
    body: JSON.stringify({ entry: fields }),
  });

  console.log('Response status:', response.status);

  const payload = await response.json() as { errors?: Record<string, string[]>; error_message?: string };

  if (!response.ok) {
    const detail = payload.errors ? JSON.stringify(payload.errors) : payload.error_message ?? response.statusText;
    throw new Error(`Failed to update product entry ${uid}: ${detail}`);
  }
};
