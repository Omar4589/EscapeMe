import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        id
        firstName
        lastName
      }
    }
  }
`;
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        firstName
        lastName
        email
      }
    }
  }
`;
export const UPDATE_EMAIL = gql`
  mutation updateEmail($email: String!) {
    updateEmail(email: $email) {
      id
      firstName
      lastName
      email
    }
  }
`;
export const UPDATE_PASSWORD = gql`
  mutation updatePassword($currentPassword: String!, $newPassword: String!) {
    updatePassword(
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
      id
      firstName
      lastName
      email
    }
  }
`;
export const CREATE_BOOKING = gql`
  mutation createBooking(
    $escape_room_id: Int!
    $numberOfPlayers: Int!
    $date: String!
    $time: String!
  ) {
    createBooking(
      escape_room_id: $escape_room_id
      numberOfPlayers: $numberOfPlayers
      date: $date
      time: $time
    ) {
      id
      user_id
      escape_room_id
      numberOfPlayers
      date
      time
      created_at
    }
  }
`;
export const DELETE_BOOKING = gql`
  mutation deleteBooking($booking_id: Int!) {
    deleteBooking(booking_id: $booking_id)
  }
`;
