export enum Currency {
  AUD = "aud",
  CAD = "cad",
  CHF = "chf",
  EUR = "eur",
  GBP = "gbp",
  NZD = "nzd",
  USD = "usd",
  ZAR = "zar",
}

export type CurrencyCode = `${Currency}`;

export type CurrencyCodeUpperCase = Uppercase<Currency>;
