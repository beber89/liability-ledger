import Web3 from 'web3';
import {data} from './bytecode.json';

const  deployer = () => {

  const Tx = require('ethereumjs-tx').Transaction;
  // const web3 = new Web3(rpcURL, null, { 'transactionConfirmationBlocks': 1 /* This is a critical part ((Dev only)) */ });
  const web3 = new Web3("http://127.0.0.1:8545", null, { transactionConfirmationBlocks: 1 });
  const account0 = "0xA3E96050360ff34b6F7CD8e1994534a528B34850"
  const privateKey0 = "d920f1acf69d9927b554490b6a3b5819b76fea179f00b9c74dd3fc837806b7d1";

  web3.eth.getTransactionCount(account0, (err, txCount) => {
    console.log("transactions executed by account", txCount);
    const txObject = {
      nonce:    web3.utils.toHex(txCount),
      gasLimit: web3.utils.toHex(5000000), // Raise the gas limit to a much higher amount
      gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
      data: "0x"+data
    }
  
    const tx = new Tx(txObject)
    tx.sign(Buffer.from(privateKey0, 'hex'));
  
    const serializedTx = tx.serialize()
    const raw = '0x' + serializedTx.toString('hex')
  
    web3.eth.sendSignedTransaction(raw, 
      (err, txHash) => {
      console.log('err:', err, 'txHash:', txHash)
      console.log(web3._transactionConfirmationBlocks);
      // TODO: Address needs to be retrieved programmatically
      // Use this txHash to find the contract on Etherscan!
    }
    ).then((receipt) => console.log(receipt));
  });


};

export default deployer;