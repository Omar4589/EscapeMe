import Auth from "../../utils/auth";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_AllESCAPEROOMS, ME_QUERY } from "../../utils/queries";
import CloseIcon from "@mui/icons-material/Close";

const UserHomeComponent = () => {
  const [escapeRooms, setEscapeRooms] = useState([]);
  const [user, setUser] = useState({});
  const [activeRoom, setActiveRoom] = useState(null);

  const { loading, data: allEscapeRoomsData } = useQuery(QUERY_AllESCAPEROOMS);
  const { data: userData } = useQuery(ME_QUERY);

  useEffect(() => {
    const rooms = allEscapeRoomsData?.getAllEscapeRooms || [];

    setEscapeRooms(rooms);
  }, [allEscapeRoomsData]);

  useEffect(() => {
    const u = userData?.me || {};
    setUser(u);
  }, [userData]);

  const displayModal = (room) => {
    setActiveRoom(room);
    const modal = document.getElementById("escape-room-modal");
    modal.classList.remove("hidden");

    console.log(activeRoom);
  };

  const closeModal = () => {
    const modal = document.getElementById("escape-room-modal");
    modal.classList.add("hidden");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-slate-100 ">
      <section className="bg-indigo-600 text-white p-5 rounded-lg my-5 mx-3">
        <div className="container mx-auto text-center mb-2">
          <h1 className="text-4xl font-bold mb-3">
            Welcome to EscapeMe, {user.firstName}
          </h1>
          <p className="text-lg mb-5">
            Experience the thrill of our escape rooms and book your next
            adventure!
          </p>
          <a
            href="/booking"
            className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded"
          >
            Book Now
          </a>
        </div>
      </section>

      {/* Escape Rooms Section  */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-center">Escape Rooms</h2>
          <div
            id="escape-rooms"
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-slate-950"
          >
            {/* Begin escape room card loop  */}
            {escapeRooms.map((room) => {
              return (
                <div
                  id={room.theme}
                  key={room.id}
                  className="cursor-pointer escape-room bg-white shadow-lg rounded-lg p-6"
                  onClick={() => {
                    displayModal(room);
                  }}
                >
                  <img
                    src={room.image_url}
                    alt={room.theme}
                    className="w-full h-56 object-cover mb-6 rounded"
                  />
                  <h3 id="escape-room-theme" className="text-xl font-bold mb-1">
                    {room.theme}
                  </h3>
                  <p className="mb-1">Difficulty: {room.difficulty}</p>
                  <p className="">Duration: {room.duration}min</p>
                </div>
              );
            })}
            {/* End of escape room card loop  */}
          </div>
        </div>
      </section>

      {/* MODAL SECTION */}
      <div
        id="escape-room-modal"
        className="fixed hidden h-screen inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div className="overscroll-contain max-h-screen overflow-y-auto relative bg-white px-5 py-8 mx-2 rounded-lg shadow-lg w-full max-w-lg">
          <span
            id="closeModal"
            className="absolute top-5 right-5 text-xl font-bold cursor-pointer"
            onClick={closeModal}
          >
            <CloseIcon />
          </span>
          <h2 className="font-bold text-4xl my-4" id="theme">
            {activeRoom ? activeRoom.theme : ""}
          </h2>
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3">
              <img
                id="escape-room-image"
                className="w-full h-auto rounded-lg mb-4"
                alt="Escape Room"
                src={activeRoom ? activeRoom.image_url : ""}
              />
              <div className="flex items-center justify-between"></div>
            </div>
            <div className="w-full md:w-2/3">
              <div className="flex text-center items-start justify-between mb-2">
                <p className="font-semibold text-lg">Diffculty Level:</p>
                <p id="difficulty-level" className="text-right ml-2">
                  {activeRoom ? activeRoom.difficulty : ""}
                </p>
              </div>
              <div className="flex text-center items-start justify-between mb-2">
                <p className="font-semibold text-lg">Duration:</p>
                <p id="duration" className="text-right ml-2">
                  {activeRoom ? activeRoom.duration : ""}
                </p>
              </div>
              <div className="flex text-center items-start justify-between mb-6">
                <p className="font-semibold text-lg">Description:</p>
                <p id="description" className="text-right ml-2">
                  {" "}
                  {activeRoom ? activeRoom.description : ""}
                </p>
              </div>
            </div>
          </div>
          <a
            href="/booking"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Book This Room
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserHomeComponent;
