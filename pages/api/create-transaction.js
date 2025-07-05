const crypto = require('crypto');

// 🔐 Buat signature HMAC-SHA256
function createSignature(ref, amount) {
  return crypto
    .createHmac('sha256', process.env.TRIPAY_PRIVATE_KEY)
    .update(`${process.env.TRIPAY_MERCHANT_CODE}${ref}${amount}`)
    .digest('hex');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { method, name, email, phone, amount } = req.body;
  const reference = `SBN-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

  const isDev = process.env.NODE_ENV === 'development';

  // 🌐 Gunakan endpoint Tripay sesuai mode
  const baseURL = 'https://tripay.co.id/api'; // ✅ langsung pakai production


  // // 🧪 Dummy response saat development
  // if (isDev) {
  //   console.warn('🧪 DEV MODE: Fallback dummy transaction digunakan');
  //   return res.status(200).json({
  //     success: true,
  //     data: {
  //       reference,
  //       payment_url: `/sukses?code=${reference}`,
  //     },
  //   });
  // }

  try {
    const response = await fetch(`${baseURL}/transaction/create`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.TRIPAY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        method,
        merchant_ref: reference,
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        amount,
        order_items: [
          {
            name: 'Voucher Internet',
            price: amount,
            quantity: 1,
          },
        ],
        callback_url: 'https://sabarnet.clientmitha.my.id/vcr/callbacknya.php', // ✅ sesuai yang terdaftar di Tripay
        return_url: `${process.env.BASE_URL}/sukses?code=${reference}`,
        signature: createSignature(reference, amount),
      }),
    });

    const raw = await response.text();
    console.log('📦 Tripay Response:', raw);

    const json = JSON.parse(raw);
    res.status(200).json(json);
  } catch (err) {
    console.error('Tripay Error:', err);
    res.status(500).json({ success: false, message: 'Gagal menghubungi Tripay' });
  }
}
