'use strict'

const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLBoolean
} = require('graphql')


exports.PersonRelationsType = new GraphQLObjectType({
  name: 'person_relations',
  fields: {
    name: { type: GraphQLString },
    title: { type: GraphQLString },
    is_past: { type: GraphQLBoolean }
  }
})
