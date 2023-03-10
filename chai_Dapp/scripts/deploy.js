// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function getBalances(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

async function consoleBalance(addressess) {
  let counter = 0;
  for (const address of addressess) {
    console.log(`Address ${counter} balance:`, await getBalances(address));
    counter++;
  }
}

async function consoleMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timeStamp;
    const name = memo.name;
    const _from = memo._from;
    const message = memo.message;

    console.log(`At: ${timestamp} ,Name: ${name} ,Address: ${_from} ,
    Message: ${message}`);
  }
}

async function main() {
  const [owner, form1, form2, form3] = await hre.ethers.getSigners();
  const chai = await hre.ethers.getContractFactory("chai");
  const contract = await chai.deploy(); //instance of contract 

  await contract.deployed();

  console.log("Address of Contract:", contract.address);

  const addressess = [owner.address, form1.address, form2.address, form3.address];
  console.log("Before Buying chai");
  await consoleBalance(addressess);

  const amount = { value: hre.ethers.utils.parseEther("1") };
  await contract.connect(form1).payChai("from1", "Very Nice Chai", amount);
  await contract.connect(form2).payChai("from2", "Very Nice Chai2", amount);
  await contract.connect(form3).payChai("from3", "Very Nice Chai3", amount);
  console.log("After Buying chai");
  await consoleBalance(addressess);

  const memos = await contract.getMemos();
  consoleMemos(memos);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
