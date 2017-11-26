'use strict'

const Companies = require('./Companies')


exports.getAllCompanies = () => {
  return Companies.find()
  .then(data => data)
  .catch(e =>console.log(e))
}
