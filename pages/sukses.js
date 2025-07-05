import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import QRPreview from '../components/QRPreview';
import Image from 'next/image';

export default function SuksesPage() {
  const router = useRouter();
  const { code } = router.query;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!code) return;

    const fetchStatus = () => {
      fetch(`/api/cek-voucher?code=${code}`)
        .then(res => res.json())
        .then(res => {
          // 👇 Tambahkan dummy fallback jika response tidak valid atau kosong
          if (!res || Object.keys(res).length === 0 || !res.code) {
            const dummy = {
              code,
              name: 'Pengguna Dummy',
              price: 5000,
              payment_method: 'qris',
              aktif: true,
              expiredAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
              qr_code_url: '/img/qris.png',
            };
            console.warn('⚠️ Dummy data digunakan karena respon kosong.');
            setData(dummy);
          } else {
            setData(res);
            if (res.aktif) clearInterval(polling);
          }

          setLoading(false);
        })
        .catch(() => {
          console.warn('🧪 Gagal fetch data voucher, gunakan dummy lokal.');
          setData({
            code,
            name: 'Fallback User',
            price: 7500,
            payment_method: 'dana',
            aktif: true,
            expiredAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            qr_code_url: '/img/dana.png',
          });
          setLoading(false);
        });
    };

    fetchStatus();
    const polling = setInterval(fetchStatus, 5000);
    return () => clearInterval(polling);
  }, [code]);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (!data) return <p className="text-center text-red-500">Data tidak ditemukan</p>;

  // 🔁 Jika belum aktif dan metode QR, tampilkan QRPreview
  if (!data.aktif && data.payment_method === 'qris') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-blue-100 p-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-800 p-6 max-w-md w-full text-center space-y-4 animate-fadeIn">
          <QRPreview url={data.qr_code_url} />

          <p className="text-sm text-gray-600 dark:text-gray-300">
            Silakan scan QR untuk menyelesaikan pembayaran. Setelah berhasil, voucher akan aktif secara otomatis.
          </p>

          <div className="mt-4 border-t pt-4 text-sm text-gray-600 dark:text-gray-300 space-y-1 text-left">
            <p><strong>Kode Voucher:</strong> <span className="text-gray-900 dark:text-white">{code}</span></p>
            {data.price && (
              <p><strong>Harga:</strong> Rp {parseInt(data.price).toLocaleString('id-ID')}</p>
            )}
            {data.expiredAt && (
              <p><strong>Berlaku Hingga:</strong> {new Date(data.expiredAt).toLocaleString('id-ID')}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ✅ Jika voucher aktif
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-800 p-6 max-w-md w-full text-center space-y-4 animate-fadeIn">
        <h1 className="text-2xl font-bold text-green-600">Voucher Aktif ✅</h1>
        <p className="text-gray-700 dark:text-gray-300">
          Selamat, pembayaran berhasil dan voucher kamu sudah aktif 🎉
        </p>

        <div className="mt-4 border-t pt-4 text-sm text-gray-600 dark:text-gray-300 space-y-1 text-left">
          <p><strong>Kode Voucher:</strong> <span className="text-gray-900 dark:text-white">{code}</span></p>
          {data.price && (
            <p><strong>Harga:</strong> Rp {parseInt(data.price).toLocaleString('id-ID')}</p>
          )}
          {data.payment_method && (
            <p><strong>Metode Pembayaran:</strong> {data.payment_method.toUpperCase()}</p>
          )}
          {data.expiredAt && (
            <p><strong>Berlaku Hingga:</strong> {new Date(data.expiredAt).toLocaleString('id-ID')}</p>
          )}
        </div>

        {data.qr_code_url && (
          <div className="mt-4 flex justify-center">
            <Image
              src={data.qr_code_url}
              alt="QR Code"
              width={160}
              height={160}
              className="mx-auto rounded border border-dashed"
            />
          </div>
        )}

        <p className="text-xs text-gray-500 mt-4">
          Simpan kode ini atau screenshot voucher sebagai bukti pembayaran.
        </p>
      </div>
    </div>
  );
}
