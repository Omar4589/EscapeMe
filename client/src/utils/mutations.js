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
    $user_id: String!
    $escape_room_id: String!
    $date: String!
    $time: String!
  ) {
    createBooking(
      user_id: $user_id
      escape_room_id: $escape_room_id
      date: $date
      time: $time
    ) {
      booking {
        id
        user_id
        escape_room_id
        date
        time
        created_at
      }
    }
  }
`;
