import crypto from 'crypto';

export const config = {
  api: {
    bodyParser: true, // pastikan body bisa dibaca
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const signature = req.headers['x-callback-signature'];
  const rawBody = JSON.stringify(req.body);
  const expectedSignature = crypto
    .createHmac('sha256', process.env.TRIPAY_PRIVATE_KEY)
    .update(rawBody)
    .digest('hex');

  if (signature !== expectedSignature) {
    console.warn('❌ Signature tidak valid');
    return res.status(403).json({ success: false, message: 'Invalid signature' });
  }

  const { event, data } = req.body;

  if (event !== 'payment_status') {
    return res.status(400).json({ success: false, message: 'Invalid event type' });
  }

  const { reference, status } = data;

  if (status === 'PAID') {
    console.log(`✅ Voucher ${reference} telah dibayar dan siap diaktifkan`);
    // TODO: Tambahkan logika aktivasi voucher di sini (misalnya update DB atau file)
  } else {
    console.log(`ℹ️ Status transaksi ${reference}: ${status}`);
  }

  res.status(200).json({ success: true });
}
