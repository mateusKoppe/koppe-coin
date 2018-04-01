const Block = require('./block')

describe('Block', () => {
  let data, lastBlock, block

  beforeAll(() => {
    data = 'foo'
    lastBlock = Block.genesis()
    block = new Block(new Date(), lastBlock.hash, 'test', data)
  })

  it('sets the `data` to match the input', () => {
    expect(block.data).toEqual(data)
  })
})
