class Block {

  // the four values that are needed for creating a block
  constructor(timestamp, lastHash, hash, data) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }

  // allows us to print the instance of this class direclty
  // with out accessing the individual values of the object
  toString() {
    return `///// Block /////\nTimestamp : ${this.timestamp}\nLast Hash : ${this.lastHash.substring(0,10)}\nHash      : ${this.hash.substring(0,10)}\nData      : ${this.data}\n/////////////////`;
  }

  // you can at any time call Block.genesis() and it will 
  // return an instance of the genesis block
  static genesis() {
    return new this('Genesis time', '------', 'f1r57-h45h', []);
  }

}

// this will make sure that your class is shared 
// by exporting it as a module
module.exports = Block;