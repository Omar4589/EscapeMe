import ChangePasswordForm from "../../components/ChangePasswordFormComponent/ChangePasswordForm";
import ScrollToTop from "../../components/ScrollToTopWrapper/ScrollToTopWrapper";


const ChangePasswordPage = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-slate-100 px-5 py-10">
      <ChangePasswordForm />
    </div>
  );
};

export default ScrollToTop(ChangePasswordPage);
