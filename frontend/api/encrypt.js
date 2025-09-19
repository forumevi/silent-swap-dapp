import crypto from 'crypto';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { price, amount, isBuy } = req.body;

  if (!price || !amount) {
    return res.status(400).json({ error: 'Price and amount are required' });
  }

  // Mock FHE şifreleme — SHA256 hash
  const encryptedPrice = crypto.createHash('sha256').update(price.toString()).digest('hex');
  const encryptedAmount = crypto.createHash('sha256').update(amount.toString()).digest('hex');

  res.status(200).json({
    encryptedPrice,
    encryptedAmount,
    isBuy,
    timestamp: Date.now()
  });
}
