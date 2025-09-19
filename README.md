# 🤫 SilentSwap — Confidential Token Swap Marketplace

> **MEV-proof, frontrunner-resistant decentralized exchange with Fully Encrypted Prices using Zama FHEVM.**

[![Live Demo](https://img.shields.io/badge/demo-live-green?style=for-the-badge)](https://silent-swap-demo.vercel.app)
[![Sepolia Contract](https://img.shields.io/badge/contract-Sepolia-blue?style=for-the-badge)](https://sepolia.etherscan.io/address/0x...)
[![Built with Zama FHEVM](https://img.shields.io/badge/Built%20with-Zama%20FHEVM-orange?style=for-the-badge)](https://zama.ai)

---

## 🎯 Why SilentSwap?

- ❌ **Traditional DEXs:** Prices are public → MEV bots exploit you.
- ✅ **SilentSwap:** Prices are encrypted with FHE → Only revealed on match.
- 🔐 **No public orderbook. No frontrunning. Ever.**

Built for **Zama Developer Program — Builder Track**.

---

## ⚙️ Tech Stack

- **Smart Contract:** Solidity + Zama FHEVM (`euint64`, `FHE.gte`)
- **Frontend:** React + `@zama-fhe/client`
- **Testnet:** Sepolia
- **Matching Engine:** On-chain, FHE-based price comparison

---

## 🚀 Live Demo

👉 [https://silent-swap-demo.vercel.app](https://silent-swap-demo.vercel.app)

---

## 🎥 Demo Video (Optional but Highly Recommended)

[![Watch SilentSwap Demo](https://img.youtube.com/vi/YOUR_VIDEO_ID/0.jpg)](https://youtu.be/YOUR_VIDEO_ID)

*Video script and instructions provided in /docs/video-script.md*

---

## 🛠️ Installation

```bash
git clone https://github.com/<YOUR_GITHUB>/silent-swap-dapp.git
cd silent-swap-dapp

# Install dependencies
npm install

# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Start frontend
cd frontend
npm install
npm start