import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import QRPreview from '../components/QRPreview';

export default function Sukses() {
  const router = useRouter();
  const { code } = router.query;
  const [voucher, setVoucher] = useState(null);

  useEffect(() => {
    const logs = JSON.parse(localStorage.getItem('voucherLogs') || '[]');
    const v = logs.find((item) => item.code === code);
    setVoucher(v);

    if (v?.paymentMethod === 'DANA') {
      setTimeout(() => {
        window.location.href = `dana://open?url=https://link.dana.id/pay?code=${v.code}`;
      }, 2000);
    } else if (v?.paymentMethod === 'GoPay') {
      setTimeout(() => {
        window.location.href = `gopay://gopay/payment?code=${v.code}`;
      }, 2000);
    }
  }, [code]);

  if (!voucher) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <p className="text-center text-gray-500">Memuat data voucher...</p>
      </main>
    );
  }

  const isVisible = voucher.isPaid === true;

  return (
    <main
      className="relative min-h-screen bg-cover bg-center bg-no-repeat p-6 flex items-center justify-center"
      style={{ backgroundImage: "url('/Designer.png')" }}
    >
      {/* Overlay hitam transparan */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Konten di tengah */}
      <div className="relative z-10 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md w-full max-w-md text-center space-y-4 border border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-green-700 dark:text-green-300">
          🎉 Voucher Kamu {isVisible ? 'Sudah Aktif!' : 'Belum Aktif'}
        </h1>

        <div className="bg-yellow-50 dark:bg-yellow-700/40 border border-yellow-300 dark:border-yellow-500 text-yellow-900 dark:text-white p-4 rounded text-sm space-y-2">
          <p>Metode pembayaran: <strong>{voucher.paymentMethod}</strong></p>
          <p>{isVisible
            ? 'Berikut detail voucher milikmu.'
            : 'Selesaikan pembayaran terlebih dahulu untuk mengaktifkan voucher.'}
          </p>
        </div>

        {voucher.paymentMethod === 'QRIS' && isVisible && (
          <QRPreview code={voucher.code} method="QRIS" />
        )}

        {isVisible ? (
          <div className="text-left text-sm text-gray-800 dark:text-gray-200 space-y-2 border-t pt-4 mt-4 leading-relaxed">
            <p><strong>👤 Nama:</strong> {voucher.name}</p>
            <p><strong>📱 Kontak:</strong> {voucher.contact}</p>
            <p><strong>💳 Harga:</strong> Rp {voucher.price.toLocaleString('id-ID')}</p>
            <p><strong>⏰ Berlaku Hingga:</strong> {new Date(voucher.expiredAt).toLocaleString()}</p>
            <p><strong>🆔 Kode:</strong> {voucher.code}</p>
          </div>
        ) : (
          <p className="text-xs italic text-gray-500 dark:text-gray-400">
            Voucher akan aktif dan tampil setelah pembayaran berhasil.
          </p>
        )}
      </div>
    </main>
  );
}
