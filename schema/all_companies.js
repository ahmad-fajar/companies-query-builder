'use strict'

const {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLSchema,
  GraphQLBoolean
} = require('graphql')


const AcquiringCompanyType = new GraphQLObjectType({
  name: 'acquiring_company',
  fields: {
    name: { type: GraphQLString }
  }
})


const AcquisitionType = new GraphQLObjectType({
  name: 'acquisition',
  fields: {
    price_amount: {
      type: GraphQLString,
      resolve: (acquisition) => Number(acquisition.price_amount)
    },
    price_currency_code: { type: GraphQLString },
    acquiring_company: { type: new GraphQLList(AcquiringCompanyType) }
  }
})


const AcquiredCompanyType = new GraphQLObjectType({
  name: 'acquired_company',
  fields: {
    name: { type: GraphQLString }
  }
})


const AcquisitionsType = new GraphQLObjectType({
  name: 'acquisitions',
  fields: {
    company: { type: new GraphQLList(AcquiredCompanyType) }
  }
})


const FundingRoundsType = new GraphQLObjectType({
  name: 'funding_rounds',
  fields: {
    raised_amount: { type: GraphQLInt }
  }
})


const PersonType = new GraphQLObjectType({
  name: 'person',
  fields: {
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString }
  }
})


const RelationshipsType = new GraphQLObjectType({
  name: 'relationships',
  fields: {
    is_past: { type: GraphQLBoolean },
    title: { type: GraphQLString },
    person: { type: new GraphQLList(PersonType) }
  }
})


exports.CompanyType = new GraphQLObjectType({
  name: 'all_company',
  fields: {
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
    number_of_employees: { type: GraphQLInt },
    overview: { type: GraphQLString },
    phone_number: { type: GraphQLString },
    tag_list: { type: GraphQLString },
    total_money_raised: { type: GraphQLString },
    acquisition: { type: new GraphQLList(AcquisitionType) },
    acquisitions: { type: new GraphQLList(AcquisitionsType) },
    funding_rounds: { type: new GraphQLList(FundingRoundsType) },
    relationships: { type: new GraphQLList(RelationshipsType) }
  }
})
