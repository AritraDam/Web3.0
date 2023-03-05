//0x4477079b06391cb418acbc8273122ea1b95bdc78

const { ethers } = require("ethers");
const provider = new ethers.providers.JsonRpcProvider(
    'https://goerli.infura.io/v3/93f105c79e6246f7a55684adff5ad1b4'
);
const walletAddress = "0x189f8cc3be9a9e13f25d11e1c05b9bfc0cd7933d";

const walletAbi = [
    {
        "inputs": [],
        "name": "sendEthContract",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "sentEth",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_num",
                "type": "uint256"
            }
        ],
        "name": "setValue",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "accountBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "contractBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getValue",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

const contractInteraction = async () => {
    const walletContract = new ethers.Contract(walletAddress, walletAbi, provider);
    const contractName = await walletContract.name();
    console.log("Contract name:", contractName);

    const num = await walletContract.getValue();
    console.log("Number Value:", String(num));

    const contractBalance = await walletContract.contractBalance();
    const contractBalanceEth = ethers.utils.formatEther(contractBalance);
    console.log("Contract Balance: ", contractBalanceEth);

    const userBalance = await walletContract.accountBalance("0x283683161F6fcf9CE700ba8D3636B0990bC75BD7");
    const userBalanceEth = ethers.utils.formatEther(userBalance);
    console.log("User Balance: ", userBalanceEth);
}

contractInteraction();
