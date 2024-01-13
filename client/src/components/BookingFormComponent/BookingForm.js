//-----------------IMPORTS-----------------------//
import {
  QUERY_AllESCAPEROOMS,
  QUERY_AVAILABLESLOTS,
} from "../../utils/queries";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import SnackBar from "../SnackBarComponent/SnackBar";
import { useUserBookingsContext } from "../../utils/UserBookingsContext";

//-----------------------START OF COMPONENT-----------------------//
const Booking = ({
  confirmationPage,
  setConfirmationPage,
  escapeRooms,
  setEscapeRooms,
  formData,
  setFormData,
}) => {
  //-----------------CONTEXT---------------//
  const { createABooking } = useUserBookingsContext();
  const currTime = dayjs().format("HH:mm:ss");
  const currDate = dayjs().format("YYYY-MM-DD");

  //-----------------STATE---------------//
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);

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
          escape_room_description: selRoom.description,
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
    } else if (name === "date") {
      const selectedDate = dayjs(value);
      const currentDate = dayjs();

      if (selectedDate.isBefore(currentDate, "day")) {
        event.target.value = currentDate.format("YYYY-MM-DD");

        setFormData({
          ...formData,
          [name]: event.target.value,
        });
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
        console.log(timeSlots);
      }
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
    <div className="">
      {confirmationPage ? null : (
        <>
          <h1 className="text-2xl font-bold mb-10 px-3 text-center">
            We're excited to have you! Complete the form below to book your
            escape room.
          </h1>
          <div className="px-3  ">
            <form
              id="booking-form"
              onSubmit={bookRoom}
              className="lg:flex lg:justify-center "
            >
              <div className="mb-6 lg:mb-0 lg:w-2/5 lg:mx-12 lg:flex lg:flex-col lg:justify-between">
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
                <p className="pt-3">{formData.escape_room_description}</p>
              </div>

              <div className="lg:w-1/3 lg:flex lg:flex-col lg:justify-around ">
                <div>
                  <div className="mb-6 lg:w-1/2 ">
                    <label
                      className="block text-slate-100 text-lg font-bold mb-2"
                      htmlFor="numberOfPlayers"
                    >
                      Number of Players:
                    </label>
                    <select
                      className="rounded w-full py-2 px-3 text-slate-100 bg-zinc-950 border border-orange-500 focus:outline-none focus:shadow-outline "
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

                  <div className="flex justify-between  xl:w-3/4">
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
                </div>

                <div>
                  <p className="text-sm text-slate-200 mb-5">
                    *To cancel your booking, please, do so online or by calling
                    us 24 hours prior to your scheduled time. Failure to do so
                    will result in a cancellation fee.
                  </p>
                  <button
                    id="submit-button"
                    type="submit"
                    className="w-full bg-orange-600 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}

      {showSnackBar ? (
        <SnackBar message="Something went wrong. Please try again later." />
      ) : null}
    </div>
  );
};

export default Booking;
