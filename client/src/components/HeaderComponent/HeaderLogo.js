import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

const HeaderLogo = ({logo}) => {
  return (
    <Link
      to={
        Auth.loggedIn()
          ? "/home"
          : Auth.loggedIn() && Auth.isAdmin()
          ? "/admin"
          : "/"
      }
      className="w-6/12 py-1 md:w-2/5 lg:w-1/5 "
    >
      <img src={logo} alt="logo"></img>
    </Link>
  );
};

export default HeaderLogo;
