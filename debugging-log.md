# error in web3-eth-core line 285
- installed older version of web3 : web3@1.0.0-beta.55, had node 13.12.0
# web3.eth.sendSignedTransaction(raw).then(receipt => console.log)
- promise was not triggered
- added: 
const web3 = new Web3("http://127.0.0.1:8545", null, { transactionConfirmationBlocks: 1 });
- installed web3@1.0.0-beta.46 which required node 10.19.0