'use strict'

const express = require('express')
const graphQLHTTP = require('express-graphql')
const mongoose = require('mongoose')

const Schema = require('./schema')

const app = express()

const port = 3000
const mongoURL = 'mongodb://localhost:27017/glints'

mongoose.connect(mongoURL, (e) => {
  if (!e) console.log('>> Connected to database')
  else console.log(e)
})

app.get('/', (req, res) => res.send('Hello World'))
app.use('/graphiql', graphQLHTTP({
  schema: Schema,
  graphiql: true
}))

app.listen(port, (e) => {
  if (!e) console.log(`>> Connected at port ${port}`)
  else console.log(e)
})