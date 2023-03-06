const { expect } = require("chai");
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

describe("Token contract", function () {
    it("Deployment should assign the total supply of tokens to the owner", async function () {
        const [owner] = await ethers.getSigners();
        console.log("Signers objects:", owner);
        const Token = await ethers.getContractFactory("Token");
        const hardhatToken = await Token.deploy();

        const ownerBalance = await hardhatToken.checkBalance(owner.address);
        console.log("Owner Address:", owner.address);

        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);

    });
    it("Should Transfer Tokens between Accounts", async function () {
        const [owner, addr1, addr2] = await ethers.getSigners();

        const Token = await ethers.getContractFactory("Token");
        const hardhatToken = await Token.deploy();

        await hardhatToken.transfer(addr1.address, 10);
        expect(await hardhatToken.checkBalance(addr1.address)).to.equal(10);
        await hardhatToken.connect(addr1).transfer(addr2.address, 5);
        expect(await hardhatToken.checkBalance(addr2.address)).to.equal(5);

    });
});