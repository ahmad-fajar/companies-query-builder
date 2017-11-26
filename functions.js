'use strict'

const Companies = require('./Companies')


exports.getAllCompanies = () => {
  return Companies.find()
  .then(data => data)
  .catch(e =>console.log(e))
}


exports.getAcquired = (name) => {
  let query = {
    name: {
      $regex: name,
      $options: 'i'
    }
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
    name: {
      $regex: name,
      $options: 'i'
    }
  }
  return Companies.findOne(query)
  .then(data => {
    return [{ name: data.acquisition.acquiring_company.name }]
  })
} // end of getAcquiring


exports.getCompanies = args => {
  const raised = args.min_raised
  const rounds = args.min_rounds
  const year = args.min_year

  return Companies.aggregate([
    {$project: {
      name: "$name",
      founded_year: "$founded_year",
      funding_rounds: { $size: "$funding_rounds" },
      raised_amount: { $sum: "$funding_rounds.raised_amount" },
      rounds: "$funding_rounds"
    }},
    {$match: {
      founded_year: {$gt: year},
      funding_rounds: {$gt: rounds},
      raised_amount: {$gt: raised}
    }}
  ])
  .then(data => data)
  .catch(e => console.log(e))
} // end of getCompanies


exports.getCompetitors = name => {
  let query = {
    name: {
      $regex: name,
      $options: 'i'
    }
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


exports.getCompanyAssociations = (name) => {
  let query = {
    name: {
      $regex: name,
      $options: 'i'
    }
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


exports.getPersonRelation = (first_name, last_name) => {
  let query = {
    'relationships.person.first_name': {
      $regex: first_name,
      $options: 'i'
    },
    'relationships.person.last_name': {
      $regex: last_name,
      $options: 'i'
    }
  }
  return Companies.find(query)
  .then(data => {
    let send = []
    data.map(a => {
      a.relationships.map(b => {
        let first = b.person[0].first_name.toLowerCase() === first_name.toLowerCase()
        let last = b.person[0].last_name.toLowerCase() === last_name.toLowerCase()
        if (first && last) {
          send.push({
            name: a.name,
            title: b.title,
            is_past: b.is_past
          })
        }
      })
    })
    return send
  })
  .catch(e => console.log(e))
} // end of getPersonRelation
