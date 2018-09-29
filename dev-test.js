// goal of this file is to test the block class
const Block = require('./block');

// creating and printing a block 
// const block = new Block('foo', 'bar', 'zoo', 'baz');
// console.log(block.toString());

// printing the genesis block
// console.log(Block.genesis().toString());

// creating a new block after the genesis block
const fooBlock = Block.mineBlock(Block.genesis(), 'foo');
console.log(fooBlock.toString());