import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USERBOOKINGS } from "../../utils/queries";
import { DELETE_BOOKING } from "../../utils/mutations";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const MyBookings = () => {
  const [userBookings, setUserBookings] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentBookingId, setCurrentBookingId] = useState(null);

  const { loading, error, data: bookingsData } = useQuery(QUERY_USERBOOKINGS);

  const [deleteABooking] = useMutation(DELETE_BOOKING);

  useEffect(() => {
    if (bookingsData) {
      const formattedBookings = bookingsData.getAllUserBookings.map(
        (booking) => ({
          ...booking,
          date: dayjs(booking.date).format("MMMM D, YYYY"),
          time: dayjs(booking.time, "HH:mm:ss").format("h:mm A"),
        })
      );

      setUserBookings(formattedBookings);
    }
  }, [bookingsData]);

  useEffect(() => {
    // Add 'overflow-hidden' to the body when the modal is open
    if (dialogOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Clean up function to remove the class when the component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [dialogOpen]);

  const deleteBooking = async (bookingId) => {
    try {
      const response = await deleteABooking({
        variables: {
          booking_id: bookingId,
        },
      });
      if (response) {
        const updatedBookings = userBookings.filter(
          (booking) => booking.id !== bookingId
        );
        setUserBookings(updatedBookings);
        setDialogOpen(false);
      }
    } catch (err) {}
  };

  console.log(userBookings);

  // Guard clause for safe access
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {"something went wrong"}</p>;

  return (
    <div className=" text-slate-100 min-h-screen mx-auto px-5 py-10 bg-zinc-950">
      <h1 className="text-3xl font-bold mb-5 underline decoration-orange-600">
        My Bookings
      </h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {userBookings.map((booking) => (
          <div key={booking.id} className="py-6 px-2">
            <h2 className="text-xl font-semibold mb-2">
              {booking.escaperoom.theme}
            </h2>
            <img
              src={booking.escaperoom.image_url}
              alt="escape room"
              className="rounded-md mb-3"
            />
            <div className="flex text-center items-start justify-between mb-2 mx-2">
              <p className="font-semibold text-lg">Number of Players:</p>
              <p id="numberOfPlayers" className="text-right ml-2">
                {booking.numberOfPlayers}
              </p>
            </div>
            <div className="flex text-center items-start justify-between mb-2 mx-2">
              <p className="font-semibold text-lg">Date:</p>
              <p id="date" className="text-right ml-2">
                {booking.date}
              </p>
            </div>

            <div className="flex text-center items-start justify-between mb-2 mx-2">
              <p className="font-semibold text-lg">Time:</p>
              <p id="time" className="text-right ml-2">
                {booking.time}
              </p>
            </div>
            <div className="flex text-center items-start justify-between mb-3 mx-2">
              <p className="font-semibold text-lg">Duration:</p>
              <p id="duration" className="text-right ml-2">
                {booking.escaperoom.duration} min
              </p>
            </div>
            <div className="text-center  mb-2 mx-2">
              <p id="description" className="">
                {booking.escaperoom.description}
              </p>
            </div>
            <div className="text-center mt-5">
              <button
                className="py-2 px-4 bg-orange-600 text-slate-100 hover:bg-orange-700 rounded-lg"
                onClick={() => {
                  setCurrentBookingId(booking.id);
                  setDialogOpen(true);
                }}
              >
                Cancel Booking
              </button>
            </div>
            <div className="border-2 border-orange-600 mt-14 w-4/5 mx-auto"></div>
          </div>
        ))}
      </div>

      {!userBookings.length && (
        <div className="flex items-center justify-center flex-col ">
          <p className="text-gray-600 my-10">You have no bookings yet.</p>

          <Link
            to="/booking/1"
            className="px-10 bg-orange-600 py-2 rounded-lg "
          >
            Book Now
          </Link>
        </div>
      )}
      {dialogOpen ? (
        <div
          id="confirmation-dialog"
          className="fixed min-h-screen inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="overscroll-contain  max-h-screen text-center overflow-y-auto relative bg-slate-200 text-slate-950 px-5 py-8 mx-2 rounded-lg shadow-lg w-full max-w-lg">
            <p className="text-xl">
              Are you sure you want to cancel your booking?
            </p>
            <div className="my-5">
              {" "}
              <button
                className="px-10 text-slate-100 py-2 bg-orange-600 rounded-full mx-6"
                onClick={() => {
                  setDialogOpen(false);
                }}
              >
                No
              </button>
              <button
                className="px-10 text-slate-100 py-2 bg-orange-600 hover:bg-orange-700 rounded-full mx-6"
                onClick={() => {
                  deleteBooking(currentBookingId);
                }}
              >
                Yes
              </button>{" "}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MyBookings;
