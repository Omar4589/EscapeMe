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
import RoomsSlider from "../RoomsSliderComponent/RoomsSlider";

//-----------------------START OF COMPONENT-----------------------//
const UserHomeComponent = () => {
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
        <p className="text-xl mb-6">
          Experience the thrill of our escape rooms!
        </p>
        <h2 className="text-slate-100 text-4xl font-extrabold px-8 py-3 rounded font-roboto">
          Choose Your Adventure Below!
        </h2>
      </div>

      <div className=" mx-auto text-slate-100 mt-6 ">
        <h2 className="text-3xl font-bold mb-6 text-center underline decoration-orange-600">
          Escape Rooms
        </h2>
        <RoomsSlider escapeRooms={escapeRooms} />

        <div
          id="rules"
          className="px-6 mt-20 lg:pt-0 lg:pb-24 lg:px-12 lg:mt-44"
        >
          <h3 className="font-semibold text-4xl text-left mb-14 mx-3 underline decoration-orange-600 ">
            Things to Know:
          </h3>
          <div className="px-6">
            <RulesComponent />
          </div>
        </div>

        <LocationComponent />
      </div>
    </div>
  );
};

export default UserHomeComponent;
