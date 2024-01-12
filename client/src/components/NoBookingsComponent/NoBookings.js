import { Link } from "react-router-dom";

const NoBookings = () => {
  return (
    <div className="flex items-center justify-center flex-col ">
      <p className="text-gray-600 my-10">You have no bookings yet.</p>

      <Link to="/booking/1" className="px-10 bg-orange-600 py-2 rounded-lg ">
        Book Now
      </Link>
    </div>
  );
};

export default NoBookings;
