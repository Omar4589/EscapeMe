import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import Auth from "../../utils/auth";

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-slate-100 font-roboto border-t-2 border-orange-600 pt-7 pb-4 px-4 text-center lg:justify-around">
      <div className="lg:w-1/4 lg:mx-auto">
        <Link
          to={
            Auth.loggedIn()
              ? "/home"
              : Auth.loggedIn() && Auth.isAdmin()
              ? "/admin"
              : "/"
          }
          className="w-7/12 block lg:w-7/12 lg:block mx-auto"
        >
          <img src={logo} alt="logo"></img>
        </Link>
        <p className="text-lg lg:text-base">
          &copy; 2023 Escape Me Virtual Escape Rooms. All Rights Reserved.
        </p>
      </div>

      <div className="mt-6 lg:flex lg:items-center lg:justify-center lg:text-lg">
        <div>
          <Link to="/escaperooms" className="mx-6 lg:mr-8">
            Escape Rooms
          </Link>
          <Link to="/rules" className="mx-6 lg:mr-8">
            Rules
          </Link>
          <Link to="/howtobook" className="mx-6 lg:mr-8">
            How To Book
          </Link>
        </div>
        <div className="mt-2 lg:mt-0">
          <Link to="/aboutus" className="mx-6 lg:mr-8">
            About Us
          </Link>
          <Link to="/contactus" className="mx-6 lg:mr-8">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
