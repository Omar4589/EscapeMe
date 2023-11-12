import SignUpForm from "../../components/SignUpForm/SignUpForm";
import ScrollToTop from "../../components/ScrollToTopWrapper/ScrollToTopWrapper";


const SignUpPage = () => {
  return (
    <div>
      <SignUpForm />
    </div>
  );
};

export default ScrollToTop(SignUpPage);
