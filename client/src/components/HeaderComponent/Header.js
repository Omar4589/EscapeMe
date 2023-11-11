//-----------------IMPORTS-----------------------//
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import DownloadIcon from "@mui/icons-material/Download";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
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
    <header className="bg-zinc-950 text-slate-950 flex justify-between items-center p-4 border-b-2 border-orange-600">
      <Link
        to={
          Auth.loggedIn()
            ? "/home"
            : Auth.loggedIn() && Auth.isAdmin()
            ? "/admin"
            : "/"
        }
        className="w-7/12 py-1"
      >
        <img src={logo} alt="logo"></img>
      </Link>
      <button
        id="menu-button"
        className="text-orange-600"
        onClick={toggleSidebar}
      >
        <MenuIcon fontSize="large" />
      </button>

      {/* Sidebar */}
      <nav
        ref={navRef}
        id="nav bar"
        className={`fixed top-0 bottom-0 right-0 w-64 bg-zinc-950 border-l-2 border-orange-600 text-slate-100 shadow-2xl overflow-y-auto transform ease-in-out duration-300 z-40 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="px-3 py-5">
          <ul>
            {Auth.loggedIn() ? (
              <>
                <li className=" p-2 text-lg py-3">
                  <CalendarMonthIcon className="mr-6" />
                  <Link to="/mybookings" onClick={toggleSidebar}>
                    My Bookings
                  </Link>
                </li>

                <li className=" p-2 text-lg py-3">
                  <AccountCircleIcon className="mr-6" />
                  <Link to="/myaccount" onClick={toggleSidebar}>
                    My Account
                  </Link>
                </li>
              </>
            ) : null}
            <li className=" p-2 text-lg py-3">
              <DoorSlidingIcon className="mr-6" />
              <Link to="/escaperooms" onClick={toggleSidebar}>
                Escape Rooms
              </Link>
            </li>
            <li className=" p-2 text-lg py-3">
              <GavelIcon className="mr-6" />
              <Link to="/rules" onClick={toggleSidebar}>
                Rules
              </Link>
            </li>
            <li className=" p-2 text-lg py-3">
              <QuestionMarkIcon className="mr-6" />
              <Link to="/howtobook" onClick={toggleSidebar}>
                How to book
              </Link>
            </li>

            <li className=" p-2 text-lg  py-3">
              {Auth.loggedIn() ? (
                <>
                  <LoginIcon className="mr-6" />
                  <Link onClick={handleLogout}>Logout</Link>
                </>
              ) : (
                <>
                  <LoginIcon className="mr-6" />
                  <Link to="/login" onClick={toggleSidebar}>
                    Login
                  </Link>
                </>
              )}
            </li>
            {/* <li className=" p-2 text-lg py-3">
              <DownloadIcon className="mr-4" />
              <Link to="/signin" onClick={toggleSidebar}>
                Install Escape Me App
              </Link>
            </li> */}
            {/* <li className=" p-2 text-lg py-3">
              <button
                onClick={() => {
                  setIsDarkMode(!isDarkMode);
                  setIsOpen(false);
                }}
              >
                {isDarkMode ? (
                  <DarkModeIcon className="mr-6" />
                ) : (
                  <LightModeIcon className="mr-6" />
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
