import {
  createError,
  defineEventHandler,
  getRouterParam,
} from "h3";
import type { H3Event } from "h3";
import type {
  ProductInformation,
  ProductItinerary,
  Picture,
} from "../../../lib/types/Contentstack";
import { updateProduct } from "../../clients/contentstack/product/updateProduct";

type UpdateProductFields = {
  product_information?: ProductInformation[];
  marketing_rating?: number;
  product_images?: Picture[];
  product_itinerary?: ProductItinerary[];
};

const readJsonBody = async (event: H3Event): Promise<unknown> => {
  const req = event.node?.req;
  if (!req) {
    return {};
  }

  return await new Promise((resolve, reject) => {
    let raw = "";
    req.setEncoding("utf8");
    req.on("data", (chunk: string) => {
      raw += chunk;
    });
    req.on("end", () => {
      if (!raw.trim()) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(raw));
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
};

export default defineEventHandler(async (event) => {
  try {
    const uid = getRouterParam(event, "uid");
    if (!uid) {
      throw createError({ statusCode: 400, statusMessage: "Product uid is required" });
    }

    const requestUrl = new URL(event.node?.req?.url || "/", "http://localhost");
    const locale = requestUrl.searchParams.get("locale") || "en";
    const fields = (await readJsonBody(event).catch(() => ({}))) as UpdateProductFields;

    await updateProduct(uid, fields, locale);
    return {};
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update product";
    throw createError({ statusCode: 500, statusMessage: message });
  }
});
