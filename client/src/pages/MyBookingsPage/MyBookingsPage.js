import MyBookings from "../../components/MyBookingsComponent/MyBookings";
import ScrollToTop from "../../components/ScrollToTopWrapper/ScrollToTopWrapper";


const MyBookingsPage = () => {
  return (
    <div>
      <MyBookings />
    </div>
  );
};

export default ScrollToTop(MyBookingsPage);
