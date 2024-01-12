import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_AllESCAPEROOMS } from "../../utils/queries";
import ScrollToTop from "../../components/ScrollToTopWrapper/ScrollToTopWrapper";
import EscapeRoomCard from "../../components/EscapeRoomCardComponent/EscapeRoomCard";

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
            <div id={room.theme} key={room.id} className="flex flex-col">
             <EscapeRoomCard room={room}/>
              <div className="border-2 border-orange-600 w-4/5 mx-auto"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollToTop(EscapeRoomsPage);
