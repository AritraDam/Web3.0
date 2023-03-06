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

});