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

export const QUERY_AVAILABLESLOTS = gql`
  query availableSlots($escape_room_id: Int!, $date: String!) {
    availableSlots(escape_room_id: $escape_room_id, date: $date)
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

export const QUERY_USERBOOKINGS = gql`
  query getAllUserBookings {
    getAllUserBookings {
      id
      user_id
      escape_room_id
      date
      time
      escaperoom {
        theme
        duration
      }
    }
  }
`;
