const SnackBar = ({ message }) => {
  return (
    <div
      id="snackbar"
      className="fixed top-0 right-0 left-0 bg-orange-600 text-slate-100 mt-4 flex justify-center w-11/12 mx-auto rounded shadow-lg text-lg z-50"
    >
      <div className="px-5 py-3  text-center">{message} </div>
    </div>
  );
};

export default SnackBar;
