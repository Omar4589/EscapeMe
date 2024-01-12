import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

const NavBarLogo = ({ toggleSidebar, logo }) => {
  return (
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
  );
};

export default NavBarLogo;
