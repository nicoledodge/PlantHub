const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    myPlant: [Plant]
    myPosts: [Blog]
  }

  type Plant {
    _id: ID
    name: String!
    waterNeeded: Int
    waterAdded: Int
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Blog {
    _id: ID
    postText: String!
    postCreator: String
    createdAt: String
    comment: [Comment]
  }

  type Comment {
    _id: ID
    commentText: String!
    createdAt: String
  }

  type Query {
    allUsers: [User]
    user(email: String!): User
    plants(email: String!): [Plant]
    plant(plantId: ID!): Plant
    allPlants: [Plant]
    me: User

    allPosts: [Post]
    post(postId: ID!): Post
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

    addPost(postText: String!, postCreator: String!): Blog
    addComment(postId: ID!, commentText: String!): Blog
    removePost(postId: ID!): Blog
    removeComment(postId: ID!, commentId: ID!): Blog
  }
`;

module.exports = typeDefs;

