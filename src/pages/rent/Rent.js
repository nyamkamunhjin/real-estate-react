import React, { useState, useEffect, useContext } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import GridView from '../../components/GridView/GridView';
import Backdrop from '../../components/Backdrop/Backdrop';
import Modal from '../../components/Modal/Modal';
import './Rent.css';
// import data from '../../fakeData.json';
// import mapStyles from '../../mapStyles';
import CookieContext from '../../context/cookie-context';


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
  const { cookies } = useContext(CookieContext);
  const token = cookies.get('token');
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [properties, setProperties] = useState([]);
  const [selected, setSelected] = useState(null);

  const exitSelected = () => {
    setSelected(null);
  };

  const handleSelected = (info) => {
    setSelected(info);
  };
  useEffect(() => {
    const fetchData = async () => {
      // console.log(token);
      const result = await axios(
        `${
          process.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_LOCAL_URL
        }/api/properties`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProperties(result.data);
      // setSelected(result.data[0]);
    };

    fetchData();
  }, [token]);

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
          zoom={10}
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
                // console.log(selected);
              }}
            />
          ))}
        </GoogleMap>
      </div>
      {properties.length !== 0 ? (
        <GridView info={properties} handleSelected={handleSelected} />
      ) : (
        !token ? <h2>Please login to see.</h2> : <h2>Loading...</h2>
      )}
      {selected ? (
        <React.Fragment>
          <Backdrop exit={exitSelected} />
          <Modal info={selected} />
        </React.Fragment>
      ) : null}
    </div>
  );
}
