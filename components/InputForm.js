import React from 'react';
import Image from 'next/image';

export default function InputForm({ formData, setFormData, disabled = false }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Nama */}
      <div>
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Nama Lengkap</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={disabled}
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring focus:ring-blue-500 transition"
        />
      </div>

      {/* Kontak */}
      <div>
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Kontak (Email / WA)</label>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          disabled={disabled}
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring focus:ring-blue-500 transition"
        />
      </div>

      {/* Metode Pembayaran */}
      <div>
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
          Metode Pembayaran
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: 'qris', label: 'QRIS', img: '/img/pay/qris.png' },
            { value: 'ovo', label: 'OVO', img: '/img/pay/ovo.png' },
            { value: 'dana', label: 'DANA', img: '/img/pay/dana.png' }
          ].map((method) => (
            <button
              key={method.value}
              type="button"
              disabled={disabled}
              onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method.value }))}
              className={`border rounded-md flex flex-col items-center justify-center p-2 transition ${
                formData.paymentMethod === method.value
                  ? 'border-blue-600 ring-2 ring-blue-400'
                  : 'border-gray-300 hover:border-blue-400'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Image
                src={method.img}
                alt={method.label}
                width={32}
                height={32}
                className="mb-1 object-contain"
              />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-200">{method.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
