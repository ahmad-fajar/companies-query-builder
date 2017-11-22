'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const companySchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  category_code: String,
  crunchbase_url: String,
  deadpooled_day: Number,
  deadpooled_month: Number,
  deadpooled_year: Number,
  email_address: String,
  founded_day: Number,
  founded_month: Number,
  founded_year: Number,
  homepage_url: String,
  name: String,
  number_of_employees: Number,
  overview: String,
  phone_number: String,
  tag_list: String,
  total_money_raised: String,
  acquisition: [{
    price_amount: Number,
    price_currency_code: String,
    acquiring_company: [{
      name: String
    }]
  }]
})

const Company = mongoose.model('companies', companySchema)
module.exports = Company