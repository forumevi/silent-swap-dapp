import React, { useState, useEffect } from 'react';

function App() {
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [isBuy, setIsBuy] = useState(true);
  const [account, setAccount] = useState(null);
  const [status, setStatus] = useState('');

  // Cüzdanı bağla
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        setStatus('Wallet connected ✅');
      } catch (error) {
        console.error("User denied account access");
        setStatus('Connection failed ❌');
      }
    } else {
      setStatus('MetaMask not detected. Please install it.');
    }
  };

  // Gizli emir gönder — artık sadece alert değil, relayer’a istek atıyor
  const handlePlaceOrder = async () => {
    if (!price || !amount) {
      alert("⚠️ Please enter price and amount.");
      return;
    }

    try {
      setStatus('🔐 Sending price to relayer for FHE encryption...');

      // Vercel serverless function’a POST isteği
      const response = await fetch('/api/encrypt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price, amount, isBuy })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Encrypted data received:", data);

      setStatus('🚀 Simulating on-chain transaction...');
      // Gerçek sözleşme entegrasyonu Phase 2’de — şimdilik simülasyon
      setTimeout(() => {
        setStatus('🎉 Order placed confidentially! Waiting for match...');
        alert("🎉 Order placed! Check console for encrypted data.");
      }, 1500);

    } catch (error) {
      console.error("❌ Relayer request failed:", error);
      setStatus('❌ Failed to encrypt price. Check console.');
      alert("Transaction failed. See browser console for details.");
    }
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

      {!account ? (
        <button
          onClick={connectWallet}
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
          🔌 Connect Wallet (MetaMask)
        </button>
      ) : (
        <>
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
            🔐 Place Confidential Order
          </button>

          {status && (
            <p style={{ 
              marginTop: '1rem', 
              padding: '0.5rem', 
              background: status.includes('❌') ? '#ffebee' : status.includes('✅') ? '#e8f5e8' : '#fff3e0',
              color: status.includes('❌') ? '#c62828' : status.includes('✅') ? '#2e7d32' : '#ef6c00',
              borderRadius: '4px',
              fontSize: '0.9rem'
            }}>
              {status}
            </p>
          )}

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
        </>
      )}
    </div>
  );
}

export default App;
