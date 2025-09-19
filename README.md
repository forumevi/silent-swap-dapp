# 🚧 SilentSwap — Phase 1: UI + Concept Demo

> **This submission includes full source code for smart contract, tests, and deployment scripts — ready for Phase 2 (FHE integration) upon local setup.**

✅ **Live Demo:** [https://silent-swap-dapp.vercel.app](https://silent-swap-dapp.vercel.app)  
✅ **Full Contract Code:** `contracts/SilentSwap.sol`  
✅ **Test Suite:** `test/SilentSwap.test.js`  
✅ **Deployment Scripts:** `scripts/deploy.js`, `hardhat.config.js`

---

## 🎯 Why SilentSwap?

- ❌ **Traditional DEXs:** Prices are public → MEV bots exploit you.
- ✅ **SilentSwap:** Prices are encrypted with FHE → Only revealed on match.
- 🔐 **No public orderbook. No frontrunning. Ever.**

Built for **Zama Developer Program — Builder Track**.

---

## ⚙️ Tech Stack

- **Smart Contract:** Solidity + Zama FHEVM (`euint64`, `FHE.gte`)
- **Frontend:** React + `@zama/fhe-client`
- **Testnet:** Sepolia (deploy script ready — requires local setup)
- **Matching Engine:** On-chain, FHE-based price comparison

---

## 🚀 Live Demo

👉 [https://silent-swap-dapp.vercel.app](https://silent-swap-dapp.vercel.app)

> 💡 **Phase 1 — UI Demo:** Click “Place Confidential Order” to see alert.  
> **Phase 2 — Full FHE Integration:** Requires local Hardhat setup to deploy contract and enable encryption.

---

## 🎥 Presentation Video Script

> “Hi, I’m [Your Name]. This is SilentSwap — the first DEX with fully encrypted limit orders using Zama FHEVM.  
> This Phase 1 submission includes:  
> - Live UI demo  
> - Full smart contract code with FHE logic  
> - Test suite and deploy scripts  
> Phase 2 will enable full FHE encryption — deployable with local Hardhat setup.  
> Built for Zama Developer Program — Builder Track. Thank you.”

---

## 📜 License

MIT License — Free to use, modify, and distribute.

---

💡 **Submit to Zama Developer Program:**  
🔗 [https://guild.xyz/zama/developer-program](https://guild.xyz/zama/developer-program)
