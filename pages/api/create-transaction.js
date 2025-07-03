// pages/api/create-transaction.js
import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { method, name, email, phone, amount } = req.body;

  const merchantRef = `SBN-${amount}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  const signature = crypto
    .createHmac('sha256', process.env.TRIPAY_PRIVATE_KEY)
    .update(process.env.TRIPAY_MERCHANT_CODE + merchantRef + amount)
    .digest('hex');

  const body = {
    method,
    merchant_ref: merchantRef,
    amount,
    customer_name: name,
    customer_email: email,
    customer_phone: phone,
    order_items: [
      {
        sku: 'voucher-' + amount,
        name: `Voucher Rp${amount}`,
        price: amount,
        quantity: 1,
      },
    ],
    callback_url: `${process.env.BASE_URL}/api/callback`,
    return_url: `${process.env.BASE_URL}/sukses?code=${merchantRef}`,
    signature,
  };

  try {
    const response = await fetch('https://tripay.co.id/api/transaction/create', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.TRIPAY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    
    const json = await response.json();
    res.status(200).json(json);
  } catch (err) {
    console.error('Tripay Error:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
} 

