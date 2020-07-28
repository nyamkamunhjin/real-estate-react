import React, { useState, useRef } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import './Add.css';

// import mapStyles from '../../mapStyles';

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

export default function Add() {
  const addressElRef = useRef('');
  const latitudeElRef = useRef(0);
  const longitudeElRef = useRef(0);
  const priceElRef = useRef(0);
  const imgLinkElRef = useRef('');
  const sizeElRef = useRef(0);
  const bedElRef = useRef(0);
  const kitchenElRef = useRef(0);
  const toiletElRef = useRef(0);
  const balconyElRef = useRef(0);
  const descElRef = useRef('');

  const [marker, setMarker] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading maps';

  const addData = async () => {
    const data = {
      address: addressElRef.current.value,
      location: {
        lat: parseFloat(latitudeElRef.current.value),
        lng: parseFloat(longitudeElRef.current.value),
      },
      imgUrl: imgLinkElRef.current.value,
      priceRent: parseInt(priceElRef.current.value),
      room: {
        size: parseInt(sizeElRef.current.value),
        bed: parseInt(bedElRef.current.value),
        kitchen: parseInt(kitchenElRef.current.value),
        balcony: parseInt(balconyElRef.current.value),
        toilet: parseInt(toiletElRef.current.value),
      },
      desc: descElRef.current.value,
    };
    console.log(data);
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_LOCAL_URL}/api/add`,
        data
      )
      .then((res) => {
        alert('successful');
        console.log(res);
      })
      .catch((err) => {
        alert('error');
        console.log(err);
      });

    // setSelected(result.data[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addData();
  };

  return (
    <div className="add">
      <div className="map">
        <h2>Add property location on map</h2>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={14}
          center={center}
          options={options}
          onload={onMapLoad}
          onClick={(event) => {
            setMarker({
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
            });
          }}
        >
          {marker ? (
            <Marker
              key={marker.lat + marker.lng}
              position={marker}
              icon={{
                url: '/green_dot.svg',
                scaledSize: new window.google.maps.Size(50, 50),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(25, 25),
              }}
            />
          ) : null}
        </GoogleMap>
      </div>
      <div className="add-form">
        <form onSubmit={handleSubmit}>
          <h1>Add new property to sell</h1>
          <br />
          <div className="form-control">
            <label htmlFor="address">Address: </label>
            <input ref={addressElRef} type="text" id="address" required />
          </div>
          <div className="form-control">
            <label htmlFor="coordinate">Coordinate: </label>
            <div className="coordinate">
              <input
                ref={latitudeElRef}
                value={marker ? marker.lat : ''}
                onChange={(event) => {
                  setMarker((current) => {
                    return { lat: event.target.value, lng: current.lng || 0 };
                  });
                }}
                type="number"
                id="latitude"
                required
                // readOnly
              />
              <input
                ref={longitudeElRef}
                value={marker ? marker.lng : ''}
                onChange={(event) => {
                  setMarker((current) => {
                    return { lat: current.lat || 0, lng: event.target.value };
                  });
                }}
                type="number"
                id="longitude"
                required
                // readOnly
              />
            </div>
          </div>
          <div className="form-control">
            <label htmlFor="priceRent">Rent price: </label>
            <input ref={priceElRef} type="number" id="priceRent" required />
          </div>
          <div className="form-control">
            <label htmlFor="imgLink">Image Link: </label>
            <input ref={imgLinkElRef} type="text" id="imgLink" required />
          </div>
          <div className="form-control">
            <label htmlFor="size">Property size: </label>
            <input ref={sizeElRef} type="number" id="size" required />
          </div>
          <div className="form-control">
            <label htmlFor="bed">Bedrooms: </label>
            <input ref={bedElRef} type="number" id="bed" required />
          </div>
          <div className="form-control">
            <label htmlFor="kitchen">Kitchen: </label>
            <input ref={kitchenElRef} type="number" id="kitchen" required />
          </div>
          <div className="form-control">
            <label htmlFor="toilet">Toilet: </label>
            <input ref={toiletElRef} type="number" id="toilet" required />
          </div>
          <div className="form-control">
            <label htmlFor="balcony">Balcony: </label>
            <input ref={balconyElRef} type="number" id="balcony" required />
          </div>
          <div className="form-control">
            <label htmlFor="desc">Description: </label>
            <textarea ref={descElRef} id="desc" rows="5" required />
          </div>
          <input className="btn" type="submit" />
        </form>
      </div>
    </div>
  );
}
