import { Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Auth from "../../utils/auth";
import DoorSlidingIcon from "@mui/icons-material/DoorSliding";
import GavelIcon from "@mui/icons-material/Gavel";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const NavLinks = ({ toggleSidebar, handleLogout }) => {
  return (
    <ul className="lg:flex lg:justify-end lg:gap-x-4">
      {Auth.loggedIn() ? (
        <>
          <li className=" p-2  py-4 lg:flex lg:items-center md:py-6">
            <CalendarMonthIcon className="mr-6 lg:mr-3 " />
            <Link to="/mybookings" onClick={toggleSidebar}>
              My Bookings
            </Link>
          </li>

          <li className=" p-2  py-4 lg:flex lg:items-center md:py-6">
            <AccountCircleIcon className="mr-6 lg:mr-3 " />
            <Link to="/myaccount" onClick={toggleSidebar}>
              My Account
            </Link>
          </li>
        </>
      ) : null}
      <li className=" p-2  py-4 flex justify-center  lg:items-center md:py-6">
        <DoorSlidingIcon className="mr-6 lg:mr-3 " />
        <Link to="/escaperooms" onClick={toggleSidebar}>
          Escape Rooms
        </Link>
      </li>
      <li className=" p-2  py-4 lg:flex lg:items-center md:py-6">
        <GavelIcon className="mr-6 lg:mr-3" />
        <Link to="/rules" onClick={toggleSidebar}>
          Rules
        </Link>
      </li>
      <li className=" p-2  py-4 lg:flex lg:items-center md:py-6">
        <QuestionMarkIcon className="mr-6 lg:mr-3" />
        <Link to="/howtobook" onClick={toggleSidebar}>
          How to book
        </Link>
      </li>

      <li className=" p-2   py-4 lg:flex lg:items-center md:py-6">
        {Auth.loggedIn() ? (
          <>
            <LoginIcon className="mr-6 lg:mr-3" />
            <Link onClick={handleLogout}>Logout</Link>
          </>
        ) : (
          <>
            <LoginIcon className="mr-6 lg:mr-3" />
            <Link to="/login" onClick={toggleSidebar}>
              Login
            </Link>
          </>
        )}
      </li>
      {/* <li className=" p-2  py-4 lg:flex lg:items-center">
    <DownloadIcon className="mr-4" />
    <Link to="/signin" onClick={toggleSidebar}>
      Install Escape Me App
    </Link>
  </li> */}
      {/* <li className=" p-2  py-4 lg:flex lg:items-center">
    <button
      onClick={() => {
        setIsDarkMode(!isDarkMode);
        setIsOpen(false);
      }}
    >
      {isDarkMode ? (
        <DarkModeIcon className="mr-6 lg:mr-3" />
      ) : (
        <LightModeIcon className="mr-6 lg:mr-3" />
      )}
      {isDarkMode ? "Toggle Light Mode" : "Toggle Dark Mode"}
    </button>
  </li> */}
    </ul>
  );
};

export default NavLinks;
