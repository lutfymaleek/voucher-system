import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function RedirectingPage() {
  const router = useRouter();
  const { url } = router.query;

  useEffect(() => {
    if (url) window.location.href = decodeURIComponent(url);
  }, [url]);

  return (
    <div className="h-screen flex items-center justify-center text-lg text-gray-600">
      Mengarahkan ke halaman pembayaran...
    </div>
  );
}

