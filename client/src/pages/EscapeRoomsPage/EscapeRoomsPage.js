import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_AllESCAPEROOMS } from "../../utils/queries";

const EscapeRoomsPage = () => {
  const [escapeRooms, setEscapeRooms] = useState([]);

  const { loading, data: allEscapeRoomsData } = useQuery(QUERY_AllESCAPEROOMS);

  useEffect(() => {
    const rooms = allEscapeRoomsData?.getAllEscapeRooms || [];

    setEscapeRooms(rooms);
  }, [allEscapeRoomsData]);

  return (
    <div className="min-h-screen bg-zinc-950 text-slate-100 py-10 px-5">
      <h1 className="underline decoration-orange-600 text-4xl font-bold">
        Escape Rooms
      </h1>

      {escapeRooms.map((room) => {
        return (
          <div
            id={room.theme}
            key={room.id}
            className="rounded-xl mt-10 mb-16 "
          >
            <img
              src={room.image_url}
              alt={room.theme}
              className="h-52 object-cover mb-5 rounded mx-auto"
            />

            <h3 id="escape-room-theme" className="text-2xl font-bold mb-1">
              {room.theme}
            </h3>
            <p className="mb-1 text-xl font-bold">
              Difficulty: {room.difficulty}
            </p>
            <p className="font-bold">Duration: {room.duration}min</p>
            <p className="font-bold my-2 text-center text-lg">
              {room.description}
            </p>
            <div className="flex justify-center">
              <Link
                to={"/booking"}
                className="bg-orange-600 py-2 px-10 rounded-lg mt-5 text-xl"
              >
                Book Now
              </Link>
            </div>
            <div className="border-2 border-orange-600 mt-14 w-4/5 mx-auto"></div>
          </div>
        );
      })}
    </div>
  );
};

export default EscapeRoomsPage;
