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
  //-----------------STATE---------------//
  const [escapeRooms, setEscapeRooms] = useState([]);
  const [user, setUser] = useState({});
  const [largeScreen, setLargeScreen] = useState(null);
  // settings for react-slick's Slider component
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: largeScreen ? 3 : 1,
    slidesToScroll: 1,
    arrows: true,
  };

  //-----------------QUERIES---------------//
  const { loading, data: allEscapeRoomsData } = useQuery(QUERY_AllESCAPEROOMS);
  const { data: userData } = useQuery(ME_QUERY);

  //-----------------HOOKS---------------//

  useEffect(() => {
    //This function updates the state value of setLargeScreen based on the window width.
    const handleResize = () => {
      //Here we are setting setLargeScreen by passing in the value of the expression
      setLargeScreen(window.innerWidth > 768);
    };

    //Here we create an event listener for the window's resize event, and pass `handleResize` as the event handler.
    window.addEventListener("resize", handleResize);

    //Here we call `handleResize` on the initial mount to set the initial value of `showFooter`.
    handleResize();
    //Here we define a 'cleanup' function that removes the resize event listener
    const cleanup = () => {
      window.removeEventListener("resize", handleResize);
    };

    // Clean up the event listener by removing it when the component is unmounted.
    return cleanup;
  }, []);

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

      {/* Escape Rooms Section  */}
      <div className=" mx-auto text-slate-100 mt-6 ">
        <h2 className="text-3xl font-bold mb-6 text-center underline decoration-orange-600">
          Escape Rooms
        </h2>
        <div id="escape-rooms" className="">
          <Slider {...settings} className="mx-10 md:mx-20 ">
            {escapeRooms.map((room) => {
              return (
                <div id={room.theme} key={room.id} className=" px-2 ">
                  <div className="flex flex-col justify-between max-h-[400px]">
                    <img
                      src={room.image_url}
                      alt={room.theme}
                      className=" h-52 object-cover mb-6 rounded-lg mx-auto"
                    />
                    <h3
                      id="escape-room-theme"
                      className="text-xl font-bold mb-1"
                    >
                      {room.theme}
                    </h3>
                    <p className="mb-1 font-bold">
                      Difficulty: {room.difficulty}
                    </p>
                    <p className="font-bold">Duration: {room.duration}min</p>
                    <p className=" my-2 text-center text-lg">
                      {room.description}
                    </p>
                  </div>
                  <div className="flex justify-center pt-44">
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

        <div
          id="rules"
          className="px-6 mt-20 lg:pt-0 lg:pb-24 lg:px-12 lg:mt-44"
        >
          <h3 className="font-semibold text-4xl text-left mb-14 mx-3 underline decoration-orange-600 ">
            Things to Know:
          </h3>{" "}
          <div className="px-6">
            {" "}
            <RulesComponent />
          </div>
        </div>

        <LocationComponent />
      </div>
    </div>
  );
};

export default UserHomeComponent;
