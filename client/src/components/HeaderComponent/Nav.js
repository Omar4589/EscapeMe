import NavLinks from "./NavLinks";
import Auth from "../../utils/auth";
import CloseButton from "./CloseButton";
import NavBarLogo from "./NavBarLogo";

const Nav = ({ navRef, isOpen, toggleSidebar, logo }) => {
  //-----------------HANDLERS---------------//
  const handleLogout = () => {
    Auth.logout();
    window.location.replace("/");
  };

  return (
    <nav
      ref={navRef}
      id="nav bar"
      className={`fixed top-0 bottom-0 right-0 w-full bg-zinc-950 text-slate-100 shadow-2xl overflow-y-auto transform ease-in-out duration-300 z-40 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } lg:w-3/4 lg:relative lg:translate-x-0`}
    >
     <NavBarLogo toggleSidebar={toggleSidebar} logo={logo} />
      <CloseButton toggleSidebar={toggleSidebar} />

      <div
        className={`px-3 py-5 text-center text-xl ${
          Auth.loggedIn() ? "lg:text-sm" : "lg:text-lg"
        }`}
      >
        <NavLinks toggleSidebar={toggleSidebar} handleLogout={handleLogout} />
      </div>
    </nav>
  );
};

export default Nav;
