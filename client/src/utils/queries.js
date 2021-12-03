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
