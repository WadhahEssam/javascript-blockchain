const Blockchain = require('../../src/blockchain/blockchain');
const Block = require('../../src/blockchain/block');

describe('Blockchain', ()=> {
  let blockchain, blockchain2;

  beforeEach(() => {
    blockchain = new Blockchain();
    blockchain2 = new Blockchain();
  });

  it('starts with the genesis block', () => {
    expect(blockchain.chain[0]).toEqual(Block.genesis());
  });

  it('adds a new block at the end of the blockchain with the given data', () => {
    blockchain.addBlock('foo');
    expect(blockchain.chain[blockchain.chain.length-1].data).toEqual('foo');
  });

  it('validates a valid chain', () => {
    blockchain2.addBlock('foo');
    expect(blockchain.isValidChain(blockchain2.chain)).toBe(true);
  });

  it('invalidates a chain with a corrupt genesis block', () => {
    blockchain2.chain[0].data = 'bad data';
    expect(blockchain.isValidChain(blockchain2.chain)).toBe(false);
  });

  it('invalidates a corrupt chain ( other that genesis block )', () =>{
    blockchain2.addBlock('foo');
    blockchain2.chain[1].data = 'Not foo';
    expect(blockchain.isValidChain(blockchain2.chain)).toBe(false);
  });

  it('replaces the chain with a valid chain', () => {
    // blockchain2 will have two blocks after this line
    blockchain2.addBlock('goo');
    // blockchain has one block and it will have two blocks after this line
    blockchain.replaceChain(blockchain2.chain);
    expect(blockchain.chain).toEqual(blockchain2.chain);
  });

  it('doesn\'t replace a chain if it is equal or less length', () => {
    blockchain.addBlock('goo');
    // now blockchain is longer than blockchain2 which 
    // should lead to invalid chian 
    blockchain.replaceChain(blockchain2.chain);
    expect(blockchain.chain).not.toEqual(blockchain2.chain);
  });

});