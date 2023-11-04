import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USERBOOKINGS } from "../../utils/queries";
import { DELETE_BOOKING } from "../../utils/mutations";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import CloseIcon from "@mui/icons-material/Close";
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
  }, [dialogOpen]); // Only re-run the effect if dialogOpen changes

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

  console.log(currentBookingId);

  // Guard clause for safe access
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {"something went wrong"}</p>;

  return (
    <div className="container  min-h-screen mx-auto px-4 py-10 bg-slate-100">
      <h1 className="text-3xl font-bold mb-5">My Bookings</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {userBookings.map((booking) => (
          <div key={booking.id} className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">
              {booking.escaperoom.theme}
            </h2>
            <img
              src={booking.escaperoom.image_url}
              alt="escape room"
              className="rounded-md mb-3"
            />
            <div className="flex text-center items-start justify-between mb-2 mx-2">
              <p className="font-semibold text-lg">Date:</p>
              <p id="date" className="text-right ml-2">
                {booking.date}
              </p>
            </div>

            <div className="flex text-center items-start justify-between mb-2 mx-2">
              <p className="font-semibold text-lg">Time:</p>
              <p id="date" className="text-right ml-2">
                {booking.time}
              </p>
            </div>
            <div className="flex text-center items-start justify-between mb-3 mx-2">
              <p className="font-semibold text-lg">Duration:</p>
              <p id="date" className="text-right ml-2">
                {booking.escaperoom.duration} min
              </p>
            </div>
            <div className="text-center  mb-2 mx-2">
              <p id="date" className="">
                {booking.escaperoom.description}
              </p>
            </div>
            <div className="text-center mt-5">
              <button
                className="py-2 px-4 bg-blue-700 text-slate-100 rounded-lg"
                onClick={() => {
                  setCurrentBookingId(booking.id);
                  setDialogOpen(true);
                }}
              >
                Cancel Booking
              </button>
            </div>
          </div>
        ))}
      </div>

      {!userBookings.length && (
        <div className="text-center mt-6">
          <p className="text-gray-600">You have no bookings yet.</p>
        </div>
      )}
      {dialogOpen ? (
        <div
          id="confirmation-dialog"
          className="fixed  h-screen inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="overscroll-contain  max-h-screen text-center overflow-y-auto relative bg-slate-100 px-5 py-8 mx-2 rounded-lg shadow-lg w-full max-w-lg">
            <p className="text-xl">
              Are you sure you want to cancel your booking?
            </p>
            <div className="my-5">
              {" "}
              <button
                className="px-8 text-slate-100 py-2 bg-blue-700 rounded-full mx-6"
                onClick={() => {
                  setDialogOpen(false);
                }}
              >
                No
              </button>
              <button
                className="px-8 text-slate-100 py-2 bg-blue-700 rounded-full mx-6"
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
