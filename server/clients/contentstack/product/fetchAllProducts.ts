import type { ClientOptions } from "../Client";
import type { Product } from "../../../../lib/types/Contentstack";
import { getCurrentUtcDate } from "../../../../lib/utils/datetime/getCurrentUtcDate";
import {
  PRODUCT_CONTENT_TYPE_UID,
  PRODUCT_PAGE_SIZE,
  PRODUCT_REFERENCE_FIELDS,
  getLocaleQueryParam,
  getProductManagementHost,
} from "../ManagementConfig";
import { runtimeConfig } from "../Client";

type ManagementEntriesResponse<T> = {
  items?: T[];
  entries?: T[];
  count?: number;
};

const sortByMarketingRatingDesc = (products: Product[]): Product[] =>
  [...products].sort((a, b) => (b.marketing_rating ?? -Infinity) - (a.marketing_rating ?? -Infinity));

const toIsoDateOnly = (value: unknown): string | null => {
  if (typeof value !== "string" || value.trim() === "") {
    return null;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed.toISOString().slice(0, 10);
};

const isActiveByEffectiveTo = (product: Product): boolean => {
  const effectiveToIsoDate = toIsoDateOnly(product.effective_to);
  if (!effectiveToIsoDate) {
    return true;
  }

  return effectiveToIsoDate >= getCurrentUtcDate();
};

const applyDeliveryLikeFilters = (products: Product[]): Product[] => {
  return products.filter(
    (product) => product.published_to_web === true && isActiveByEffectiveTo(product),
  );
};

const buildProductsUrl = (localeIso: string, skip: number, limit: number): string => {
  const localeParam = getLocaleQueryParam(localeIso);
  const params = new URLSearchParams({
    skip: String(skip),
    limit: String(limit),
    include_count: "true",
    include_fallback: "true",
    include_content_type: "true",
    desc: "marketing_rating",
    query: JSON.stringify({}),
  });

  if (localeParam) {
    params.set("locale", localeParam);
  }

  for (const field of PRODUCT_REFERENCE_FIELDS) {
    params.append("include[]", field);
  }

  return `https://${getProductManagementHost()}/v3/content_types/${PRODUCT_CONTENT_TYPE_UID}/entries?${params.toString()}`;
};

const fetchProductsBatch = async (
  localeIso: string,
  skip: number,
  limit: number,
): Promise<ManagementEntriesResponse<unknown>> => {
  const requestUrl = buildProductsUrl(localeIso, skip, limit);

  let response: Response;
  try {
    response = await fetch(requestUrl, {
      headers: {
        api_key: runtimeConfig.apiKey,
        authorization: runtimeConfig.managementToken,
        ...(runtimeConfig.branchAlias ? { branch: runtimeConfig.branchAlias } : {}),
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown fetch error";
    throw new Error(`Failed to fetch products from ${requestUrl}: ${message}`);
  }

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `Contentstack products fetch failed (${response.status}): ${text.slice(0, 200)}`,
    );
  }

  return (await response.json()) as ManagementEntriesResponse<unknown>;
};

const extractProducts = (
  response: ManagementEntriesResponse<unknown> | undefined,
): Product[] => {
  if (Array.isArray(response?.items)) {
    return response.items as Product[];
  }

  if (Array.isArray(response?.entries)) {
    return response.entries as Product[];
  }

  return [];
};

export const fetchAllProducts = async (
  localeIso = "en",
  fetchFullList?: boolean,
  _options?: ClientOptions,
): Promise<Product[]> => {
  const firstBatch = await fetchProductsBatch(
    localeIso,
    0,
    PRODUCT_PAGE_SIZE,
  );

  const products = [...extractProducts(firstBatch)];

  if (!fetchFullList || products.length < PRODUCT_PAGE_SIZE) {
    return sortByMarketingRatingDesc(applyDeliveryLikeFilters(products));
  }

  let skip = PRODUCT_PAGE_SIZE;
  while (true) {
    const nextBatch = await fetchProductsBatch(
      localeIso,
      skip,
      PRODUCT_PAGE_SIZE,
    );

    const batchItems = extractProducts(nextBatch);
    if (!batchItems.length) {
      break;
    }

    products.push(...batchItems);
    if (batchItems.length < PRODUCT_PAGE_SIZE) {
      break;
    }

    skip += PRODUCT_PAGE_SIZE;
  }

  return sortByMarketingRatingDesc(applyDeliveryLikeFilters(products));
};
