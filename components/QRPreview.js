import { useEffect, useState } from 'react';

export default function QRPreview({ code, method }) {
  const [qrUrl, setQrUrl] = useState(null);

  useEffect(() => {
    const getQR = async () => {
      try {
        const res = await fetch(`/api/qris?code=${code}&method=${method}`);
        const data = await res.json();
        setQrUrl(data.qr_url); // berasal dari Tripay
      } catch (err) {
        console.error('Gagal mengambil QR dari Tripay', err);
      }
    };
    getQR();
  }, [code, method]);

  if (!qrUrl) {
    return <p className="text-sm text-gray-500">Mengambil QR pembayaran...</p>;
  }

  return (
    <div className="flex justify-center">
      <img src={qrUrl} alt={`QR ${method}`} />
    </div>
  );
}
