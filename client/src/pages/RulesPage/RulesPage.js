import RulesComponent from "../../components/RulesComponent/RulesComponent";
import ScrollToTop from "../../components/ScrollToTopWrapper/ScrollToTopWrapper";

const RulesPage = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-slate-100 px-6 py-10">
      <h1 className="font-semibold text-4xl  mb-9 underline decoration-orange-600 text-center">
        Rules
      </h1>
      <RulesComponent />
    </div>
  );
};

export default ScrollToTop(RulesPage);
