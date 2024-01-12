//-----------------------START OF COMPONENT-----------------------//
const BookingComponent = ({ booking, setDialogOpen, setCurrentBookingId }) => {
  return (
    <div  className="p-4 flex flex-col justify-between">
      <h2 className="text-2xl font-bold mb-2 underline decoration-orange-600 drop-shadow-lg">
        {booking.escaperoom.theme}
      </h2>
      <img
        src={booking.escaperoom.image_url}
        alt="escape room"
        className="h-52 w-11/12 object-cover mb-5 rounded mx-auto drop-shadow-xl"
      />
      <div className="flex text-center items-start justify-between mb-2 mx-2">
        <p className="font-semibold text-lg">Number of Players:</p>
        <p id="numberOfPlayers" className="text-right ml-2">
          {booking.numberOfPlayers}
        </p>
      </div>
      <div className="flex text-center items-start justify-between mb-2 mx-2">
        <p className="font-semibold text-lg">Date:</p>
        <p id="date" className="text-right ml-2">
          {booking.date}
        </p>
      </div>

      <div className="flex text-center items-start justify-between mb-2 mx-2">
        <p className="font-semibold text-lg">Time:</p>
        <p id="time" className="text-right ml-2">
          {booking.time}
        </p>
      </div>
      <div className="flex text-center items-start justify-between mb-3 mx-2">
        <p className="font-semibold text-lg">Duration:</p>
        <p id="duration" className="text-right ml-2">
          {booking.escaperoom.duration} min
        </p>
      </div>
      <div className="text-center  mb-2 mx-2">
        <p id="description" className="">
          {booking.escaperoom.description}
        </p>
      </div>
      <div className="text-center mt-5">
        <button
          className="py-2 px-4 bg-orange-600 text-slate-100 hover:bg-orange-700 rounded-lg"
          onClick={() => {
            setDialogOpen(true);
            setCurrentBookingId(booking.id);
          }}
        >
          Cancel booking
        </button>
      </div>
      <div className="border-2 border-orange-600 mt-14 w-4/5 mx-auto"></div>
    </div>
  );
};

export default BookingComponent;
