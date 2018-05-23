const { INITIAL_BALANCE } = require('../config')

class Wallet {
  constructor () {
    this.balance = INITIAL_BALANCE
    this.keyPair = null
    this.publicKey = null
  }
}

module.exports = Wallet
