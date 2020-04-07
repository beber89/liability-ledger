import { ADD_WORKER, 
  WORKER_ADDED, 
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


export const addWorker = ({publicKey, privateKey, workerId}) => {
  return dispatch => {
    dispatch(addWorkerAction());
    console.log(publicKey);
    const Tx = require('ethereumjs-tx').Transaction;
    const rpcURL = 'http://127.0.0.1:8545'; // Your RPC URL goes here
    const web3 = new Web3(rpcURL);
    const contractAddress = "0x8a4023524e5a5f7285bceda097cb6287825c2d0e";
    const jsonFile = "./Liability.json";
    const abi = (require(jsonFile)).abi;
    const contract = new web3.eth.Contract(abi, contractAddress);
    // Transfer some tokens
  //   contract.events.NewWorker({
  //     // filter: {'add': accounts},
  //     fromBlock: 0
  // }, function(error, event){ console.log(event); })
  // .on('data', function(event){
  //     // console.log(event); // same results as the optional callback above
  // })
  // .on('error', console.error);
    
  var tx = new Txion(web3, publicKey, privateKey, contractAddress);
  console.log(workerId);
    tx.execute(contract.methods.register(workerId).encodeABI())
    .then((txHash) => {
      console.log(txHash);
      return tx.execute(contract.methods.getWorker(workerId).encodeABI());
    })
    .then((txHash) => {
      console.log(txHash);
      dispatch(workerAddedAction());
    });
  };
};