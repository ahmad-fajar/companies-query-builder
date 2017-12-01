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


const AcquiredCompaniesType = new GraphQLObjectType({
  name: 'acquired_companiess',
  fields: {
    name: { type: GraphQLString },
    tag_list: { type: GraphQLString }
  }
})


exports.AcquiredCompaniesFieldType = new GraphQLObjectType({
  name: 'acquired_companies_field',
  fields: {
    name: { type: GraphQLString },
    acquired_companies: {
      type: new GraphQLList(AcquiredCompaniesType)
    }
  }
})
