import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { FheProvider } from '@zama/fhe-client';

// Sözleşme ABI ve adresi
const CONTRACT_ADDRESS = "0x..."; // Sepolia’da deploy edince buraya yaz
const CONTRACT_ABI = [
  "function placeOrder(bytes32 pairId, bool isBuy, uint256 encryptedPrice, uint256 amount)"
];

function App() {
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [isBuy, setIsBuy] = useState(true);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (window.ethereum) {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(web3Provider);
      web3Provider.getSigner().then(setSigner);
    }
  }, []);

  useEffect(() => {
    if (signer && CONTRACT_ADDRESS !== "0x...") {
      const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      setContract(contractInstance);
    }
  }, [signer]);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        setStatus('Wallet connected ✅');
      } catch (error) {
        setStatus('Connection failed ❌');
      }
    }
  };

  const handlePlaceOrder = async () => {
    if (!contract) {
      alert("Please connect wallet and wait for contract to load.");
      return;
    }

    if (!price || !amount) {
      alert("Please enter price and amount.");
      return;
    }

    try {
      setStatus('🔐 Encrypting price with FHE...');
      const encryptedPrice = await FheProvider.encrypt(price, 'euint64');
      console.log("✅ Encrypted Price:", encryptedPrice);

      const pairId = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("ETH/USDC"));

      setStatus('🚀 Sending transaction...');
      const tx = await contract.placeOrder(
        pairId,
        isBuy,
        encryptedPrice,
        ethers.utils.parseEther(amount)
      );

      setStatus('⏳ Waiting for confirmation...');
      await tx.wait();

      setStatus('🎉 Order placed confidentially!');
      alert("🎉 Order placed! Check console for details.");

    } catch (error) {
      console.error("❌ Transaction failed:", error);
      setStatus('❌ Transaction failed. Check console.');
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
      <h1 style={{ color: '#000', fontSize: '2.2rem', margin: '0 0 0.5rem 0' }}>🤫 SilentSwap</h1>
      <p style={{ color: '#555', fontSize: '1.1rem', margin: '0', fontWeight: '500' }}>
        <em>Swap tokens with encrypted prices. No MEV. No frontrunning.</em>
      </p>

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
            fontWeight: 'bold'
          }}
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
                <input type="radio" checked={isBuy} onChange={() => setIsBuy(true)} /> Buy Order
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
                <input type="radio" checked={!isBuy} onChange={() => setIsBuy(false)} /> Sell Order
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
              Price (e.g., 3000)
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
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              fontWeight: 'bold', 
              marginBottom: '0.5rem',
              color: '#333'
            }}>
              Amount (e.g., 1)
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
                fontSize: '1rem'
              }}
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
              fontWeight: 'bold'
            }}
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

          <p style={{ 
            fontSize: '0.85rem', 
            color: '#666', 
            marginTop: '1.5rem',
            textAlign: 'center'
          }}>
            Connected: <strong>{account.slice(0, 6)}...{account.slice(-4)}</strong>
          </p>
        </>
      )}

      <footer style={{ 
        fontSize: '0.8rem', 
        color: '#888', 
        marginTop: '3rem', 
        borderTop: '1px solid #eee', 
        paddingTop: '1rem',
        textAlign: 'center'
      }}>
        Built for Zama Developer Program — Builder Track
      </footer>
    </div>
  );
}

export default App;
