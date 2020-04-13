const Tx = require('ethereumjs-tx').Transaction;




export default class Txion {
  web3;
  account;
  privateKey;
  contractAddress;

  constructor(web3, account, privateKey, contractAddress) {
    this.web3 = web3;
    this.account = account;
    this.privateKey = privateKey;
    this.contractAddress = contractAddress;
  }

  execute = (methodData) => {
    return new Promise(
      (resolve, reject) => {
        this.web3.eth.getTransactionCount(this.account, (err, txCount) => {
          if(err) reject(err);
          else {
            const txObject = {
              nonce:    this.web3.utils.toHex(txCount),
              gasLimit: this.web3.utils.toHex(800000), // Raise the gas limit to a much higher amount
              gasPrice: this.web3.utils.toHex(this.web3.utils.toWei('10', 'gwei')),
              to: this.contractAddress,
              data: methodData
            }
        
            const tx = new Tx(txObject);
            tx.sign(Buffer.from( this.privateKey, 'hex'));
        
            const serializedTx = tx.serialize();
            const raw = '0x' + serializedTx.toString('hex');
            this.web3.eth.sendSignedTransaction(raw, (err, txHash) => {
              if(err) reject(err);
              // else resolve(txHash);
            }).then((receipt) => resolve(receipt));
          }
        });
    });
  };
} 