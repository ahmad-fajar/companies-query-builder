'use strict'

const {
  GraphQLString,
  GraphQLObjectType,
} = require('graphql')


exports.AcquiredType = new GraphQLObjectType({
  name: 'acquired_companies',
  fields: {
    name: { type: GraphQLString }
  }
})

exports.AcquiringType = new GraphQLObjectType({
  name: 'acquiring_companies',
  fields: {
    name: { type: GraphQLString }
  }
})

exports.CompetitorsType = new GraphQLObjectType({
  name: 'competitors',
  fields: {
    name: { type: GraphQLString }
  }
})

exports.CompanyAssociationsType = new GraphQLObjectType({
  name: 'company_associations',
  fields: {
    name: { type: GraphQLString },
    relationship: { type: GraphQLString }
  }
})
