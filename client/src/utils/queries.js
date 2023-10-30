import { gql } from "@apollo/client";

export const ME_QUERY = gql`
  query userMe {
    me {
      id
      firstName
      lastName
      email
    }
  }
`;

export const QUERY_AllESCAPEROOMS = gql`
  query getAllEscapeRooms {
    getAllEscapeRooms {
      id
      theme
      difficulty
      description
      duration
      image_url
    }
  }
`;
