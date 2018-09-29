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

  // this function will take a blockchain as an input and 
  // will compare it to the current blockchain
  isValidChain(chain) {
    
    // checks weather if the genesis block of the blockchain equals
    // to the genesis block that we created at the first place, but
    // since we can't compare references of objects we changed them 
    // to be a string with stringify function in the JSON class
    if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }

    // looping throw the whole blockchain to check if the any data
    // was changed (checking the hash is correct) and equal to lasthash
    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const lastBlock = chain[i-1];
      if (block.lastHash !== lastBlock.hash || block.hash !== Block.blockHash(block)) {
        return false;
      }
    }

    return true;
  }

  // if the incoming chain is valid then we will replace the incmoing
  // chain with the current chain 
  replaceChain(newChain) {
    
    // the incoming chain must be longer than the existing chain
    if(newChain.length <= this.chain.length) {
      console.log('new chain is not longer that the current chain.')
      return;
    } 
    // the incoming chain must be valid
    else if (!this.isValidChain(newChain)) {
      console.log('new chain is not valid.')
      return;
    }

    console.log('Replacing current blockchain with the incoming chain');
    this.chain = newChain;
  }

} 

module.exports = Blockchain; 