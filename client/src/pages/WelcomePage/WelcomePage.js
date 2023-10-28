import { Link } from "react-router-dom";
import img1 from "../../assets/welcomePageImages/themes.jpg";
import img2 from "../../assets/welcomePageImages/booking.jpg";

const WelcomePage = () => {
  return (
    <div id="main" className="min-h-screen bg-slate-100">
      <div id="heading" className="text-center text-slate-950 py-10 mx-5 ">
        <h1 className="text-4xl font-bold py-2">
          Experience Thrilling Virtual Escape Rooms with Friends!
        </h1>
        <h2 className="text-xl mt-4">
          Browse and book from a wide range of virtual escape room themes,
          invite your friends, and compete on the leaderboards. Discover your
          next adventure today!
        </h2>

        <Link
          id="signup-button"
          to="/signup"
          className="bg-blue-700 text-slate-50 font-bold py-3 px-6 mt-6 inline-block rounded hover:bg-blue-800"
        >
          Sign Up Now and Unlock Your Adventure
        </Link>
      </div>

      <div
        id="welcome-cards"
        className="pt-4 pb-8 grid grid-cols-1 gap-8 md:grid-cols-2 md:mx-10"
      >
        <div
          id="view-escaperooms-card"
          className="mx-5 rounded-lg bg-white p-6 shadow-lg text-center"
        >
          <img
            src={img1}
            alt="escape room"
            className="rounded-md mx-auto mb-4"
          />
          <h3 className="font-semibold text-3xl mb-2"> Variety of Themes</h3>
          <p className="text-xl">
            Discover a wide range of immersive and challenging escape room
            themes, catering to all interests and skill levels.
          </p>
          <Link
            id="escaperooms-button"
            to="/escaperooms"
            className="bg-blue-700 text-slate-50 font-bold py-3 px-6 mt-6 inline-block rounded hover:bg-blue-800"
          >
            View Escape Rooms
          </Link>
        </div>

        <div
          id="easybookingsystem-card"
          className="mx-5 rounded-lg bg-white p-6 shadow-lg text-center"
        >
          <img
            src={img2}
            alt="hand holding phone"
            className="rounded-md mx-auto mb-4"
          />
          <h3 className="font-semibold text-2xl mb-2">Easy Booking System</h3>
          <p className="text-xl">
            Our user-friendly platform makes it simple to browse, book, and
            manage your escape room experiences.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
