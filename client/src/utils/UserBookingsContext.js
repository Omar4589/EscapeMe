import React, { createContext, useContext, useEffect, useState } from "react";
import { QUERY_USERBOOKINGS } from "./queries";
import { CREATE_BOOKING, DELETE_BOOKING } from "./mutations";
import { useQuery, useMutation } from "@apollo/client";
import dayjs from "dayjs";

const UserBookingsContext = createContext();

export const useUserBookingsContext = () => {
  return useContext(UserBookingsContext);
};

export const UserBookingsProvider = ({ children }) => {
  const [createBooking] = useMutation(CREATE_BOOKING);
  const [deleteBooking] = useMutation(DELETE_BOOKING);

  const [userBookings, setUserBookings] = useState([]);

  const {
    loading,
    error,
    data: bookingsData,
    refetch,
  } = useQuery(QUERY_USERBOOKINGS);

  useEffect(() => {
    if (bookingsData) {
      const bookings = bookingsData?.getAllUserBookings || [];
      const formattedBookings = bookings.map((booking) => ({
        ...booking,
        date: dayjs(booking.date).format("MMMM D, YYYY"),
        time: dayjs(booking.time, "HH:mm:ss").format("h:mm A"),
      }));

      setUserBookings(formattedBookings);
    }
  }, [bookingsData]);

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

  const deleteABooking = async (bookingId) => {
    try {
      await deleteBooking({
        variables: { booking_id: bookingId },
      });
      setUserBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== bookingId)
      );
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