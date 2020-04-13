import { ADD_WORKER, 
  GET_WORKERS,
 } from "./actionTypes";

import Txion from '../../utils/tx-utils';
import Web3 from 'web3';


const addWorkerAction = () => {
  return {
    type: ADD_WORKER,
  };
};

const getWorkersAction = () => {
  return {
    type: GET_WORKERS,
  }
}

export const getWorkers = ({publicKey, privateKey, contract, contractAddress}) => {
  return (dispatch) => {
    dispatch (getWorkersAction());
    console.log(contract);
    const web3 = new Web3('ws://127.0.0.1:8545');
    // const contractAddress = localStorage.getItem("contractAddress"); //TODO: check if fails
    // const jsonFile = "./Liability.json";
    // const abi = (require(jsonFile)).abi;
    // const contract = new web3.eth.Contract(abi, contractAddress);
  //   // Transfer some tokens
  //   contract.events.Workers({
  //     // filter: {'list': "hello"},
  //     fromBlock: 0,  // latest
  //     toBlocK: 'latest'
  // }, function (error, event) { console.log(event); })
  // // .on('data', function(event){
  // //     console.log(event); // same results as the optional callback above
  // // })
  // ;
    
  var tx = new Txion(web3, publicKey, privateKey, contractAddress);
  tx.execute(contract.methods.getWorkers().encodeABI())
    .then((receipt) => {
      // console.log(receipt);
    });
  };
  };


export const addWorker = ({publicKey, privateKey, workerId}) => {
  return dispatch => {
    dispatch(addWorkerAction());
    // const Tx = require('ethereumjs-tx').Transaction;
    const rpcURL = 'http://127.0.0.1:8545'; // Your RPC URL goes here
    const web3 = new Web3(rpcURL);
    const contractAddress = localStorage.getItem("contractAddress"); //TODO: check if fails
    const jsonFile = "./Liability.json";
    const abi = (require(jsonFile)).abi;
    const contract = new web3.eth.Contract(abi, contractAddress);
    // Transfer some tokens
  //   contract.events.Workers({
  //     // filter: {'add': accounts},
  //     fromBlock: 0
  // }, function(error, event){ console.log(event); })
  // .on('data', function(event){
  //     // console.log(event); // same results as the optional callback above
  // })
  // .on('error', console.error);
    
  // var tx = new Txion(web3, publicKey, privateKey, contractAddress);
  // console.log(workerId);
  //   tx.execute(contract.methods.register(workerId).encodeABI())
  //   .then((txHash) => {
  //     console.log(txHash);
  //     return tx.execute(contract.methods.getWorker(workerId).encodeABI());
  //   })
  //   .then((txHash) => {
  //     console.log(txHash);
  //     dispatch(workerAddedAction());
  //   });
  };
};