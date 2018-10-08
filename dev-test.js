// goal of this file is to test the block class
const Block = require('./src/blockchain/block');
const Blockchain = require('./src/blockchain/blockchain');
const Wallet = require('./src/wallet/wallet');

// creating and printing a block 
// const block = new Block('foo', 'bar', 'zoo', 'baz');
// console.log(block.toString());

// printing the genesis block
// console.log(Block.genesis().toString());

// creating a new block after the genesis block
// const fooBlock = Block.mineBlock(Block.genesis(), 'foo');
// console.log(fooBlock.toString());

// tseting the difficulty 
// const bc = new Blockchain();
// for (let i = 0; i < 10; i++) {
//   console.log(bc.addBlock(`foo ${i+1}`).toString()) ;
// }

// testing the wallets for the first time 
const wallet = new Wallet();
console.log(wallet.toString());