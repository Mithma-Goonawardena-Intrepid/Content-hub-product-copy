import type { ClientOptions } from "../Client";
import { LogLevel } from "../../../../lib/utils/logger/logger";
import type { Product } from "../../../../lib/types/Contentstack";
import { getCurrentUtcDate } from "../../../../lib/utils/datetime/getCurrentUtcDate";
import { contentstackErrorHandler } from "../../../../lib/utils/error/contentstackErrorHandler";
import {
  PRODUCT_CONTENT_TYPE_UID,
  PRODUCT_PAGE_SIZE,
  PRODUCT_REFERENCE_FIELDS,
  getLocaleQueryParam,
  getProductManagementStack,
} from "../ManagementConfig";

type ManagementEntriesResponse<T> = {
  items: T[];
  count: number;
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

const createProductsQuery = (
  localeIso: string,
  skip: number,
  limit: number,
) => {
  const localeParam = getLocaleQueryParam(localeIso);

  return getProductManagementStack().contentType(PRODUCT_CONTENT_TYPE_UID).entry().query({
    ...(localeParam ? { locale: localeParam } : {}),
    skip,
    limit,
    include_count: true,
    include_fallback: true,
    include_content_type: true,
    include: PRODUCT_REFERENCE_FIELDS,
    desc: "marketing_rating",
    query: {},
  });
};

const extractProducts = (
  response: ManagementEntriesResponse<unknown> | undefined,
): Product[] => (Array.isArray(response?.items) ? (response.items as Product[]) : []);

export const fetchAllProducts = async (
  localeIso = "en",
  fetchFullList?: boolean,
  _options?: ClientOptions,
): Promise<Product[]> => {
  const firstBatch = await createProductsQuery(localeIso, 0, PRODUCT_PAGE_SIZE)
    .find()
    .catch(
      contentstackErrorHandler(
        {
          logErrorLevelOn404: LogLevel.WARN,
          errorMessage:
            "An error occurred while fetching 1st batch products from Contentstack",
        },
        {},
      ),
    ) as unknown as ManagementEntriesResponse<unknown>;

  const products = [...extractProducts(firstBatch)];

  if (!fetchFullList || products.length < PRODUCT_PAGE_SIZE) {
    return sortByMarketingRatingDesc(applyDeliveryLikeFilters(products));
  }

  let skip = PRODUCT_PAGE_SIZE;
  while (true) {
    const nextBatch = await createProductsQuery(localeIso, skip, PRODUCT_PAGE_SIZE)
      .find()
      .catch(
        contentstackErrorHandler(
          {
            logErrorLevelOn404: LogLevel.WARN,
            errorMessage:
              "An error occurred while fetching all products from Contentstack",
          },
          {},
        ),
      ) as unknown as ManagementEntriesResponse<unknown>;

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
