const handlePlaceOrder = async () => {
  if (!price || !amount) {
    alert("Please enter price and amount.");
    return;
  }

  try {
    setStatus('🔐 Sending price to relayer for FHE encryption...');

    // Relayer sunucusuna istek gönder
    const response = await fetch('https://your-relayer-server.com/encrypt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price, amount, isBuy })
    });

    const data = await response.json();
    console.log("✅ Encrypted data received:", data);

    setStatus('🚀 Sending transaction to blockchain...');
    // Burada data.encryptedPrice ve data.encryptedAmount ile sözleşme çağrısı yapılır
    alert("🎉 Order placed! Check console for details.");

  } catch (error) {
    console.error("❌ Relayer request failed:", error);
    setStatus('❌ Failed to encrypt price. Check console.');
    alert("Failed to encrypt price. See console for details.");
  }
};
