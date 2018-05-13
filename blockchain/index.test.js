const Blockchain = require('./index')
const Block = require('./block')

describe('blockchain', () => {
  let blockchain, blockchain2

  beforeEach(() => {
    blockchain = new Blockchain()
    blockchain2 = new Blockchain()
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
    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false)
  })

  it('invalidates corrupt chain', () => {
    blockchain.addBlock('foo')
    blockchain.chain[1].data = 'INVALID DATA'
    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false)
  })

  it('invalidates a corrupt chain with more than one block', () => {
    blockchain.addBlock('foo')
    blockchain.addBlock('bar')
    blockchain.chain[2].data = 'INVALID DATA'
    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false)
  })

  it('replace the chain with a valid chain', () => {
    blockchain2.addBlock('foo')
    blockchain.replaceChain(blockchain2.chain)
    expect(blockchain.chain).toEqual(blockchain2.chain)
  })

  it('doesnt replace smaller or equals chains', () => {
    blockchain.addBlock('foo')
    blockchain.replaceChain(blockchain2.chain)
    expect(blockchain.chain.length).not.toEqual(blockchain2.chain)
  })
})
