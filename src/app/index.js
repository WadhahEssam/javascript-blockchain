const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain/blockchain');
const P2pServer = require('./p2p-server');

// will run the server on port 3001
// process.env.HTTP_PORT this will check 
// if the port was specified in the command
// line if it is not then it will take the default
// ( this will allow us to run multiable instances )
const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const blockchain = new Blockchain();
const p2pServer = new P2pServer(blockchain);

// applay the bodyParser middleware that 
// will allow us to recieve json
app.use(bodyParser.json());

// creating the first route
app.get('/blocks', (req, res) => {
  res.json(blockchain.chain);
});

app.post('/mine', (req, res) => {
  // the data that will be sent by the user
  // will be inside req.body.data 
  const block = blockchain.addBlock(req.body.data);
  console.log(`New block added: ${block.toString()}`);

  // this will return the blockchain to the user
  res.redirect('/blocks');
});

app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));

// starting the server 
p2pServer.listen();