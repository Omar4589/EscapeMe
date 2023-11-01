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
export const UPDATE_PASSWORD = gql`
  mutation updatePassword(
    $email: String!
    $currentPassword: String!
    $newPassword: String!
  ) {
    updatePassword(
      email: $email
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
      _id
      username
    }
  }
`;
export const CREATE_BOOKING = gql`
  mutation createBooking(
    $escape_room_id: Int!
    $escape_room_theme: String!
    $escape_room_duration: Int!
    $date: String!
    $time: String!
  ) {
    createBooking(
      escape_room_id: $escape_room_id
      escape_room_theme: $escape_room_theme
      escape_room_duration: $escape_room_duration
      date: $date
      time: $time
    ) {
      id
      user_id
      user_firstName
      user_lastName
      escape_room_id
      escape_room_theme
      escape_room_duration
      date
      time
      created_at
    }
  }
`;
