import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id
      firstName
      lastName
      email
      myPlants {
        name
        waterNeeded
        waterAdded
      }
    }
  }
`;
export const QUERY_POSTS = gql`
query {
  allPosts{
    _id
    postText
    postCreator
    createdAt
    comments{
      _id
      createdAt
      commentText
      commentCreator
    }
  }
}
`;
