import React, { useState } from 'react';

function App() {
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [isBuy, setIsBuy] = useState(true);

  const handlePlaceOrder = () => {
    alert("✅ Demo mode: This would encrypt your price with FHE and send to contract.");
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h1>🤫 SilentSwap</h1>
      <p><em>Swap tokens with encrypted prices. No MEV. No frontrunning.</em></p>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ marginRight: '1rem' }}>
          <input type="radio" checked={isBuy} onChange={() => setIsBuy(true)} /> Buy Order
        </label>
        <label>
          <input type="radio" checked={!isBuy} onChange={() => setIsBuy(false)} /> Sell Order
        </label>
      </div>

      <input
        type="number"
        placeholder="Price (e.g., 3000)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0', border: '1px solid #ccc' }}
      />

      <input
        type="number"
        placeholder="Amount (e.g., 1)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0', border: '1px solid #ccc' }}
      />

      <button
        onClick={handlePlaceOrder}
        style={{ width: '100%', padding: '0.75rem', background: '#000', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        🔐 Place Confidential Order (Demo)
      </button>

      <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '2rem' }}>
        Built for Zama Developer Program — Builder Track.
      </p>
    </div>
  );
}

export default App;