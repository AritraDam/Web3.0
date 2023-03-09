/** @type import('hardhat/config').HardhatUserConfig */

require("@nomiclabs/hardhat-waffle")


const ALCHEMY_API_KEY = "5SssVFluoiRL4rbtH3fosWBBL7q9B7MD";
const GOERLI_PRIVATE_KEY = "903bd96d065cd1692f12a58521cc109e1981e6abfd79d9e15c19340bd6d3c20f";
module.exports = {
  solidity: "0.8.18",
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/5SssVFluoiRL4rbtH3fosWBBL7q9B7MD`,
      accounts: [`${GOERLI_PRIVATE_KEY}`]
    }
  }
};
