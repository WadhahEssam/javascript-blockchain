const Utils = require('../utils');

class Transaction {
  constructor() {
    this.id = Utils.id();
    // the input will include the sender's 
    // original balance and public key along
    // with the sender's signture ( the most 
    // important info in the transation ) 
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
    // to sign the transaction (filling the 
    // input field of the transaction )
    Transaction.signTransaction(transaction, senderWallet);

    return transaction;
  }

  // this function will add the input field
  // to the transaction ( in another way it 
  // will sign the transaction )
  static signTransaction(transaction, senderWallet) {
    transaction.input = {
      timestamp: Date.now(),
      amount: senderWallet.balance,
      address: senderWallet.publicKey,
      // we signed the outputs only cuz it is the only 
      // information avaiable for now 
      signture: senderWallet.sign(Utils.hash(transaction.outputs))
    }
  }

  static verifyTransaction(transaction) {
    return Utils.verifySignture(
      transaction.input.address, 
      transaction.input.signture, 
      Utils.hash(transaction.outputs)
    );
  }


} 

module.exports = Transaction;