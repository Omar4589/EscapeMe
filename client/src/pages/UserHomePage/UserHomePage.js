import UserHomeComponent from "../../components/UserHomeComponent/UserHome";
import ScrollToTop from "../../components/ScrollToTopWrapper/ScrollToTopWrapper";


const UserHomePage = () => {
  return (
    <div>
      <UserHomeComponent />
    </div>
  );
};

export default ScrollToTop(UserHomePage);
