const SHA256 = require('crypto-js/sha256')
const { DIFFICULTY } = require('../config')

class Block {
  constructor (timestamp, lastHash, hash, data, nonce) {
    this.timestamp = timestamp
    this.lastHash = lastHash
    this.hash = hash
    this.data = data
    this.nonce = nonce
  }

  toString () {
    return `Block -
      Timestamp: ${this.timestamp}
      Last Hash: ${this.lastHash.substring(0, 10)}...
      Hash     : ${this.hash.substring(0, 10)}...
      Nonce    : ${this.nonce}
      Data     : ${this.data}
    `
  }

  static genesis () {
    return new this(0, '', 'first-hash', [], 0)
  }

  static generateHash (timestamp, lastHash, data, nonce) {
    return SHA256(`${timestamp}${lastHash}${data}${nonce}`).toString()
  }

  static generateBlockHash (block) {
    const {timestamp, lastHash, data, nonce} = block
    return Block.generateHash(timestamp, lastHash, data, nonce)
  }

  static mineBlock (lastBlock, data) {
    const lastHash = lastBlock.hash
    let nonce = 0
    let hash, timestamp

    do {
      timestamp = Date.now()
      nonce++
      hash = Block.generateHash(timestamp, lastHash, data, nonce)
    } while (hash.substring(0, DIFFICULTY) !== '0'.repeat(DIFFICULTY))

    return new this(timestamp, lastHash, hash, data, nonce)
  }
}

module.exports = Block
