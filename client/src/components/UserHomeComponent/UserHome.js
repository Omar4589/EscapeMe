//-----------------IMPORTS-----------------------//
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_AllESCAPEROOMS, ME_QUERY } from "../../utils/queries";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GoogleMapComponent from "../GoogleMapComponent/GoogleMap";
import RulesComponent from "../RulesComponent/RulesComponent";
import LocationComponent from "../LocationComponent/LocationComponent";

//-----------------------START OF COMPONENT-----------------------//
const UserHomeComponent = () => {
  // settings for react-slick's Slider component
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };
  //-----------------STATE---------------//
  const [escapeRooms, setEscapeRooms] = useState([]);
  const [user, setUser] = useState({});

  //-----------------QUERIES---------------//
  const { loading, data: allEscapeRoomsData } = useQuery(QUERY_AllESCAPEROOMS);
  const { data: userData } = useQuery(ME_QUERY);

  //-----------------HOOKS---------------//
  useEffect(() => {
    const rooms = allEscapeRoomsData?.getAllEscapeRooms || [];

    setEscapeRooms(rooms);
  }, [allEscapeRoomsData]);

  useEffect(() => {
    const u = userData?.me || {};
    setUser(u);
  }, [userData]);

  if (loading) return <li>Loading...</li>;

  return (
    <div className="min-h-screen bg-zinc-950 ">
      <div className=" text-slate-100 pt-8 mx-6 text-center">
        <h1 className="text-4xl font-bold mb-3">
          Welcome to Escape Me, {user.firstName}!
        </h1>
        <p className="text-xl mb-10">
          Experience the thrill of our escape rooms and book your next
          adventure!
        </p>
        <Link
          to="/booking/1"
          className="bg-orange-600 text-slate-100 text-lg font-bold px-8 py-3 rounded"
        >
          Book Now
        </Link>
      </div>

      {/* Escape Rooms Section  */}
      <div className=" mx-auto text-slate-100 mt-16 ">
        <h2 className="text-4xl font-bold mb-6 text-center underline decoration-orange-600">
          Escape Rooms
        </h2>
        <div id="escape-rooms" className="">
          <Slider {...settings} className="mx-10">
            {escapeRooms.map((room) => {
              return (
                <div id={room.theme} key={room.id} className=" px-2">
                  <img
                    src={room.image_url}
                    alt={room.theme}
                    className=" h-52 object-cover mb-6 rounded-lg mx-auto"
                  />
                  <h3 id="escape-room-theme" className="text-xl font-bold mb-1">
                    {room.theme}
                  </h3>
                  <p className="mb-1 font-bold">
                    Difficulty: {room.difficulty}
                  </p>
                  <p className="font-bold">Duration: {room.duration}min</p>
                  <p className=" my-2 text-center text-lg">
                    {room.description}
                  </p>
                  <div className="flex justify-center">
                    <Link
                      to={`/booking/${room.id}`}
                      className="bg-orange-600 py-2 px-10 rounded-lg mt-5 text-xl"
                    >
                      Book This Room
                    </Link>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>

        <div id="rules" className="mx-6 mt-16">
          <RulesComponent />
        </div>

    
        <LocationComponent />
     
      </div>
    </div>
  );
};

export default UserHomeComponent;
