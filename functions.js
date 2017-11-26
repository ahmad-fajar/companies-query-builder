'use strict'

const Companies = require('./Companies')


exports.getAllCompanies = () => {
  return Companies.find()
  .then(data => data)
  .catch(e =>console.log(e))
}


exports.getCompanyAssociations = name => {
  let query = {
    name: name
  }
  return Companies.findOne(query)
  .then(data => {
    let send = []
    send.push({
      name: data.acquisition.acquiring_company.name,
      relationship: 'acquiring company'
    })
    data.competitions.map(comp => {
      // console.log('comp>>>', comp.competitor.name)
      send.push({
        name: comp.competitor.name,
        relationship: 'competitor'
      })
    })
    data.acquisitions.map(acq => {
      // console.log('acq', acq.company.name)
      send.push({
        name: acq.company.name,
        relationship: 'acquired company'
      })
    })
    return send
  })
  .catch(e => console.log(e))
} // end of getCompanyAssociation