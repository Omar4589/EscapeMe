import { useEffect, useState } from "react";
import Auth from "../../utils/auth";
import ScrollToTop from "../../components/ScrollToTopWrapper/ScrollToTopWrapper";
import LocationComponent from "../../components/LocationComponent/LocationComponent";
import RulesComponent from "../../components/RulesComponent/RulesComponent";
import ChooseYourAdventureComponent from "../../components/ChooseYourAdventureComponent/ChooseYourAdventureComponent";

const WelcomePage = () => {
  //we use this state to return a null value if the useEffect hasnt finished running
  const [loading, setLoading] = useState(true);

  //this hook checks if the user is logged in and/or an admin
  //redirects user to correct location
  useEffect(() => {
    if (Auth.loggedIn()) {
      if (Auth.isAdmin()) {
        window.location.assign("/admin");
      } else window.location.assign("/home");
    }

    setLoading(false);
  }, []);

  if (loading) {
    return null;
  }

  return (
    <div id="welcome-page" className="min-h-screen bg-zinc-950 text-slate-100">
      <div className=" pb-8  ">
        <ChooseYourAdventureComponent />

        <div className="px-6 pt-20 lg:pt-0 lg:pb-14 lg:px-12">
          <h3 className="font-semibold text-4xl text-left mb-14 underline decoration-orange-600 ">
            Things to Know:
          </h3>
          <div className="lg:px-6">
            <RulesComponent />
          </div>
        </div>

        <LocationComponent />
      </div>
    </div>
  );
};

export default ScrollToTop(WelcomePage);
