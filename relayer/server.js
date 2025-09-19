const express = require('express');
const crypto = require('crypto-js');
const app = express();

app.use(express.json());

// Basit mock FHE şifreleme (gerçekte Zama FHEVM SDK’si kullanılacak)
app.post('/encrypt', (req, res) => {
  const { price, amount, isBuy } = req.body;

  // Mock şifreleme: sadece hash üretiyoruz
  const encryptedPrice = crypto.SHA256(price).toString();
  const encryptedAmount = crypto.SHA256(amount).toString();

  res.json({
    encryptedPrice,
    encryptedAmount,
    isBuy,
    timestamp: Date.now()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Relayer server running on http://localhost:${PORT}`);
});
