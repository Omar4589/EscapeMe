import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import InfoIcon from "@mui/icons-material/Info";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import HelpIcon from "@mui/icons-material/Help";
import LoginIcon from "@mui/icons-material/Login";
import DownloadIcon from "@mui/icons-material/Download";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useDarkMode } from "../../utils/DarkModeContext";
import { Light } from "@mui/icons-material";
import Auth from "../../utils/auth";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const { isDarkMode, setIsDarkMode } = useDarkMode();

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

  useEffect(() => {
    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-blue-700 dark:bg-violet-950 text-slate-950 flex justify-between items-center p-4">
      <Link
        to={
          Auth.loggedIn()
            ? "/home"
            : Auth.loggedIn() && Auth.isAdmin()
            ? "/admin"
            : "/"
        }
        className="text-slate-100  dark:text-slate-200 text-3xl font-bold"
      >
        Escape Me
      </Link>
      <button
        id="menu-button"
        className="text-slate-100"
        onClick={toggleSidebar}
      >
        <MenuIcon fontSize="large" />
      </button>

      {/* Sidebar */}
      <nav
        ref={navRef}
        id="nav bar"
        className={`fixed top-0 bottom-0 right-0 w-64 bg-slate-100 dark:bg-indigo-950 dark:text-slate-200 shadow-2xl overflow-y-auto transform ease-in-out duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="px-3 py-5">
          <ul>
            <li className=" p-2 text-lg py-3">
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
            </li>
            <li className=" p-2 text-lg py-3">
              <InfoIcon className="mr-6" />
              <Link to="/aboutus" onClick={toggleSidebar}>
                About Us
              </Link>
            </li>
            <li className=" p-2 text-lg  py-3">
              <ContactPageIcon className="mr-6" />
              <Link to="/contactus" onClick={toggleSidebar}>
                Contact Us
              </Link>
            </li>
            <li className=" p-2 text-lg  py-3">
              <HelpIcon className="mr-6" />
              <Link to="/faq" onClick={toggleSidebar}>
                FAQ
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
            <li className=" p-2 text-lg py-3">
              <DownloadIcon className="mr-4" />
              <Link to="/signin" onClick={toggleSidebar}>
                Install Escape Me App
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
