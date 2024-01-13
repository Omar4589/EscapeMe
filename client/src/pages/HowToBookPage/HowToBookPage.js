import BookingStep from "../../components/BookingStepComponent/BookingStep";
import ScrollToTop from "../../components/ScrollToTopWrapper/ScrollToTopWrapper";
import NavButtonComponent from "../../components/NavButtonComponent/NavButtonComponent";

const HowToBookPage = () => {
  return (
    <div className="px-6 py-10 bg-zinc-950 min-h-screen text-slate-100 md:px-10 xl:px-16">
      <h1 className="text-4xl font-semibold text-center mb-10 underline decoration-orange-600">
        How to Book
      </h1>
      <div className="space-y-4 text-xl md:px-6 lg:px-12">
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
        <NavButtonComponent route="/rules" text="Rules" />
        <NavButtonComponent route="/signup" text="Sign Up / Login" />
        <NavButtonComponent route="/booking/1" text="Book Now" />
      </div>
    </div>
  );
};

export default ScrollToTop(HowToBookPage);
