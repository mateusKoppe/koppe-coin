const ChainUtil = require('../chain-util')
const { DIFFICULTY, MINE_RATE } = require('../config')

class Block {
  constructor (timestamp, lastHash, hash, data, nonce, difficulty) {
    this.timestamp = timestamp
    this.lastHash = lastHash
    this.hash = hash
    this.data = data
    this.nonce = nonce
    this.difficulty = difficulty || DIFFICULTY
  }

  toString () {
    return `Block -
      Timestamp : ${this.timestamp}
      Last Hash : ${this.lastHash.substring(0, 10)}...
      Hash      : ${this.hash.substring(0, 10)}...
      Nonce     : ${this.nonce}
      Difficulty: ${this.difficulty}
      Data      : ${this.data}
    `
  }

  static genesis () {
    return new this(0, '', 'first-hash', [], 0, DIFFICULTY)
  }

  static generateHash (timestamp, lastHash, data, nonce, difficulty) {
    return ChainUtil.hash(
      `${timestamp}${lastHash}${data}${nonce}${difficulty}`
    ).toString()
  }

  static generateBlockHash (block) {
    const {timestamp, lastHash, data, nonce, difficulty} = block
    return Block.generateHash(timestamp, lastHash, data, nonce, difficulty)
  }

  static mineBlock (lastBlock, data) {
    const lastHash = lastBlock.hash
    let nonce = 0
    let hash, timestamp, difficulty

    do {
      timestamp = Date.now()
      nonce++
      difficulty = Block.adjustDifficulty(lastBlock, timestamp)
      hash = Block.generateHash(timestamp, lastHash, data, nonce, difficulty)
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty))

    return new this(timestamp, lastHash, hash, data, nonce, difficulty)
  }

  static adjustDifficulty (lastBlock, currenctTime) {
    const { difficulty } = lastBlock
    const isTooHard = lastBlock.timestamp + MINE_RATE > currenctTime
    return isTooHard ? difficulty + 1 : difficulty - 1
  }
}

module.exports = Block
