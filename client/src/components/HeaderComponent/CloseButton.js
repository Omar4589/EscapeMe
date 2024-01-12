const CloseButton = ({toggleSidebar}) => {
  return (
    <span
      onClick={toggleSidebar}
      className="text-3xl fixed top-6 cursor-pointer right-7 text-orange-600 lg:hidden "
    >
      X
    </span>
  );
};

export default CloseButton;
