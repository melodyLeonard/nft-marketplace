import * as dotenv from 'dotenv';

import { HardhatUserConfig } from 'hardhat/config';
import '@nomiclabs/hardhat-waffle';

import fs from 'fs';

dotenv.config();

const privateKey = fs.readFileSync('.secret').toString().trim();

const config: HardhatUserConfig = {
  solidity: '0.8.4',
  networks: {
    ropsten: {
      url: process.env.ROPSTEN_URL || '',
      accounts: [privateKey],
    },

    hardhat: {
      chainId: 1337,
    },
    rinkeby: {
      url: process.env.RINKEBY_URL || '',
      accounts: [privateKey],
    },
    mainnet: {
      url: process.env.MAINNET_URL || '',
      accounts: [privateKey],
    },
  },
};

export default config;
