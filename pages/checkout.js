import { useRouter } from 'next/router';
import { useState } from 'react';
import InputForm from '../components/InputForm';
import Image from 'next/image';

export default function Checkout() {
  const router = useRouter();
  const { price } = router.query;

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    paymentMethod: '',
  });

  const handleBayar = () => {
    if (!formData.name || !formData.contact || !formData.paymentMethod) {
      return alert('Lengkapi semua data dan pilih metode pembayaran.');
    }

    const code = `SBN-${price}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    const expiredAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const transaksi = {
      ...formData,
      code,
      price: parseInt(price),
      expiredAt,
      isPaid: false, // default belum dibayar
    };

    const logs = JSON.parse(localStorage.getItem('voucherLogs') || '[]');
    logs.push(transaksi);
    localStorage.setItem('voucherLogs', JSON.stringify(logs));

    router.push(`/sukses?code=${code}`);
  };

  return (
    <main
      className="relative min-h-screen bg-cover bg-center bg-no-repeat p-6 flex items-center justify-center"
      style={{ backgroundImage: "url('/Designer.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Konten */}
      <div className="relative z-10 w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 space-y-5 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-center">
          <Image
            src="/Copilot_20250701_004312.png"
            alt="SABARNET Logo"
            width={80}
            height={50}
            className="mb-2"
          />
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Lengkapi Data Pembelian</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Paket: <span className="font-semibold">Rp {parseInt(price).toLocaleString('id-ID')}</span>
          </p>
        </div>

        <InputForm formData={formData} setFormData={setFormData} />

        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleBayar}
            disabled={!formData.paymentMethod}
            className={`w-full mt-2 py-2 font-medium rounded-md transition ${
              formData.paymentMethod
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Bayar Sekarang
          </button>
        </div>
      </div>
    </main>
  );
}
