const hre = require("hardhat");

async function main() {
  const SilentSwap = await hre.ethers.getContractFactory("SilentSwap");
  const silentSwap = await SilentSwap.deploy();

  await silentSwap.deployed();

  console.log("✅ SilentSwap deployed to:", silentSwap.address);

  const fs = require('fs');
  const configPath = "../frontend/src/config.js";
  const configContent = `export const CONTRACT_ADDRESS = "${silentSwap.address}";\n`;

  fs.writeFileSync(configPath, configContent);
  console.log(`📝 Contract address saved to ${configPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
