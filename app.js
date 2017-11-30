'use strict'

const express = require('express')
const graphQLHTTP = require('express-graphql')
const mongoose = require('mongoose')

const Schema = require('./schema')

const app = express()

const port = 3000
// const mongoURL = 'mongodb://localhost:27017/glints'
const mongoURL = "mongodb://hacktiv8:hacktiv8Super@cluster0-shard-00-00-remkh.mongodb.net:27017,cluster0-shard-00-01-remkh.mongodb.net:27017,cluster0-shard-00-02-remkh.mongodb.net:27017/companies?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"

mongoose.connect(mongoURL, (e) => {
  if (!e) console.log('>> Connected to database')
  else console.log(e)
})

// app.get('/', (req, res) => res.send('Hello World'))
app.use('/', express.static(__dirname + '/out'))
app.use('/graphiql', graphQLHTTP({
  schema: Schema,
  graphiql: true
}))

app.listen(port, (e) => {
  if (!e) console.log(`>> Connected at port ${port}`)
  else console.log(e)
})
