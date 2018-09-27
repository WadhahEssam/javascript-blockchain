// goal of this file is to test the block class
const Block = require('./block');

const block = new Block('foo', 'bar', 'zoo', 'baz');

console.log(block.toString());