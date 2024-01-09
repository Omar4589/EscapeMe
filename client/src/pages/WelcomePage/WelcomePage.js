import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import img1 from "../../assets/welcomePageImages/themes.jpg";
import img2 from "../../assets/welcomePageImages/escaperoomtoc.jpeg";
import Auth from "../../utils/auth";
import GoogleMapComponent from "../../components/GoogleMapComponent/GoogleMap";
import ScrollToTop from "../../components/ScrollToTopWrapper/ScrollToTopWrapper";
import LocationComponent from "../../components/LocationComponent/LocationComponent";

const WelcomePage = () => {
  //we use this state to return a null value if the useEffect hasnt finished running
  const [loading, setLoading] = useState(true);

  //this hook checks if the user is logged in and/or an admin
  //redirects user to correct location
  useEffect(() => {
    if (Auth.loggedIn()) {
      if (Auth.isAdmin()) {
        window.location.assign("/admin");
      } else window.location.assign("/home");
    }

    setLoading(false);
  }, []);

  if (loading) {
    return null;
  }

  return (
    <div id="main" className="min-h-screen bg-zinc-950 text-slate-100">
      <div id="welcome-cards" className=" pb-8  ">
        <div
          id="view-escaperooms-card"
          className="bg-zinc-950 text-slate-100 text-center lg:h-screen"
        >
          <img
            src={img2}
            alt="escape room"
            className=" mb-4 mx-auto h-screen object-cover lg:h-5/6 lg:w-full lg:block lg:absolute opacity-70"
          />
          <div className="absolute top-1/4 w-full">
            <h1 className="text-3xl font-bold py-2 lg:static lg:mt-36 lg:text-5xl lg:drop-shadow-lg">
              Experience Thrilling Escape Rooms with Friends!
            </h1>
          </div>

          <div className="absolute top-1/2 lg:pt-10">
            <h3 className="font-extrabold text-4xl  mb-2  lg:relative  lg:font-bold lg:drop-shadow-lg">
              {" "}
              CHOOSE YOUR ADVENTURE
            </h3>
            <p className="text-xl px-4 font-semibold lg:font-normal lg:relative lg:drop-shadow-lg lg:text-3xl lg:w-7/12 lg:mx-auto">
              Discover a wide range of immersive and challenging escape rooms,
              catering to all interests and skill levels.
            </p>
            <Link
              id="escaperooms-button"
              to="/escaperooms"
              className="bg-orange-600  text-slate-50 font-bold py-3 px-6 mt-6 inline-block rounded hover:bg-orange-700 lg:relative"
            >
              Browse Escape Rooms
            </Link>
          </div>
        </div>

        <div id="thingstoknow-card" className="px-6 pt-20 lg:pt-0 lg:pb-24 lg:px-12">
          <h3 className="font-semibold text-4xl text-left mb-14 underline decoration-orange-600 ">
            Things to Know:
          </h3>{" "}
          <div className="lg:px-6">   
            <p className="text-xl text-left pb-3">
            1. Please arrive at least 15 minutes before your scheduled time.
          </p>
          <p className="text-xl text-left pb-3">
            2. Your game guide will explain the rules of the game and provide
            information about your escape room.
          </p>
          <p className="text-xl text-left pb-3">
            3. The{" "}
            <span className="underline decoration-orange-600">maximum</span>{" "}
            number of players per escape room is 4.
          </p>
          <p className="text-xl text-left pb-3">
            4. You will have 60 minutes to complete your escape room challenge.
          </p>
          <p className="text-xl text-left pb-3">
            5. You can request hints from your game guide at any time; there's
            no limit to the number of hints you can receive.
          </p>
          <p className="text-xl text-left pb-3">
            6. Please respect the props and equipment in the escape rooms to
            ensure the safety and enjoyment of all participants.
          </p>
          <p className="text-xl text-left pb-3">
            7. Photography and video recording inside the escape rooms are{" "}
            <span className="underline decoration-orange-600">NOT allowed</span>{" "}
            to maintain the mystery and integrity of the experience.
          </p>
          <p className="text-xl text-left pb-5">
            8. If you need to cancel or reschedule your booking, please contact
            us at least{" "}
            <span className="underline decoration-orange-600">
              24 hours in advance
            </span>{" "}
            to avoid any cancellation fees.
          </p>
          <p className="text-2xl text-left pb-3">
            9. Have fun and enjoy your adventure!
          </p></div>
       
        </div>

        <LocationComponent />
      </div>
    </div>
  );
};

export default ScrollToTop(WelcomePage);
