import BookingComponent from "../../components/BookingComponent/Booking";
import ScrollToTop from "../../components/ScrollToTopWrapper/ScrollToTopWrapper";

const BookingPage = () => {
  return (
    <div>
      <BookingComponent />
    </div>
  );
};

export default ScrollToTop(BookingPage);
