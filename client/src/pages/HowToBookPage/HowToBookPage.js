import React from "react";
import BookingStep from "../../components/BookingStepComponent/BookingStep";
import { Link } from "react-router-dom";
import ScrollToTop from "../../components/ScrollToTopWrapper/ScrollToTopWrapper";

const HowToBookPage = () => {
  return (
    <div className="px-5 py-10 bg-zinc-950 min-h-screen text-slate-100">
      <h1 className="text-4xl font-semibold text-center mb-10 underline decoration-orange-600">
        How to Book
      </h1>
      <div className="space-y-4 text-xl lg:px-12">
        <BookingStep
          stepNumber="1"
          stepInstruction="Create an account to start the booking process."
        />
        <BookingStep
          stepNumber="2"
          stepInstruction={`Click the "Book Now" button on the home page or navigate to the Escape Room page to choose your adventure.
           `}
        />

        <BookingStep
          stepNumber="3"
          stepInstruction={`Fill out the booking form by selecting an escape room, the number of players (max: 4 players), a date, and a time.`}
        />

        <BookingStep
          stepNumber="4"
          stepInstruction="Click the 'Confirm Booking' button to schedule your booking and you're all set!"
        />
        <BookingStep
          stepNumber="5"
          stepInstruction="Look out for an email confirmation in your inbox."
        />
      </div>
      <div className="text-center my-10 lg:mt-16">
        {" "}
        <Link
          to="/rules"
          className="w-3/4 mx-auto bg-orange-600 hover:bg-orange-700 text-slate-100 font-bold py-4 px-4 rounded-lg block my-6 text-xl lg:w-1/4"
        >
          Rules
        </Link>
        <Link
          to={"/signup"}
          className="w-3/4 mx-auto  bg-orange-600 hover:bg-orange-700 text-slate-100 font-bold py-4 px-4 rounded-lg block my-6 text-xl lg:w-1/4"
        >
          Sign Up/ Log In
        </Link>
        <Link
          to={"/booking/1"}
          className="w-3/4 mx-auto  bg-orange-600 hover:bg-orange-700 text-slate-100 font-bold py-4 px-4 rounded-lg block my-6 text-xl lg:w-1/4"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default ScrollToTop(HowToBookPage);
