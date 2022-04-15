// ----------
// Liberaries
// ----------
import React, { Component } from "react";
import Web3 from "web3";
import KryptoBird from "../abis/KryptoBird.json";
// import React, { useState, useEffect } from "react";
// import { Accounts } from "web3-eth-accounts";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";

// ----------
// Components
// ----------
import Header from "./Components/navbar/header";
// import Footer from "./Components/navbar/footer";

export default class Home extends Component {
  async componentDidMount() {
    await this.loadWeb3();

    await this.loadBlockchainData();
  }

  async loadWeb3() {
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

  async loadBlockchainData() {
    const web3 = window.web3;
    const acc = await web3.eth.getAccounts();

    // saves the account state
    this.setState({ account: acc[0] });

    // Shows amount of user
    let getAmount;
    await web3.eth.getBalance(this.state.account, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        getAmount = web3.utils.fromWei(result, "ether");

        console.log(getAmount + " ETH");
      }
    });
    this.setState({ balance: parseFloat(getAmount) });

    // network id and data
    const networkID = await web3.eth.net.getId(),
      networkData = KryptoBird.networks[networkID];

    console.log(`Network ID\n`);
    console.log(networkID);
    console.log(`\nNetwork Data`);
    console.log(networkData);

    if (networkData) {
      var abi = KryptoBird.abi,
        address = networkData.address,
        contract = new web3.eth.Contract(abi, address);
      // Add contract
      this.setState({ contract: contract });

      console.log(`ABI\n`);
      console.log(abi);

      console.log(`\nAddress`);
      console.log(address);

      console.log(`\nContract`);
      console.log(contract);

      console.log("Contract Data");
      let contractData = await contract.methods.totalSupply().call();

      console.log("Total Supply");
      this.setState({ totalSupply: contractData });
      console.log(this.state.totalSupply);

      // check contracts
      for (let i = 1; i <= this.state.totalSupply; i++) {
        const KryptoBird = await contract.methods.kryptoBirdz(i - 1).call();
        this.setState({ KBird: [...this.state.KBird, KryptoBird] });
        console.log("KBirds data ");
        console.log(this.state.KBird);
      }
    } else {
      alert("Smart Contract Not Deployed");
    }
  }

  // a function that will mint tokens
  mint = (data) => {
    const contract = this.state.contract;
    const account = this.state.account;

    contract.methods
      .mint(data)
      .send({ from: account })
      .once("recipt", (error, recipt) => {
        this.setState({ KBird: [...this.state.KBird, KryptoBird] });
        console.log(error);
        console.log(recipt);
      })
      .then((result) => {
        console.log("Result V1");
        console.log(result);
      });
  };

  constructor(props) {
    super(props);
    this.state = {
      account: "0",
      balance: 0,
      totalSupply: {},
      contract: null,
      KBird: [],
    };
  }

  render() {
    return (
      <>
        <Header account={this.state.balance.toFixed(4) + ` ETH`} />

        <div className="lr-padding-50px">
          <div>
            <h1>Home Page of NFT Marketplace </h1>
            <p>Mints: {this.state.totalSupply._hex}</p>
            <p>Account: {this.state.account}</p>
            <p>Balance: {this.state.balance} ETH</p>
            <div>
              <p>Purhcases</p>
              <ul>
                {this.state.KBird.map((KryptoBird) => (
                  <li key={this.state.KBird.indexOf(KryptoBird)}>
                    {KryptoBird}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <form
              className="form column flex-center"
              onSubmit={(event) => {
                event.preventDefault();
                const keybird = this.kryptoBird.value;
                this.mint(keybird);
                console.log(keybird);
              }}
            >
              <input
                type="text"
                placeholder="File URL"
                ref={(input) => (this.kryptoBird = input)}
                style={{
                  marginTop: "10px",
                  padding: "10px 20px",
                  width: "200px",
                }}
              />
              <input
                type="submit"
                value="MINT"
                style={{
                  marginTop: "10px",
                  padding: "10px 20px",
                  width: "245px",
                }}
              />
            </form>
          </div>
          <div>
            {this.state.KBird.map((kryptoBird, key) => {
              return (
                <div>
                  <div>
                    <MDBCard
                      className="token img"
                      style={{ maxWidth: "22rem" }}
                    >
                      <MDBCardImage
                        src={kryptoBird}
                        position="top"
                        height="250rem"
                        style={{ marginRight: "4px" }}
                      />
                      <MDBCardBody>
                        <MDBCardTitle> KryptoBirdz </MDBCardTitle>
                        <MDBCardText>
                          {" "}
                          The KryptoBirdz are 20 uniquely generated KBirdz from
                          the cyberpunk cloud galaxy Mystopia! There is only one
                          of each bird and each bird can be owned by a single
                          person on the Ethereum blockchain.{" "}
                        </MDBCardText>
                        <MDBBtn href={kryptoBird}>Download</MDBBtn>
                      </MDBCardBody>
                    </MDBCard>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

// React Functional Code
/* 
export default function Home() {
  // creating states to store data in accounts
  let [account, setAccount] = useState(""),
    [contract, setContract] = useState(null),
    [totalSupply, setTotalSupply] = useState(0),
    [KBird, setKBird] = useState([]),
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
          console.log("Total Supply");
          console.log(totalSupply);

          // Function to mint NFTs
          contract.methods
            .mint("https://1231")
            .send({ from: account })
            .once("transactionHash", function(hash) {
              console.log(hash);
            });

          console.log("\n\n\nNew Kbirz = ");
          console.log(KBird);

          // check contracts
          for (let i = 1; i <= totalSupply; i++) {
            console.log("a");
            contract.methods
              .kryptoBirdz(i - 1)
              .call()
              .then((result) => {
                console.log("--------");
                console.log(result);
                setKBird([...KBird, result]);
              });
          }
        });
    }
  }

  useEffect(() => {
    // Adding Load Data
    loadWeb3();
    // checking blockchain data
    loadBlockchainData();
  }, []);
  console.log("Kbirdz");
  console.log(KBird);

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

*/
