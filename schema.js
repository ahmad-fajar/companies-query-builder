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
  getAcquired,
  getAcquiredWField,
  getAcquiring,
  getAllCompanies,
  getCompanies,
  getCompetitors,
  getCompanyAssociations,
  getPersonRelation
} = require('./functions')

const { AcquiredCompaniesFieldType } = require('./schema/acquired_company_field')
const { CompaniesType } = require('./schema/companies')
const { CompanyType } = require('./schema/all_companies')
const { PersonRelationsType } = require('./schema/person_relations')
const {
  AcquiredType,
  AcquiringType,
  CompanyAssociationsType,
  CompetitorsType
} = require('./schema/company_associations')


const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    acquired: {
      type: new GraphQLList(AcquiredType),
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: (root, {name}) => getAcquired(name)
    },

    acquiredWField:{
      type: new GraphQLList(AcquiredCompaniesFieldType),
      args: {
        tag: {type: new  GraphQLNonNull(GraphQLString)}
      },
      resolve: (root, {tag}) => getAcquiredWField(tag)
    },

    acquiring: {
      type: new GraphQLList(AcquiringType),
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: (root, {name}) => getAcquiring(name)
    },

    allCompanies: {
      type: new GraphQLList(CompanyType),
      resolve: () => getAllCompanies()
    },

    companies: {
      type: new GraphQLList(CompaniesType),
      args: {
        min_raised: {type: new GraphQLNonNull(GraphQLInt)},
        min_rounds: {type: new GraphQLNonNull(GraphQLInt)},
        min_year: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve: (root, args) => getCompanies(args)
    },

    companyAssociations: {
      type: new GraphQLList(CompanyAssociationsType),
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: (root, {name}) => getCompanyAssociations(name)
    },

    competitors: {
      type: new GraphQLList(CompetitorsType),
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (root, { name }) => getCompetitors(name)
    },

    personRelation: {
      type: new GraphQLList(PersonRelationsType),
      args: {
        first_name: {type: new GraphQLNonNull(GraphQLString)},
        last_name: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: (root, {first_name, last_name}) => getPersonRelation(first_name, last_name)
    }
  }
})


const appSchema = new GraphQLSchema({
  query: QueryType
})

module.exports = appSchema
