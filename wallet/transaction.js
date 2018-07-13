const ChainUtil = require('../chain-util')
const { MINING_REWARD } = require('../config')

class Transaction {
  constructor () {
    this.id = ChainUtil.id()
    this.input = null
    this.outputs = []
  }

  update (senderWallet, recipient, amount) {
    const senderOutput = this.outputs.find(output => {
      return output.address === senderWallet.publicKey
    })

    if (amount > senderOutput.amount) {
      return
    }

    senderOutput.amount = senderOutput.amount - amount
    this.outputs.push({ amount, address: recipient })
    Transaction.signTransaction(this, senderWallet)

    return this
  }

  static transactionWithOuputs (senderWallet, outputs) {
    const transaction = new this()
    transaction.outputs.push(...outputs)
    Transaction.signTransaction(transaction, senderWallet)
    return transaction
  }

  static newTransaction (senderWallet, recipient, amount) {
    if (amount > senderWallet.balance) {
      return
    }

    const transaction = this.transactionWithOuputs(senderWallet, [
      { amount: senderWallet.balance - amount, address: senderWallet.publicKey },
      { amount, address: recipient }
    ])

    return transaction
  }

  static rewardTransaction (minerWallet, blockchainWallet) {
    return Transaction.transactionWithOuputs(blockchainWallet, [{
      amount: MINING_REWARD,
      address: minerWallet.publicKey
    }])
  }

  static signTransaction (transaction, senderWallet) {
    transaction.input = {
      timestamp: Date.now(),
      amount: senderWallet.balance,
      address: senderWallet.publicKey,
      signature: senderWallet.sign(ChainUtil.hash(transaction.outputs))
    }
  }

  static verifyTransaction (transaction) {
    return ChainUtil.verifySignature(
      transaction.input.address,
      transaction.input.signature,
      ChainUtil.hash(transaction.outputs)
    )
  }
}

module.exports = Transaction
