import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import axios from 'axios';
import GridView from '../../components/GridView/GridView';
import Backdrop from '../../components/Backdrop/Backdrop';
import Modal from '../../components/Modal/Modal';

import './Buy.css';
import data from '../../fakeData.json';
import mapStyles from './mapStyles';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '100%',
};
const center = {
  lat: 47.918729,
  lng: 106.917653,
};
const options = {
  // styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

export default function Buy() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [properties, setProperties] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://us-central1-real-estate-281401.cloudfunctions.net/app/api/properties'
      );
      setProperties(result.data);
      // setSelected(result.data[0]);
    };

    fetchData();
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading maps';

  return (
    <div className="buy-container">
      <div className="map">
        <h2>Maps</h2>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={14}
          center={center}
          options={options}
          onload={onMapLoad}
        >
          {properties.map((prop) => (
            <Marker
              key={prop.id}
              position={prop.location}
              icon={{
                url: '/green_dot.svg',
                scaledSize: new window.google.maps.Size(50, 50),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(25, 25),
              }}
              onClick={() => {
                setSelected(prop);
                console.log(selected);
              }}
            />
          ))}
        </GoogleMap>
      </div>
      <GridView info={properties} />
      {selected ? (
            <React.Fragment>
              <Backdrop />
              <Modal info={selected} />
            </React.Fragment>
          ) : null}
    </div>
  );
}
