const Wallet = require('./index')
const Blockchain = require('../blockchain')
const TransactionPool = require('./transaction-pool')

describe('Wallet', () => {
  let wallet, tp

  beforeEach(() => {
    wallet = new Wallet()
    tp = new TransactionPool()
  })

  describe('creating a transaction', () => {
    let transaction, sendAmount, recipient, blockchain

    beforeEach(() => {
      sendAmount = 50
      recipient = 'r4nd0m-4adr355'
      blockchain = new Blockchain()
      transaction = wallet.createTransaction(recipient, sendAmount, blockchain, tp)
    })

    describe('and doing the same transaction', () => {
      beforeEach(() => {
        wallet.createTransaction(recipient, sendAmount, blockchain, tp)
      })

      it('doubles the `sendAmount` subtracted from the wallet balance', () => {
        expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
          .toEqual(wallet.balance - sendAmount * 2)
      })

      it('clones the `sendAmount` output for the recipient', () => {
        expect(transaction.outputs.filter(output => output.address === recipient)
          .map(output => output.amount)).toEqual([sendAmount, sendAmount])
      })
    })
  })
})
