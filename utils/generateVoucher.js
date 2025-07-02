// utils/generateVoucher.js
export function generateVoucherCode(price) {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `SBN-${price}-${random}`;
}

export function generateExpiryDate(hours = 24) {
  return new Date(Date.now() + hours * 60 * 60 * 1000); // Default: +24 jam
}