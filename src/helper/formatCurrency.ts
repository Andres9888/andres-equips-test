export const formatListingCurrency = (currency: number, placeValue: number): string => {
  const formattedListingCurrency = Intl.NumberFormat('en-US').format(currency * placeValue);
  return `$${formattedListingCurrency}`;
};
