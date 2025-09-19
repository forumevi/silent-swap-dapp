import React, { useState } from 'react';

function App() {
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [isBuy, setIsBuy] = useState(true);

  const handlePlaceOrder = () => {
    alert("✅ SilentSwap Demo Mode\n\nIn full version:\n- Your price is encrypted client-side with Zama FHE\n- Sent to contract as euint64\n- Matched confidentially on-chain\n- Zero MEV, zero frontrunning.");
  };

  return (
    <div style={{ 
      padding: '2rem', 
      maxWidth: '500px', 
      margin: '0 auto', 
      fontFamily: 'Arial, sans-serif',
      background: '#fff',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      border: '1px solid #eee'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ 
          color: '#000', 
          fontSize: '2.2rem',
          margin: '0 0 0.5rem 0'
        }}>🤫 SilentSwap</h1>
        <p style={{ 
          color: '#555', 
          fontSize: '1.1rem',
          margin: '0',
          fontWeight: '500'
        }}>
          <em>The first DEX with fully encrypted limit orders</em>
        </p>
      </div>

      <div style={{ 
        background: '#f8f9fa', 
        padding: '1.5rem', 
        borderRadius: '10px', 
        marginBottom: '1.5rem'
      }}>
        <label style={{ 
          display: 'block', 
          fontWeight: 'bold', 
          marginBottom: '0.5rem',
          color: '#333'
        }}>
          Order Type
        </label>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <label style={{ 
            display: 'flex', 
            alignItems: 'center', 
            cursor: 'pointer',
            padding: '0.5rem 1rem',
            background: isBuy ? '#000' : '#eee',
            color: isBuy ? '#fff' : '#333',
            borderRadius: '6px',
            fontWeight: '500'
          }}>
            <input
              type="radio"
              checked={isBuy}
              onChange={() => setIsBuy(true)}
              style={{ marginRight: '0.5rem' }}
            /> 
            Buy Order
          </label>
          <label style={{ 
            display: 'flex', 
            alignItems: 'center', 
            cursor: 'pointer',
            padding: '0.5rem 1rem',
            background: !isBuy ? '#000' : '#eee',
            color: !isBuy ? '#fff' : '#333',
            borderRadius: '6px',
            fontWeight: '500'
          }}>
            <input
              type="radio"
              checked={!isBuy}
              onChange={() => setIsBuy(false)}
              style={{ marginRight: '0.5rem' }}
            /> 
            Sell Order
          </label>
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ 
          display: 'block', 
          fontWeight: 'bold', 
          marginBottom: '0.5rem',
          color: '#333'
        }}>
          Price (e.g., 3000 USDC per ETH)
        </label>
        <input
          type="number"
          placeholder="Enter your secret price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '2px solid #e0e0e0',
            borderRadius: '8px',
            fontSize: '1rem',
            transition: 'border-color 0.2s',
            outline: 'none'
          }}
          onFocus={(e) => e.target.style.borderColor = '#000'}
          onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ 
          display: 'block', 
          fontWeight: 'bold', 
          marginBottom: '0.5rem',
          color: '#333'
        }}>
          Amount (e.g., 1 ETH)
        </label>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '2px solid #e0e0e0',
            borderRadius: '8px',
            fontSize: '1rem',
            transition: 'border-color 0.2s',
            outline: 'none'
          }}
          onFocus={(e) => e.target.style.borderColor = '#000'}
          onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
        />
      </div>

      <button
        onClick={handlePlaceOrder}
        style={{
          width: '100%',
          padding: '0.85rem',
          background: '#000',
          color: '#fff',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          transition: 'transform 0.1s, background 0.2s',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
        onMouseDown={(e) => e.target.style.transform = 'scale(0.98)'}
        onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        🔐 Place Confidential Order (Demo)
      </button>

      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem',
        background: '#f0f7ff',
        border: '1px solid #cce5ff',
        borderRadius: '8px',
        fontSize: '0.9rem',
        color: '#004085'
      }}>
        <strong>💡 SilentSwap for Zama Developer Program:</strong><br/>
        - First DEX with encrypted limit orders using FHEVM<br/>
        - No MEV, no frontrunning, fully private<br/>
        - Built 100% browser-based — no local setup
      </div>

      <footer style={{ 
        fontSize: '0.8rem', 
        color: '#888', 
        marginTop: '2rem', 
        paddingTop: '1rem',
        borderTop: '1px solid #eee',
        textAlign: 'center'
      }}>
        Built for Zama Developer Program — Builder Track<br/>
        GitHub: forumevi/silent-swap-dapp
      </footer>
    </div>
  );
}

export default App;
