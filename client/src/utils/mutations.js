import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $username: String! $email: String!, $password: String!, $location: String!, $experience: String!) {
    addUser(firstName: $firstName, lastName: $lastName, username: $username email: $email, password: $password, location: $location, experience: $experience) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_PLANT = gql`
  mutation addPlant($name: String!, $waterNeeded: Int!) {
    addPlant(name: $name, waterNeeded: $waterNeeded) {
      _id
      name
      waterNeeded
    }
  }
`;

export const REMOVE_PLANT = gql`
  mutation removePlant($plantId: ID!) {
    addPlant(_id: $plantId, waterNeeded: $waterNeeded) {
      _id
      name
      waterNeeded
    }
  }
`;

export const ADD_WATER = gql`
  mutation addWater($plantId: ID!, $waterAdded: Int!) {
    addWater(_id: $plantId, waterAdded: 1) {
      _id
      name
      waterNeeded
      waterAdded
    }
  }
`;

export const REMOVE_WATER = gql`
  mutation removeWater($plantId: ID!, $waterAdded: Int!) {
    removeWater(_id: $plantId, waterAdded: $waterAdded) {
      _id
      name
      waterNeeded
      waterAdded
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost($postText: String!, $postCreator: String!) {
    addPost(postText: $postText, postCreator: $postCreator) {
      _id
      postText
      postCreator
      createdAt
      comments {
        _id
        commentText
        commentCreator
      }
    }
  }
`;

export const REMOVE_POST = gql`
  mutation removePost($postId: ID!) {
    removePost(postId:$postId) {
      _id
      postText
      postCreator
      createdAt
      comments {
        _id
        commentText
        commentCreator
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $commentText: String!) {
    addComment(postId: $postId, commentText: $commentText) {
      _id
      postText
      postCreator
      createdAt
      comments {
        _id
        commentText
        commentCreator
        createdAt
      }
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation removeComment($postId: ID!, $commentId: ID!) {
    removeComment(postId: $postId, commentId: $commentId) {
      _id
      postText
      postCreator
      createdAt
      comments {
        _id
        commentText
        commentCreator
        createdAt
      }
    }
  }
`;