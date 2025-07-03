// pages/checkout.js
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

  const [loading, setLoading] = useState(false);

  const handleBayar = async () => {
    if (!formData.name || !formData.contact || !formData.paymentMethod) {
      return alert('Lengkapi semua data dan pilih metode pembayaran.');
    }

    setLoading(true);

    try {
      const res = await fetch('/api/create-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: formData.paymentMethod,
          name: formData.name,
          email: formData.contact,
          phone: formData.contact,
          amount: parseInt(price),
        }),
      });


      const data = await res.json();
      console.log('📦 Respon Tripay JSON:', data);

      if (data.success && data.data?.payment_url) {
        console.log('➡️ Redirecting ke:', data.data.payment_url);
        window.location.href = data.data.payment_url;
      } else {
        console.warn('⚠️ Tidak ada payment_url. Respon Tripay:', data);
        alert('Transaksi gagal atau tidak lengkap. Silakan cek log console atau coba metode lain.');
      }
    } catch (err) {
      console.error('Gagal membuat transaksi:', err);
      alert('Terjadi kesalahan saat membuat transaksi. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="relative min-h-screen bg-cover bg-center bg-no-repeat p-6 flex items-center justify-center"
      style={{ backgroundImage: "url('/Designer.png')" }}
    >
      <div className="absolute inset-0 bg-black/60 z-0" />

      <div className="relative z-10 w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 space-y-5 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-center">
          <Image
            src="/Copilot_20250701_004312.png"
            alt="SABARNET Logo"
            width={80}
            height={50}
            style={{ height: 'auto' }} // untuk hindari warning rasio
          />
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Lengkapi Data Pembelian</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Paket: <span className="font-semibold">Rp {parseInt(price || '0').toLocaleString('id-ID')}</span>
          </p>
        </div>

        <InputForm formData={formData} setFormData={setFormData} disabled={loading} />

        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleBayar}
            disabled={loading || !formData.paymentMethod}
            className={`w-full mt-2 py-2 font-medium rounded-md transition ${
              loading
                ? 'bg-gray-400 text-white cursor-wait'
                : formData.paymentMethod
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {loading ? 'Memproses...' : 'Bayar Sekarang'}
          </button>
        </div>
      </div>
    </main>
  );
}
