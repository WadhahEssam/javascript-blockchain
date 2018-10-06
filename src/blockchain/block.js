const SHA256 = require('crypto-js/sha256');

const  { DIFFICULTY } = require('../../config');

class Block {

  // the four values that are needed for creating a block
  constructor(timestamp, lastHash, hash, data, nonce) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
  }

  // allows us to print the instance of this class direclty
  // with out accessing the individual values of the object
  toString() {
    return `
    ///// Block /////
    Timestamp : ${this.timestamp}
    Last Hash : ${this.lastHash.substring(0,10)}
    Hash      : ${this.hash.substring(0,10)}
    Nonce     : ${this.nonce}
    Data      : ${this.data}
    /////////////////`;
  }

  // you can at any time call Block.genesis() and it will 
  // return an instance of the genesis block
  static genesis() {
    return new this('Genesis time', '------', 'f1r57-h45h', [], 0);
  }

  // this static function will generate a block based on the 
  // last block and the data given
  static mineBlock(lastBlock, data) {

    // number of milliseconds that passed from a certin point
    // in history
    const lastHash = lastBlock.hash;
    let nonce = 0;
    let hash, timestamp;

    do {
      nonce++;
      timestamp = Date.now();
      hash = Block.hash(timestamp, lastHash, data, nonce);
    } while (hash.substring(0,DIFFICULTY) !== '0'.repeat(DIFFICULTY));

    return new this(timestamp, lastHash, hash, data, nonce);
  }

  static hash(timestamp, lastHash, data, nonce) {
    return SHA256(`${timestamp}${lastHash}${data}${nonce}`).toString();
  }

  // similar to the static hash function but takes
  // a block instead of individual values
  static blockHash(block) {
    const { timestamp, lastHash, data, nonce } = block;
    return Block.hash(timestamp, lastHash, data, nonce);
  }

}

// this will make sure that your class is shared 
// by exporting it as a module
module.exports = Block;