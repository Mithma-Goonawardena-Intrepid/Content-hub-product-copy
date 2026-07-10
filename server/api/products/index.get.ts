import { createError, defineEventHandler } from "h3";
import { fetchAllProducts } from "../../clients/contentstack/product/fetchAllProducts";

export default defineEventHandler(async (event) => {
  try {
    const requestUrl = new URL(event.node?.req?.url || "/", "http://localhost");
    const locale = requestUrl.searchParams.get("locale") || "en";
    const fetchFullListParam = requestUrl.searchParams.get("fetchFullList");

    const fetchFullList =
      fetchFullListParam === undefined ||
      fetchFullListParam === null ||
      fetchFullListParam === "true" ||
      fetchFullListParam === "1";

    const products = await fetchAllProducts(locale, fetchFullList);
    return { products };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch products";
    throw createError({ statusCode: 500, statusMessage: message });
  }
});
