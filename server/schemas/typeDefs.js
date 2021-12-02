const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    myPlants: [Plant]!
  }

  type Plant {
    _id: ID
    name: String
    waterNeeded: Int
    waterAdded: Int
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    allUsers: [User]
    user(email: String!): User
    plants(email: String!): [Plant]
    plant(plantId: ID!): Plant
    allPlants: [Plant]
    me: User
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPlant(name: String!, waterNeeded: Int!): Plant
    addPlantTest(name: String!, waterNeeded: Int!): Plant
    addWater(plantId: ID!, waterAdded: Int!): Plant
    addWaterTest(plantId: ID!, waterAdded: Int!): Plant
    removePlant(plantId: ID!): Plant
    removeWater(plantId: ID!, waterAdded: Int!): Plant
  }
`;

module.exports = typeDefs;
