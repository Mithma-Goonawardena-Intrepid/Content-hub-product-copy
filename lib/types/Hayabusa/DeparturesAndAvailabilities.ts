type HayabusaDepartureType = {
  startDate: string | Date;
  endDate: string | Date;
  attrs: Record<string, unknown>;
  [key: string]: unknown;
};

type HayabusaProductType = {
  attrs?: Record<string, unknown>;
  [key: string]: unknown;
};

type HayabusaPriceType = {
  validTo: string | Date;
  validFrom: string | Date;
  [key: string]: unknown;
};

export type HayabusaAvailabilities = { date: string; lowestPrice: string }[];

export enum HayabusaAgeType {
  ADULT = "adult",
  CHILD = "child",
}

export enum HayabusaRoomType {
  SINGLE = "single",
  TWIN = "twin",
  MULTI = "multi",
}

export type HayabusaExclusion = {
  amount: number;
  currencyId?: number;
  currencyCode: string;
  elementTitle?: string;
  currencySymbol?: string;
};

export type HayabusaPrice = Omit<HayabusaPriceType, "validTo" | "validFrom"> & {
  attrs: {
    price: number;
    currencyId: number;
    discountedprice: number;
    isHighlightPrice?: boolean;
  };
  validTo: string | Date;
  validFrom: string | Date;
  promotionId?: number | null;
  promotionName?: string | null;
  promotionNumber?: number | null;
  childTotalPrice?: number | null;
  childDiscountedTotalPrice?: number | null;
};

export type HayabusaRelated = {
  href: string;
  relationship: string;
};

export type HayabusaSingleSupplement = {
  total: number;
  currencyCode: string;
  effectiveTo: string | Date;
  effectiveFrom: string | Date;
  singleSupplementProductId: number;
  attrs: {
    numberOfCustomers: string;
  };
};

export type HayabusaKittyPrice = {
  kittyAmount: number;
  kittyCurrencyCode: string;
};

export type HayabusaDeparture = Omit<
  HayabusaDepartureType,
  "startDate" | "endDate" | "attrs"
> & {
  startDate: string | Date;
  endDate: string | Date;
  attrs: {
    startCity: string;
    startCountry: string;
    endCity: string;
    endCountry: string;
    vehicleName?: string;
    onRequest: boolean;
    roomTypeName?: string;
    canPlaceOnHoldDeparture?: boolean;
    href?: string;
    freeSell?: boolean;
    lateRequest?: boolean;
    bookingClosed?: number;
    onRequestDays?: number;
    onRequestOnly?: boolean;
    relatedTransfers?: HayabusaRelated[];
    onRequestCapacity?: number;
    lastUpdatedDateTime?: string;
    relatedAccommodation?: HayabusaRelated[];
    relatedSingleSupplement?: HayabusaRelated[];
    singleTravellerCompulsorySingleSupFlag?: boolean;
  };
  prices?: HayabusaPrice[] | null;
  product: HayabusaProductType & {
    attrs: {
      productSubType: {
        id: number;
        name: string;
      };
    };
  };
  exclusions: HayabusaExclusion[] | null;
  kitty?: HayabusaKittyPrice | null;
  priceSingleSupplement?: HayabusaSingleSupplement[] | null;
};

export type HayabusaDeparturesDay = HayabusaDeparture[];

export type HayabusaDepartures = {
  departures: {
    [date: string]: HayabusaDeparturesDay;
  };
  numberOfPages: number;
  pageNumber: number;
  totalRecords?: number;
  totalDeals?: number;
};
