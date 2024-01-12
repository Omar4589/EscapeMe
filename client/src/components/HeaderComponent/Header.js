//-----------------IMPORTS-----------------------//
import { useState, useEffect, useRef } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { useDarkMode } from "../../utils/DarkModeContext";
import logo from "../../assets/logo.png";
import Auth from "../../utils/auth";
import HeaderLogo from "./HeaderLogo";
import MenuButton from "./MenuButton";
import Nav from "./Nav";

//-----------------------START OF COMPONENT-----------------------//
const Header = () => {
  const navRef = useRef(null);
  //-----------------CONTEXT---------------//
  const { isDarkMode, setIsDarkMode } = useDarkMode();

  //-----------------STATE---------------//
  const [isOpen, setIsOpen] = useState(false);

  //-----------------HANDLERS---------------//
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header
      className={`bg-zinc-950 text-slate-950 flex justify-between items-center border-b-2 border-orange-600 p-4 lg:p-0  ${
        Auth.loggedIn() ? "lg:px-12" : "lg:px-24"
      } `}
    >
      <HeaderLogo logo={logo} />
      <MenuButton toggleSidebar={toggleSidebar} />
      <Nav
        navRef={navRef}
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        logo={logo}
      />
    </header>
  );
};

export default Header;
