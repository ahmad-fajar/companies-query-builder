'use strict'

const {
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLObjectType,
} = require('graphql')


exports.CompaniesType = new GraphQLObjectType({
  name: 'companies',
  fields: {
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    founded_year: { type: GraphQLInt },
    funding_rounds: { type: GraphQLInt },
    raised_amount: { type: GraphQLFloat }
  }
})
