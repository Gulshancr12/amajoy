// src/config/currency.js

export const CURRENCY_SYMBOL = '₹';
export const USD_TO_INR_RATE = 83.30; // Example fixed rate
export const DISPLAY_CURRENCY_VALUES_IN_INR = true; // Set to false to just change symbol

/**
 * Formats a price value according to the currency settings.
 * @param {number} priceInUSD - The price in USD from the API.
 * @param {object} options - Optional formatting options.
 * @param {boolean} options.convertToINR - Whether to convert the value to INR.
 * @param {string} options.symbol - The currency symbol to use.
 * @param {number} options.rate - The conversion rate if converting.
 * @returns {string} - The formatted price string (e.g., "₹4165.00").
 */
export const formatPrice = (priceInUSD, options = {}) => {
  const {
    convertToINR = DISPLAY_CURRENCY_VALUES_IN_INR,
    symbol = CURRENCY_SYMBOL,
    rate = USD_TO_INR_RATE,
  } = options;

  let displayPrice = parseFloat(priceInUSD);

  if (isNaN(displayPrice)) {
    // console.warn(`Invalid price value received: ${priceInUSD}`);
    return `${symbol}0.00`; // Or some other fallback
  }

  if (convertToINR) {
    displayPrice = displayPrice * rate;
  }

  return `${symbol}${displayPrice.toFixed(2)}`;
};

/**
 * Calculates the total price for an item (price * quantity) and formats it.
 * @param {number} priceInUSD - The unit price in USD.
 * @param {number} quantity - The quantity of the item.
 * @param {object} options - Formatting options (see formatPrice).
 * @returns {string} - The formatted total price string.
 */
export const formatItemTotalPrice = (priceInUSD, quantity, options = {}) => {
  const totalPriceInOriginalCurrency = parseFloat(priceInUSD) * parseInt(quantity, 10);
  // Pass the calculated total (which is still effectively in USD if priceInUSD was USD)
  // to formatPrice, which will handle potential conversion and symbol.
  return formatPrice(totalPriceInOriginalCurrency, options);
};