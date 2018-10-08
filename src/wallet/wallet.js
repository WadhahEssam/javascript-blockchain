const { INITIAL_BALANCE } = require('../../config');

class Wallet {
  constructor() {
    // in a real world wallets don't start with a 
    // a default balance but we did for testing 
    this.balance = INITIAL_BALANCE;
    this.keyPair = null;
    this.publicKey = null;
  }

  toString() {
    return `
    ///// Wallet /////
    Public Key  : ${this.publicKey.toString()}
    Balance     : ${this.balance}
    /////////////////`
  }
}

module.exports = Wallet; 