'use strict'

const Companies = require('./Companies')


exports.getAllCompanies = () => {
  return Companies.find()
  .then(data => data)
  .catch(e =>console.log(e))
}


exports.getAcquired = (name) => {
  let query = {
    name: name
  }
  return Companies.findOne(query)
  .then(data => {
    let send = []
    data.acquisitions.map(acq => {
      send.push({
        name: acq.company.name
      })
    })
    return send
  })
} // end of getAcquired


exports.getAcquiring = name => {
  let query = {
    name: name
  }
  return Companies.findOne(query)
  .then(data => {
    return [{ name: data.acquisition.acquiring_company.name }]
  })
} // end of getAcquiring


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

exports.getCompetitors = name => {
  let query = {
    name: name
  }
  return Companies.findOne(query)
  .then(data => {
    let send = []
    data.competitions.map(comp => {
      send.push({
        name: comp.competitor.name,
        relationship: 'competitor'
      })
    })
    return send
  })
  .catch(e => console.log(e))
} // end of getCompetitors
