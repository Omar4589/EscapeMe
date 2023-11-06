import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import img1 from "../../assets/welcomePageImages/themes.jpg";
import img2 from "../../assets/welcomePageImages/booking.jpg";
import Auth from "../../utils/auth";
import GoogleMapComponent from "../../components/GoogleMapComponent/GoogleMap";

const WelcomePage = () => {
  const [loading, setLoading] = useState(true);

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
      <div id="heading" className="text-center pt-10 mx-5 ">
        <h1 className="text-4xl font-bold py-2">
          Experience Thrilling Escape Rooms with Friends!
        </h1>
        {/* <h2 className="text-xl mt-4">
          Browse and book from a wide range of escape room themes, invite your
          friends, and discover your next adventure today!
        </h2>

        <Link
          id="signup-button"
          to="/signup"
          className="bg-orange-600 text-slate-100 text-lg font-bold py-3 px-6 mt-6 inline-block rounded hover:bg-orange-700"
        >
          Sign Up Now and Unlock Your Adventure!
        </Link> */}
      </div>

      <div
        id="welcome-cards"
        className="pt-8 pb-8 grid grid-cols-1 gap-8 md:grid-cols-2 md:mx-10"
      >
        <div
          id="view-escaperooms-card"
          className="bg-zinc-950 text-slate-100 pb-6 mx-3 text-center"
        >
          <img src={img1} alt="escape room" className="rounded-md mb-4" />
          <h3 className="font-semibold text-3xl mb-2 ">
            {" "}
            Choose Your Adventure
          </h3>
          <p className="text-xl px-4">
            Discover a wide range of immersive and challenging escape room
            themes, catering to all interests and skill levels.
          </p>
          <Link
            id="escaperooms-button"
            to="/escaperooms"
            className="bg-orange-600  text-slate-50 font-bold py-3 px-6 mt-6 inline-block rounded hover:bg-orange-700"
          >
            Browse Escape Rooms
          </Link>
        </div>

        <div id="thingstoknow-card" className="p-6">
          <h3 className="font-semibold text-5xl text-left mb-4 underline decoration-orange-600 ">
            Things to Know:
          </h3>{" "}
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
          </p>
        </div>

        <div id="location-card" className="p-6">
          <h1 className="text-5xl mb-10 font-bold underline decoration-orange-600">
            Location
          </h1>
          <GoogleMapComponent />
          <p className="pb-3 pt-6 text-lg">555-555-1234</p>
          <p className="pb-3 text-lg">escapemesupport@escapeme.com</p>
          <p className="pb-3 font-bold text-xl">Located: Far Far Away Plaza</p>
          <p className="text-lg">42 Wallaby Way, Sydney</p>
          <p className="text-lg">Suite 101</p>
          <p className="text-lg">Laredo, TX 78041</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
