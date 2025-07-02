export default async function handler(req, res) {
  const { code, method } = req.query;

  const payload = {
    method: method, // contoh: DANA, QRIS, GOPAY
    merchant_ref: code,
    amount: 50000,
    customer_name: 'Luthfy',
    order_items: [{ name: 'Voucher', price: 50000, quantity: 1 }],
    callback_url: process.env.BASE_URL + '/api/callback',
    return_url: process.env.BASE_URL + `/sukses?code=${code}`
  };

  const headers = {
    'Authorization': `Bearer ${process.env.TRIPAY_API_KEY}`,
    'Content-Type': 'application/json'
  };

  try {
    const tripayRes = await fetch('https://tripay.co.id/api/transaction/create', {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    const json = await tripayRes.json();
    return res.status(200).json({ qr_url: json.data.qr_url });
  } catch (error) {
    return res.status(500).json({ error: 'Gagal mengambil QR Tripay' });
  }
}
