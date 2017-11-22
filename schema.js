'use strict'
const {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLSchema
} = require('graphql')

const Companies = require('./Companies')


const AcquiringCompanyType = new GraphQLObjectType({
  name: 'acquiring_company',
  fields: {
    name: { type: GraphQLString }
  }
})


const AcquisitionType = new GraphQLObjectType({
  name: 'acquisition',
  fields: {
    // price_amount: {
    //   type: GraphQLString,
    //   resolve: (acquisition) => Number(acquisition.price_amount)
    // },
    // price_currency_code: {type: GraphQLString}
    acquiring_company: { type: new GraphQLList(AcquiringCompanyType) }
  }
})


const AcquisitionsType = new GraphQLObjectType({
  name: 'acquisitions',
  fields: {
    acquiring_company: { type: new GraphQLList(AcquiringCompanyType) }
  }
})


const FundingRoundsType = new GraphQLObjectType({
  name: 'funding_rounds',
  fields: {
    // raised_amount: { type: GraphQLInt }
    raised_amount: {
      type: GraphQLInt,
      resolve: (funding_rounds) => parseInt(funding_rounds.raised_amount)
    }
  }
})


const CompanyType = new GraphQLObjectType({
  name: 'company',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    category_code: { type: GraphQLString },
    crunchbase_url: { type: GraphQLString },
    deadpooled_day: { type: GraphQLInt },
    deadpooled_month: { type: GraphQLInt },
    deadpooled_year: { type: GraphQLInt },
    email_address: { type: GraphQLString },
    founded_day: { type: GraphQLInt },
    founded_month: { type: GraphQLInt },
    founded_year: { type: GraphQLInt },
    homepage_url: { type: GraphQLString },
    name: { type: GraphQLString },
    name: { type: GraphQLString },
    number_of_employees: { type: GraphQLInt },
    overview: { type: GraphQLString },
    phone_number: { type: GraphQLString },
    tag_list: { type: GraphQLString },
    total_money_raised: { type: GraphQLString },
    acquisition: { type: new GraphQLList(AcquisitionType) },
    acquisitions: { type: new GraphQLList(AcquisitionsType) },
    funding_rounds: { type: new GraphQLList(FundingRoundsType) }
  })
})


const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    companies: {
      type: new GraphQLList(CompanyType),
      resolve: () => {
        return new Promise((res, rej) => {
          Companies.find((err, data) => {
            if (!err) res(data)
            else rej(err)
          })
        })
      }
    }
  }
})


const appSchema = new GraphQLSchema({
  query: QueryType
})


module.exports = appSchema