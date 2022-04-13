// have to start from module 23; video 2 ending;

// ----------
// Liberaries
// ----------
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import KryptoBird from "../abis/KryptoBird.json";
// import { Accounts } from "web3-eth-accounts";

// ----------
// Components
// ----------
import Header from "./Components/navbar/header";
// import Footer from "./Components/navbar/footer";

export default function Home() {
  // creating states to store data in accounts
  let [account, setAccount] = useState(""),
    [contract, setContract] = useState(null),
    [totalSupply, setTotalSupply] = useState(0),
    web3 = new Web3(window.web3.currentProvider);

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async function loadBlockchainData() {
    const web3 = window.web3;
    const acc = web3.eth.getAccounts();
    // saves the account in state
    setAccount(acc[0]);

    // network id and data
    var networkID,
      getID = await web3.eth.net.getId().then((id) => {
        networkID = id;
      }),
      networkData = KryptoBird.networks[networkID];

    console.log(`Network ID\n`);
    console.log(networkID);
    console.log(`\nNetwork Data`);
    console.log(networkData);

    if (networkData) {
      var abi = KryptoBird.abi,
        address = networkData.address,
        contract = new web3.eth.Contract(abi, address);
      setContract(contract);

      console.log(`ABI\n`);
      console.log(abi);
      console.log(`\nAddress`);
      console.log(address);
      console.log(`\nContract`);
      console.log(contract);

      console.log("Contract Data");
      contract.methods
        .totalSupply()
        .call()
        .then((totalSupply) => {
          setTotalSupply(totalSupply);
          console.log(totalSupply);
        });
    }
  }

  useEffect(() => {
    // Adding Load Data
    loadWeb3();
    // checking blockchain data
    loadBlockchainData();
  }, []);

  // var accounts = new Accounts("ws://localhost:7545");
  // console.log(accounts);
  // web3.eth.net.getId().then(console.log);
  // web3.eth.accounts.create();
  // web3.eth.accounts
  //   .signTransaction(
  //     {
  //       to: "0x6cb1Ad9A3187689D8dC869C2C5dc67C3106247CC",
  //       value: "1000000000",
  //       gas: 2000000,
  //       gasPrice: "234567897654321",
  //       nonce: 12,
  //       chainId: 1,
  //     },
  //     "0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318"
  //   )
  //   .then(console.log);

  return (
    <>
      <Header account={account} />
      <div className="lr-padding-50px">
        <h1>Home Page of NFT Marketplace </h1>
      </div>
    </>
  );
}

// import React, { Component } from "react";
// export default class Home extends Component {
//   async componentDidMount() {
//     await this.Web3provider();
//     // await this.loadBlockChainData();
//   }
//   async Web3provider() {
//     let provider = await detectEthereumProvider();

//     if (provider) {
//       // From now on, this should always be true:
//       // provider === window.ethereum
//       // startApp(provider); // initialize your app
//       console.log("Provider is there", provider);
//       window.web3 = new Web3(provider);
//     } else {
//       console.log("Please install MetaMask!");
//     }
//   }

//   render() {
//     return <h1>NFT MarketPlace</h1>;
//   }
// }
