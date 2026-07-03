export type CurrencyCodeValues = {
  aud?: string;
  nzd?: string;
  gbp?: string;
  eur?: string;
  usd?: string;
  cad?: string;
  zar?: string;
  chf?: string;
};

export type ProductCampaign = CurrencyCodeValues & {
  __brand: "ProductCampaign";
};
export type PriceDate = CurrencyCodeValues & { __brand: "PriceDate" };
