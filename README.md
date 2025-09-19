# 🤫 SilentSwap — Confidential Token Swap Marketplace

> **MEV-proof, frontrunner-resistant decentralized exchange with Fully Encrypted Prices using Zama FHEVM.**

[![Live Demo](https://img.shields.io/badge/demo-live-green?style=for-the-badge)](https://silent-swap-dapp.vercel.app)
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
- **Frontend:** React + Relayer-based FHE encryption (no `@zama/fhe-client` — not published on npm)
- **Testnet:** Sepolia
- **Matching Engine:** On-chain, FHE-based price comparison

---

## 🚀 Live Demo

👉 [https://silent-swap-dapp.vercel.app](https://silent-swap-dapp.vercel.app)

> 💡 **Phase 1 — Relayer-Based FHE Demo:**  
> - User enters price → sent to relayer for encryption  
> - Relayer returns encrypted data → sent to contract  
> - On-chain matching with `FHE.gte()`  
> Full FHE client-side encryption will be added when `@zama/fhe-client` is officially published.

---

## 🧩 Architecture
