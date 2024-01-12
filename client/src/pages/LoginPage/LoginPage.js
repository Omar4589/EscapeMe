import LoginForm from "../../components/LoginForm/LoginForm";
import ScrollToTop from "../../components/ScrollToTopWrapper/ScrollToTopWrapper";


const LoginPage = () => {
  return (
    <div className="bg-zinc-950 min-h-screen flex justify-center font-roboto text-slate-100">
    <LoginForm />
    </div>
  );
};

export default ScrollToTop(LoginPage);
