import { Link } from "react-router-dom";
import img2 from "../../assets/welcomePageImages/escaperoomtoc.jpeg";



const ChooseYourAdventureComponent = () => {
  return (
    <div
      id="view-escaperooms-card"
      className="bg-zinc-950 text-slate-100 text-center lg:h-screen"
    >
      <img
        src={img2}
        alt="escape room"
        className=" mb-4 mx-auto h-screen object-cover lg:h-5/6 lg:w-full lg:block lg:absolute opacity-70"
      />
      <div className="absolute top-1/4 w-full">
        <h1 className="text-3xl font-bold py-2 lg:static lg:mt-36 lg:text-5xl lg:drop-shadow-lg">
          Experience Thrilling Escape Rooms with Friends!
        </h1>
      </div>

      <div className="absolute top-1/2 lg:pt-10">
        <h3 className="font-extrabold text-4xl  mb-2  lg:relative  lg:font-bold lg:drop-shadow-lg">
          {" "}
          CHOOSE YOUR ADVENTURE
        </h3>
        <p className="text-xl px-4 font-semibold lg:font-normal lg:relative lg:drop-shadow-lg lg:text-3xl lg:w-7/12 lg:mx-auto">
          Discover a wide range of immersive and challenging escape rooms,
          catering to all interests and skill levels.
        </p>
        <Link
          id="escaperooms-button"
          to="/escaperooms"
          className="bg-orange-600  text-slate-50 font-bold py-3 px-6 mt-6 inline-block rounded hover:bg-orange-700 lg:relative"
        >
          Browse Escape Rooms
        </Link>
      </div>
    </div>
  );
};

export default ChooseYourAdventureComponent;
