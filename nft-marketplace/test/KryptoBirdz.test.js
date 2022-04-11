const chai = require("chai");
var assert = chai.assert;
const KryptoBirdz = artifacts.require("./KryptoBird");

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

      // failure
      await k.mint("https...1").should.be.rejected;
    });
  });

  describe("Indexing", async () => {
    it("Lists of KryptoBirdz", async () => {
      await k.mint("https...2");
      await k.mint("https...3");
      await k.mint("https...4");
      let totalSupply_2 = await k.totalSupply(),
        result = [],
        expected = ["https...1", "https...2", "https...3", "https...4"];
      for (let i = 0; result.length === totalSupply_2; i++) {
        await result.push(k.tokenByIndex[i]);
      }

      assert.equal(
        expected,
        result,
        "Lists compiled succesfully, all the contracts are in the list."
      );
    });
  });
});
