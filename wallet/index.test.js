const Wallet = require('./index')
const Blockchain = require('../blockchain')
const TransactionPool = require('./transaction-pool')
const { INITIAL_BALANCE } = require('../config')

describe('Wallet', () => {
  let wallet, tp, blockchain

  beforeEach(() => {
    wallet = new Wallet()
    blockchain = new Blockchain()
    tp = new TransactionPool()
  })

  describe('creating a transaction', () => {
    let transaction, sendAmount, recipient

    beforeEach(() => {
      sendAmount = 50
      recipient = 'r4nd0m-4adr355'
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

  describe('calculating a balance', () => {
    let addBalance, repeatAdd, senderWallet

    beforeEach(() => {
      senderWallet = new Wallet()
      addBalance = 100
      repeatAdd = 3

      for (let i = 0; i < repeatAdd; i++) {
        senderWallet.createTransaction(wallet.publicKey, addBalance, blockchain, tp)
      }
      blockchain.addBlock(tp.transactions)
    })

    it('calculates the balance for the blockchain transactions matching the recipient', () => {
      expect(wallet.calculateBalance(blockchain))
        .toEqual(INITIAL_BALANCE + (addBalance * repeatAdd))
    })

    it('calculates the balance for the blockchain transactions matching the sender', () => {
      expect(senderWallet.calculateBalance(blockchain))
        .toEqual(INITIAL_BALANCE - (addBalance * repeatAdd))
    })
  })
})
