import type { Product } from "../../../lib/types/Contentstack/ContentTypes/Product";

type ProductsApiResponse = {
  products?: Product[];
  error?: string;
};

const buildProductsUrl = (locale: string): string =>
  `/api/products?locale=${encodeURIComponent(locale)}&fetchFullList=true`;

const parseProductsPayload = async (
  response: Response,
): Promise<ProductsApiResponse> => {
  const contentType = response.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    const responseText = await response.text();

    throw new Error(
      `Products API returned a non-JSON response (${response.status}). ${responseText.slice(0, 120)}`,
    );
  }

  return (await response.json()) as ProductsApiResponse;
};

export const getAllProducts = async (locale = "en"): Promise<Product[]> => {
  const response = await fetch(buildProductsUrl(locale));
  const payload = await parseProductsPayload(response);

  if (!response.ok) {
    throw new Error(payload.error || `Failed to fetch products: ${response.status}`);
  }

  return Array.isArray(payload.products) ? payload.products : [];
};
