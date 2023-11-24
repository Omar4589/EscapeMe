//-----------------IMPORTS-----------------------//
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import "./google.css";

const libraries = ["places"];

//-----------------------START OF COMPONENT-----------------------//
const GoogleMapComponent = () => {
  // const { isLoaded, loadError } = useLoadScript({
  //   googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  //   libraries,
  // });

  //used as starting point of map
  // const center = { lat: 29.5831, lng: -98.6199 };

  // if (loadError) {
  //   return <div>Error loading maps: {loadError.message}</div>;
  // }

  // if (!isLoaded) {
  //   return <div>Loading Maps...</div>;
  // }
  return (
    <div>
      {/* <GoogleMap
        zoom={16} //how far you want the map to be zoomed in
        center={center} // displays location
        mapContainerClassName="map-container" // styling
        options={{
          streetViewControl: false,
          fullscreenControl: false,
          gestureHandling: "greedy",
          mapTypeControl: false,
          zoomControl: false,
          scrollwheel: false, // prevent zooming with mouse wheel
          disableDoubleClickZoom: true,
          styles: [
            {
              elementType: "labels",
              featureType: "poi.business",
              stylers: [{ visibility: "off" }],
            },
          ],
        }}
      >
        <MarkerF position={center} />
      </GoogleMap> */}
    </div>
  );
};

export default GoogleMapComponent;
