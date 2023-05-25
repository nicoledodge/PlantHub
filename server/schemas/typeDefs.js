const { gql } = require("apollo-server-express");
const typeDefs = gql`
  type User {
    _id: ID
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    location: String!
    createdAt: String
    password: String!
    myPlants: [Plant]
    myPosts: [Blog]
  }

  type Plant {
    _id: ID
    name: String!
    nickname: String
    plantType: String!
    plantSize: String!
    waterNeeded: Int
    waterAdded: Int
    createdAt: String
    image: String
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
    addUser(
      firstName: String!
      lastName: String!
      username: String!
      email: String!
      password: String!
      location: String!
    ): Auth
    login(email: String!, password: String!): Auth
    addPlant(
      name: String!
      nickname: String
      plantType: String!
      plantSize: String!
      waterNeeded: Int!
      hasImage: Boolean!
    ): Plant
    addWater(plantId: ID!): Plant
    removePlant(plantId: ID!): Plant
    removeWater(plantId: ID!, waterAdded: Int!): Plant
    addPost(postText: String!, postCreator: String!): Blog
    addComment(postId: ID!, commentText: String!): Blog
    removePost(postId: ID!): Blog
    removeComment(postId: ID!, commentId: ID!): Blog
  }
`;

module.exports = typeDefs;
