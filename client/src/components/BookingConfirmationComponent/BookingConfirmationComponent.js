import { Link } from "react-router-dom";
import dayjs from "dayjs";

const BookingConfirmationComponent = ({
  bookingDetails,
  setConfirmationPage,
}) => {
  return (
    <div className="min-h-screen bg-zinc-950 text-slate-100 mx-auto px-3">
      <h1 className="text-2xl font-bold mb-10">
        Thank you for booking your escape room adventure!
      </h1>
      <div className="px-1">
        <p className="text-lg mb-5">Your booking details:</p>
        <ul className="list-disc  text-lg pl-6 mb-6">
          <li className="my-3">
            <strong className="leading-10">Escape Room:</strong> <br></br>
            {bookingDetails.escapeRoomTheme}
            <br></br>
            <img
              src={bookingDetails.escapeRoomImage}
              alt="escape room"
              className="w-3/4 my-5"
            />
          </li>
          <li className="my-3">
            <strong className="leading-10">Number of Players:</strong>
            <br></br>
            {bookingDetails.numberOfPlayers} player(s)
          </li>
          <li className="my-3">
            <strong className="leading-10">Date:</strong>
            <br></br>
            {dayjs(bookingDetails.date).format("MMMM D, YYYY")}
          </li>
          <li className="my-3">
            <strong className="leading-10">Time:</strong>
            <br></br>
            {dayjs(bookingDetails.time, "HH:mm:ss").format("h:mm A")}
          </li>
        </ul>
        <p className="text-lg mt-12 font-bold">
          We look forward to seeing you! If you have any questions or need to
          make changes, please contact us.
        </p>
        <Link
          to="/mybookings"
          onClick={() => {
            setConfirmationPage(false);
          }}
          className="block mt-8 bg-orange-600 text-lg text-slate-100 text-center font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          View My Bookings
        </Link>
      </div>
    </div>
  );
};

export default BookingConfirmationComponent;
