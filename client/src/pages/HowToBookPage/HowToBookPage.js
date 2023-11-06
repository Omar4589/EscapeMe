import React from "react";
import BookingStep from "../../components/BookingStepComponent/BookingStep";
import { Link } from "react-router-dom";

const HowToBookPage = () => {
  return (
    <div className="px-5 py-10 bg-zinc-950 min-h-screen text-slate-100">
      <h1 className="text-4xl font-bold text-center mb-6 underline decoration-orange-600">
        How to Book
      </h1>
      <div className="space-y-4 text-xl">
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
      <div className="flex flex-col mx-auto w-3/4 text-center text-xl my-10">
        {" "}
        <Link
          to={"/rules"}
          className="w-full px-6 py-2 my-4 bg-orange-600 rounded-lg"
        >
          Rules
        </Link>
        <Link
          to={"/signup"}
          className="w-full px-6 py-2 my-4  bg-orange-600 rounded-lg"
        >
          Sign Up/ Log In
        </Link>
        <Link
          to={"/booking/1"}
          className="w-full px-6 py-2 my-4  bg-orange-600 rounded-lg"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default HowToBookPage;
