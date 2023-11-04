import {
  QUERY_AllESCAPEROOMS,
  QUERY_AVAILABLESLOTS,
} from "../../utils/queries";
import { CREATE_BOOKING } from "../../utils/mutations";
import { useLazyQuery, useQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const Booking = () => {
  const navigate = useNavigate();
  const [escapeRooms, setEscapeRooms] = useState([]);
  const [formData, setFormData] = useState({
    escape_room_id: "",
    numberOfPlayers: 1,
    date: "",
    time: "",
  });
  const [timeSlots, setTimeSlots] = useState([]);

  const { data: allEscapeRoomsData } = useQuery(QUERY_AllESCAPEROOMS);

  const [getAvailableSlots, { data: slotsData, loading, error }] = useLazyQuery(
    QUERY_AVAILABLESLOTS,
    {
      variables: {
        escape_room_id: formData.escape_room_id,
        date: formData.date,
      },
    }
  );

  const [createABooking] = useMutation(CREATE_BOOKING);

  useEffect(() => {
    const rooms = allEscapeRoomsData?.getAllEscapeRooms || [];

    setEscapeRooms(rooms);

    if (rooms.length > 0) {
      setFormData({
        ...formData,
        escape_room_id: parseInt(rooms[0].id, 10),
      });
    }
  }, [allEscapeRoomsData]);

  useEffect(() => {
    // Check if the slotsData has changed
    if (slotsData && slotsData.availableSlots) {
      // Assume getAvailableSlots returns an array of time slots in string format
      setTimeSlots(slotsData.availableSlots);
    }
  }, [slotsData]);

  useEffect(() => {
    if (formData.escape_room_id && formData.date) {
      getAvailableSlots({
        variables: {
          escape_room_id: formData.escape_room_id,
          date: formData.date,
        },
      });
    }
  }, [formData]);

  useEffect(() => {
    if (timeSlots.length > 0) {
      // Set the first available time slot as default
      setFormData({ ...formData, time: timeSlots[0] });
    }
  }, [timeSlots]);

  //The function below handles updating the 'formState'
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "escape_room_id" || name === "numberOfPlayers") {
      setFormData({
        ...formData,
        [name]: parseInt(value, 10),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const convertTo12HourFormat = (time) => {
    return dayjs(`2023-01-01T${time}`).format("h:mm A");
  };

  const bookRoom = async (e) => {
    e.preventDefault();

    try {
      await createABooking({
        variables: {
          escape_room_id: formData.escape_room_id,
          numberOfPlayers: formData.numberOfPlayers,
          date: formData.date,
          time: formData.time,
        },
      });

      navigate("/mybookings");
    } catch (err) {
      //add some logic to show a toast message here
      console.error("Booking failed:", err);
    }
  };

  console.log(formData);

  console.log("ROOMS BELOW");
  console.log(escapeRooms);

  return (
    <div className="container min-h-screen bg-slate-100 mx-auto px-4 py-12">
      <div
        id="notification"
        className="fixed hidden top-0 right-0 left-0 bg-blue-500 text-slate-50 mt-4 flex justify-center w-11/12 mx-auto rounded shadow-lg"
      >
        <div className="px-5 py-3  text-center">
          Something went wrong. Please try again.
        </div>
      </div>
      <h1 className="text-4xl font-bold mb-8 text-center">
        Book Your Escape Room
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-8">
        <form id="booking-form" onSubmit={bookRoom}>
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
              name="escape_room_id"
              onChange={handleInputChange}
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
              htmlFor="numberOfPlayers"
            >
              Number of Players:
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="numberOfPlayers"
              name="numberOfPlayers"
              required
              onChange={handleInputChange}
            >
              <option value={1}>1 Player</option>
              <option value={2}>2 Players</option>
              <option value={3}>3 Players</option>
              <option value={4}>4 Players</option>
            </select>
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="date"
            >
              Select Date:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="date"
              type="date"
              name="date"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="time"
            >
              Select Time:
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="booking-time"
              name="time"
              required
              onChange={handleInputChange}
            >
              {timeSlots.map((slot, index) => {
                const s = convertTo12HourFormat(slot);
                return (
                  <option key={index} value={slot}>
                    {s}
                  </option>
                );
              })}
            </select>
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
