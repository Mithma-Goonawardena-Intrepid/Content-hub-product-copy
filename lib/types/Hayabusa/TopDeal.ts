import type { CurrencyCode } from "../Currency";

export type HayabusaTopDeal = {
  id: number;
  productId: number;
  webProductId: number;
  name: string;
  code: string;
  startDate: string;
  endDate: string;
  numberOfDays: number;
  startLocation: string;
  endLocation: string;
  departureGuaranteed: false;
  status: string;
  totalPrice: string;
  discountedTotalPrice: string;
  isHighlightDeal: boolean;
  currencyCode: CurrencyCode;
  validFrom: string;
  validTo: string;
  isHighlightPrice: boolean;
};
