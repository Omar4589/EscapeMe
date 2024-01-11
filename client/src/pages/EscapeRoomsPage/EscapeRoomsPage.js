import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_AllESCAPEROOMS } from "../../utils/queries";
import ScrollToTop from "../../components/ScrollToTopWrapper/ScrollToTopWrapper";

const EscapeRoomsPage = () => {
  //tracks escape rooms
  const [escapeRooms, setEscapeRooms] = useState([]);

  //queries all escape rooms
  const { loading, data: allEscapeRoomsData } = useQuery(QUERY_AllESCAPEROOMS);

  //sets escapeRooms initial value using query
  useEffect(() => {
    const rooms = allEscapeRoomsData?.getAllEscapeRooms || [];

    setEscapeRooms(rooms);
  }, [allEscapeRoomsData]);

  return (
    <div className="min-h-screen bg-zinc-950 text-slate-100 py-10 px-6 ">
      <h1 className="underline decoration-orange-600 text-3xl font-bold">
        Escape Rooms
      </h1>
      <div className="grid grid-cols-1  md:grid-cols-2 md:gap-x-14 lg:grid-cols-3 lg:px-3">
        {escapeRooms.map((room) => {
          return (
            <div
              id={room.theme}
              key={room.id}
              className="rounded-xl mt-10 mb-16 flex flex-col justify-between bg-cover bg-center relative overflow-hidden"
              style={{ backgroundImage: `url(${room.image_url})` }}
            >
              <div
                id="black-overlay"
                className="absolute rounded-xl bg-black bg-opacity-50 top-0 left-0 right-0 bottom-0 "
              ></div>

              <div className="relative z-10 p-4 flex flex-col justify-between h-full">
                <img
                  src={room.image_url}
                  alt={room.theme}
                  className="h-52 w-11/12 object-cover mb-5 rounded mx-auto drop-shadow-xl"
                />

                <h3
                  id="escape-room-theme"
                  className="text-2xl font-bold mb-1 underline decoration-orange-600 drop-shadow-lg "
                >
                  {room.theme}
                </h3>
                <div>
                  {" "}
                  <p className="mb-1 text-lg drop-shadow-lg">
                    Difficulty: {room.difficulty}
                  </p>
                  <p className="drop-shadow-lg">Duration: {room.duration}min</p>
                  <p className=" my-2 text-center text-lg drop-shadow-xl">
                    {room.description}
                  </p>
                </div>

                <div className="flex justify-center">
                  <Link
                    to={`/booking/${room.id}`}
                    className="bg-orange-600 py-2 px-10 rounded-lg mt-5 text-xl font-roboto"
                  >
                    Book Now
                  </Link>
                </div>
                <div className="border-2 border-orange-600 mt-14 w-4/5 mx-auto"></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollToTop(EscapeRoomsPage);
