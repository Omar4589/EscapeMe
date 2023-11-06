import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-slate-100 border-t-2 border-orange-600 py-6 px-4">
      <div className="text-center">
        <p className="text-lg">
          &copy; 2023 Escape Me Virtual Escape Rooms. All Rights Reserved.
        </p>
        <div className="mt-4">
          <Link to="/aboutus" className="mr-4">
            About Us
          </Link>
          <Link to="/contactus" className="mr-4">
            Contact Us
          </Link>
          <Link to="/faq">FAQ</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
