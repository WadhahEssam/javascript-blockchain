const Websocket = require('ws');

// setting the default port to 5001 if the port 
// wasn't specified at cration 
// you can specify the port like this in command line
// node p2p-server P2P_PORT=5002
const P2P_PORT = process.env.P2P_PORT || 5001;

// this variable will contain all the available peers check if
// a peers env variable is is declared we will
// assume that this is going to be a string
// containing all the ports available  for example :
// PEERS=ws://localhost:5001,ws://localhost:5002 npm run dev
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

class P2pServer { 
  constructor(blockchain) {
    // giving each peer to peer a block chain 
    this.blockchain = blockchain;

    // this array will contain a list of the connected 
    // websocket servers that will also end up connecting 
    // to this one server.
    this.sockets= [];
  }
 
  // this function will create and start the server
  // this method will be running the whole time 
  // cuz of the event listeners 
  listen() {
    // creating the server and give it the port 
    const server = new Websocket.Server({ port: P2P_PORT});

    // this is anevent listener that is listening for the incoming 
    // for the incoming messages sent to websocket server and 
    // we specified the type of image that we are listeing for 
    // which is in this case the ( connection ) event
    // this will allow us to fire a the callback function when ever 
    // a socket connects to this websocket server 
    // callback will recieve a socket as a paramiter for us to deal with 
    server.on('connection', socket => this.connectSocket(socket));

    // this will allow the new peers to connect to elready existing peers
    this.connectToPeer();

    console.log(`Listening for peer-to-peer connections on : ${P2P_PORT}`); 
  }

  // this function will take the socket that connected 
  // to this server and catched by the connection event 
  // and it will add it to the array of sockets
  connectSocket(socket) {
    this.sockets.push(socket);
    console.log('socket connected');
    // attach the message handler to every socket that we create
    this.messageHandler(socket);
    // to send your blockchain to all the connected sockets
    // this takes the message that you want to send
    this.sendChain(socket);
  }

  // this will loop throw all the peers array at the top 
  // and connect to them  
  connectToPeer() {
     peers.forEach(peer => {
       // a peer will look like this ws://localhost:5001
       // this will connect to the peer by giving it the 
       // link of the beer 
       const socket = new Websocket(peer);

       // IMPORTANT this even listener will allow already 
       // running server for connecting to the one that are 
       // created after them 
       // this will not run on the current server  
       socket.on('open', () => {
        this.connectSocket(socket);
       });
     })
  }

  messageHandler(socket) {
    // create an even handler that will take recieve the 
    // data from any other node that sends data to the message event
    socket.on('message', (message) => {
      // transforming the message onbject into json
      const data = JSON.parse(message);

      // replacing the incoming chain with the current one
      // this function will validate the incoming chain
      this.blockchain.replaceChain(data);
    });
  }

  // to prevent duplication
  sendChain(socket) {
    socket.send(JSON.stringify(this.blockchain.chain));
  }

  // if a blockchain of the node is updated we should send the 
  // current new blockchain to sync it with others 
  syncChains() {
    // sending the chain to all the sockets 
    this.sockets.forEach((socket) => {
      this.sendChain(socket);
    })
  }

}

module.exports = P2pServer;



