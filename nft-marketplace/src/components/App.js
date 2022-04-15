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
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "./Components/app.css";

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

  // A function that will transfer the token
  transfer = (data) => {
    // const contract = this.state.contract;
    // const account = this.state.account;
    console.log("Transfer Successful");

    /*
    contract.methods
      .transfer(data)
      .send({ from: account })
      .once("receipt", () => {
        alert("Transfer Successful");
        // find index of element in array
        // const index = this.state.KBird.findIndex();
        // this.setState({
        //   KBird: this.state.KBird.filter((item) => item.id !== data),
        // });
      });
    */
  };

  constructor(props) {
    super(props);
    this.state = {
      account: "0",
      balance: 0,
      totalSupply: {},
      contract: null,
      KBird: [],
      isPopOver: false,
    };
  }

  render() {
    return (
      <>
        <Header account={this.state.balance.toFixed(4) + ` ETH`} />

        <div className="lr-padding-50px" style={{ color: "#fff" }}>
          <div
            className="f-column sc-half-height"
            style={{
              position: "relative",

              justifyContent: "center",
            }}
          >
            <div>
              <h1 style={{ textAlign: "center" }}>
                Home Page of NFT Marketplace
              </h1>
            </div>
            <div style={{ position: "relative", top: "5rem" }}>
              <form
                className="form f-column flex-center"
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
                    width: "45vw",
                  }}
                />
                <MDBBtn
                  type="submit"
                  style={{
                    marginTop: "10px",
                    padding: "10px 20px",
                    width: "45vw",
                    fontSize: "large",
                  }}
                >
                  MINT
                </MDBBtn>
              </form>
            </div>
          </div>
          <div
            style={{
              position: "relative",
              top: "7rem",
            }}
          >
            <h2 style={{ textAlign: "center" }}>Mints</h2>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {this.state.KBird.map((kryptoBird, key) => {
                return (
                  <MDBCard
                    className="token img"
                    style={{
                      maxWidth: "20rem",
                      margin: "2rem 20px",
                      color: "#000",
                    }}
                  >
                    <MDBCardImage
                      src={kryptoBird}
                      position="top"
                      height="250rem"
                      style={{ marginRight: "4px", objectFit: "contain" }}
                    />
                    <MDBCardBody>
                      <MDBCardTitle> Anime </MDBCardTitle>
                      <MDBCardText>
                        Some Anime Images taken from network that will invade
                        the whole blockchain in someone's dream!
                      </MDBCardText>
                      <MDBBtn href={kryptoBird}>Download</MDBBtn>

                      <MDBBtn
                        color="warning"
                        style={{ marginLeft: "10px" }}
                        onClick={() =>
                          this.setState({
                            isPopOver: !this.state.isPopOver,
                          })
                        }
                      >
                        Transfer
                      </MDBBtn>
                    </MDBCardBody>
                  </MDBCard>
                );
              })}
            </div>
          </div>
          <div
            style={{
              position: "relative",
              top: "14rem",
            }}
          >
            <h2 style={{ textAlign: "center" }}>Account Details</h2>
            <div style={{ paddingBottom: "2rem", margin: "2rem 20px" }}>
              <p>
                <strong>Mints:</strong> {this.state.totalSupply._hex}
              </p>
              <p>
                <strong>Account:</strong> {this.state.account}
              </p>
              <p>
                <strong>Balance:</strong> {this.state.balance} ETH
              </p>
              <div>
                <p>
                  <strong>Purhcases</strong>
                </p>
                <ul>
                  {this.state.KBird.map((KryptoBird, index) => (
                    <li key={index}>{KryptoBird.substring(0, 150)}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            const transferTo = this.transferToNewOwner.value;
            this.transfer(transferTo);
            console.log(transferTo);
          }}
        >
          <MDBModal
            show={this.state.isPopOver}
            setShow={this.state.isPopOver}
            tabIndex="-1"
          >
            <MDBModalDialog>
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle
                    ref={(input) => (this.transferToNewOwner = input)}
                  >
                    Enter New Owner Address
                  </MDBModalTitle>
                  <MDBBtn
                    className="btn-close"
                    color="none"
                    onClick={() => {
                      this.setState({ isPopOver: !this.state.isPopOver });
                    }}
                  ></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                  <MDBInput label="Hex Address" id="typeText" type="text" />
                </MDBModalBody>

                <MDBModalFooter>
                  <MDBBtn
                    color="secondary"
                    onClick={() => {
                      this.setState({ isPopOver: !this.state.isPopOver });
                    }}
                  >
                    Close
                  </MDBBtn>
                  <MDBBtn color="success" onClick={this.transfer}>
                    Transfer
                  </MDBBtn>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
        </form>
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
