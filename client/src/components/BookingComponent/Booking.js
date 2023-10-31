import { QUERY_AllESCAPEROOMS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";

const Booking = () => {
  const [escapeRooms, setEscapeRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);

  const { loading, data: allEscapeRoomsData } = useQuery(QUERY_AllESCAPEROOMS);

  useEffect(() => {
    const rooms = allEscapeRoomsData?.getAllEscapeRooms || [];

    setEscapeRooms(rooms);
  }, [allEscapeRoomsData]);

  return (
    <div className="container min-h-screen mx-auto px-4 py-12">
      <div
        id="notification"
        className=" hidden fixed mx-auto top-0 left-96 right-96 text-center bg-blue-500 text-slate-50 px-5 py-3 m-4 rounded shadow-lg"
      ></div>
      <h1 className="text-4xl font-bold mb-8 text-center">
        Book Your Escape Room
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-8">
        <form id="booking-form">
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="escape-room"
            >
              Select Escape Room:
            </label>
            <select
              className="block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3"
              id="escape-room"
              name="escape-room"
            >
              {escapeRooms.map((room) => {
                return (
                  <option key={room.theme} value={room.id}>
                    {room.theme}: {room.difficulty}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="booking-date"
            >
              Select Date:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="booking-date"
              type="date"
              name="booking-date"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="booking-time"
            >
              Select Time:
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="booking-time"
              name="booking-time"
              required
            ></select>
          </div>

          <button
            id="submit-button"
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
