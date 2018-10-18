const TransactionPool = require('../../src/wallet/transaction-pool');
const Transaction = require('../../src/wallet/transaction');
const Wallet = require('../../src/wallet/wallet');

describe('TransactionPool', () => {
  let transactionPool, wallet, transaction;

  beforeEach(() => {
    transactionPool = new TransactionPool();
    wallet = new Wallet();
    transaction = Transaction.newTransaction(wallet, 'r4nd-4dr355', 30);
    transactionPool.updateOrAddTransaction(transaction);
  });

  it('adds the transaction to the transaction pool', () => {
    expect(transactionPool.transactions.find(t => t.id === transaction.id)).toEqual(transaction);
  });

  it('updates the transaction in the transaction pool', () => {
    const oldTransaction = JSON.stringify.transaction;
    transaction.update(wallet, 'N3W-R35391NT', 12);
    transactionPool.updateOrAddTransaction(transaction);
    expect(transactionPool.transactions.find(t => t.id === transaction.id)).toEqual(transaction);
    expect(JSON.stringify(transactionPool.transactions.find(t => t.id === transaction.id))).not.toEqual(JSON.stringify(oldTransaction));
    expect(transactionPool.transactions.length).toEqual(1);
  });

});