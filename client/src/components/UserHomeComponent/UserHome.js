import Auth from "../../utils/auth";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_AllESCAPEROOMS, ME_QUERY } from "../../utils/queries";

const UserHomeComponent = () => {
  const [escapeRooms, setEscapeRooms] = useState([]);
  const [user, setUser] = useState({});

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

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {Auth.loggedIn() ? (
        <div className="">
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
              <h2 className="text-4xl font-bold mb-6 text-center">
                Escape Rooms
              </h2>
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
                    >
                      <img
                        src={room.image_url}
                        alt={room.theme}
                        className="w-full h-56 object-cover mb-6 rounded"
                      />
                      <h3
                        id="escape-room-theme"
                        className="text-xl font-bold mb-1"
                      >
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
        </div>
      ) : (
        <div> Please log in </div>
      )}
    </>
  );
};

export default UserHomeComponent;
