import { gql } from "@apollo/client";

export const ME_QUERY = gql`
  query userMe {
    me {
      _id
      username
      email
      userPosts {
        _id
        description
        address
        dateOfSale
        images
        title
        lat
        lng
        createdAt
      }
      savedFavorites {
        _id
        description
        address
        dateOfSale
        images
        author
        title
      }
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
