import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      firstName
      lastName
      email
      location
      createdAt
      myPlants {
        _id
        name
        nickname
        plantType
        plantSize
        waterNeeded
        waterAdded
        createdAt
        image
      }
    }
  }
`;
export const QUERY_POSTS = gql`
  query {
    allPosts {
      _id
      postText
      postCreator
      createdAt
      comments {
        _id
        createdAt
        commentText
        commentCreator
      }
    }
  }
`;
