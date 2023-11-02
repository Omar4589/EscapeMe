const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String!
    email: String!
  }

  type EscapeRoom {
    id: Int!
    theme: String!
    difficulty: String!
    description: String!
    duration: Int!
    image_url: String!
  }

  type Booking {
    id: Int!
    user_id: Int!
    escape_room_id: Int!
    date: String!
    time: String!
    created_at: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: User
    getAllEscapeRooms: [EscapeRoom]
    availableSlots(escape_room_id: Int!, date: String!): [String!]
    getSingleBooking: Booking
    getAllUserBookings: [Booking]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    createBooking(
      escape_room_id: Int!
      date: String!
      time: String!
    ): Booking
  }
`;

module.exports = typeDefs;
