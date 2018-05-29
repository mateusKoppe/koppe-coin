const ChailUtil = require('../chain-util')

class Transaction {
  constructor () {
    this.id = ChailUtil.id()
    this.input = null
    this.output = []
  }

  static newTrasaction (senderWallet, recipient, amount) {
    const transaction = new this()

    if (amount > senderWallet.balance) {
      throw new Error(`Amount exceeds balance`)
    }

    transaction.output.push(...[
      { amount: senderWallet.balance - amount, address: senderWallet.publicKey },
      { amount, address: recipient }
    ])

    return transaction
  }
}

module.exports = Transaction
