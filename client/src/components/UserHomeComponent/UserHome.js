import Auth from "../../utils/auth";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_AllESCAPEROOMS, ME_QUERY } from "../../utils/queries";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

  if (loading) return <li>Loading...</li>;

  return (
    <div className="min-h-screen bg-zinc-950 ">
      <div className=" text-slate-100 pt-8 mx-5 text-center">
        <h1 className="text-4xl font-bold mb-3">
          Welcome to Escape Me, {user.firstName}!
        </h1>
        <p className="text-xl mb-10">
          Experience the thrill of our escape rooms and book your next
          adventure!
        </p>
        <a
          href="/booking"
          className="bg-orange-600 text-slate-100 text-lg font-bold px-8 py-3 rounded"
        >
          Book Now
        </a>
      </div>

      {/* Escape Rooms Section  */}

      <div className=" mx-auto text-slate-100 mt-16">
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
                      to={"/booking"}
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

        <div id="rules" className="mx-5 mt-16">
          <h1 className="font-semibold text-5xl text-left mb-4 underline decoration-orange-600 text-center">
            Rules
          </h1>
          <ul>
            <li className="text-xl text-left pb-3">
              1. Please arrive at least 15 minutes before your scheduled time.
            </li>
            <li className="text-xl text-left pb-3">
              2. Your game guide will explain the rules of your escape room and
              provide information about your escape room.
            </li>
            <li className="text-xl text-left pb-3">
              3. The{" "}
              <span className="underline decoration-orange-600">maximum</span>{" "}
              number of players per escape room is 4.
            </li>
            <li className="text-xl text-left pb-3">
              4. You will have 60 minutes to complete your escape room
              challenge.
            </li>
            <li className="text-xl text-left pb-3">
              5. You can request hints from your game guide at any time; there's
              no limit to the number of hints you can receive.
            </li>
            <li className="text-xl text-left pb-3">
              6. Please respect the props and equipment in the escape rooms to
              ensure the safety and enjoyment of all participants.
            </li>
            <li className="text-xl text-left pb-3">
              7. Photography and video recording inside the escape rooms are{" "}
              <span className="underline decoration-orange-600">
                NOT allowed
              </span>{" "}
              to maintain the mystery and integrity of the experience.
            </li>
            <li className="text-xl text-left pb-5">
              8. If you need to cancel or reschedule your booking, please
              contact us at least{" "}
              <span className="underline decoration-orange-600">
                24 hours in advance
              </span>{" "}
              to avoid any cancellation fees.
            </li>
            <li className="text-2xl text-left pb-3">
              9. Have fun and enjoy your adventure!
            </li>
          </ul>
        </div>

        <div id="location-card" className="p-6">
          <h1 className="text-5xl font-bold underline decoration-orange-600">
            Location
          </h1>
          <ul>
            <li className="pb-3 text-lg">555-555-1234</li>
            <li className="pb-3 text-lg">escapemesupport@escapeme.com</li>
            <li className="pb-3 font-bold text-xl">
              Located: Far Far Away Plaza
            </li>
            <li className="text-lg">42 Wallaby Way, Sydney</li>
            <li className="text-lg">Suite 101</li>
            <li className="text-lg">Laredo, TX 78041</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserHomeComponent;
