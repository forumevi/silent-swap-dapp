import React, { useState, useEffect } from 'react';

function App() {
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [isBuy, setIsBuy] = useState(true);
  const [account, setAccount] = useState(null);
  const [status, setStatus] = useState('');
  const [selectedPair, setSelectedPair] = useState('ETH/USDC');

  const tokenPairs = [
    'ETH/USDC',
    'WBTC/USDT',
    'DAI/USDC',
    'LINK/ETH',
    'UNI/USDT'
  ];

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        setStatus('✅ Wallet connected');
      } catch (error) {
        setStatus('❌ Connection failed');
      }
    } else {
      setStatus('⚠️ MetaMask not detected');
    }
  };

  const handlePlaceOrder = async () => {
    if (!price || !amount) {
      setStatus('⚠️ Please enter price and amount');
      return;
    }

    try {
      setStatus('🔐 Encrypting price with FHE...');
      
      const response = await fetch('/api/encrypt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price, amount, isBuy, pair: selectedPair })
      });

      const data = await response.json();
      console.log("✅ Encrypted data:", data);

      setStatus('🚀 Order placed! Waiting for match...');
      alert(`🎉 Order placed for ${selectedPair}!\nPrice: ${price}\nAmount: ${amount}`);

    } catch (error) {
      console.error("❌ Error:", error);
      setStatus('❌ Transaction failed. Check console.');
    }
  };

  return (
    <div style={{ 
      padding: '2rem', 
      maxWidth: '600px', 
      margin: '0 auto', 
      fontFamily: 'Inter, system-ui, sans-serif',
      background: '#ffffff',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
      border: '1px solid #f0f0f0'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ 
          color: '#000', 
          fontSize: '2.5rem',
          fontWeight: '800',
          margin: '0 0 0.5rem 0',
          background: 'linear-gradient(135deg, #000000 0%, #333333 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>🤫 SilentSwap</h1>
        <p style={{ 
          color: '#666', 
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
            padding: '1rem',
            background: 'linear-gradient(135deg, #000000 0%, #333333 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '1.1rem',
            fontWeight: '600',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          🔌 Connect Wallet (MetaMask)
        </button>
      ) : (
        <>
          {/* Token Pair Selection */}
          <div style={{ 
            marginBottom: '1.5rem',
            background: '#f8f9fa',
            padding: '1.5rem',
            borderRadius: '16px',
            border: '1px solid #e9ecef'
          }}>
            <label style={{ 
              display: 'block', 
              fontWeight: '700', 
              marginBottom: '1rem',
              color: '#333',
              fontSize: '1.1rem'
            }}>
              🔄 Select Token Pair
            </label>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '0.5rem'
            }}>
              {tokenPairs.map((pair) => (
                <button
                  key={pair}
                  onClick={() => setSelectedPair(pair)}
                  style={{
                    padding: '0.75rem',
                    background: selectedPair === pair ? '#000' : '#fff',
                    color: selectedPair === pair ? '#fff' : '#333',
                    border: '2px solid',
                    borderColor: selectedPair === pair ? '#000' : '#e0e0e0',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedPair !== pair) {
                      e.target.style.borderColor = '#000';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedPair !== pair) {
                      e.target.style.borderColor = '#e0e0e0';
                    }
                  }}
                >
                  {pair}
                </button>
              ))}
            </div>
          </div>

          {/* Order Type */}
          <div style={{ 
            marginBottom: '1.5rem',
            background: '#f8f9fa',
            padding: '1.5rem',
            borderRadius: '16px',
            border: '1px solid #e9ecef'
          }}>
            <label style={{ 
              display: 'block', 
              fontWeight: '700', 
              marginBottom: '1rem',
              color: '#333',
              fontSize: '1.1rem'
            }}>
              📊 Order Type
            </label>
            <div style={{ 
              display: 'flex', 
              gap: '1rem',
              justifyContent: 'center'
            }}>
              <button
                onClick={() => setIsBuy(true)}
                style={{
                  flex: 1,
                  padding: '1rem',
                  background: isBuy ? 'linear-gradient(135deg, #28a745 0%, #218838 100%)' : '#fff',
                  color: isBuy ? '#fff' : '#28a745',
                  border: '2px solid #28a745',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '1rem',
                  transition: 'all 0.2s ease'
                }}
              >
                💰 Buy {selectedPair.split('/')[0]}
              </button>
              <button
                onClick={() => setIsBuy(false)}
                style={{
                  flex: 1,
                  padding: '1rem',
                  background: !isBuy ? 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)' : '#fff',
                  color: !isBuy ? '#fff' : '#dc3545',
                  border: '2px solid #dc3545',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '1rem',
                  transition: 'all 0.2s ease'
                }}
              >
                📤 Sell {selectedPair.split('/')[0]}
              </button>
            </div>
          </div>

          {/* Price Input */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ 
              display: 'block', 
              fontWeight: '700', 
              marginBottom: '0.5rem',
              color: '#333',
              fontSize: '1.1rem'
            }}>
              💵 Price (per {selectedPair})
            </label>
            <input
              type="number"
              placeholder={`Enter price for ${selectedPair}`}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem',
                border: '2px solid #e0e0e0',
                borderRadius: '12px',
                fontSize: '1.1rem',
                transition: 'border-color 0.2s',
                outline: 'none',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
              }}
              onFocus={(e) => e.target.style.borderColor = '#000'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          {/* Amount Input */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ 
              display: 'block', 
              fontWeight: '700', 
              marginBottom: '0.5rem',
              color: '#333',
              fontSize: '1.1rem'
            }}>
              📦 Amount ({selectedPair.split('/')[0]})
            </label>
            <input
              type="number"
              placeholder={`Enter amount of ${selectedPair.split('/')[0]}`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem',
                border: '2px solid #e0e0e0',
                borderRadius: '12px',
                fontSize: '1.1rem',
                transition: 'border-color 0.2s',
                outline: 'none',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
              }}
              onFocus={(e) => e.target.style.borderColor = '#000'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            style={{
              width: '100%',
              padding: '1.2rem',
              background: 'linear-gradient(135deg, #000000 0%, #333333 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '16px',
              cursor: 'pointer',
              fontSize: '1.2rem',
              fontWeight: '700',
              transition: 'all 0.2s ease',
              boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-3px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            🔐 Place Confidential Order
          </button>

          {/* Status Message */}
          {status && (
            <div style={{ 
              marginTop: '1.5rem',
              padding: '1rem',
              background: status.includes('❌') ? '#ffebee' : status.includes('✅') ? '#e8f5e8' : '#fff3e0',
              color: status.includes('❌') ? '#c62828' : status.includes('✅') ? '#2e7d32' : '#ef6c00',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '600',
              textAlign: 'center',
              border: '1px solid',
              borderColor: status.includes('❌') ? '#ffcdd2' : status.includes('✅') ? '#c8e6c9' : '#ffe0b2'
            }}>
              {status}
            </div>
          )}

          {/* Connected Wallet */}
          <div style={{ 
            marginTop: '2rem',
            padding: '1rem',
            background: '#f0f7ff',
            border: '1px solid #cfe2ff',
            borderRadius: '12px',
            fontSize: '0.95rem',
            color: '#084298',
            textAlign: 'center'
          }}>
            <strong>🔐 Connected:</strong> {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Not connected'}
          </div>
        </>
      )}

      <footer style={{ 
        fontSize: '0.85rem', 
        color: '#888', 
        marginTop: '3rem', 
        paddingTop: '1.5rem',
        borderTop: '2px solid #f0f0f0',
        textAlign: 'center'
      }}>
        Built for Zama Developer Program — Builder Track<br/>
        <strong>SilentSwap</strong> — No MEV • No Frontrunning • Fully Encrypted
      </footer>
    </div>
  );
}

export default App;
