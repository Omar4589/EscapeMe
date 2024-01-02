//-----------------IMPORTS-----------------------//
import {
  QUERY_AllESCAPEROOMS,
  QUERY_AVAILABLESLOTS,
} from "../../utils/queries";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import SnackBar from "../SnackBarComponent/SnackBar";
import { useUserBookingsContext } from "../../utils/UserBookingsContext";
import BookingConfirmationComponent from "../BookingConfirmationComponent/BookingConfirmationComponent";

//-----------------------START OF COMPONENT-----------------------//
const Booking = () => {
  //-----------------CONTEXT---------------//
  const { createABooking } = useUserBookingsContext();
  const currTime = dayjs().format("HH:mm:ss");
  const currDate = dayjs().format("YYYY-MM-DD");

  //react router dom's way of navigating through pages
  const navigate = useNavigate();
  //destructuring roomId parameters
  const { roomId } = useParams();
  //turning value into integer
  const roomID = parseInt(roomId, 10);

  //-----------------STATE---------------//
  const [showSnackBar, setShowSnackBar] = useState(false);

  const [escapeRooms, setEscapeRooms] = useState([]);

  const [formData, setFormData] = useState({
    escape_room_id: roomID,
    escape_room_image: "",
    numberOfPlayers: 1,
    date: "",
    time: "",
  });

  const [timeSlots, setTimeSlots] = useState([]);

  //Used to show/hide confirmation page after booking is succesful
  const [confirmationPage, setConfirmationPage] = useState(false);

  //-----------------QUERIES---------------//
  const { data: allEscapeRoomsData } = useQuery(QUERY_AllESCAPEROOMS);

  const [getAvailableSlots, { data: slotsData, loading, error }] = useLazyQuery(
    QUERY_AVAILABLESLOTS,
    {
      variables: {
        escape_room_id: formData.escape_room_id,
        date: formData.date,
      },
      fetchPolicy: "network-only",
    }
  );

  //-----------------HOOKS---------------//
  //sets escape rooms state
  useEffect(() => {
    const rooms = allEscapeRoomsData?.getAllEscapeRooms || [];

    setEscapeRooms(rooms);
  }, [allEscapeRoomsData]);
  //sets time slots based on the slots data we receive
  useEffect(() => {
    // Check if the slotsData has changed
    if (slotsData && slotsData.availableSlots) {
      let filteredTimeSlots;

      // Check if the selected date is today
      if (currDate === formData.date) {
        // If it's today, filter out time slots past the current time
        filteredTimeSlots = slotsData.availableSlots.filter(
          (slot) => slot > currTime
        );
      } else {
        // If it's a future date, no need to filter the time slots
        filteredTimeSlots = slotsData.availableSlots;
      }

      setTimeSlots(filteredTimeSlots);
    }
  }, [slotsData]);
  //
  // Fetch available slots when escape_room_id changes
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

  //-----------------HANDLERS---------------//
  const openSnackBar = () => {
    setShowSnackBar(true);
    setTimeout(() => {
      setShowSnackBar(false);
    }, 3000);
  };

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

      setConfirmationPage(true);
      return;
    } catch (err) {
      console.error("Booking failed:", err);
      openSnackBar();
    }
  };

  return (
    <div className=" min-h-screen bg-zinc-950 text-slate-100 mx-auto px-5 py-12">
      {confirmationPage ? null : (
        <>
          <h1 className="text-2xl font-bold mb-10 text-">
            We're excited to have you! Complete the form below to book your
            escape room.
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
                    min={dayjs().format("YYYY-MM-DD")}
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
                *To cancel your booking, please, do so online or by calling us
                24 hours prior to your scheduled time. Failure to do so will
                result in a cancellation fee.
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
        </>
      )}

      {showSnackBar ? (
        <SnackBar message="Something went wrong. Please try again later." />
      ) : null}

      {confirmationPage ? (
        <BookingConfirmationComponent
          bookingDetails={{
            escapeRoomTheme: escapeRooms.find(
              (room) => room.id === formData.escape_room_id
            )?.theme,
            escapeRoomImage: escapeRooms.find(
              (room) => room.id === formData.escape_room_id
            )?.image_url,
            numberOfPlayers: formData.numberOfPlayers,
            date: formData.date,
            time: formData.time,
          }}
          setConfirmationPage={setConfirmationPage}
        />
      ) : null}
    </div>
  );
};

export default Booking;
