const ConfirmationBox = ({setDialogOpen, deleteBooking, currentBookingId}) => {
  return ( <div
    id="confirmation-dialog"
    className="fixed min-h-screen inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div className="overscroll-contain  max-h-screen text-center overflow-y-auto relative bg-slate-200 text-slate-950 px-5 py-8 mx-2 rounded-lg shadow-lg w-full max-w-lg">
      <p className="text-xl">
        Are you sure you want to cancel your booking?
      </p>
      <div className="my-5">
        {" "}
        <button
          className="px-10 text-slate-100 py-2 bg-orange-600 rounded-full mx-6"
          onClick={() => {
            setDialogOpen(false);
          }}
        >
          No
        </button>
        <button
          className="px-10 text-slate-100 py-2 bg-orange-600 hover:bg-orange-700 rounded-full mx-6"
          onClick={() => {
            deleteBooking(currentBookingId);
            setDialogOpen(false);
          }}
        >
          Yes
        </button>{" "}
      </div>
    </div>
  </div>);
};

export default ConfirmationBox;
