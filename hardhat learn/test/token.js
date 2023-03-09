const { expect } = require("chai");
const { ethers } = require("hardhat");
// const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

// describe("Token contract", function () {
//     it("Deployment should assign the total supply of tokens to the owner", async function () {
//         const [owner] = await ethers.getSigners();
//         console.log("Signers objects:", owner);
//         const Token = await ethers.getContractFactory("Token");
//         const hardhatToken = await Token.deploy();

//         const ownerBalance = await hardhatToken.checkBalance(owner.address);
//         console.log("Owner Address:", owner.address);

//         expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);

//     });
//     it("Should Transfer Tokens between Accounts", async function () {
//         const [owner, addr1, addr2] = await ethers.getSigners();

//         const Token = await ethers.getContractFactory("Token");
//         const hardhatToken = await Token.deploy();

//         await hardhatToken.transfer(addr1.address, 10);
//         expect(await hardhatToken.checkBalance(addr1.address)).to.equal(10);
//         await hardhatToken.connect(addr1).transfer(addr2.address, 5);
//         expect(await hardhatToken.checkBalance(addr2.address)).to.equal(5);

//     });
// });

describe("Token Contract", function () {
    let Token;
    let hardhatToken;
    let owner;
    let add1, add2, addrs;

    beforeEach(async function () {
        Token = await ethers.getContractFactory("Token");
        [owner, add1, add2, ...addrs] = await ethers.getSigners();
        hardhatToken = await Token.deploy();
    });
    describe("Deployment", () => {
        it("Should set the right owner", async () => {
            expect(await hardhatToken.owner()).to.equal(owner.address);
        });
        it("Should assign the total supply of tokens to the owner", async () => {
            const ownerBalance = await hardhatToken.checkBalance(owner.address);
            expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
        });
    });

    describe("Transaction", () => {
        it("Should transfer token between accounts", async () => {
            //owner -> add1
            await hardhatToken.transfer(add1.address, 10);
            const add1Balance = await hardhatToken.checkBalance(add1.address);
            expect(add1Balance).to.equal(10);

            await hardhatToken.connect(add1).transfer(add2.address, 5);
            const add2Balance = await hardhatToken.checkBalance(add2.address);
            expect(add2Balance).to.equal(5);
        });
        it("Should fail if sender does not have enough tokens", async () => {
            const initialOwnerBalance = await hardhatToken.checkBalance(owner.address);
            await expect(
                hardhatToken.connect(add1).transfer(owner.address, 1)
            ).to.be.revertedWith("Not enough token");
            expect(await hardhatToken.checkBalance(owner.address)).to.equal(initialOwnerBalance);
        });
        it("Should update balances after transaction", async () => {
            const initialOwnerBalance = await hardhatToken.checkBalance(owner.address);
            await hardhatToken.transfer(add1.address, 10);
            await hardhatToken.transfer(add2.address, 10);
            expect(await hardhatToken.checkBalance(owner.address)).to.equal(initialOwnerBalance - 20);
            expect(await hardhatToken.checkBalance(add1.address)).to.equal(10);
            expect(await hardhatToken.checkBalance(add2.address)).to.equal(10);
        });
    });
});
