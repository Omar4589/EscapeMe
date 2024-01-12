//-----------------IMPORTS-----------------------//
import React, { useState, useEffect } from "react";
import { useUserBookingsContext } from "../../utils/UserBookingsContext";
import SnackBar from "../../components/SnackBarComponent/SnackBar";
import BookingComponent from "../../components/BookingComponent/BookingComponent";
import ScrollToTop from "../../components/ScrollToTopWrapper/ScrollToTopWrapper";
import NoBookings from "../../components/NoBookingsComponent/NoBookings";
import ConfirmationBox from "../../components/ConfirmationBoxComponent/ConfirmationBox";

const MyBookingsPage = () => {
  //-----------------CONTEXT---------------//
  const { userBookings, deleteABooking, loading, error } =
    useUserBookingsContext();

  //-----------------STATE---------------//
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState({
    show: false,
    message: "",
  });
  const [currentBookingId, setCurrentBookingId] = useState(null);

  //-----------------HOOKS---------------//
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Add 'overflow-hidden' to the body when the modal is open
    if (dialogOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Clean up function to remove the class when the component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [dialogOpen]);

  //-----------------HANDLERS---------------//
  const showSnack = (message) => {
    setShowSnackBar({ show: true, message });
    setTimeout(() => {
      setShowSnackBar({ show: false, message: "" });
    }, 3000);
  };

  const deleteBooking = async (bookingId) => {
    try {
      const response = await deleteABooking(bookingId);

      if (response.data.deleteBooking) {
        showSnack("Booking cancelled successfully!");
      } else {
        showSnack("Could not cancel the booking. Please try again.");
      }
    } catch (err) {
      console.error(err);
      showSnack("Something went wrong. Please try again later.");
    }
  };

  // Guard clause for safe access
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {"something went wrong"}</p>;

  return (
    <div className=" text-slate-100 min-h-screen  px-5 py-10 bg-zinc-950">
      <h1 className="text-3xl font-bold mb-5 underline decoration-orange-600">
        My Bookings
      </h1>

      <div className="grid grid-cols-1  md:grid-cols-2 md:gap-x-14 lg:grid-cols-3 lg:px-3">
        {userBookings?.map((booking) => (
          <BookingComponent
            key={booking.id}
            booking={booking}
            setDialogOpen={setDialogOpen}
            setCurrentBookingId={setCurrentBookingId}
          />
        ))}
      </div>

      {!userBookings.length && <NoBookings />}
      {dialogOpen ? (
        <ConfirmationBox
          setDialogOpen={setDialogOpen}
          deleteBooking={deleteBooking}
          currentBookingId={currentBookingId}
        />
      ) : null}

      {showSnackBar.show ? <SnackBar message={showSnackBar.message} /> : null}
    </div>
  );
};

export default ScrollToTop(MyBookingsPage);
