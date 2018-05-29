const ChailUtil = require('../chain-util')

class Transaction {
  constructor () {
    this.id = ChailUtil.id()
    this.input = null
    this.outputs = []
  }

  static newTrasaction (senderWallet, recipient, amount) {
    const transaction = new this()

    if (amount > senderWallet.balance) {
      throw new Error(`Amount exceeds balance`)
    }

    transaction.outputs.push(...[
      { amount: senderWallet.balance - amount, address: senderWallet.publicKey },
      { amount, address: recipient }
    ])

    return transaction
  }
}

module.exports = Transaction
