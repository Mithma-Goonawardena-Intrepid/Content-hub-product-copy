// Review Reference panel has flag attribute that is required for a panel to come through.
// This attribute is not used in application to source any kind of data
export type ReviewReferencePanel = {
  flag: boolean;
};

export type ReviewReferencePanelWithAdditionalContent = {
  reviewAggregate: unknown;
  reviews: unknown;
};
