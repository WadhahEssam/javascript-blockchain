const Block = require('./block');

class Blockchain {

  // creating a blockchain with the genesis block as 
  // the first block
  constructor() {
    this.chain = [];
    this.chain.push(Block.genesis());
  }

  // adding a block at the end of the chain and 
  // returning this block
  addBlock(data) {
    const lastBlock = this.chain[this.chain.length-1];
    const block = Block.mineBlock(lastBlock, data)
    this.chain.push(block);
    return block;
  }

} 

module.exports = Blockchain; 