const Transaction = require('./transaction')
const Wallet = require('./index')

describe('Transation', () => {
  let transaction, wallet, recipient, amount

  beforeEach(() => {
    wallet = new Wallet()
    amount = 50
    recipient = 'recipient'
    transaction = Transaction.newTrasaction(wallet, recipient, amount)
  })

  it('outputs the `amount` subtracted from the wallet balance', () => {
    expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
      .toEqual(wallet.balance - amount)
  })

  it('outputs the `amount` added to the recipient', () => {
    expect(transaction.outputs.find(output => output.address === recipient).amount)
      .toEqual(amount)
  })

  it('inputs the balance of the wallet', () => {
    expect(transaction.input.amount).toEqual(wallet.balance)
  })

  describe('transacting with an amount that exceds that exceeds the balance', () => {
    beforeEach(() => {
      amount = 50000
      transaction = Transaction.newTrasaction(wallet, recipient, amount)
    })

    it('does not create the transaction', () => {
      expect(transaction).toEqual(undefined)
    })
  })
})
