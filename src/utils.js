const EC = require('elliptic').ec;  // EC is a short for elliptic creptography 
const ec = EC('secp256k1');         // secp256k1 is the one that the bitcoin uses 
const uuidV1 = require('uuid/v1');
const SHA256 = require('crypto-js/sha256');

class Utils {
  static genKeyPair() {
    // returns an object that contains functions
    // that is used to generate the public and 
    // private keys for the wallet it also has 
    // a method that creates a signture for a 
    // given data you give it as input 
    return ec.genKeyPair();
  }

  // hashes any data that it recieves 
  static hash(data) {
    return SHA256(JSON.stringify(data)).toString();
  }

  // to check weather the data is having 
  // a correct signture or not so after 
  // decrypting the signture we should  
  // expect it to be equal to the dataHash
  static verifySignture(publicKey, signture, dataHash) {
    // a method keyFromPublic that takes the public key 
    // and give you the key that you can verify any signture
    // with, and then the verify will return a true or false 
    // and it takes the dataHash and the signture for it
    return ec.keyFromPublic(publicKey, 'hex').verify(dataHash, signture);
  }

  // generates and returns a unuiqe id using uuid 
  static id() {
    return uuidV1();
  }
}

module.exports = Utils;