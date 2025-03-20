const fs = require("fs");
const privateKey = fs.readFileSync(".secret").toString().trim();

require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter");
require("hardhat-deploy");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.26",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    local: {
      url: "http://127.0.0.1:8545",
    },
    hardhat: {
      blockGasLimit: 7000000,
    },
    aeneid: {
      url: "https://aeneid.storyrpc.io",
      chainId: 1315,
      throwOnTransactionFailures: true,
      gasPrice: "auto",
      accounts: [privateKey],
      gas: 4000000,
      timeout: 120000,
      allowUnlimitedContractSize: true,
    },
    mainnet: {
      url: "https://mainnet.storyrpc.io",
      chainId: 1514,
      throwOnTransactionFailures: true,
      gasPrice: "auto",
      accounts: [privateKey],
      gas: 4000000,
      timeout: 120000,
      allowUnlimitedContractSize: true,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  paths: {
    deploy: "scripts/mainnet",
    deployments: "deployments",
  },
};
