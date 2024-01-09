import GoogleMapComponent from "../../components/GoogleMapComponent/GoogleMap";

const LocationComponent = () => {
  return (
    <div id="location-card" className="p-6 mt-24 pb-16 font-roboto md:px-12">
      <h1 className="text-4xl mb-8 font-bold underline decoration-orange-600 lg:block">
        Location
      </h1>
      <div className="md:flex md:justify-around">
        <GoogleMapComponent />
        <div className="">
          {" "}
        
          <p className="pb-1 text-xl">Located: Far Far Away Plaza</p>
          <p className="text-lg">42 Wallaby Way, Sydney</p>
          <p className="text-lg">Suite 101</p>
          <p className="text-lg">Namek, TX 78041</p>
          <p className="pb-1 pt-6 text-lg">555-555-1234</p>
          <p className="pb-1 text-lg">escapemesupport@escapeme.com</p>
        </div>
      </div>
    </div>
  );
};

export default LocationComponent;
