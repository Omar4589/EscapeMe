import GoogleMapComponent from "../../components/GoogleMapComponent/GoogleMap";

const LocationComponent = () => {
  return (
    <div id="location-card" className="p-6 mt-24 pb-16 font-roboto">
      <h1 className="text-5xl mb-14 font-bold underline decoration-orange-600">
        Location
      </h1>
      <GoogleMapComponent />
      <p className="pb-1 pt-6 text-lg">555-555-1234</p>
      <p className="pb-1 text-lg">escapemesupport@escapeme.com</p>
      <p className="pb-1 text-xl">Located: Far Far Away Plaza</p>
      <p className="text-lg">42 Wallaby Way, Sydney</p>
      <p className="text-lg">Suite 101</p>
      <p className="text-lg">Namek, TX 78041</p>
    </div>
  );
};

export default LocationComponent;
