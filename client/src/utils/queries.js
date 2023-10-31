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

export const QUERY_SINGLEBOOKING = gql`
  query getSingleBooking {
    getSingleBooking {
      user_id
      escape_room_id
      date
      time
      created_at
    }
  }
`;
