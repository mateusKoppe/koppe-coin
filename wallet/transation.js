const ChailUtil = require('../chain-util')

class Transation {
  constructor () {
    this.id = ChailUtil.id()
    this.input = null
    this.output = []
  }

  static newTrasaction (senderWallet, recipient, amount) {
    const transation = new this()

    if (amount > senderWallet.balance) {
      throw new Error(`Amount exceeds balance`)
    }

    transation.output.push(...[
      { amount: senderWallet.balance - amount, address: senderWallet.publicKey },
      { amount, address: recipient }
    ])

    return transation
  }
}

module.exports = Transation
