import { useState } from 'react';

export default function Validasi() {
  const [code, setCode] = useState('');
  const [voucher, setVoucher] = useState(null);
  const [status, setStatus] = useState(null);

  const handleCheck = () => {
    const logs = JSON.parse(localStorage.getItem('voucherLogs') || '[]');
    const found = logs.find((v) => v.code === code.trim());

    if (!found) {
      setVoucher(null);
      return setStatus('❌ Kode tidak ditemukan');
    }

    const isExpired = new Date(found.expiredAt) < new Date();
    setVoucher(found);
    setStatus(isExpired ? '❌ Voucher sudah kadaluarsa' : '✅ Voucher masih aktif');
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/Designer.png')" }}
    >
      <div className="bg-white dark:bg-gray-800 rounded shadow p-6 w-full max-w-sm space-y-4">
        <h1 className="text-xl font-bold text-center dark:text-white">Cek Status Voucher</h1>

        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Masukkan kode voucher"
          className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
        />

        <button
          onClick={handleCheck}
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Cek
        </button>

        {status && (
          <div className="p-3 rounded text-center text-sm font-semibold bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white">
            {status}
          </div>
        )}

        {voucher && (
          <div className="text-sm text-gray-800 dark:text-gray-200 space-y-1 border-t border-gray-300 dark:border-gray-600 pt-4">
            <p><strong>Nama:</strong> {voucher.name}</p>
            <p><strong>Kontak:</strong> {voucher.contact}</p>
            <p><strong>Metode:</strong> {voucher.paymentMethod}</p>
            <p><strong>Harga:</strong> Rp {voucher.price.toLocaleString('id-ID')}</p>
            <p><strong>Kadaluarsa:</strong> {new Date(voucher.expiredAt).toLocaleString()}</p>
          </div>
        )}
      </div>
    </main>
  );
}
