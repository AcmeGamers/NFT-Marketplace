const assert = require("chai");
const KryptoBirdz = require("./Kryptobird");

// Checking for Chai
require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("Kryptobird", (accounts) => {
  describe("Kryptobird", () => {
    it("Deployed Sucessfully", async () => {
      const k = await KryptoBirdz.deployed();
      assert.equal(k.address, accounts[0]);
    });
  });
});
