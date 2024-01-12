import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from "react";

const RoomSlider = ({ escapeRooms }) => {
  //-----------------STATE---------------//
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

  return (
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
                <h3 id="escape-room-theme" className="text-xl font-bold mb-1">
                  {room.theme}
                </h3>
                <p className="mb-1 font-bold">Difficulty: {room.difficulty}</p>
                <p className="font-bold">Duration: {room.duration}min</p>
                <p className=" my-2 text-center text-lg">{room.description}</p>
              </div>
              <div className="flex justify-center pt-44">
                <Link
                  to={`/booking/${room.id}`}
                  className="bg-orange-600 py-2 px-10 rounded-lg mt-5 text-xl roboto"
                >
                  Book This Room
                </Link>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default RoomSlider;
