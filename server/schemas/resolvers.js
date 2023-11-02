const { AuthenticationError } = require("apollo-server-express");
const { User, EscapeRoom, Booking } = require("../models");
const { signToken } = require("../utils/auth");

const generateTimeSlots = () => {
  const slots = [];
  for (let i = 12; i <= 20; i++) {
    // 12 pm to 8 pm
    slots.push(`${i < 10 ? "0" : ""}${i}:00:00`); // Ensure it's a double-digit hour
  }
  return slots;
};

const getAvailableSlots = async (escape_room_id, date) => {
  // Generate all possible slots between 12 pm to 9 pm
  let allSlots = generateTimeSlots();

  // Fetch existing bookings for the escape room on the specific date
  const existingBookings = await Booking.findAll({
    where: {
      escape_room_id,
      date,
    },
  });

  if (existingBookings.length === 0) {
    return allSlots;
  }

  const bookedSlots = existingBookings.map((booking) => booking.time);

  // Remove the booked slots from all possible slots
  const availableSlots = allSlots.filter((slot) => !bookedSlots.includes(slot));

  return availableSlots;
};

const resolvers = {
  Query: {
    getAllEscapeRooms: async () => {
      return await EscapeRoom.findAll();
    },
    availableSlots: async (parent, { escape_room_id, date }) => {
      return await getAvailableSlots(escape_room_id, date);
    },
    me: async (parent, args, context) => {
      if (context.user) {
        //findByPk does not use a 'where' clause, pass in the PK directly
        const loggedinUser = await User.findByPk(context.user.id);
        return loggedinUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    getAllUserBookings: async (parent, args, context) => {
      if (context.user) {
        return await Booking.findAll({
          where: {
            user_id: context.user.id,
          },
          include: [
            {
              model: EscapeRoom, // The associated model
              attributes: ["theme", "duration", "image_url", "description"], // If you want to limit the fields from the included model
            },
          ],
        });
      }
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
    createBooking: async (parent, { escape_room_id, date, time }, context) => {
      if (context.user) {
        const escapeRoom = await EscapeRoom.findByPk(escape_room_id);

        const booking = await Booking.create({
          user_id: context.user.id,
          escape_room_id,
          date,
          time,
        });
        return booking;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
