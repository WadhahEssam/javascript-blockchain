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
    console.log(`listening for peer-to-peer connections on : ${P2P_PORT}`);
  }

  // this function will take the socket that connected 
  // to this server and catched by the connection event 
  // and it will add it to the array of sockets
  connectSocket(socket) {
    this.sockets.push(socket);
    console.log('socket connected');
  }

}



