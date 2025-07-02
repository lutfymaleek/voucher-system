// utils/validateVoucher.js
export function isVoucherActive(voucher) {
  const now = new Date();
  const expiry = new Date(voucher.expiredAt);
  return now < expiry;
}
