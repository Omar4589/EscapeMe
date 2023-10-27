const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {},
  Mutation: {
    // create a user, sign a token, and send it back
    createUser: async (parent, { firstName, lastName, email, password }) => {
      const user = await User.create({ firstName, lastName, email, password });
      const token = signToken(user);
      return { token, user };
    },
    // login a user, sign a token, and send it back
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ where: { email: req.body.email } });

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
