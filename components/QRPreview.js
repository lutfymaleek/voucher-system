import Image from 'next/image';

export default function QRPreview({ url }) {
  return (
    <div className="text-center py-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
        Scan QR untuk Akses WiFi
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        Gunakan aplikasi e-wallet (seperti OVO, DANA, atau QRIS) untuk membayar dan mendapatkan akses internet.
      </p>

      {url ? (
        <div className="inline-block border border-dashed border-gray-400 p-4 rounded-lg bg-white dark:bg-gray-800">
          <Image
            src={url}
            alt="QR Code Pembayaran"
            width={250}
            height={250}
            className="mx-auto"
          />
        </div>
      ) : (
        <p className="text-red-500">QR Code tidak tersedia</p>
      )}

      <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        Setelah pembayaran berhasil, voucher akan aktif secara otomatis.
      </p>
    </div>
  );
}
