const chai = require("chai");
var assert = chai.assert;
const KryptoBirdz = artifacts.require("./Kryptobird");

// Checking for Chai
require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("Kryptobird", async (accounts) => {
  let k = await KryptoBirdz.deployed();
  describe("Kryptobird", () => {
    it("Deployed Sucessfully", async () => {
      let address = k.address;
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
      assert.notEqual(address, 0x0);
    });
    it("Has Name", async () => {
      let name = await k.name();
      assert.equal(name, "KryptoBird");
    });
    it("Has Symbol", async () => {
      let symbol = await k.symbol();
      assert.equal(symbol, "KBIRDZ");
    });
  });

  describe("minting", async () => {
    it("Creates a new token", async () => {
      const mint = await k.mint("1"),
        totalSupply = await k.totalSupply;

      // Success Region
      console.log(`Minting: ${mint} \nTotal Supply = ${totalSupply}`);
    });
  });
});
