const chai = require("chai");
var assert = chai.assert;
const KryptoBirdz = artifacts.require("./Kryptobird");

// Checking for Chai
require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("Kryptobird", (accounts) => {
  let k;
  before(async () => {
    k = await KryptoBirdz.deployed();
  });

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
      const mint = await k.mint("https...1"),
        totalSupply = await k.totalSupply();

      // Success Region
      assert.equal(totalSupply, 1);
      const event = mint.logs[0].args;
      assert.equal(
        event._from,
        "0x0000000000000000000000000000000000000000",
        "Event passed from the contract"
      );
      assert.equal(event._to, accounts[0], "Obtained by msg.sender");

      //   failure
      await k.mint("https...1").should.be.rejected;
    });
  });
});
