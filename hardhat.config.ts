import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config();

const PRIVATE_KEY: any = process.env.PRIVATE_KEY;
// const RPC_URL: any = process.env.RPC_URL

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    // goerli: {
    //   url: `https://eth-goerli.g.alchemy.com/v2/${process.env.API_KEY}`,
    //   accounts: [PRIVATE_KEY]
    // },
    hardhat: {
      chainId: 31337,
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.API_KEY}`,
      accounts: [PRIVATE_KEY]
    }
  }
};

export default config;
