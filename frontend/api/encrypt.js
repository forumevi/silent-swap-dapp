export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { price, amount, isBuy, pair } = req.body;

  if (!price || !amount || !pair) {
    return res.status(400).json({ error: 'Price, amount, and pair are required' });
  }

  // Mock FHE encryption
  const encryptedPrice = require('crypto').createHash('sha256').update(price.toString()).digest('hex');
  const encryptedAmount = require('crypto').createHash('sha256').update(amount.toString()).digest('hex');

  res.status(200).json({
    encryptedPrice,
    encryptedAmount,
    isBuy,
    pair,
    timestamp: Date.now()
  });
}
