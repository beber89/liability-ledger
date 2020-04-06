import { ADD_WORKER, 
  WORKER_ADDED
 } from "./actionTypes";

import Txion from '../../utils/tx-utils';
import Web3 from 'web3';




const addWorkerAction = () => {
  return {
    type: ADD_WORKER,
  };
};

const workerAddedAction = () => {
  return {
    type: WORKER_ADDED,
  };
};


export const addWorker = (publicId) => {
  return dispatch => {
    dispatch(addWorkerAction());

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
    
    tx.execute(contract.methods.register(publicId).encodeABI())
    .then((txHash) => {
      console.log(txHash);
      return tx.execute(contract.methods.getWorker(publicId).encodeABI());
    })
    .then((txHash) => {
      console.log(txHash);
      dispatch(workerAddedAction());
    });
  };
};