const Transaction = require('./transaction')

class TransactionPool {
  constructor () {
    this.transactions = []
  }

  updateOrAddTransaction (transaction) {
    let transactionWithId = this.transactions.find(t => t.id === transaction.id)

    if (transactionWithId) {
      this.transactions[this.transactions.indexOf(transactionWithId)] = transaction
    } else {
      this.transactions.push(transaction)
    }
  }

  existingTransaction (address) {
    return this.transactions.find(t => t.input.address === address)
  }

  validTransactions () {
    return this.transactions.filter(transaction => {
      const outputTotal = transaction.outputs.reduce((total, output) => {
        return total + output.amount
      }, 0)

      if (transaction.input.amount !== outputTotal) {
        return false
      }

      if (!Transaction.verifyTransaction(transaction)) {
        return false
      }

      return transaction
    })
  }

  clear () {
    this.transactions = []
  }
}

module.exports = TransactionPool
