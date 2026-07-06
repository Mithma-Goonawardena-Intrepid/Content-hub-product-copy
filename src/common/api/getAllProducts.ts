import type { Product } from "../../../lib/types/Contentstack/ContentTypes/Product";

type ProductsApiResponse = {
  products?: Product[];
  error?: string;
};

export const getAllProducts = async (locale = "en"): Promise<Product[]> => {
  const response = await fetch(
    `/api/products?locale=${encodeURIComponent(locale)}&fetchFullList=true`,
  );

  const contentType = response.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    const responseText = await response.text();

    throw new Error(
      `Products API returned a non-JSON response (${response.status}). ${responseText.slice(0, 120)}`,
    );
  }

  const payload = (await response.json()) as ProductsApiResponse;

  if (!response.ok) {
    throw new Error(payload.error || `Failed to fetch products: ${response.status}`);
  }

  return Array.isArray(payload.products) ? payload.products : [];
};
