import LoginForm from "../../components/LoginForm/LoginForm";
import ScrollToTop from "../../components/ScrollToTopWrapper/ScrollToTopWrapper";


const LoginPage = () => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default ScrollToTop(LoginPage);
