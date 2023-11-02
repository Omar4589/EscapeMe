import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USERBOOKINGS } from "../../utils/queries";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const MyBookings = () => {
  const [userBookings, setUserBookings] = useState([]);

  const { loading, error, data: bookingsData } = useQuery(QUERY_USERBOOKINGS);

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

  // Guard clause for safe access
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {"something went wrong"}</p>;

  return (
    <div className="container min-h-screen mx-auto px-4 py-10 bg-slate-100">
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
            <div className="flex text-center items-start justify-between mb-2 mx-2">
              <p className="font-semibold text-lg">Duration:</p>
              <p id="date" className="text-right ml-2">
                {booking.escaperoom.duration} min
              </p>
            </div>
          </div>
        ))}
      </div>

      {!userBookings.length && (
        <div className="text-center mt-6">
          <p className="text-gray-600">You have no bookings yet.</p>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
