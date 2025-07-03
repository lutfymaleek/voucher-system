import Image from 'next/image';

export default function QRPreview({ url }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Scan untuk Membayar</h2>
      {url ? (
        <Image src={url} alt="QR Code" width={250} height={250} />
      ) : (
        <p>QR Code tidak tersedia</p>
      )}
      
    </div>
  );
}
