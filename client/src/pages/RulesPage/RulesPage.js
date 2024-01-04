import RulesComponent from "../../components/RulesComponent/RulesComponent";
import ScrollToTop from "../../components/ScrollToTopWrapper/ScrollToTopWrapper";

const RulesPage = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-slate-100 px-6 py-10">
     <RulesComponent />
    </div>
  );
};

export default ScrollToTop(RulesPage);
