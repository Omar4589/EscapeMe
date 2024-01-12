import MenuIcon from "@mui/icons-material/Menu";

const MenuButton = ({ toggleSidebar }) => {
  return (
    <button
      id="menu-button"
      className="text-orange-600 lg:hidden"
      onClick={toggleSidebar}
    >
      <MenuIcon fontSize="large" />
    </button>
  );
};

export default MenuButton;
