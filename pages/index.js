import { useState } from 'react';
import { useRouter } from 'next/router';
import Logo from '../components/Logo';
import PackageCard from '../components/PackageCard';

export default function Home() {
  const [selected, setSelected] = useState(null);
  const router = useRouter();

  const handleNext = () => {
    if (selected) {
      router.push(`/checkout?price=${selected}`);
    } else {
      alert('Pilih paket terlebih dahulu!');
    }
  };

  return (
    <main className="relative min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/Designer.png')" }}>
      {/* Overlay gelap agar teks terbaca */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Konten utama */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-xl shadow-lg p-6 space-y-6">
          <div className="flex items-center justify-between">
            <Logo />
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Pilih Paket Voucher</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Pilih salah satu paket yang tersedia di bawah ini:
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 ">
            {[2000, 5000, 10000, 15000, 20000, 50000].map((price) => (
              <PackageCard key={price} price={price} selected={selected} onSelect={setSelected} />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Lanjutkan
          </button>
        </div>
      </div>
    </main>
  );
}
