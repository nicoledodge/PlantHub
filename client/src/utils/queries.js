import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      firstName
      lastName
      email
      myPlants {
        name
        waterNeeded
        waterAdded
        createdAt
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
// export const QUERY_POST = gql`
// query {
//   post{
//     _id
//     postText
//     postCreator
//     createdAt
//     comments{
//       _id
//       createdAt
//       commentText
//       commentCreator
//     }
//   }
// }
// `;

export const QUERY_POST = gql`
  query{
    post(postId: $postId) {
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

// export const QUERY_ALLUSERS= gql`
// {
//   allUsers{
//     _id
//     username
//     lastName
//     firstName
//     email
//     myPlants{
//       _id
//       name
//       waterNeeded
//       waterAdded
//     }
//     }
//   }`


  export const QUERY_USER= gql`
  query {
        user(username: "BetaTester"){
        _id
        firstName
        lastName
        username
        location
        email
        myPlants {
          _id
          name
          waterAdded
          waterNeeded
          createdAt
        }
      }
    }`


