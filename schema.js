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


const { AcquiredCompaniesFieldType } = require('./schemas/acquired_company_field')
const { CompaniesType } = require('./schemas/companies')
const { CompanyType } = require('./schemas/all_companies')
const { PersonRelationsType } = require('./schemas/person_relations')
const {
  AcquiredType,
  AcquiringType,
  CompanyAssociationsType,
  CompetitorsType
} = require('./schemas/company_associations')


const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {

    /**
     * Given company name, return list of acquired companies.
     * @param {string} name - company name
     * @example
     * acquired {name: "foo"} {
     *   name
     * }
     * @return {object[]}
     * @name acquired
     * @function
     */
    acquired: {
      type: new GraphQLList(AcquiredType),
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: (root, {name}) => getAcquired(name)
    },

    /**
     * Return a list of companies which have acquired another
     * company with specified field.
     * @param {string} tag - acquired company's field
     * @example
     * acquiredWField (tag: "foo") {
     *   name
     *   tag_list
     * }
     * @return {object[]}
     * @name acquiredWField
     * @function
     */
    acquiredWField:{
      type: new GraphQLList(AcquiredCompaniesFieldType),
      args: {
        tag: {type: new  GraphQLNonNull(GraphQLString)}
      },
      resolve: (root, {tag}) => getAcquiredWField(tag)
    },

    /**
     * Given company name A, return name of company B which acquired company A.
     * @param {string} name - company name A
     * @example
     * acquiring (name: "foo") {
     *   name
     * }
     * @return {object[]}
     * @name acquiring
     * @function
     */
    acquiring: {
      type: new GraphQLList(AcquiringType),
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: (root, {name}) => getAcquiring(name)
    },

    /**
     * Return a list of all companies.
     * @example
     * allCompanies {
     *   _id
     *   name
     *   acquisitions
     *   ...
     * }
     * @return {object[]}
     * @name allCompanies
     * @function
     */
    allCompanies: {
      type: new GraphQLList(CompanyType),
      resolve: () => getAllCompanies()
    },

    /**
     * Return a list of companies with specified minimum year founded,
     * minimum funding rounds, and minimum raised fund.
     * @param {string} min_raised - minimum raised fund
     * @param {string} min_rounds - minimum funding rounds
     * @param {number} min_year - minimum year founded
     * @example
     * companies (min_year: 2005, min_rounds: 3, min_raised: 1000000) {
     *   name
     *   founded_year
     *   funding_rounds
     *   raised_amount
     *   rounds
     * }
     * @return {object[]}
     * @name companies
     * @function
     */
    companies: {
      type: new GraphQLList(CompaniesType),
      args: {
        min_raised: {type: new GraphQLNonNull(GraphQLInt)},
        min_rounds: {type: new GraphQLNonNull(GraphQLInt)},
        min_year: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve: (root, args) => getCompanies(args)
    },

    /**
     * Given company name, return a list of all associated companies,
     * including acquiring company, acquired companies,
     * and competitors.
     * @param {string} name - company name
     * @example
     * companyAssociations (name: "foo") {
     *   name
     *   relationship
     * }
     * @return {object[]}
     * @name companyAssociations
     * @function
     */
    companyAssociations: {
      type: new GraphQLList(CompanyAssociationsType),
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: (root, {name}) => getCompanyAssociations(name)
    },

    /**
     * Given company name, return a list of competitor companies.
     * @param {string} name - company name
     * @example
     * competitors (name: "foo") {
     *   name
     * }
     * @return {object[]}
     * @name competitors
     * @function
     */
    competitors: {
      type: new GraphQLList(CompetitorsType),
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (root, { name }) => getCompetitors(name)
    },

    /**
     * Given person name, return a list of all associated companies,
     * his/her relationship with each company,
     * and whether it is in present (true) or past (false)
     * @param {string} first_name - person's first name
     * @param {string} last_name - person's last name
     * @example
     * personRelation (first_name: "foo", last_name: "bar") {
     *   name
     *   title
     *   is_past
     * }
     * @return {object[]}
     * @name personRelation
     * @function
     */
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
