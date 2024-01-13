const CloseButton = ({toggleSidebar}) => {
  return (
    <span
      onClick={toggleSidebar}
      className="text-3xl fixed top-6 md:top-8 cursor-pointer right-7 md:right-12 text-orange-600 lg:hidden "
    >
      X
    </span>
  );
};

export default CloseButton;
