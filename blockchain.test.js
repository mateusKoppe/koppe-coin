const Blockchain = require('./blockchain')
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
})
