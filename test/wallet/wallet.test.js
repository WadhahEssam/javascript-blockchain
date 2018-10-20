const Wallet = require('../../src/wallet/wallet');
const Transaction = require('../../src/wallet/transaction');
const TransactionPool = require('../../src/wallet/transaction-pool');

describe('Wallet', () => {
  let wallet, transactionPool;
  
  beforeEach(() => {
    wallet = new Wallet();
    transactionPool = new TransactionPool();
  });

  describe('creating a transaction', () => {
    let transaction, sendAmount, recipient;
    beforeEach(() => {
      sendAmount = 50; 
      recipient = 'r4nd0m-4ddr355';
      // notice that this is using the wallet
      // create Transaction and not the 
      // transaction newTransaction function 
      transaction = wallet.createTransaction(recipient, sendAmount, transactionPool); 
    });

    describe('and doing the same transction', () => {
      beforeEach(() => {
        // redoing the transaction
        wallet.createTransaction(recipient, sendAmount, transactionPool);
      });

      it('doubles the sendAmount subtracted from the wallet balance', () => {
        expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
        .toEqual(wallet.balance - sendAmount * 2);
      });
    });
  });
});