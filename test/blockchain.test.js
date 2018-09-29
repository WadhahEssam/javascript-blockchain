const Blockchain = require('../src/blockchain');
const Block = require('../src/block');

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

});