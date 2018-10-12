const Utils = require('../utils');

class Transaction {
  constructor() {
    this.id = Utils.id();
    this.input = null; 
    // consists of one output that specify how 
    // much sender wants to send and his public
    // key, then a second output that specify 
    // how much currecny the sender will have
    // after transaction and the recipiant 
    // public key ( address ) 
    this.outputs = [];
  }

  // this will create and return a new transaction 
  static newTransaction(senderWallet, recipientAddress, amount) {
    const transaction = new this();
    // check if the given amount exceeds the 
    // sender's wallet balance
    if (senderWallet.balance < amount) {
      console.log(`Amount: ${amount} , exceeding the wallet balanc : ${recipientAddress}`);
      return;
    }

    // first output 
    transaction.outputs.push({amount: senderWallet.balance - amount, address: senderWallet.publicKey})
    // second output
    transaction.outputs.push({amount, address: recipientAddress});
  }

} 

module.exports = Transaction;