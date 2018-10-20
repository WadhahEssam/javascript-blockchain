const { INITIAL_BALANCE } = require('../../config');
const Utils = require('../utils');
const Transaction = require('./transaction');

class Wallet {
  constructor() {
    // in a real world wallets don't start with a 
    // a default balance but we did for testing 
    // obviously the keyPair will be an object that
    // contains some useful functions inside it 
    // like the getPublic function . 
    // the encode (hex) encodes the address to its 
    // hexa decimal representaion .
    this.balance = INITIAL_BALANCE;
    this.keyPair = Utils.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode('hex');
  }

  toString() {
    return `
    ///// Wallet /////
    Public Key  : ${this.publicKey.toString().substring(0,30)}...
    Balance     : ${this.balance}
    /////////////////`
  }

  // this method will generate a signture that 
  // is generated from the private and public 
  // key of the wallet
  sign(dataHash) {
    return this.keyPair.sign(dataHash);
  }

  static createWallet() {
    return new this();
  }

  createTransaction(recipient, amount, transactionPool) {
    // check the balance with the amount
    if (amount > this.balance) {
      console.log(`Amount ${amount} exceeds current balance : ${this.balance}`);
      return;
    }

    // check if the transaction already exists 
    // in the transaction pool
    // the function exisitingTransaction() will
    // be returning a transaction owned by the 
    // wallet by providing the public key to it
    let transaction = transaction.existingTransaction(this.publicKey);

    // if the transaction exisits in the pool
    if (transaction) {
      // updating the existing transaction 
      transaction.update(this, recipient, amount);
    } 
    // if it doesn't exist in the pool 
    else {
      // creating a new transaction
      transaction = Transaction.newTransaction(this, recipient, amount);
      transactionPool.updateOrAddTransaction(transaction);
    } 

    return transaction;
  }

  
}

module.exports = Wallet; 