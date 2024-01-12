import { Link } from "react-router-dom";
import ScrollToTop from "../ScrollToTopWrapper/ScrollToTopWrapper";
import dayjs from "dayjs";

const BookingConfirmationComponent = ({
  bookingDetails,
  setConfirmationPage,
}) => {
  return (
    <div className="lg:flex lg:flex-col lg:justify-center lg:items-center">
      <h1 className="text-2xl font-bold mb-10 md:text-3xl lg:text-2xl">
        Thank you for booking your escape room adventure!
      </h1>
      <div className="px-1">
        <p className="text-lg mb-5 lg:px-36">Your booking details:</p>
        <div className="text-lg px-3 mb-6  lg:flex lg:justify-center lg:w-3/4 lg:mx-auto">
          <div className="my-3 lg:w-1/2 lg:flex lg:flex-col lg:justify-between">
            <strong className="leading-10 md:text-2xl">Escape Room:</strong>{" "}
            <br></br>
            <p className="md:pt-3 md:text-xl">
              {" "}
              {bookingDetails.escapeRoomTheme}
            </p>
            <img
              src={bookingDetails.escapeRoomImage}
              alt="escape room"
              className="w-3/4 mt-5 mb-3"
            />
            <p className="text-sm md:text-base">{bookingDetails.description}</p>
          </div>

          <div className="lg:mx-6 lg:w-1/4 lg:flex lg:flex-col lg:justify-around">
            <div>
              <div className="my-3">
                <strong className="leading-10 md:text-xl lg:text-lg">
                  Number of Players:
                </strong>
                <br></br>
                <p className="md:text-xl">
                  {bookingDetails.numberOfPlayers} player(s)
                </p>
              </div>
              <div className="my-3">
                <strong className="leading-10 md:text-xl lg:text-lg">
                  Date:
                </strong>
                <br></br>
                <p className="md:text-xl">
                  {dayjs(bookingDetails.date).format("MMMM D, YYYY")}
                </p>
              </div>
              <div className="my-3">
                <strong className="leading-10 md:text-xl lg:text-lg">
                  Time:
                </strong>
                <br></br>
                <p className="md:text-xl">
                  {dayjs(`2023-01-01T${bookingDetails.time}`).format("h:mm A")}
                </p>
              </div>
            </div>

            <div className="">
              <p className="text-lg mt-12 font-bold lg:text-base">
                We look forward to seeing you! If you have any questions or need
                to make changes, please contact us.
              </p>
              <Link
                to="/mybookings"
                onClick={() => {
                  setConfirmationPage(false);
                }}
                className="block mt-8 bg-orange-600 text-lg text-slate-100 text-center font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline "
              >
                View My Bookings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollToTop(BookingConfirmationComponent);
