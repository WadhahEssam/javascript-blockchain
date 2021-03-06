const Transaction = require('../../src/wallet/transaction');
const Wallet = require('../../src/wallet/wallet');

let transaction, wallet, recipient, amount;
beforeEach(() => {
  wallet = Wallet.createWallet();
  amount = 50;
  recipient = 'r3c1p13nt';
  transaction = Transaction.newTransaction(wallet, recipient, amount);
});

describe('Transaction', () => {

  it('creates the first output that includes amount subtracted from the wallet balance', () => {
    // we will use the find function which 
    // return the element from the array 
    // that makes the given condition true
    expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
      .toEqual(wallet.balance - amount);
  });

  it('creates the second output that has the amount added to the recipient', () => {
    expect(transaction.outputs.find(output => output.address === recipient).amount).toEqual(amount);
  });

  it('inputs the balance of the wallet', () => {
    expect(transaction.input.amount).toEqual(wallet.balance);
  });

  it('validates a valid transaction', () => {
    expect(Transaction.verifyTransaction(transaction)).toBeTruthy();
  });

  it('validates a corrupt transaction', () => {
    transaction.outputs[0].amount = 5000000;
    expect(Transaction.verifyTransaction(transaction)).toBeFalsy();
  });

  describe('transacting with an amount that exceeds the balance', () => {
    beforeEach(() => {
      // changed the value of the amount
      // and regenerate the transaction
      amount = 5000;
      transaction = Transaction.newTransaction(wallet, recipient, amount);
    });

    it('does not create the transaction', () => {
      expect(transaction).toEqual(undefined);
    });
  });

  describe('updating a transaction', () => {
    let nextAmount, nextRecipient;
    beforeEach(() => {
      nextAmount = 20;
      nextRecipient = 'n3xt-4ddre355';
      transaction.update(wallet, nextRecipient, nextAmount);
    });

    it(`subtracts the next amount from the sender's output`, () => {
      expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
        .toEqual(wallet.balance - amount - nextAmount);
    });

    it('outputs an amount for the next recipient', () => {
      expect(transaction.outputs.find(output => output.address === nextRecipient).amount)
        .toEqual(nextAmount);
    });
    
  });
});