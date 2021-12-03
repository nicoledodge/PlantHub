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
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
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
    addWater(_id: $plantId, waterAdded: $waterAdded) {
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