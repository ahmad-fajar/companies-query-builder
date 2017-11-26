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


const {
  getAllCompanies
} = require('./functions')


const { CompanyType } = require('./schema/all_companies')


const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    allCompanies: {
      type: new GraphQLList(CompanyType),
      resolve: () => getAllCompanies()
    },

    person_relation: {
      type: new GraphQLList(CompanyType),
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString }
      },
      resolve: (root, { firstName, lastName }) => new Promise((res, rej) => {
        let syntax = {
          "relationships.person.first_name": firstName,
          "relationships.person.last_name": lastName
        }
        Companies.find(syntax, (err, data) => {
          if (!err) res(data)
        })
      })
    }, // end of person_relation

    company_association: {
      type: new GraphQLList(CompanyType),
      args: {
        name: { type: GraphQLString }
      },
      resolve: (root, { name }) => new Promise((res, rej) => {
        let syntax = { name: name }
        Companies.find(syntax, (err, data) => {
          if (!err) res(data)
        })
      })
    } // end of company_association
  }
}) // end of QueryType


const appSchema = new GraphQLSchema({
  query: QueryType
})


module.exports = appSchema