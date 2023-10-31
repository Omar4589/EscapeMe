const { AuthenticationError } = require("apollo-server-express");
const { User, EscapeRoom } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    getAllEscapeRooms: async () => {
      return await EscapeRoom.findAll();
    },
    me: async (parent, args, context) => {
      if (context.user) {
        //findByPk does not use a 'where' clause, pass in the PK directly
        const loggedinUser = await User.findByPk(context.user.id);
        return loggedinUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
  Mutation: {
    // create a user, sign a token, and send it back
    createUser: async (parent, { firstName, lastName, email, password }) => {
      const user = await User.create({ firstName, lastName, email, password });
      const token = signToken(user);
      return { token, user };
    },
    // login a user, sign a token, and send it back
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw new AuthenticationError("Incorrect email or password!");
      }
      const correctPw = await user.checkPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect email or password!");
      }
      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
