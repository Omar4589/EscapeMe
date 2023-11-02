import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USERBOOKINGS } from "../../utils/queries";

const MyBookings = () => {
  const [userBookings, setUserBookings] = useState([]);

  const { loading, error, data: bookingsData } = useQuery(QUERY_USERBOOKINGS);

  useEffect(() => {
    if (bookingsData) {
      const bookings = bookingsData.getAllUserBookings;
      setUserBookings(bookings);
    }
  }, [bookingsData]);

  console.log(userBookings);

  return (
    <div className="container min-h-screen mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      <table className="divide-y divide-gray-200 table-auto w-full">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Escape Room
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Time
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Duration
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {userBookings.map((booking) => (
            <tr key={booking.id}>
              <td className="px-6 py-4 whitespace-nowrap">{booking.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {booking.escaperoom.theme}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.time}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {booking.escaperoom.duration} min
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!userBookings && (
        <div className="text-center mt-6">
          <p className="text-gray-600">You have no bookings yet.</p>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
