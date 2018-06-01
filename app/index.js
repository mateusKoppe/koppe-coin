const express = require('express')
const bodyParser = require('body-parser')
const Blockchain = require('../blockchain')
const P2pServer = require('./p2p-server')
const Wallet = require('../wallet')
const TransactionPool = require('../wallet/transaction-pool')
const { DEFAULT_HTTP_PORT } = require('../config')

const HTTP_PORT = process.env.HTTP_PORT || DEFAULT_HTTP_PORT

const app = express()
const blockchain = new Blockchain()
const wallet = new Wallet()
const tp = new TransactionPool()
const p2pServer = new P2pServer(blockchain)

app.use(bodyParser.json())

app.get('/blocks', (req, res) => {
  res.json(blockchain.chain)
})

app.post('/mine', (req, res) => {
  blockchain.addBlock(req.body.data)
  p2pServer.syncChains()
  res.redirect('/blocks')
})

app.get('/transactions', (req, res) => {
  res.json(tp.transactions)
})

app.post('/transactions', (req, res) => {
  const { recipient, amount } = req.body
  wallet.createTransaction(recipient, amount, tp)
  res.redirect('/transactions')
})

app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`))

p2pServer.listen()
