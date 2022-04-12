import React from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import KryptoBird from "../abis/KryptoBird.json";

export default function Home() {
  let web3, accounts;
  async function loadData() {
    const loadProvider = await detectEthereumProvider();

    if (loadProvider) {
      console.log("Ethereum wallet is conencted");
      web3 = new Web3(loadProvider);
      accounts = web3.eth.accounts;
    } else {
      console.log("No Ethereum Provider");
    }
  }
  async function loadBlockChainData() {
    // window.ethereum
    accounts = await web3.eth.request({ method: "eth_accounts" });
    console.log(accounts);
  }

  // Adding Load Data
  loadData();
  // checking blockchain data
  loadBlockChainData();

  return (
    <div>
      <h1>Home Page of NFT Marketplace </h1>;
    </div>
  );
}
