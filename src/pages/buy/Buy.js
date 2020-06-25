import React from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

import GridView from "../../components/GridView/GridView";
import "./Buy.css";
import data from "../../fakeData.json";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "100%",
};
const center = {
  lat: 47.918729,
  lng: 106.917653,
};

export default function Buy() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <div className="buy-container">
      <div className="map">
        <h2>Maps</h2>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={14}
          center={center}
        ></GoogleMap>
      </div>
      <GridView info={data} />
    </div>
  );
}
