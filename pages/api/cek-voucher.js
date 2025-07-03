export default async function handler(req, res) {
  const { code } = req.query;

  try {
    const response = await fetch(`https://tripay.co.id/api/transaction/detail?reference=${code}`, {
      headers: {
        Authorization: `Bearer ${process.env.TRIPAY_API_KEY}`,
      },
    });

    const json = await response.json();

    // 👇 Tambahkan ini untuk melihat isi sebenarnya
    console.log('Tripay Response:', JSON.stringify(json, null, 2));

    if (!json.success || !json.data) {
      return res.status(400).json({ error: "Voucher tidak ditemukan" });
    }

    const result = {
      aktif: json.data.status === "PAID",
      payment_method: json.data.payment_method,
      qr_code_url: json.data.qr_url, // 🧠 pastikan properti ini ada
      transaction_id: json.data.reference,
      price: json.data.amount // 💰 tambahkan ini
    };

    res.status(200).json(result);

  } catch (err) {
    console.error("Error fetching voucher data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
