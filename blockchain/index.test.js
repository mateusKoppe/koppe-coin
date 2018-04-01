const Blockchain = require('./index')
const Block = require('./block')

describe('blockchain', () => {
  let blockchain

  beforeAll(() => {
    blockchain = new Blockchain()
  })

  it('starts with the genesis block', () => {
    const firstBlock = blockchain.chain[blockchain.chain.length - 1]
    expect(firstBlock).toEqual(Block.genesis())
  })

  it('add a block in the blockchain', () => {
    const data = 'foo'
    blockchain.addBlock(data)
    const lastBlock = blockchain.chain[blockchain.chain.length - 1]
    expect(blockchain.chain.length).toBe(2)
    expect(lastBlock.data).toEqual(data)
  })

  it('validates a valid chain', () => {
    blockchain.addBlock('foo')
    expect(Blockchain.isValidChain(blockchain.chain)).toBe(true)
  })

  it('invalidates corrupt genesis block', () => {
    blockchain.chain[0].hash = 'INVALID HASH'
    expect(Blockchain.isValidChain(blockchain)).toBe(false)
  })

  it('invalidates corrupt chain', () => {
    blockchain.addBlock('foo')
    blockchain.chain[1].data = 'INVALID DATA'
    expect(Blockchain.isValidChain(blockchain)).toBe(false)
  })
})
