const { ethers } = require("ethers");
const provider = new ethers.providers.JsonRpcProvider(
    'https://mainnet.infura.io/v3/93f105c79e6246f7a55684adff5ad1b4'
);

const querryBlockchain = async () => {
    const block = await provider.getBlockNumber();
    console.log("Current Block Number:", block);
}
querryBlockchain();