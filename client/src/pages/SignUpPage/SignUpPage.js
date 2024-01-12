import SignUpForm from "../../components/SignUpForm/SignUpForm";
import ScrollToTop from "../../components/ScrollToTopWrapper/ScrollToTopWrapper";


const SignUpPage = () => {
  return (
    <div className="bg-zinc-950 min-h-screen flex justify-center font-roboto text-slate-100">
      <SignUpForm />
    </div>
  );
};

export default ScrollToTop(SignUpPage);
