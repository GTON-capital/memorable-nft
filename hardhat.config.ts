import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
import "hardhat-gas-reporter";

import { resolve } from "path";
import { config as dotenvConfig } from "dotenv";
dotenvConfig({ path: resolve(__dirname, "./.env") });

const { PRIVATE_KEY, ETHERSCAN, POLYGONSCAN, FTMSCAN } = process.env;

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    mainnet: {
      url: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      accounts: [PRIVATE_KEY],
      gasPrice: 26 * 1e9,
      chainId: 1,
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      accounts: [PRIVATE_KEY],
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      accounts: [PRIVATE_KEY],
      gasPrice: 3500 * 1e9,
      gasMultiplier: 1,
    },
    matic: {
      url: "https://polygon-rpc.com/",
      accounts: [PRIVATE_KEY],
    },
    mumbai: {
      networkId: 80001,
      url: "https://matic-mumbai.chainstacklabs.com",
      accounts: [PRIVATE_KEY],
      gasPrice: 35000000000,
    },
    gton: {
      url: "https://testnet.gton.network",
      accounts: [PRIVATE_KEY],
      gasPrice: 40 * 1e9,
      gasMultiplier: 1,
    },
    ftm: {
      // url: "https://rpc.ankr.com/fantom",
      url: "https://rpcapi-tracing.fantom.network",
      accounts: [PRIVATE_KEY],
    },
    ftmTestnet: {
      // gas: 5000000,
      // gasPrice: 35000000000,
      // url: "https://rpc.ankr.com/fantom",
      url: "https://rpc.testnet.fantom.network",
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      mainnet: ETHERSCAN,
      ropsten: ETHERSCAN,
      rinkeby: ETHERSCAN,
      goerli: ETHERSCAN,
      kovan: ETHERSCAN,
      // ftm
      opera: FTMSCAN,
      ftmTestnet: FTMSCAN,
      // polygon
      polygon: POLYGONSCAN,
      polygonMumbai: POLYGONSCAN,
    },
  },
  solidity: {
    version: "0.8.15",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 20000,
  },
};
