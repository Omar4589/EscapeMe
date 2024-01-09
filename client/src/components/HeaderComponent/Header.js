//-----------------IMPORTS-----------------------//
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import DownloadIcon from "@mui/icons-material/Download";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import CloseIcon from "@mui/icons-material/Close";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DoorSlidingIcon from "@mui/icons-material/DoorSliding";
import GavelIcon from "@mui/icons-material/Gavel";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { useDarkMode } from "../../utils/DarkModeContext";
import logo from "../../assets/logo.png";
import Auth from "../../utils/auth";

//-----------------------START OF COMPONENT-----------------------//
const Header = () => {
  const navRef = useRef(null);
  //-----------------CONTEXT---------------//
  const { isDarkMode, setIsDarkMode } = useDarkMode();

  //-----------------STATE---------------//
  const [isOpen, setIsOpen] = useState(false);

  //-----------------HOOKS---------------//
  useEffect(() => {
    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //-----------------HANDLERS---------------//
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  //this handles logging out the user
  const handleLogout = () => {
    Auth.logout();
    window.location.replace("/");
  };

  // Event to close the nav when clicking outside
  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  return (
    <header
      className={`bg-zinc-950 text-slate-950 flex justify-between items-center p-4 lg:p-0  ${ Auth.loggedIn() ? "lg:px-12" : "lg:px-24"} `}
    >
      <Link
        to={
          Auth.loggedIn()
            ? "/home"
            : Auth.loggedIn() && Auth.isAdmin()
            ? "/admin"
            : "/"
        }
        className="w-6/12 py-1 lg:w-1/5 "
      >
        <img src={logo} alt="logo"></img>
      </Link>
      <button
        id="menu-button"
        className="text-orange-600 lg:hidden"
        onClick={toggleSidebar}
      >
        <MenuIcon fontSize="large" />
      </button>

      {/* Sidebar */}
      <nav
        ref={navRef}
        id="nav bar"
        className={`fixed top-0 bottom-0 right-0 w-full bg-zinc-950 text-slate-100 shadow-2xl overflow-y-auto transform ease-in-out duration-300 z-40 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } lg:w-3/4 lg:relative lg:translate-x-0`}
      >
        <Link
          onClick={toggleSidebar}
          to={
            Auth.loggedIn()
              ? "/home"
              : Auth.loggedIn() && Auth.isAdmin()
              ? "/admin"
              : "/"
          }
          className="block w-7/12 ml-8 pt-6 lg:hidden "
        >
          <img src={logo} alt="logo"></img>
        </Link>
        <span
          onClick={toggleSidebar}
          className="text-3xl fixed top-6 cursor-pointer right-7 text-orange-600 lg:hidden "
        >
          X
        </span>

        <div
          className={`px-3 py-5 text-center text-xl ${
            Auth.loggedIn() ? "lg:text-sm" : "lg:text-lg"
          }`}
        >
          <ul className="lg:flex lg:justify-end lg:gap-x-4">
            {Auth.loggedIn() ? (
              <>
                <li className=" p-2  py-4 lg:flex lg:items-center ">
                  <CalendarMonthIcon className="mr-6 lg:mr-3 " />
                  <Link to="/mybookings" onClick={toggleSidebar}>
                    My Bookings
                  </Link>
                </li>

                <li className=" p-2  py-4 lg:flex lg:items-center">
                  <AccountCircleIcon className="mr-6 lg:mr-3 " />
                  <Link to="/myaccount" onClick={toggleSidebar}>
                    My Account
                  </Link>
                </li>
              </>
            ) : null}
            <li className=" p-2  py-4 flex justify-center  lg:items-center ">
              <DoorSlidingIcon className="mr-6 lg:mr-3 " />
              <Link to="/escaperooms" onClick={toggleSidebar}>
                Escape Rooms
              </Link>
            </li>
            <li className=" p-2  py-4 lg:flex lg:items-center">
              <GavelIcon className="mr-6 lg:mr-3" />
              <Link to="/rules" onClick={toggleSidebar}>
                Rules
              </Link>
            </li>
            <li className=" p-2  py-4 lg:flex lg:items-center">
              <QuestionMarkIcon className="mr-6 lg:mr-3" />
              <Link to="/howtobook" onClick={toggleSidebar}>
                How to book
              </Link>
            </li>

            <li className=" p-2   py-4 lg:flex lg:items-center">
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
        </div>
      </nav>
    </header>
  );
};

export default Header;
