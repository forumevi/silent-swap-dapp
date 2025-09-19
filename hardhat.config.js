require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: "ALCHEMY_RPC_URL_HERE",
      accounts: ["PRIVATE_KEY_HERE"],
    },
  },
};
