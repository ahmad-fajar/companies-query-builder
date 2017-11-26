'use strict'

const {
  GraphQLString,
  GraphQLObjectType,
} = require('graphql')

exports.AcquiredCompaniesFieldType = new GraphQLObjectType({
  name: 'acquired_companies_field',
  fields: {
    name: { type: GraphQLString },
    tag_list: { type: GraphQLString }
  }
})
