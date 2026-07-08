import type { Product } from "../../../lib/types/Contentstack/ContentTypes/Product";

export const checkboxFieldOptions = [
  "ETI",
  "Images",
  "Itinerary",
  "Marketing",
] as const;

export type CheckboxFieldOption = (typeof checkboxFieldOptions)[number];

export const getSelectedProductFieldValues = (
  product: Product | undefined,
  selectedFields: CheckboxFieldOption[],
): Partial<Record<CheckboxFieldOption, unknown>> => {
  if (!product || selectedFields.length === 0) {
    return {};
  }

  const productFieldValues: Record<CheckboxFieldOption, unknown> = {
    ETI: product.product_information ?? null,
    Images: product.product_images ?? null,
    Itinerary: product.product_itinerary ?? null,
    Marketing: product.marketing_rating ?? null,
  };

  return selectedFields.reduce<Partial<Record<CheckboxFieldOption, unknown>>>(
    (acc, field) => {
      acc[field] = productFieldValues[field];
      return acc;
    },
    {},
  );
};
