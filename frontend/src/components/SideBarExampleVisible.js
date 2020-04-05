import React from 'react'
import { Icon, Menu, Segment, Sidebar, Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import Web3 from 'web3';
import Txion from '../utils/tx-utils';


const init = () => {
  const Tx = require('ethereumjs-tx').Transaction;
  const rpcURL = 'ws://127.0.0.1:9545'; // Your RPC URL goes here
  const web3 = new Web3(rpcURL);
  const accounts = ["0x5a0b622d28688f8c3d42952ed3e17d50f5b536a6", 
  "0x3a71227d135eb0d94541ac546d249ec3c5efc152",
  "0x961b6e6d0d8ab8da3dc34f6b4c15865372d0c17f"];
  const privateKeys = ["5465a59f47c88908a091a0a9e9d47c8cdc496f2cb32401c886df6a82d6885e9b"];
  const contractAddress = '0x0075Df0091b13DEAFf8717Aa07147e108220b857';
  const jsonFile = "./Liability.json";
  const abi = (require(jsonFile)).abi;
  const contract = new web3.eth.Contract(abi, contractAddress);
  // Transfer some tokens
  contract.events.NewWorker({
    filter: {'add': accounts},
    fromBlock: 0
}, function(error, event){ console.log(event); })
.on('data', function(event){
    console.log(event); // same results as the optional callback above
})
.on('error', console.error);
  
var tx = new Txion(web3, accounts[0], privateKeys[0], contractAddress);
  
  tx.execute(contract.methods.register(accounts[2]).encodeABI())
  .then((txHash) => {
    console.log(txHash);
    return tx.execute(contract.methods.getWorker(accounts[2]).encodeABI());
  })
  .then((txHash) => {
    console.log(txHash);
  });
  // web3.eth.getTransactionCount(accounts[0], (err, txCount) => {

  //   const txObject = {
  //     nonce:    web3.utils.toHex(txCount),
  //     gasLimit: web3.utils.toHex(800000), // Raise the gas limit to a much higher amount
  //     gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
  //     to: contractAddress,
  //     data: contract.methods.register(accounts[2]).encodeABI()
  //   }

  //   const tx = new Tx(txObject);
  //   tx.sign(Buffer.from( privateKeys[0], 'hex'));

  //   const serializedTx = tx.serialize();
  //   const raw = '0x' + serializedTx.toString('hex');

  //   const txObject1 = {
  //     nonce:    web3.utils.toHex(txCount+1),
  //     gasLimit: web3.utils.toHex(800000), // Raise the gas limit to a much higher amount
  //     gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
  //     to: contractAddress,
  //     data: contract.methods.getWorker(accounts[2]).encodeABI()
  //   }
  //   const tx1 = new Tx(txObject1);
  //   tx1.sign(Buffer.from( privateKeys[0], 'hex'));

  //   const serializedTx1 = tx1.serialize();
  //   const raw1 = '0x' + serializedTx1.toString('hex');

    
  //   web3.eth.sendSignedTransaction(raw, (err, txHash) => {
  //     console.log('err:', err, 'txHash:', txHash)
  //     // Use this txHash to find the contract on Etherscan!
  //     web3.eth.sendSignedTransaction(raw1, (err1, txHash1) => {
  //       console.log('err1:', err1, 'txHash1:', txHash1)
  //       // Use this txHash to find the contract on Etherscan!
  //     });
  //   });

  // });
};


const SidebarExampleVisible = (props) => (
  <Sidebar.Pushable as={Segment}>
    <Sidebar
      as={Menu}
      animation='overlay'
      icon='labeled'
      inverted
      vertical
      visible
      width='thin'
    >
      <Menu.Item as={Link} to="/">
        <Icon name='home' />
        Home
      </Menu.Item>
      <Menu.Item as={Link} to="/workers">
        <Icon name='users' />
        People
      </Menu.Item>
      <Menu.Item as={Link} to="/">
        <Icon name='camera' />
        Inventory
      </Menu.Item>
      <Menu.Item as={Link} to="/">
        <Icon name='file alternate' />
        Resources
      </Menu.Item>
      <Menu.Item  style={{"margin":"5em 0"}} onClick= {init}>
        <Icon name='plus' />
        Add
      </Menu.Item>
    </Sidebar>

    <Sidebar.Pusher>
      <Segment basic style={{"padding":"2em 12em"}}>
        {props.children}
      </Segment>
    </Sidebar.Pusher>
  </Sidebar.Pushable>
)

export default SidebarExampleVisible