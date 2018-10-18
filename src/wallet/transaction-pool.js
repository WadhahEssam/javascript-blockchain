class TransactionPool {
  constructor() {
    this.transactions = [];
  }

  // this method will be adding a transaction 
  // if it exists it will update it .
  updateOrAddTransaction(transaction) {
    // will help us to find if it updated since the id 
    // will not be updated when you update a transaction
    let transactionWithID = this.transactions.find(t => t.id === transaction.id);

    // in case an old one exists
    if (transactionWithID) {
      // updating the old transaction to the 
      // updated coming transaction
      this.transactions[this.transactions.indexOf(transactionWithID)] = transaction;
    }
    // if it is a new transaction
    else { 
      this.transactions.push(transaction);
    }
  }
}

module.exports = TransactionPool;