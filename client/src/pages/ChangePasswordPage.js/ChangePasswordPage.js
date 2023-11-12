import ChangePasswordForm from "../../components/ChangePasswordFormComponent/ChangePasswordForm";
import ScrollToTop from "../../components/ScrollToTopWrapper/ScrollToTopWrapper";


const ChangePasswordPage = () => {
  return (
    <div>
      <ChangePasswordForm />
    </div>
  );
};

export default ScrollToTop(ChangePasswordPage);
