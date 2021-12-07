const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
    myPlants: [Plant]
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
    comments: [Comment]
  }

  type Comment {
    _id: ID
    commentText: String!
    commentCreator: String
    createdAt: String
  }

  type Query {
    allUsers: [User]
    user(username: String!): User
    plants(email: String!): [Plant]
    plant(plantId: ID!): Plant
    allPlants: [Plant]
    me: User
    allPosts: [Blog]
    post(postId: ID!): Blog
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, username: String! email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    
    addPlant(name: String!, waterNeeded: Int!): Plant
    addPlantTest(name: String!, waterNeeded: Int): Plant
    addWater(plantId: ID!): Plant
    addWaterTest(plantId: ID!, waterAdded: Int!): Plant
    removePlant(plantId: ID!): Plant
    removePlantTest(plantId: ID!): Plant
    removeWater(plantId: ID!, waterAdded: Int!): Plant
    removeWaterTest(plantId: ID!, waterAdded: Int!): Plant

    addPost(postText: String!, postCreator: String!): Blog
    addPostTest(postText: String!, postCreator: String!): Blog  

    addComment(postId: ID!, commentText: String!): Blog
    addCommentTest(postId: ID!, commentText: String!): Blog

    removePost(postId: ID!): Blog
    removePostTest(postId: ID!): Blog

    removeComment(postId: ID!, commentId: ID!): Blog
    removeCommentTest(postId: ID!, commentId: ID!): Blog
  }
`;

module.exports = typeDefs;