import { SET_KEYS, 
  SET_CONTRACT_ADDRESS,
  SET_CONTRACT_OBJECT
 } from "./actionTypes";
 import Web3 from 'web3';




const setContractAddressAction = (contractAddress) => {
  return {
    type: SET_CONTRACT_ADDRESS,
    data: {
      contractAddress,
    }
  };
}

const setKeysAction = (publicKey, privateKey) => {
  return {
    type: SET_KEYS,
    data: {
      publicKey,
      privateKey
    }
  };
};

const setContractObject = (contract) => {
  return {
    type: SET_CONTRACT_OBJECT,
    data: {
      contract,
    }
  }
}


export const setKeys = ({publicKey, privateKey}) => {
  return dispatch => {
    localStorage.setItem("publicKey", publicKey);
    localStorage.setItem("privateKey", privateKey);
    dispatch(setKeysAction(publicKey, privateKey));
  };
};

export const loadContract =  () => {
  return dispatch => {
    const web3 = new Web3('ws://127.0.0.1:8545');
    const contractAddress = localStorage.getItem("contractAddress"); //TODO: check if fails
    if(contractAddress !== undefined) {
      dispatch(setContractAddressAction(contractAddress));
      const jsonFile = "./Liability.json";
      const abi = (require(jsonFile)).abi;
      const contract = new web3.eth.Contract(abi, contractAddress);
      if(contract !== undefined)
      {
        dispatch(setContractObject(contract));
        contract.events.Workers({
          fromBlock: 'latest',  // latest
          toBlocK: 'latest'
        }, function (error, event) { console.log(event); });
      }
    }
  };
};

// export const authCheckContractAddress = () => {
//   return dispatch => {
//     const contractAddress = localStorage.getItem("contractAddress");
//     if(contractAddress !== undefined) {
      
//     }
//   }
// }

export const authCheckState = () => {
  return dispatch => {
    const privateKey = localStorage.getItem("privateKey");
    const publicKey = localStorage.getItem("publicKey");
    if (privateKey === undefined || publicKey === undefined) {
      // dispatch(logout());
    } else {
      dispatch(setKeysAction(publicKey, privateKey));
    }
  };
};