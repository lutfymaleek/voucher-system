import { useRouter } from 'next/router';

export default function InputForm({ formData, setFormData }) {
  const router = useRouter();

  const isValidContact = (value) => {
    const phoneRegex = /^(08|62)[0-9]{8,13}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return phoneRegex.test(value) || emailRegex.test(value);
  };

  const handlePaymentChange = (method) => {
    setFormData({ ...formData, paymentMethod: method });
  };

  const handleContactChange = (e) => {
    const val = e.target.value;
    const valid = isValidContact(val);
    setFormData({ ...formData, contact: val, isContactValid: valid });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Nama */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Nama Pembeli
        </label>
        <input
          type="text"
          placeholder="Contoh: Luthfy M. Fajar"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
      </div>

      {/* Kontak */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          Kontak (WhatsApp / Email)
        </label>
        <input
          type="text"
          placeholder="e.g. 0812xxxx or email@example.com"
          value={formData.contact}
          onChange={handleContactChange}
          className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-white ${
            formData.contact && formData.isContactValid === false
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
          }`}
        />
        <div className="min-h-[1.25rem] mt-1">
          {formData.contact && formData.isContactValid === false && (
            <p className="text-red-600 text-sm">
              Format kontak tidak valid. Masukkan nomor WhatsApp atau email yang benar.
            </p>
          )}
        </div>
      </div>

      {/* Metode Pembayaran */}
      <div>
        <label className="block mb-4 text-sm font-medium text-gray-700 dark:text-gray-300">
          Metode Pembayaran:
        </label>
        <div className="flex gap-4">
          {['DANA', 'GoPay', 'QRIS'].map((method) => (
            <button
              key={method}
              type="button"
              onClick={() => handlePaymentChange(method)}
              className={`flex-1 py-2 rounded-lg border text-sm font-semibold transition ${
                formData.paymentMethod === method
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-white'
              } hover:ring-2 hover:ring-blue-500`}
            >
              {method}
            </button>
          ))}
        </div>
      </div>

      {/* Tombol Kembali */}
      <div className="flex justify-center">
        <button
          onClick={() => router.push('/')}
          className="w-full mt-2 py-2 bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-white font-medium rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 transition"
        >
          ← Pilih Paket Kembali
        </button>
      </div>
    </div>
  );
}
