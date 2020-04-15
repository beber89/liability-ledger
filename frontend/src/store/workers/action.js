import { ADD_WORKER, 
  GET_WORKERS,
  FINISH_GET_WORKERS,
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

const finishGetWorkersAction = (workers) => {
  return {
    type: FINISH_GET_WORKERS,
    data: workers,
  }
}


export const handleEvent = () => {
  return dispatch => ((event) => {

    var tmp = event.returnValues[0];
    // if last character is \n then remove it
    tmp = tmp[tmp.length-1] === "\n"? tmp.slice(0, tmp.length-1):tmp;
    const data = tmp.split("\n");
    // reformat from "address:0x12312343;role:Manager\naddress:0x454123;role:Head\n" 
    // tot [{"address":"0x12312343", "role":"Manager"}, {"address":"0x454123", "role":"Head"}]
    const result = data.map((record) => {
      return record.split(";").reduce((map, obj) => {
        var [k, v] = obj.split(":");
        map[k] = v;
        return map;
      }, {});
    }) ;
    dispatch(finishGetWorkersAction(result));
    })
  };

  export const handleError = () => {
    return dispatch => ((error) => {
      console.log(error);
      })
    };


export const getWorkers = ({wallet}) => {
  return (dispatch) => {
    dispatch (getWorkersAction());
    const web3 = new Web3('ws://127.0.0.1:8545');
    
  var tx = new Txion(web3, wallet.publicKey, wallet.privateKey, wallet.contractAddress);
  tx.execute(wallet.contract.methods.getWorkers().encodeABI())
    .then((receipt) => {
    });
  };
  };


export const addWorker = ({wallet, workerId}) => {
  return dispatch => {
    dispatch(addWorkerAction());
    const rpcURL = 'http://127.0.0.1:8545'; // Your RPC URL goes here
    const web3 = new Web3(rpcURL);
    // Transfer some tokens
    
  var tx = new Txion(web3, wallet.publicKey, wallet.privateKey, wallet.contractAddress);
  tx.execute(wallet.contract.methods.register(workerId).encodeABI())
  .then((txHash) => {
      console.log(txHash);
    });
  };
};