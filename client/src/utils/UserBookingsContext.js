import React, { createContext, useContext, useEffect, useState } from "react";
import { QUERY_USERBOOKINGS } from "./queries";
import { CREATE_BOOKING, DELETE_BOOKING } from "./mutations";
import { useQuery, useMutation } from "@apollo/client";
import dayjs from "dayjs";

//Here we create a global state for a logged in user's bookings

const UserBookingsContext = createContext();

export const useUserBookingsContext = () => {
  return useContext(UserBookingsContext);
};

export const UserBookingsProvider = ({ children }) => {
  //MUTATIONS
  const [createBooking] = useMutation(CREATE_BOOKING);
  const [deleteBooking] = useMutation(DELETE_BOOKING);

  //booking state
  const [userBookings, setUserBookings] = useState([]);

  const {
    loading,
    error,
    data: bookingsData,
    refetch,
  } = useQuery(QUERY_USERBOOKINGS);

  //this hook set's the inital value of the userBookings state
  useEffect(() => {
    if (bookingsData) {
      const bookings = bookingsData?.getAllUserBookings || [];
      const formattedBookings = bookings.map((booking) => ({
        ...booking,
        date: dayjs(booking.date).format("MMMM D, YYYY"),
        time: dayjs(`2023-01-01T${booking.time}`).format("h:mm A"),
      }));

      setUserBookings(formattedBookings);
    }
  }, [bookingsData]);

  console.log(userBookings);

  //Mutation to create a booking
  const createABooking = async (newBookingData) => {
    try {
      // Perform the GraphQL mutation
      await createBooking({
        variables: {
          escape_room_id: newBookingData.escape_room_id,
          numberOfPlayers: newBookingData.numberOfPlayers,
          date: newBookingData.date,
          time: newBookingData.time,
        },
      });

      //here we use the refetch method from the user bookings query to refetch the data
      //we set the state to the fetch data
      refetch();
      const bookings = bookingsData?.getAllUserBookings || [];
      const formattedBookings = bookings.map((booking) => ({
        ...booking,
        date: dayjs(booking.date).format("MMMM D, YYYY"),
        time: dayjs(booking.time, "HH:mm:ss").format("h:mm A"),
      }));

      setUserBookings(formattedBookings);
    } catch (err) {
      console.error("Error creating booking:", error);
    }
  };

  //Mutation to delete a booking
  const deleteABooking = async (bookingId) => {
    try {
      const response = await deleteBooking({
        variables: { booking_id: bookingId },
      });
      //we simply filter out for the booking that was deleted
      setUserBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== bookingId)
      );
      return response;
    } catch (err) {
      console.error("Error deleting booking:", err);
    }
  };

  const value = {
    userBookings,
    setUserBookings,
    createABooking,
    deleteABooking,
    loading,
    error,
    refetch,
  };

  return (
    <UserBookingsContext.Provider value={value}>
      {children}
    </UserBookingsContext.Provider>
  );
};
