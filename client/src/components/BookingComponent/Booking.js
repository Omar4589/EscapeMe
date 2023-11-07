import {
  QUERY_AllESCAPEROOMS,
  QUERY_AVAILABLESLOTS,
} from "../../utils/queries";
import { CREATE_BOOKING } from "../../utils/mutations";
import { QUERY_USERBOOKINGS } from "../../utils/queries";
import { useLazyQuery, useQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import SnackBar from "../SnackBarComponent/SnackBar";
import { useUserBookingsContext } from "../../utils/UserBookingsContext";

const Booking = () => {
  const { createABooking, userBookings } = useUserBookingsContext();

  const navigate = useNavigate();
  const { roomId } = useParams();
  const roomID = parseInt(roomId, 10);

  const [showSnackBar, setShowSnackBar] = useState(false);

  const openSnackBar = () => {
    setShowSnackBar(true);
    setTimeout(() => {
      setShowSnackBar(false);
    }, 3000);
  };

  const [escapeRooms, setEscapeRooms] = useState([]);
  const [formData, setFormData] = useState({
    escape_room_id: roomID,
    escape_room_image: "",
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

  useEffect(() => {
    const rooms = allEscapeRoomsData?.getAllEscapeRooms || [];

    setEscapeRooms(rooms);
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

  useEffect(() => {
    if (escapeRooms.length > 0) {
      // Check if escapeRooms is not empty
      const selRoom = escapeRooms.find(
        (room) => room.id === formData.escape_room_id
      );
      if (selRoom) {
        const image = selRoom.image_url;
        setFormData((prevState) => ({
          ...prevState,
          escape_room_image: image,
        }));
      }
    }
  }, [escapeRooms, formData.escape_room_id]);

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
        escape_room_id: formData.escape_room_id,
        numberOfPlayers: formData.numberOfPlayers,
        date: formData.date,
        time: formData.time,
      });

      navigate("/mybookings");
    } catch (err) {
      console.error("Booking failed:", err);
      openSnackBar();
    }
  };

  return (
    <div className=" min-h-screen bg-zinc-950 text-slate-100 mx-auto px-5 py-12">
      <h1 className="text-2xl font-bold mb-10 text-">
        We're excited to have you! Complete the form below to book your escape
        room.
      </h1>
      <div className="px-3">
        <form id="booking-form" onSubmit={bookRoom}>
          <div className="mb-6">
            <label
              className="block text-slate-100 text-lg font-bold mb-2"
              htmlFor="escape-room"
            >
              Select Escape Room:
            </label>
            <select
              className="block w-full bg-zinc-950 text-slate-100 border border-orange-500 rounded py-3 px-4 mb-3 focus:outline-none focus:shadow-outline"
              id="escape-room"
              name="escape_room_id"
              value={formData.escape_room_id}
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
            {formData.escape_room_image ? (
              <img
                src={formData.escape_room_image}
                alt="Selected Escape Room"
                className="w-full h-auto" // Add your desired classes for styling
              />
            ) : null}
          </div>
          <div className="mb-6">
            <label
              className="block text-slate-100 text-lg font-bold mb-2"
              htmlFor="numberOfPlayers"
            >
              Number of Players:
            </label>
            <select
              className="rounded w-full py-2 px-3 text-slate-100 bg-zinc-950 border border-orange-500 focus:outline-none focus:shadow-outline"
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

          <div className="flex justify-between">
            {" "}
            <div className="mb-6">
              <label
                className="block text-slate-100 text-lg font-bold mb-2"
                htmlFor="date"
              >
                Select Date:
              </label>
              <input
                className="bg-zinc-950 rounded w-full py-2 px-3 text-slate-100 border border-orange-600 focus:outline-none focus:shadow-outline"
                id="date"
                type="date"
                name="date"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-slate-100 text-lg font-bold mb-2"
                htmlFor="time"
              >
                Select Time:
              </label>
              <select
                className="bg-zinc-950 rounded w-full py-2.5 px-3 text-slate-100 border border-orange-600 focus:outline-none focus:shadow-outline"
                id="time"
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
          </div>
          <p className="text-sm text-slate-200 mb-5">
            *To cancel your booking, please, do so online or by calling us 24
            hours prior to your scheduled time. Failure to do so will result in
            a cancellation fee.
          </p>
          <button
            id="submit-button"
            type="submit"
            className="w-full bg-orange-600 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Book Now
          </button>
        </form>
      </div>
      {showSnackBar ? (
        <SnackBar message="Something went wrong. Please try again later." />
      ) : null}
    </div>
  );
};

export default Booking;