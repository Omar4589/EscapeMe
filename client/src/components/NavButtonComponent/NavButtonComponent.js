import { Link } from "react-router-dom";

const NavButtonComponent = ({ route, text }) => {
  return (
    <Link
      to={route}
      className="w-3/4 mx-auto bg-orange-600 hover:bg-orange-700 text-slate-100 font-bold py-4 px-4 rounded-lg block my-6 text-lg lg:w-1/2 xl:w-1/4"
    >
      {text}
    </Link>
  );
};

export default NavButtonComponent;
