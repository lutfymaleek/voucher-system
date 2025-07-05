// 🧪 Dummy data lokal untuk development
const dummyLogs = [
  {
    code: 'SBN-74G2YT',
    name: 'Dummy User',
    contact: 'dummy@fake.com',
    paymentMethod: 'qris',
    price: 5000,
    expiredAt: new Date(Date.now() + 86400000),
    aktif: true,
    qr_code_url: '/img/qris.png',
  },
  {
    code: 'SBN-T24JH5',
    name: 'Dummy User 2',
    contact: 'dummy2@fake.com',
    paymentMethod: 'qris',
    price: 5000,
    expiredAt: new Date(Date.now() + 86400000),
    aktif: true,
    qr_code_url: '/img/qris.png',
  },
];

export default async function handler(req, res) {
  const { code } = req.query;

  // ✅ Cek dummy logs dulu
  const dummy = dummyLogs.find((v) => v.code === code);
  if (dummy) {
    console.warn('🧪 Menggunakan data dummy untuk kode:', code);
    return res.status(200).json(dummy);
  }

  try {
    // 🌐 Cek ke Tripay jika tidak ditemukan di dummy
    const baseURL =
      process.env.NODE_ENV === 'development'
        ? 'https://tripay.co.id/api-sandbox'
        : 'https://tripay.co.id/api';

    const response = await fetch(`${baseURL}/transaction/detail?reference=${code}`, {
      headers: {
        Authorization: `Bearer ${process.env.TRIPAY_API_KEY}`,
      },
    });

    const json = await response.json();
    console.log('Tripay Response:', JSON.stringify(json, null, 2));

    if (!json.success || !json.data) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    const result = {
      aktif: json.data.status === 'PAID',
      payment_method: json.data.payment_method,
      qr_code_url: json.data.qr_url,
      transaction_id: json.data.reference,
      price: json.data.amount,
    };

    return res.status(200).json(result);
  } catch (err) {
    console.error('Error fetching voucher data:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
