const SHA256 = require('crypto-js/sha256');

const  { DIFFICULTY, MINE_RATE } = require('../../config');

class Block {

  // the four values that are needed for creating a block
  constructor(timestamp, lastHash, hash, data, nonce, difficulty) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    // if it is the first block then it will add the difficulty that is in the config file.
    this.difficulty = difficulty || DIFFICULTY;
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
    Difficulty: ${this.difficulty}
    Data      : ${this.data}
    /////////////////`;
  }

  // you can at any time call Block.genesis() and it will 
  // return an instance of the genesis block
  static genesis() {
    return new this('Genesis time', '------', 'f1r57-h45h', [], 0, DIFFICULTY);
  }

  // this static function will generate a block based on the 
  // last block and the data given
  static mineBlock(lastBlock, data) {

    // number of milliseconds that passed from a certin point
    // in history
    const lastHash = lastBlock.hash;
    let { difficulty } = lastBlock;
    let nonce = 0;
    let hash, timestamp;

    do {
      nonce++;
      timestamp = Date.now();
      // since adjusting the difficulty is based on the previous
      // block we need the lastBlock difficulty and the current 
      // timestamp to generate a new difficulty 
      difficulty = Block.adjustDifficulty(lastBlock, timestamp) ;
      hash = Block.hash(timestamp, lastHash, data, nonce, difficulty);
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

    return new this(timestamp, lastHash, hash, data, nonce, difficulty);
  }

  static hash(timestamp, lastHash, data, nonce, difficulty) {
    return SHA256(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
  }

  // similar to the static hash function but takes
  // a block instead of individual values
  static blockHash(block) {
    const { timestamp, lastHash, data, nonce, difficulty } = block;
    return Block.hash(timestamp, lastHash, data, nonce, difficulty);
  }

  static adjustDifficulty(lastBlock, currentTime) {
    let { difficulty } = lastBlock;
    if ( currentTime > lastBlock.timestamp + MINE_RATE ) {
      difficulty--;
    } else {
      difficulty++;
    }
    return difficulty;
  }

}

// this will make sure that your class is shared 
// by exporting it as a module
module.exports = Block;