import GoogleMapComponent from "../../components/GoogleMapComponent/GoogleMap";

const LocationComponent = () => {
  return (
    <div id="location-card" className="p-6 mt-24 pb-16 font-roboto md:px-12 lg:px-16">
      <h1 className="text-4xl mb-8 font-bold underline decoration-orange-600 lg:block">
        Location
      </h1>
      <div className="md:flex md:justify-around lg:w-3/4 lg:mx-auto ">
        <GoogleMapComponent />
        <div className="md:h-full md:my-auto lg:my-0 lg:px-12">
          <p className="pb-1 text-xl lg:text-2xl lg:pt-10">Located: Far Far Away Plaza</p>
          <p className="text-lg lg:text-xl">42 Wallaby Way, Sydney</p>
          <p className="text-lg lg:text-xl">Suite 101</p>
          <p className="text-lg lg:text-xl">Namek, TX 78041</p>
          <p className="pb-1 pt-12 text-lg lg:text-xl lg:pt-24">555-555-1234</p>
          <p className="pb-1 text-lg lg:text-xl">escapemesupport@escapeme.com</p>
        </div>
      </div>
    </div>
  );
};

export default LocationComponent;
