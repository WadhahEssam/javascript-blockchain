const { INITIAL_BALANCE } = require('../../config');
const Utils = require('../utils');

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
}

module.exports = Wallet; 