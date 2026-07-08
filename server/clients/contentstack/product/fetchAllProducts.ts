import type { ClientOptions } from "../Client";
import { getClientStack } from "../Client";
import { LogLevel } from "../../../../lib/utils/logger/logger";
import type { Product } from "../../../../lib/types/Contentstack";
import { getCurrentUtcDate } from "../../../../lib/utils/datetime/getCurrentUtcDate";
import { contentstackErrorHandler } from "../../../../lib/utils/error/contentstackErrorHandler";

export const fetchAllProducts = async (
  localeIso = "en",
  fetchFullList?: boolean,
  options?: ClientOptions,
): Promise<Product[]> => {
  let result: Product[];
  const productQuery = getClientStack(options)
    .ContentType("product")
    .Query()
    .language(localeIso)
    .includeReference([
      "lead_info.hero_image",
      "countries_visited",
      "main_country",
      "map",
      "style",
      "theme",
      "product_information",
      "product_images",
      "product_itinerary",
    ])
    .only([
      "product_information",
      "lead_info.display_name",
      "marketing_rating",
      "product_images",
      "product_itinerary",
      "effective_from",
      "effective_to",
      "elements_ref.elements_id",
    ])
    .includeFallback()
    .includeContentType()
    .where("published_to_web", true)
    .greaterThanOrEqualTo("effective_to", getCurrentUtcDate())
    .descending("marketing_rating")
    .toJSON();

  const resultData = await productQuery.find().catch(
    contentstackErrorHandler(
      {
        logErrorLevelOn404: LogLevel.WARN,
        errorMessage:
          "An error occurred while fetching 1st batch products from Contentstack",
      },
      {},
    ),
  );
  result = resultData[0];

  if (fetchFullList) {
    let skip = 100;
    let limit = 100;
    while (limit > 0) {
      const resultData = await productQuery
        .skip(skip)
        .limit(limit)
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
        );

      if (resultData[0]?.length) {
        result = result.concat(resultData[0]);
        if (resultData[0].length < 100) {
          limit = 0;
        }
        skip += limit;
      } else {
        limit = 0;
      }
    }
  }

  console.log(result)
  console.log(`Fetched products from Contentstack`);

  return result;
};
